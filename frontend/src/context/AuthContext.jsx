import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const AuthContext = createContext();

const userInfofromStorage = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account"))
  : null;

const initialState = {
  user: userInfofromStorage,
  isAuthenticated: Boolean(userInfofromStorage),
  userProfile: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "register":
    case "login":
    case "update":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    case "getProfile":
      return {
        ...state,
        userProfile: action.payload,
        isAuthenticated: true,
      };

    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, userProfile }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function signup({ name, email, password }) {
    try {
      const res = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });

      dispatch({ type: "register", payload: res.data });

      localStorage.setItem("account", JSON.stringify(res.data));
    } catch (error) {
      console.error("Registration failed:", error.message);

      if (error.response && error.response.status === 401) {
        alert("Invalid user ID or password. Please try again.");
      } else {
        alert("Registration failed. Please try again later.");
      }
    }
  }

  async function login({ email, password }) {
    try {
      const res = await axios.post("/api/users/login", {
        email,
        password,
      });

      dispatch({ type: "login", payload: res.data });

      localStorage.setItem("account", JSON.stringify(res.data));
    } catch (error) {
      console.error("Login failed:", error.message);

      if (error.response && error.response.status === 401) {
        alert("Invalid user ID or password. Please try again.");
      } else {
        alert("Registration failed. Please try again later.");
      }
    }
  }

  async function getUserProfile({ token }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get("/api/users/profile", config);

      dispatch({ type: "getProfile", payload: data });
    } catch (error) {
      console.error("Failed loading data:", error.message);
    }
  }

  async function updateProfile({ token, userData }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        "/api/users/updateProfile",
        userData,
        config
      );

      dispatch({ type: "update", payload: data });

      localStorage.setItem("account", JSON.stringify(data));
    } catch (error) {
      console.error("Failed updating profile:", error.message);
      alert("ailed updating profile");
    }
  }

  async function updateProfilePicture({ token, formData }) {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        "/api/users/updateProfilePicture",
        formData,
        config
      );

      dispatch({ type: "update", payload: data });

      localStorage.setItem("account", JSON.stringify(data));
    } catch (error) {
      console.error("Failed updating profile picture:", error.message);
      alert("Failed updating profile picture");
    }
  }

  function logout() {
    dispatch({ type: "logout" });
    localStorage.removeItem("account");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        userProfile,
        login,
        logout,
        signup,
        getUserProfile,
        updateProfile,
        updateProfilePicture,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };

// CityProvider.jsx
import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: true,
  currentCity: {},
  error: "",
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/Loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/Loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "cities/Created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "cities/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

function CityProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { user } = useAuth();

  useEffect(() => {
    dispatch({ type: "loading" });
    async function fetchCities(token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const res = await axios.get(`${API_BASE_URL}/cities`, config);

        dispatch({ type: "cities/Loaded", payload: res.data });
      } catch (error) {
        alert("Error loading the data");
        dispatch({
          type: "rejected",
          payload: "Error loading the data:",
          error,
        });
      }
    }

    if (user?.token) fetchCities(user?.token);
  }, [user]);

  async function getCitiyData(id, token) {
    if (!currentCity || Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(`${API_BASE_URL}/cities/${id}`, config);
      dispatch({ type: "city/Loaded", payload: res.data });
    } catch (error) {
      console.error("Error loading the data:", error);
      dispatch({
        type: "rejected",
        payload: "Error loading the data:",
        error,
      });
    }
  }

  async function createCity(newCity, token) {
    dispatch({ type: "loading" });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(`${API_BASE_URL}/cities`, newCity, config);

      dispatch({ type: "cities/Created", payload: res.data });
    } catch (error) {
      alert("Error sending the data");
      dispatch({
        type: "rejected",
        payload: "Error loading the data:",
        error,
      });
    }
  }

  async function deleteCities(id, token) {
    dispatch({ type: "loading" });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      await axios.delete(`${API_BASE_URL}/cities/${id}`, config);

      dispatch({ type: "cities/deleted", payload: id });
    } catch (error) {
      alert("Error loading the data");
      dispatch({
        type: "rejected",
        payload: "Error loading the data:",
        error,
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCitiyData,
        createCity,
        deleteCities,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("CityContext used outside the city provider");
  }
  return context;
}

export { CityProvider, useCities };

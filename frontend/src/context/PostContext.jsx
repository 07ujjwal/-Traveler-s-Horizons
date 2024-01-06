import { createContext, useContext, useReducer } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const PostContext = createContext();

const initialState = {
  posts: [],
  isLoading: true,
  currentPost: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "posts/Loaded":
      return {
        ...state,
        isLoading: false,
        posts: action.payload.data,
      };

    case "post/Loaded":
      return {
        ...state,
        isLoading: false,
        currentPost: action.payload,
      };

    case "posts/Created":
      return {
        ...state,
        isLoading: false,
        posts: [...state.posts, action.payload],
        currentPost: action.payload,
      };

    case "update/search":
      return {
        ...state,
        isLoading: false,
        searchKeyword: action.payload,
      };

    case "posts/deleted":
      return {
        ...state,
        isLoading: false,
        posts: state.posts.filter((post) => post.slug !== action.payload),
      };
    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}

function PostProvider({ children }) {
  const { user } = useAuth();

  const [{ posts, isLoading, currentPost }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function createPost(newPost, token) {
    dispatch({ type: "loading" });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post("/api/posts", newPost, config);

      dispatch({ type: "posts/Created", payload: res.data });
    } catch (error) {
      alert("Error sending the data");
      dispatch({
        type: "rejected",
        payload: "Error loading the data:",
        error,
      });
    }
  }

  async function deletePost(slug, token) {
    dispatch({ type: "loading" });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      await axios.delete(`/api/posts/${slug}`, config);

      dispatch({ type: "cities/deleted", payload: slug });
    } catch (error) {
      alert("Error loading the data");
      dispatch({
        type: "rejected",
        payload: "Error loading the data:",
        error,
      });
    }
  }

  async function getAllPosts(searchKeyword = "", page = 1, limit = 10) {
    dispatch({ type: "loading" });
    try {
      const { data, headers } = await axios.get(
        `/api/posts?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
      );
      dispatch({
        type: "posts/Loaded",
        payload: { data: data, headers: headers },
      });
    } catch (error) {
      alert("Error loading the data");
      dispatch({
        type: "rejected",
        payload: "Error loading the data:",
        error,
      });
    }
  }

  async function getSinglePost(slug) {
    if (!currentPost || slug === currentPost.slug) return;

    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`/api/posts/${slug}`);

      dispatch({
        type: "post/Loaded",
        payload: data,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Post not found");
      } else {
        console.log("Error loading the data:", error.message);
      }

      dispatch({
        type: "rejected",
        payload: "Error loading the data",
        error,
      });
    }
  }

  return (
    <PostContext.Provider
      value={{
        dispatch,
        posts,
        isLoading,
        currentPost,
        createPost,
        deletePost,
        getAllPosts,
        getSinglePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("PostContext used outside the post provider");
  }
  return context;
}

export { PostProvider, usePosts };

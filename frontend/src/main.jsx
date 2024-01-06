import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CityProvider } from "./context/CitiesContext.jsx";
import { PostProvider } from "./context/PostContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <PostProvider>
      <CityProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CityProvider>
    </PostProvider>
  </AuthProvider>
);

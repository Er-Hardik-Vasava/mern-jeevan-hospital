import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; 
import "./index.css";

const AppWrapper = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

// Render the AppWrapper into the root element
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { API_URL } from "./utils/API";

const root = ReactDOM.createRoot(document.getElementById("root"));

const BackendStatusIndicator = () => {
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    // Function to check backend status
    const checkBackendStatus = async () => {
      try {
        // Make a request to your backend to check its status
        const response = await fetch(`${API_URL}/api`);

        if (response.ok) {
          setBackendReady(true);
        }
      } catch (error) {
        console.error("Error checking backend status:", error);
      }
    };

    checkBackendStatus();
  }, []);

  return (
    <React.StrictMode>
      {backendReady ? (
        <BrowserRouter>
          <App />
        </BrowserRouter>
      ) : (
        <div className="flex h-screen flex-col items-center justify-center">
          <h3 className="text-center text-2xl font-semibold">Loading backend server, please wait...</h3>
          <p className="text-sm opacity-60">Page will reload automatically after server loads</p>
        </div>
      )}
    </React.StrictMode>
  );
};

root.render(<BackendStatusIndicator />);

import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { baseURL } from "./utils/variables";
import "./index.css"; // Importing the CSS file
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Correct Auth0Provider setup
const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-q7f3hrr85f78wcog.uk.auth0.com" // Replace with your Auth0 domain
    clientId="11kRdcGvEoASBMTId2Xti72salAzXUlM" // Replace with your Auth0 client ID
    authorizationParams={{
      redirect_uri: `${baseURL}/login`,
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);

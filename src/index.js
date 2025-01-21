import React from "react";
import { createRoot } from "react-dom/client";
import { baseURL } from "./utils/variables";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css"; // Importing the CSS file
import App from "./App";
import { BrowserRouter } from "react-router-dom";
const root = createRoot(document.getElementById("root"));
// Render the app within BrowserRouter to enable routing
root.render(
  <Auth0Provider
    domain="dev-q7f3hrr85f78wcog.uk.auth0.com"
    clientId="11kRdcGvEoASBMTId2Xti72salAzXUlM"
    authorizationParams={{
      redirect_uri: `${baseURL}/login`,
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);

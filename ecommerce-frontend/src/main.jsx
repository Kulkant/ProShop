import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import { store } from "./app/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PayPalScriptProvider options={{ "client-id": "test" }}>
      <Provider store={store}>
        <App />
      </Provider>
    </PayPalScriptProvider>
  </StrictMode>
);

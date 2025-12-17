// client/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./app/routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

// assuming these providers are default exports:
import SocketProvider from "./app/providers/SocketProvider.jsx";
import UIProvider from "./app/providers/UIProvider.jsx";

import "./styles/tailwind.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <UIProvider>
            <AppRoutes />
          </UIProvider>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter> */}
    <BrowserRouter>
      <AuthProvider>
        <UIProvider>
          <SocketProvider>
            <AppRoutes />
          </SocketProvider>
        </UIProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

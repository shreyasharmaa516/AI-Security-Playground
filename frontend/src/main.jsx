import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";

import App from "./App";

import { DashboardProvider } from "./context/DashboardContext";
import { HistoryProvider } from "./context/HistoryContext";
import { SearchProvider } from "./context/SearchContext/SearchContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DashboardProvider>

      <HistoryProvider>

        <SearchProvider>

          <App />

        </SearchProvider>

      </HistoryProvider>

    </DashboardProvider>
  </StrictMode>
);
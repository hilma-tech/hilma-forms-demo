import "./config";

import React from "react";
import ReactDOM from "react-dom/client";

import { wrap } from "@hilma/tools";
import { AlertProvider } from "@hilma/forms";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material";

import { I18nProvider } from "./common/i18n";
import App from "./App";

const client = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#481178"
    }
  },
  typography: {
    fontFamily: ["'Heebo'", "sans-serif"].join(","),
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  wrap(
    React.StrictMode,
    [ThemeProvider, { theme }],
    [QueryClientProvider, { client }],
    AlertProvider,
    BrowserRouter,
    I18nProvider,
  )(<App />),
);

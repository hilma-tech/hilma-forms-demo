import "./config";

import React from "react";
import ReactDOM from "react-dom/client";

import { wrap } from "@hilma/tools";
import { AlertProvider } from "@hilma/forms";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { I18nProvider } from "./common/i18n";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  wrap(
    React.StrictMode,
    [QueryClientProvider, { client }],
    AlertProvider,
    BrowserRouter,
    I18nProvider,
  )(<App />),
);

import "./config";

import React from "react";
import ReactDOM from "react-dom/client";

import { wrap } from "@hilma/tools";
import { AlertProvider } from "@hilma/forms";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { I18nProvider } from "./common/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
    wrap(React.StrictMode, AlertProvider, BrowserRouter, I18nProvider)(App),
);

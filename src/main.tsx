import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./services/content/i18n.js";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
	<React.StrictMode>
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
);

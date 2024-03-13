import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./routes/_layout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);

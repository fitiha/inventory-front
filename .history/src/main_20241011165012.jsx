import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";  // Ensure BrowserRouter is imported
import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

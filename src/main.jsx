import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const root = document.getElementById("root");

// Prerendered pages already contain markup: hydrate it. Otherwise (dev, /admin) render fresh.
if (root.firstElementChild) {
  ReactDOM.hydrateRoot(root, <App />);
} else {
  ReactDOM.createRoot(root).render(<App />);
}

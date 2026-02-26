import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import Navbar from "./components/layout/Navbar";
import AboutUs from "./pages/Aboutus";
import ScrollToHash from "./components/ScrollToHash";

import "./styles/globals.css";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";

  const savedTheme = localStorage.getItem("dl-theme");

  if (savedTheme) return savedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export default function App() {

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dl-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  return (

    <BrowserRouter>

      {/* NAVBAR GLOBAL */}
      <Navbar />

      <ScrollToHash />

      <Routes>

        <Route
          path="/"
          element={<Home theme={theme} onToggleTheme={toggleTheme} />}
        />

        <Route
          path="/services"
          element={<ServicesPage />}
        />

        <Route
          path="/about"
          element={<AboutUs />} />

      </Routes>

    </BrowserRouter>

  );
}
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import Navbar from "./components/layout/Navbar";
import AboutUs from "./pages/Aboutus";
import ScrollToHash from "./components/ScrollToHash";
import PageTransition from "./components/animation/PageTransition";

import "./styles/globals.css";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";

  const savedTheme = localStorage.getItem("dl-theme");

  if (savedTheme) return savedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

function AppRoutes({ theme, toggleTheme }) {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <ScrollToHash />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home theme={theme} onToggleTheme={toggleTheme} />
              </PageTransition>
            }
          />
          <Route
            path="/services"
            element={
              <PageTransition>
                <ServicesPage />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition>
                <AboutUs />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

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
      <AppRoutes theme={theme} toggleTheme={toggleTheme} />
    </BrowserRouter>
  );
}

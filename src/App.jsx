import { useEffect, useState } from "react";
import Home from "./pages/Home";
import "./styles/globals.css";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";
  const savedTheme = window.localStorage.getItem("dl-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("dl-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return <Home theme={theme} onToggleTheme={toggleTheme} />;
}

export default App;

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import AboutUs from "./pages/Aboutus";
import AdminPanel from "./pages/admin/AdminPanel";
import ScrollToHash from "./components/ScrollToHash";
import PageTransition from "./components/animation/PageTransition";

import "./styles/globals.css";
import "./styles/site.css";

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToHash />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutUs /></PageTransition>} />
          <Route path="/admin" element={<PageTransition><AdminPanel /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

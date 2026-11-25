import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import AboutUs from "./pages/Aboutus";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/admin/AdminPanel";
import ScrollToHash from "./components/ScrollToHash";
import RouteMeta from "./components/RouteMeta";
import PageTransition from "./components/animation/PageTransition";

import "./styles/globals.css";
import "./styles/site.css";

export function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToHash />
      <RouteMeta />
      {/* initial={false}: the first page is already in the prerendered HTML, so it must not start hidden. */}
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutUs /></PageTransition>} />
          <Route path="/admin" element={<PageTransition><AdminPanel /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
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

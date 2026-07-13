import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiBriefcase, FiUser, FiMail } from "react-icons/fi";
import logo from "../../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const [isCompact, setIsCompact] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsCompact(window.scrollY > 28);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: <FiHome /> },
    { name: "Services", path: "/services", icon: <FiBriefcase /> },
    { name: "About", path: "/about", icon: <FiUser /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="navbar-wrap fixed inset-x-0 top-0 z-50 pt-4"
    >
      <div className="section-shell">
        <div
          className={`navbar-shell flex items-center justify-between px-4 ${
            isCompact ? "is-compact py-2.5" : "py-3.5"
          }`}
        >
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Digital Lifterz" className="navbar-logo-img" />
            <span className="navbar-logo-text text-base sm:text-lg">Digital Lifterz</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`navbar-link ${isActive(link.path) ? "is-active" : ""}`}
              >
                {link.icon}
                {link.name}
                {isActive(link.path) && (
                  <motion.div layoutId="activeTab" className="navbar-link-indicator" />
                )}
              </Link>
            ))}

            <a href="/#contact" className="navbar-contact-btn">
              <FiMail />
              Contact
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <button className="navbar-mobile-toggle md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="navbar-mobile-panel md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`navbar-mobile-link ${isActive(link.path) ? "is-active" : ""}`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}

                <Link
                  to="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="navbar-mobile-cta"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
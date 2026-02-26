import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";

export default function Navbar({ theme, onToggleTheme }) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 28);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 pt-4"
    >
      <div className="section-shell">
        <div
          className={`surface-card flex items-center justify-between px-4 sm:px-6 transition-all duration-300 ${
            isCompact ? "py-2.5" : "py-3.5"
          }`}
        >
          <a href="#" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Digital Lifterz"
              className="h-9 w-auto drop-shadow-[0_0_10px_rgba(0,194,168,0.55)]"
            />
            <span className="gradient-text text-base font-semibold sm:text-lg">
              Digital Lifterz
            </span>
          </a>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="#services"
              className="text-sm text-slate-200/90 transition-colors duration-300 hover:text-[#00c2a8] sm:text-base"
            >
              Services
            </a>

            <motion.button
              type="button"
              onClick={onToggleTheme}
              whileTap={{ scale: 0.94 }}
              className="surface-card relative flex h-10 w-20 items-center px-1"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <motion.span
                className="absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#00c2a8] to-[#1f8fff]"
                animate={{ x: theme === "dark" ? 0 : 40, rotate: theme === "dark" ? 0 : 180 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              />
              <span className="relative z-10 flex w-full justify-between px-1 text-[10px] font-bold tracking-wide text-[#04253a]">
                <span>D</span>
                <span>L</span>
              </span>
            </motion.button>

            <a
              href="#contact"
              className="btn-primary btn-animated rounded-lg px-4 py-2 text-sm font-semibold shadow-lg shadow-[#00c2a8]/20 transition hover:-translate-y-0.5 sm:text-base"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

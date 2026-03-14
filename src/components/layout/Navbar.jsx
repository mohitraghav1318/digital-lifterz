import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiBriefcase, FiUser, FiMail } from "react-icons/fi";
import logo from "../../assets/logo.png";

export default function Navbar() {

  const [isCompact, setIsCompact] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  /* Detect scroll */
  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 28);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  /* Nav links config */
  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <FiHome />
    },
    {
      name: "Services",
      path: "/services",
      icon: <FiBriefcase />
    },
    {
      name: "About",
      path: "/about",
      icon: <FiUser />
    }
  ];


  /* Active check */
  const isActive = (path) => location.pathname === path;


  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-50 pt-4"
    >
      <div className="section-shell">

        <div className={`surface-card navbar-shell flex items-center justify-between px-4 ${isCompact ? "py-2.5" : "py-3.5"}`}>

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">

            <img
              src={logo}
              alt="Digital Lifterz"
              className="h-9 w-auto rounded-lg"
            />

            <span className="gradient-text font-semibold text-base sm:text-lg">
              Digital Lifterz
            </span>

          </Link>


          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-2">

            {navLinks.map(link => (

              <Link
                key={link.name}
                to={link.path}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300

                ${isActive(link.path)
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900"}
                `}
              >

                {link.icon}

                {link.name}

                {/* Active indicator */}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 -z-10 rounded-lg border border-slate-300 bg-slate-100"
                  />
                )}

              </Link>

            ))}


            {/* CONTACT BUTTON */}
            <a
              href="/#contact"
              className="btn-primary btn-animated flex items-center gap-2 rounded-lg px-4 py-2 font-semibold ml-2"
            >
              <FiMail />
              Contact
            </a>

          </div>



          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden rounded-lg border border-slate-300 bg-white p-2 text-xl text-slate-700"
            onClick={() => setIsOpen(!isOpen)}
          >
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
              className="surface-card mt-2 p-4 md:hidden"
            >

              <div className="flex flex-col gap-2">

                {navLinks.map(link => (

                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg

                    ${isActive(link.path)
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600"}
                    `}
                  >

                    {link.icon}
                    {link.name}

                  </Link>

                ))}


                <Link
                  to="/#contact"
                  className="btn-primary btn-animated navbar-cta rounded-lg px-4 py-2 text-sm font-semibold sm:text-base"
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
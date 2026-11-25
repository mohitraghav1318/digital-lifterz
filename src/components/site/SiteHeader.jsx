import { Link, NavLink } from "react-router-dom";
import logoMark from "../../assets/logo-mark.png";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
];

export default function SiteHeader({ overlay = false }) {
  return (
    <header className={`nav fade${overlay ? " nav-abs" : ""}`} style={{ "--d": ".1s" }}>
      <div className="wrap nav-inner">
        <Link to="/" className="brand" aria-label="Digital Lifterz home">
          <img src={logoMark} alt="" />
          <span>Digital Lifterz</span>
        </Link>

        <nav className="navlinks" aria-label="Main">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `nl${isActive ? " on" : ""}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link className="btn btn-g btn-sm" to="/#contact">
          Let's talk
        </Link>
      </div>
    </header>
  );
}

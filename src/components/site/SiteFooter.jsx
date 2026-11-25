import { Link } from "react-router-dom";
import logoMark from "../../assets/logo-mark.png";

export const INSTAGRAM_URL = "https://instagram.com/digitallifterz";
export const EMAIL = "digitallifterz@gmail.com";

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <Link to="/" className="brand" style={{ color: "var(--ink)" }}>
            <img src={logoMark} alt="" />
            <span>Digital Lifterz</span>
          </Link>
          <nav aria-label="Footer" className="foot-nav">
            <div>
              <Link to="/">Home</Link>
              <Link to="/services">Services</Link>
              <Link to="/about">About</Link>
            </div>
            <div>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href={`mailto:${EMAIL}`}>Email</a>
            </div>
          </nav>
        </div>
        <div className="foot-big" aria-hidden="true">
          Reach → Revenue
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Digital Lifterz</span>
          <span>Turning reach to revenue</span>
        </div>
      </div>
    </footer>
  );
}

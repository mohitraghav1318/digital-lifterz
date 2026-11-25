import { Link } from "react-router-dom";
import SiteHeader from "../components/site/SiteHeader";
import SiteFooter from "../components/site/SiteFooter";

export default function NotFound() {
  return (
    <div className="dl">
      <SiteHeader />
      <section className="sec">
        <div className="wrap">
          <p className="muted sora" style={{ fontSize: 18 }}>404</p>
          <h1 className="h-sec" style={{ marginTop: 16 }}>This page doesn't exist.</h1>
          <p className="lead" style={{ marginTop: 24 }}>
            The link may be broken or the page may have moved.
          </p>
          <div className="btn-row" style={{ marginTop: 36 }}>
            <Link className="btn btn-p" to="/">Back to home</Link>
            <Link className="btn btn-g" to="/services">See services</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

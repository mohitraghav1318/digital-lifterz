import { useRef } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/site/SiteHeader";
import SiteFooter from "../components/site/SiteFooter";
import { ArrowUpRight } from "../components/site/Icons";
import useReveal from "../hooks/useReveal";
import logoMark from "../assets/logo-mark.png";

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const pillars = [
  {
    title: "Brand positioning",
    copy: "A clear, strong brand presence that builds trust and authority in your market.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3 4 7v5c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V7Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Social media growth",
    copy: "Strategic content and growth systems that increase reach, engagement and conversions.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h0" />
      </svg>
    ),
  },
  {
    title: "Performance marketing",
    copy: "Campaigns focused on the right audience and on turning attention into real business results.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 17 9 11l4 4 8-8" />
        <path d="M15 7h6v6" />
      </svg>
    ),
  },
];

const reasons = [
  "A strong focus on brand positioning",
  "Systems designed for real business impact",
  "Modern, scalable digital solutions",
  "Audience-focused content strategy",
  "Focused on turning reach into revenue",
];

const vision = [
  "Growth happens when strategy, content",
  "and positioning work together. We help",
  "businesses unlock their full digital",
  "potential — and keep the opportunities",
];

export default function AboutUs() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <div className="dl" ref={ref}>
      <section className="about-hero">
        <SiteHeader />

        <div className="heromark" aria-hidden="true">
          <div className="dl-ring" style={{ inset: 0, "--d": ".2s" }} />
          <div className="dl-ring" style={{ inset: 70, "--d": ".35s" }} />
          <div className="dl-ring" style={{ inset: 140, "--d": ".5s" }} />
          <img className="lift" src={logoMark} alt="" />
        </div>

        <div
          className="wrap"
          style={{
            position: "relative",
            zIndex: 2,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          <h1 className="h-hero" style={{ fontSize: "clamp(46px, 7vw, 108px)", maxWidth: 820 }}>
            <span className="hw">
              <span style={{ "--d": ".25s" }}>Built for modern,</span>
            </span>
            <span className="hw">
              <span style={{ "--d": ".4s" }}>measurable growth.</span>
            </span>
          </h1>
          <p className="lead fade" style={{ marginTop: 34, maxWidth: 560, "--d": ".75s" }}>
            Digital Lifterz helps brands turn online reach into real business growth — building
            a strategic presence, stronger brand authority and systems that convert attention
            into revenue.
          </p>
        </div>
      </section>

      {/* VISION */}
      <section style={{ padding: "clamp(88px, 10vw, 130px) 0 clamp(96px, 11vw, 140px)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap split" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,2.4fr)", alignItems: "start" }}>
          <h2 className="tr muted" style={{ fontSize: 22, fontWeight: 500 }}>
            Our vision
          </h2>
          <p className="statement" style={{ fontSize: "clamp(24px, 3.2vw, 46px)", lineHeight: 1.3 }}>
            {vision.map((line) => (
              <span className="lit" key={line}>
                {line}
              </span>
            ))}
            <span className="lit accent">coming in.</span>
          </p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section style={{ paddingBottom: "clamp(96px, 11vw, 140px)" }}>
        <div className="wrap">
          <h2 className="h-sec tr" style={{ marginBottom: 56 }}>
            What we do
          </h2>
          <div className="pgrid">
            {pillars.map((p) => (
              <div className="pillar rv" key={p.title}>
                <div className="ic">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="sec-alt" style={{ padding: "clamp(88px, 10vw, 130px) 0" }}>
        <div className="wrap split" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,2fr)", alignItems: "start" }}>
          <h2 className="tr" style={{ fontSize: "clamp(36px, 4.2vw, 60px)", lineHeight: 1.06, letterSpacing: "-0.03em" }}>
            Why Digital Lifterz
          </h2>
          <div className="why-list">
            {reasons.map((r, i) => (
              <div className="why rv" key={r}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "clamp(110px, 12vw, 160px) 0 clamp(100px, 11vw, 150px)", textAlign: "center" }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2
            className="tr"
            style={{ fontSize: "clamp(40px, 5.6vw, 84px)", lineHeight: 1.02, letterSpacing: "-0.035em", maxWidth: 960 }}
          >
            Ready to turn your reach into revenue?
          </h2>
          <div className="btn-row rv" style={{ justifyContent: "center", marginTop: 44, width: "100%" }}>
            <Link className="btn btn-p" to="/#contact">
              Start your growth journey <ArrowUpRight />
            </Link>
            <Link className="btn btn-g" to="/services">
              See packages
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

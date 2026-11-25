import { useRef } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/site/SiteHeader";
import SiteFooter, { EMAIL, INSTAGRAM_URL } from "../components/site/SiteFooter";
import { ArrowUpRight, Check, Sparkle } from "../components/site/Icons";
import useReveal from "../hooks/useReveal";
import logoMark from "../assets/logo-mark.png";

const CYAN = "#62D2EC";
const PINK = "#EF5F9E";
const ORANGE = "#F5A55B";

const dots = [
  [CYAN, "8s", "0s"],
  [PINK, "10s", "2.5s"],
  [ORANGE, "7s", "4s"],
  [CYAN, "9s", "1.2s"],
  [PINK, "6.5s", "3.4s"],
  [CYAN, "11s", ".6s"],
  [ORANGE, "8.5s", "5s"],
  [CYAN, "7.5s", "2s"],
];

const bars = [
  [34, 350, 90],
  [84, 335, 105],
  [134, 318, 122],
  [184, 296, 144],
  [234, 270, 170],
  [284, 240, 200],
  [334, 200, 240],
  [384, 158, 282],
  [434, 112, 328],
  [484, 70, 370],
];

const marquee = [
  ["Healthcare", CYAN],
  ["Automotive", PINK],
  ["Restaurants & cafés", ORANGE],
  ["Fashion", CYAN],
  ["Gyms & fitness", PINK],
  ["Branding", ORANGE],
  ["Reels & content", CYAN],
  ["Google My Business", PINK],
];

const stats = [
  ["50+", "Campaign launches supported"],
  ["4.8/5", "Average client satisfaction"],
  ["3x", "Typical reach uplift in 90 days"],
];

const industries = [
  {
    id: "healthcare",
    name: "Healthcare",
    copy: "Build trust online and reach the right patients with branding, content and performance marketing for clinics and hospitals.",
  },
  {
    id: "automotive",
    name: "Automotive",
    copy: "Visibility and qualified leads for dealerships, garages and modification brands — from online interest to real enquiries.",
  },
  {
    id: "restaurant",
    name: "Restaurants",
    copy: "Brand identity, social media and platform optimisation that turn online attention into steady footfall for cafés and food brands.",
  },
  {
    id: "dummy",
    name: "Fashion",
    copy: "Content and social growth for labels and boutiques that want their collections seen, saved and sold.",
  },
  {
    id: "dummy2",
    name: "Pumping Growth Arena",
    copy: "Posts, reels and local search for gyms and fitness studios ready to fill more memberships.",
  },
];

const OFF = "rgba(243,242,238,0.14)";
const plans = [
  {
    name: "Basic Boost",
    line: "Get the foundations right and start showing up.",
    bars: [ORANGE, OFF, OFF],
    items: ["Logo, menu and tagline design", "10 social media posts and 7 reels", "Instagram & Facebook posting"],
  },
  {
    name: "Creative Growth",
    line: "A steady monthly rhythm that keeps you top of mind.",
    bars: [ORANGE, PINK, OFF],
    items: ["Everything in Basic Boost", "15 posts and 10 reels every month", "Trend-based content and GMB handling"],
  },
  {
    name: "Creative Pro Max",
    line: "Full-scale growth with a dedicated manager.",
    bars: [ORANGE, PINK, CYAN],
    items: ["25 advanced posts and 15 reels a month", "YouTube and advanced GMB handling", "Dedicated social media manager"],
  },
];

export default function Home() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <div className="dl" ref={ref}>
      {/* HERO */}
      <section className="hero">
        <div className="lift-field" aria-hidden="true">
          {dots.map(([c, t, d], i) => (
            <div key={i}>
              <span className="dl-dot" style={{ background: c, "--t": t, "--d": d }} />
            </div>
          ))}
        </div>

        <SiteHeader overlay />

        <div className="wrap hero-grid">
          <div>
            <h1 className="h-hero">
              <span className="hw">
                <span style={{ "--d": ".25s" }}>Turning reach</span>
              </span>
              <span className="hw">
                <span style={{ "--d": ".4s" }}>
                  into <span className="uline">revenue.</span>
                </span>
              </span>
            </h1>
            <p className="lead fade" style={{ marginTop: 32, "--d": ".75s" }}>
              Clear strategy, better design and campaigns built to convert attention into
              qualified leads for growing businesses.
            </p>
            <div className="btn-row fade" style={{ marginTop: 40, "--d": ".9s" }}>
              <Link className="btn btn-p" to="/services">
                Explore services <ArrowUpRight />
              </Link>
              <a className="btn btn-g" href="#contact">
                Start a conversation
              </a>
            </div>
          </div>

          <div className="chart" role="img" aria-label="Growth line rising from reach to leads to revenue">
            <svg viewBox="0 0 560 440" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="dl-lg" x1="20" y1="0" x2="540" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor={ORANGE} />
                  <stop offset=".45" stopColor={PINK} />
                  <stop offset="1" stopColor={CYAN} />
                </linearGradient>
              </defs>
              <g stroke="rgba(243,242,238,0.06)">
                <path d="M0 110H560M0 220H560M0 330H560" />
              </g>
              <g fill="rgba(243,242,238,0.055)">
                {bars.map(([x, y, h], i) => (
                  <rect
                    key={x}
                    className="dl-bar"
                    x={x}
                    y={y}
                    width="30"
                    height={h}
                    rx="4"
                    style={{ "--d": `${0.5 + i * 0.08}s` }}
                  />
                ))}
              </g>
              <path
                className="draw"
                d="M20 372 C 110 366, 150 330, 214 318 S 316 268, 362 214 S 446 104, 528 52"
                stroke="url(#dl-lg)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <circle className="pulse-dot" cx="528" cy="52" r="9" fill={CYAN} />
              <circle className="pop" cx="528" cy="52" r="7" fill={CYAN} style={{ "--d": "2.9s" }} />
            </svg>
            <div className="chip pop" style={{ left: "2%", top: "70%", "--d": "1.2s" }}>
              <i style={{ background: ORANGE }} />
              Reach
            </div>
            <div className="chip pop" style={{ left: "40%", top: "50%", "--d": "1.9s" }}>
              <i style={{ background: PINK }} />
              Qualified leads
            </div>
            <div className="bob" style={{ position: "absolute", right: "-2%", top: "-4%" }}>
              <div className="chip pop" style={{ position: "static", "--d": "2.7s" }}>
                <i style={{ background: CYAN }} />
                Revenue
              </div>
            </div>
          </div>
        </div>

        <div className="mq">
          <div className="mq-track" aria-hidden="true">
            {[...marquee, ...marquee].map(([label, color], i) => (
              <div className="mq-item" key={i}>
                {label}
                <Sparkle color={color} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATEMENT + STATS */}
      <section className="sec" style={{ paddingBottom: 120 }}>
        <div className="wrap">
          <p className="statement" style={{ maxWidth: 1080 }}>
            <span className="lit">We build growth systems for ambitious</span>
            <span className="lit">businesses — content, positioning and</span>
            <span className="lit">
              campaigns that turn attention into <span className="accent">customers.</span>
            </span>
          </p>
          <div className="stats">
            {stats.map(([v, l]) => (
              <div className="stat rv" key={l}>
                <div className="stat-v">{v}</div>
                <p>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="services" className="sec" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="split sec-head">
            <h2 className="h-sec tr">Marketing systems built for your industry.</h2>
            <p className="body-lg rv" style={{ maxWidth: 460 }}>
              Pick the plan that matches your stage today, then scale with confidence as the
              results come in.
            </p>
          </div>

          <div className="ind-list">
            {industries.map((ind, i) => (
              <Link className="ind-row rv" to={`/services?industry=${ind.id}`} key={ind.id}>
                <span className="ind-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{ind.name}</h3>
                <p>{ind.copy}</p>
                <span className="ind-ar">
                  <ArrowUpRight size={18} strokeWidth={1.6} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES TEASER */}
      <section className="sec sec-alt" style={{ padding: "130px 0" }}>
        <div className="wrap">
          <div className="split sec-head">
            <h2 className="h-sec tr">Three plans. One clear path up.</h2>
            <div className="rv">
              <Link className="btn btn-p" to="/services">
                View detailed packages <ArrowUpRight />
              </Link>
            </div>
          </div>
          <div className="pkgrid">
            {plans.map((p) => (
              <div className="pk rv" key={p.name}>
                <div className="pk-bars" aria-hidden="true">
                  {p.bars.map((c, i) => (
                    <span key={i} style={{ background: c }} />
                  ))}
                </div>
                <h3>{p.name}</h3>
                <p className="pk-line">{p.line}</p>
                <ul>
                  {p.items.map((it) => (
                    <li key={it}>
                      <Check />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="sec" style={{ paddingTop: 150 }}>
        <div className="wrap contact-grid">
          <div>
            <h2
              className="tr"
              style={{ fontSize: "clamp(40px, 5.2vw, 76px)", lineHeight: 1.02, letterSpacing: "-0.035em" }}
            >
              Let's build your next growth chapter.
            </h2>
            <p className="body-lg rv" style={{ marginTop: 28, maxWidth: 480 }}>
              Share your goals and we'll recommend a practical roadmap. Fast responses, clear
              next steps, no fluff.
            </p>
            <div className="clinks rv">
              <a className="clink" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <span className="lbl">Instagram</span>
                <span className="val">
                  <span className="v">@digital_lifterz</span>
                  <ArrowUpRight />
                </span>
              </a>
              <a className="clink" href={`mailto:${EMAIL}`}>
                <span className="lbl">Email</span>
                <span className="val">
                  <span className="v">{EMAIL}</span>
                  <ArrowUpRight />
                </span>
              </a>
            </div>
          </div>

          <div className="cta-card rv">
            <img className="mark" src={logoMark} alt="" aria-hidden="true" />
            <h3 style={{ fontSize: 32, letterSpacing: "-0.02em", lineHeight: 1.15, maxWidth: 340 }}>
              Get a free strategy call
            </h3>
            <p className="muted" style={{ marginTop: 18, fontSize: 16, lineHeight: 1.65, maxWidth: 400 }}>
              We review your current digital presence and share a focused action plan for
              content, positioning and lead generation.
            </p>
            <a
              className="btn btn-p"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              style={{ marginTop: 36, position: "relative" }}
            >
              Book consultation <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

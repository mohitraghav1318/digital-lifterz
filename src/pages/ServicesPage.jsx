import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SiteHeader from "../components/site/SiteHeader";
import SiteFooter, { EMAIL, INSTAGRAM_URL } from "../components/site/SiteFooter";
import { ArrowUpRight, Check } from "../components/site/Icons";
import useReveal from "../hooks/useReveal";
import { fetchServices, getFallbackServices } from "../lib/servicesApi";

const CYAN = "#62D2EC";
const PINK = "#EF5F9E";
const ORANGE = "#F5A55B";
const OFF = "rgba(243,242,238,0.14)";

// Short tab labels for known category ids; anything else falls back to its title.
const TAB_LABELS = {
  healthcare: "Healthcare",
  automotive: "Automotive",
  restaurant: "Restaurants",
  dummy: "Fashion",
  dummy2: "Gyms & fitness",
};

const TIERS = [
  { bars: [ORANGE, OFF, OFF], line: "Get the foundations right and start showing up." },
  { bars: [ORANGE, PINK, OFF], line: "A steady monthly rhythm that keeps you top of mind." },
  { bars: [ORANGE, PINK, CYAN], line: "Full-scale growth with a dedicated manager." },
];

const tabLabel = (cat) =>
  TAB_LABELS[cat.id] || cat.title.replace(/\s+Growth\b.*$/i, "").trim() || cat.title;

export default function ServicesPage() {
  const ref = useRef(null);
  const [params, setParams] = useSearchParams();
  const [categories, setCategories] = useState(getFallbackServices().categories);

  useEffect(() => {
    let alive = true;
    fetchServices()
      .then((data) => {
        if (alive && data.categories?.length) setCategories(data.categories);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const requested = params.get("industry");
  const current = categories.find((c) => c.id === requested) || categories[0];

  useReveal(ref, [current?.id]);

  const select = (id) => setParams({ industry: id }, { replace: true, preventScrollReset: true });

  return (
    <div className="dl" ref={ref}>
      <section className="svc-hero">
        <SiteHeader />

        <div className="ticks" aria-hidden="true">
          <span className="tick" style={{ height: 120, background: "rgba(243,242,238,0.07)", "--d": "0s" }} />
          <span className="tick" style={{ height: 170, background: "rgba(243,242,238,0.07)", "--d": ".15s" }} />
          <span className="tick" style={{ height: 210, background: "rgba(245,165,91,0.55)", "--d": ".3s" }} />
          <span className="tick" style={{ height: 250, background: "rgba(239,95,158,0.6)", "--d": ".45s" }} />
          <span className="tick" style={{ height: 300, background: CYAN, "--d": ".6s" }} />
        </div>

        <div className="wrap" style={{ position: "relative", zIndex: 2, paddingTop: "clamp(48px, 9vw, 120px)" }}>
          <h1 className="h-hero" style={{ fontSize: "clamp(46px, 7.4vw, 112px)", maxWidth: 1000 }}>
            <span className="hw">
              <span style={{ "--d": ".2s" }}>Launch the right</span>
            </span>
            <span className="hw">
              <span style={{ "--d": ".35s" }}>growth plan.</span>
            </span>
          </h1>
          <p className="lead fade" style={{ marginTop: 32, maxWidth: 560, "--d": ".7s" }}>
            Every package follows the same Digital Lifterz system, tailored to the audience,
            channels and goals of your industry.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: 140 }}>
        <div className="wrap">
          <div className="tabs fade" role="group" aria-label="Choose your industry" style={{ "--d": ".9s" }}>
            {categories.map((cat) => {
              const on = cat.id === current?.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`tab${on ? " on" : ""}`}
                  aria-pressed={on}
                  onClick={() => select(cat.id)}
                >
                  {tabLabel(cat)}
                </button>
              );
            })}
          </div>

          {current && (
            <div key={current.id} className="swap">
              <div className="split" style={{ alignItems: "start", padding: "56px 0" }}>
                <h2 style={{ fontSize: "clamp(32px, 3.8vw, 54px)", letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                  {current.title}
                </h2>
                <p className="body-lg" style={{ marginTop: 6, lineHeight: 1.7 }}>
                  {current.description}
                </p>
              </div>

              <div className="pkgrid">
                {current.packages.map((pkg, i) => {
                  const tier = TIERS[Math.min(i, TIERS.length - 1)];
                  return (
                    <div className="pk" key={`${pkg.name}-${i}`}>
                      <div className="pk-bars" aria-hidden="true">
                        {tier.bars.map((c, j) => (
                          <span key={j} style={{ background: c }} />
                        ))}
                      </div>
                      <h3>{pkg.name}</h3>
                      <p className="pk-line">{tier.line}</p>
                      <ul>
                        {pkg.features.map((f, j) => (
                          <li key={`${f}-${j}`}>
                            <Check />
                            <span>{f.trim()}</span>
                          </li>
                        ))}
                      </ul>
                      <a className="btn btn-g" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                        Get started <ArrowUpRight />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <p className="muted" style={{ marginTop: 28, fontSize: 15 }}>
            Pricing is shared on a quick call, based on your goals and channels.
          </p>
        </div>
      </section>

      <section className="sec-alt" style={{ padding: "120px 0" }}>
        <div className="wrap split" style={{ gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)" }}>
          <h2 className="tr" style={{ fontSize: "clamp(36px, 4.6vw, 66px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Not sure which plan fits? We'll help you pick.
          </h2>
          <div className="btn-row rv">
            <a className="btn btn-p" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Message on Instagram <ArrowUpRight />
            </a>
            <a className="btn btn-g" href={`mailto:${EMAIL}`}>
              Email us
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

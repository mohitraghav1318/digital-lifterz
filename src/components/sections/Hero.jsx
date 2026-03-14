import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

export default function Hero() {
  const revealGroup = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const revealItem = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const valueProps = [
    {
      value: "50+",
      label: "Campaign launches supported",
    },
    {
      value: "4.8/5",
      label: "Average client satisfaction",
    },
    {
      value: "3x",
      label: "Typical reach uplift in 90 days",
    },
  ];

  return (
    <section className="hero-section relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-20">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <motion.div
          variants={revealGroup}
          initial="hidden"
          animate="show"
          className="z-10"
        >
          <motion.p
            variants={revealItem}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-[0.12em] text-slate-600"
          >
            TURNING REACH TO REVENUE
          </motion.p>

          <motion.h1
            variants={revealItem}
            className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl"
          >
            Build a digital brand that looks premium and performs.
            <span className="block pt-2 text-accent-700">
              Clear strategy. Better design. Measurable growth.
            </span>
          </motion.h1>

          <motion.p
            variants={revealItem}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            We design and execute growth systems for ambitious businesses: content,
            positioning, and performance-focused campaigns that convert attention into
            qualified leads.
          </motion.p>

          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href="#services"
              className="btn-primary rounded-xl px-7 py-3 font-semibold text-center"
            >
              Explore Services
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              className="btn-ghost rounded-xl px-7 py-3 font-semibold text-center"
            >
              Start a Conversation
            </motion.a>
          </motion.div>

          <motion.div
            variants={revealItem}
            className="mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {valueProps.map((item) => (
              <div
                key={item.label}
                className="surface-card p-4"
              >
                <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                <p className="mt-1 text-sm text-slate-600">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative"
        >
          <div className="surface-card p-6 sm:p-7">
            <div className="flex items-center justify-between border-b border-slate-200 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Growth Blueprint
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  90-Day Visibility Plan
                </h3>
              </div>
              <img src={logo} alt="Digital Lifterz" className="h-14 w-14 rounded-xl" />
            </div>

            <div className="grid gap-4 pt-6 sm:grid-cols-2">
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                  Phase 1
                </p>
                <p className="mt-1 font-semibold text-slate-900">Brand Positioning</p>
                <p className="mt-2 text-sm text-slate-600">Clarify your offer, audience, and message.</p>
              </article>

              <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                  Phase 2
                </p>
                <p className="mt-1 font-semibold text-slate-900">Content & Distribution</p>
                <p className="mt-2 text-sm text-slate-600">Build consistent social and paid visibility.</p>
              </article>

              <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                  Phase 3
                </p>
                <p className="mt-1 font-semibold text-slate-900">Conversion Optimization</p>
                <p className="mt-2 text-sm text-slate-600">
                  Convert traffic into leads with improved landing pages, creatives, and offers.
                </p>
              </article>
            </div>

            <div className="mt-6 rounded-xl bg-accent-50 px-4 py-3 text-sm text-accent-800">
              Weekly reporting included with strategy call and actionable next steps.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

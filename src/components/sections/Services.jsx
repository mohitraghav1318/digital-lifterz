import { services } from "../../data/services";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Marketing systems designed for consistent growth
            </h2>
            <p className="mt-3 text-slate-600 sm:text-lg">
              Pick a plan that matches your stage and scale with confidence.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 sm:w-auto"
          >
            View Detailed Packages
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="surface-card flex h-full flex-col p-6"
            >
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-50 text-sm font-bold text-accent-700">
                0{index + 1}
              </div>

              <h3 className="text-2xl font-semibold text-slate-900">
                {service.title}
              </h3>

              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/services"
                className="btn-primary mt-7 rounded-xl py-3 font-semibold text-center"
              >
                Know More
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

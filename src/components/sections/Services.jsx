import { services } from "../../data/services";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-20 sm:py-24">
      <div className="ambient-orb left-[-8%] top-[4%] bg-[#1f8fff]/20 pulse-soft" />
      <div className="ambient-orb bottom-[-14%] right-[-6%] bg-[#ff7e47]/20 pulse-soft" />

      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <h2 className="gradient-text text-4xl font-bold sm:text-5xl">Our Services</h2>
          <p className="mt-4 text-sm text-slate-300/85 sm:text-base">
            Pick the package that matches your growth stage and team bandwidth.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const isFeatured = i === 1;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.48, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.01 }}
                className={`surface-card card-pop group relative flex h-full flex-col p-6 ${isFeatured ? "border-[#00c2a8]/45 shadow-[0_26px_48px_rgba(0,194,168,0.2)]" : ""
                  }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#00c2a8] px-3 py-1 text-xs font-semibold tracking-wide text-[#062335]">
                    Most Popular
                  </div>
                )}

                <h3 className="mb-6 text-2xl font-semibold text-[#d7f7f2]">{service.title}</h3>

                <ul className="space-y-3 text-sm text-slate-300/90">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-[#00c2a8] to-[#1f8fff]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://instagram.com/digitallifterz"
                  className="btn-primary btn-animated mt-8 block rounded-xl py-3 text-center font-semibold"
                >
                  Get Started
                </motion.a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

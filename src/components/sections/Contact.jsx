import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative py-16 sm:py-20 lg:py-24">
      <div className="section-shell grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="surface-card p-6 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Let&apos;s build your next growth chapter
          </h2>
          <p className="mt-4 max-w-xl text-slate-600 sm:text-lg">
            Share your business goals and we will recommend a practical roadmap.
            Fast responses. Clear next steps. No fluff.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <motion.a
              href="https://instagram.com/digitallifterz"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4 }}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300"
            >
              <div className="mb-3 inline-flex rounded-lg bg-accent-100 p-2 text-accent-700">
                <FaInstagram size={18} />
              </div>
              <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Instagram</p>
              <p className="mt-1 font-semibold text-slate-900">@digital_lifterz</p>
            </motion.a>

            <motion.a
              href="mailto:digitallifterz@gmail.com"
              whileHover={{ y: -4 }}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300"
            >
              <div className="mb-3 inline-flex rounded-lg bg-accent-100 p-2 text-accent-700">
                <FaEnvelope size={18} />
              </div>
              <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Email</p>
              <p className="mt-1 font-semibold text-slate-900">digitallifterz@gmail.com</p>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="surface-card flex flex-col justify-between p-6 sm:p-8"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Quick Start
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Get a free strategy call
            </h3>
            <p className="mt-4 text-slate-600">
              We review your current digital presence and share a focused action plan
              for content, positioning, and lead generation.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-600" />
                Personalized recommendations
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-600" />
                Practical 30-60-90 day roadmap
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-600" />
                No-obligation consultation
              </li>
            </ul>
          </div>

          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            href="mailto:digitallifterz@gmail.com"
            className="btn-primary mt-8 inline-flex items-center justify-center rounded-xl px-8 py-3 font-semibold"
          >
            Book Consultation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

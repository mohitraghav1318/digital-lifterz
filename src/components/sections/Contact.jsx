import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-24">
      <div className="ambient-orb right-[-12%] top-[8%] bg-[#1f8fff]/22 pulse-soft" />
      <div className="ambient-orb bottom-[-14%] left-[-10%] bg-[#00c2a8]/22 pulse-soft" />

      <div className="section-shell grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="gradient-text text-4xl font-bold sm:text-5xl">Let&apos;s Work Together</h2>
          <p className="mt-5 max-w-xl text-base text-slate-300/85 sm:text-lg">
            Ready to grow your brand? Reach us on Instagram or email. We reply quickly
            and map a practical growth plan for your business.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <motion.a
              href="https://instagram.com/digitallifterz"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -6, scale: 1.015 }}
              className="surface-card card-pop flex items-center gap-4 p-4"
            >
              <div className="rounded-xl bg-gradient-to-r from-[#ff7e47] to-[#1f8fff] p-3">
                <FaInstagram size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-300/75">Instagram</p>
                <p className="font-semibold">@digital_lifterz</p>
              </div>
            </motion.a>

            <motion.a
              href="mailto:digitallifterz@gmail.com"
              whileHover={{ y: -6, scale: 1.015 }}
              className="surface-card card-pop flex items-center gap-4 p-4"
            >
              <div className="rounded-xl bg-gradient-to-r from-[#00c2a8] to-[#1f8fff] p-3">
                <FaEnvelope size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-300/75">Email</p>
                <p className="font-semibold">DigitalLifterz</p>
              </div>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="surface-card card-pop p-7 text-center sm:p-10"
        >
          <h3 className="text-2xl font-semibold sm:text-3xl">Start Your Next Project</h3>
          <p className="mx-auto mt-4 max-w-md text-slate-300/80">
            Get a high-performing website and social growth engine aligned with your goals.
          </p>
          <motion.a
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="mailto:digitallifterz@gmail.com"
            className="btn-primary btn-animated mt-7 inline-block rounded-xl px-8 py-3 font-semibold shadow-lg shadow-[#1f8fff]/25"
          >
            Contact Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

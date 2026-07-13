import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Contact.css";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  return (
    <section id="contact" className="contact-section py-16 sm:py-20 lg:py-24">
      <div className="contact-glow" />

      <div className="contact-inner section-shell grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="contact-card p-6 sm:p-8"
        >
          <motion.p variants={fadeUp} className="contact-eyebrow">
            Contact
          </motion.p>

          <motion.h2 variants={fadeUp} className="contact-heading-animated">
            Let&apos;s build your next growth chapter
          </motion.h2>

          <motion.p variants={fadeUp} className="contact-subtext">
            Share your business goals and we will recommend a practical roadmap.
            Fast responses. Clear next steps. No fluff.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 grid gap-4 sm:grid-cols-2">
            <motion.a
              href="https://instagram.com/digitallifterz"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="contact-link-card"
            >
              <div className="contact-link-icon">
                <FaInstagram size={18} />
              </div>
              <p className="contact-link-label">Instagram</p>
              <p className="contact-link-value">@digital_lifterz</p>
            </motion.a>

            <motion.a
              href="mailto:digitallifterz@gmail.com"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="contact-link-card"
            >
              <div className="contact-link-icon">
                <FaEnvelope size={18} />
              </div>
              <p className="contact-link-label">Email</p>
              <p className="contact-link-value">digitallifterz@gmail.com</p>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="contact-card flex flex-col justify-between p-6 sm:p-8"
        >
          <div>
            <motion.p variants={fadeUp} className="contact-eyebrow">
              Quick Start
            </motion.p>

            <motion.h3 variants={fadeUp} className="contact-heading-animated mt-3 text-2xl sm:text-3xl">
  Get a free strategy call
</motion.h3>

            <motion.p variants={fadeUp} className="contact-subtext">
              We review your current digital presence and share a focused action plan
              for content, positioning, and lead generation.
            </motion.p>

            <motion.ul variants={fadeUp} className="contact-feature-list">
              <li className="contact-feature-item">
                <span className="contact-feature-dot" />
                Personalized recommendations
              </li>
              <li className="contact-feature-item">
                <span className="contact-feature-dot" />
                Practical 30-60-90 day roadmap
              </li>
              <li className="contact-feature-item">
                <span className="contact-feature-dot" />
                No-obligation consultation
              </li>
            </motion.ul>
          </div>

          <motion.a
            variants={fadeUp}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            href="mailto:digitallifterz@gmail.com"
            className="contact-cta"
          >
            Book Consultation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
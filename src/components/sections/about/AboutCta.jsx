import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AboutCta() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      className="about-cta"
    >
      <motion.h2 variants={item} className="about-heading about-cta-heading">
        Ready to turn your reach into revenue?
      </motion.h2>

      <motion.a
        variants={item}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        href="/#contact"
        className="about-cta-btn"
      >
        Start Your Growth Journey
      </motion.a>
    </motion.section>
  );
}
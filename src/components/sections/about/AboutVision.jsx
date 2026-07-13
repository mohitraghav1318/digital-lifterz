import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function AboutVision() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="about-section is-centered"
    >
      <motion.h2 variants={item} className="about-heading about-section-heading">
        Our Vision
      </motion.h2>

      <motion.p variants={item} className="about-body-text about-vision-text">
        Our vision is to help businesses unlock their full digital potential.
        We believe growth happens when strategy, content, and positioning work
        together. Digital Lifterz focuses on building strong brand presence,
        increasing visibility, and creating growth systems that generate
        consistent business opportunities.
      </motion.p>
    </motion.section>
  );
}
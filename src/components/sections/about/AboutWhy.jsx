import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const POINTS = [
  "Strategic and growth-focused approach",
  "Strong focus on brand positioning",
  "Systems designed for real business impact",
  "Modern and scalable digital solutions",
  "Audience-focused content strategy",
  "Focused on turning reach into revenue",
];

export default function AboutWhy() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="about-section is-centered"
    >
      <motion.h2 variants={item} className="about-heading about-section-heading">
        Why Digital Lifterz
      </motion.h2>

      <div className="about-card-grid">
        {POINTS.map((point) => (
          <motion.div variants={item} key={point} className="about-point-card">
            <span className="about-point-dot" />
            {point}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
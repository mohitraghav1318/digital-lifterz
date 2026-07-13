import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const CARDS = [
  {
    title: "Brand Positioning",
    desc: "We help businesses establish a strong and clear brand presence that builds trust and authority in their market.",
  },
  {
    title: "Social Media Growth",
    desc: "Strategic content and growth systems designed to increase reach, engagement, and audience conversion.",
  },
  {
    title: "Performance-Focused Marketing",
    desc: "Growth strategies focused on attracting the right audience and converting attention into real business results.",
  },
];

export default function AboutWhatWeDo() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="about-section is-centered"
    >
      <motion.h2 variants={item} className="about-heading about-section-heading">
        What We Do
      </motion.h2>

      <div className="about-card-grid">
        {CARDS.map((card) => (
          <motion.div variants={item} key={card.title} className="about-card">
            <h3 className="about-card-title">{card.title}</h3>
            <p className="about-card-desc">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
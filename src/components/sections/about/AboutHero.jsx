import { motion } from "framer-motion";
import logo from "../../../assets/logo.png";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutHero() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="about-hero"
    >
      <motion.img variants={item} src={logo} alt="Digital Lifterz" className="about-hero-logo" />

      <motion.p variants={item} className="about-eyebrow">
        Turning Reach To Revenue
      </motion.p>

      <motion.h1 variants={item} className="about-heading about-hero-title">
        About Digital Lifterz
        <span className="about-heading-accent">Built for modern, measurable growth.</span>
      </motion.h1>

      <motion.p variants={item} className="about-body-text about-hero-sub">
        Digital Lifterz is focused on helping brands transform their online reach
        into real business growth. We build strategic digital presence, strengthen
        brand authority, and create systems that convert audience attention into
        measurable revenue.
      </motion.p>
    </motion.div>
  );
}

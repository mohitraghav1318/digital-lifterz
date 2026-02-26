import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

export default function Hero() {

  const revealGroup = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const revealItem = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const floatingCard = {
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 4.4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const stats = [
    {
      value: "Strategy",
      label: "Planned for conversion",
      tone: "text-[#00c2a8]",
    },
    {
      value: "Design",
      label: "Built to capture attention",
      tone: "text-[#1f8fff]",
    },
    {
      value: "Growth",
      label: "Focused on real results",
      tone: "text-[#ff7e47]",
    },
  ];

  return (
    <section className="relative overflow-hidden px-6 py-20 min-h-screen flex items-center">

      {/* Background glow */}
      <div className="ambient-orb left-[-12%] top-[7%] bg-[#00c2a8]/30 pulse-soft" />
      <div className="ambient-orb right-[-10%] top-[18%] bg-[#ff7e47]/22 pulse-soft" />

      <div className="section-shell grid items-center gap-12 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <motion.div
          variants={revealGroup}
          initial="hidden"
          animate="show"
          className="z-10"
        >

          {/* Tagline */}
          <motion.p
            variants={revealItem}
            className="mb-3 text-sm tracking-[0.25em] text-[#00c2a8] font-semibold"
          >
            TURNING REACH TO REVENUE
          </motion.p>

          {/* Heading */}
          <motion.h1
            variants={revealItem}
            className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
          >
            Transform your digital presence into
            <span className="gradient-text block">
              measurable business growth.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={revealItem}
            className="mt-6 max-w-xl text-base text-slate-300/85 sm:text-lg"
          >
            We help brands attract the right audience, build trust, and convert
            attention into meaningful business outcomes through modern websites,
            strategic design, and performance-focused digital solutions.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-wrap gap-4"
          >

            <motion.a
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#services"
              className="btn-primary btn-animated rounded-xl px-7 py-3 font-semibold shadow-lg shadow-[#00c2a8]/25"
            >
              Explore Services
            </motion.a>

            <motion.a
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="btn-ghost rounded-xl px-7 py-3 font-medium text-slate-100"
            >
              Start a Conversation
            </motion.a>

          </motion.div>

          {/* Stats */}
          <motion.div
            variants={revealItem}
            className="mt-12 grid max-w-xl grid-cols-3 gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="surface-card card-pop px-4 py-4 text-left"
              >
                <h3 className={`text-xl font-bold sm:text-2xl ${stat.tone}`}>
                  {stat.value}
                </h3>

                <p className="mt-1 text-xs text-slate-300/75 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

        </motion.div>



        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="relative z-10 hidden min-h-[430px] items-center justify-center lg:flex"
        >

          {/* LOGO MOVED HERE */}
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={logo}
            alt="Digital Lifterz"
            className="absolute -top-10 right-10 w-20 drop-shadow-[0_0_25px_rgba(0,194,168,0.6)]"
          />

          {/* Main card */}
          <div className="surface-card card-pop relative w-full max-w-[450px] p-6">

            <p className="text-sm uppercase tracking-[0.18em] text-slate-300/75">
              Digital Growth System
            </p>

            <h3 className="mt-3 text-2xl font-semibold">
              Attract. Engage. Convert.
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-300/80">
              Every element is designed to strengthen your brand presence and
              turn audience attention into real business opportunities.
            </p>

          </div>

          {/* Floating cards */}
          <motion.div
            variants={floatingCard}
            animate="animate"
            className="surface-card absolute left-0 top-6 px-4 py-3 text-sm"
          >
            Website Design
          </motion.div>

          <motion.div
            variants={floatingCard}
            animate="animate"
            className="surface-card absolute bottom-8 right-0 px-4 py-3 text-sm"
          >
            Social Media Growth
          </motion.div>

          <motion.div
            variants={floatingCard}
            animate="animate"
            className="surface-card absolute right-8 top-1/3 px-4 py-3 text-sm"
          >
            Brand Identity
          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}

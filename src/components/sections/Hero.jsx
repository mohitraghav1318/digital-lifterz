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

  const floatingLogo = {
    animate: {
      y: [0, -8, 0],
      scale: [1, 1.03, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatingCard = {
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
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
    <section className="relative flex min-h-screen items-start overflow-hidden pb-16 pt-30 sm:pt-32 lg:items-center">

      {/* Background */}
      <div className="ambient-orb left-[-20%] top-[5%] bg-[#00c2a8]/20 pulse-soft" />
      <div className="ambient-orb right-[-20%] top-[20%] bg-[#ff7e47]/20 pulse-soft" />

      <div className="section-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

        {/* LEFT */}
        <motion.div
          variants={revealGroup}
          initial="hidden"
          animate="show"
          className="z-10 text-center lg:text-left"
        >

          {/* MOBILE LOGO */}
          <motion.img
            variants={floatingLogo}
            animate="animate"
            src={logo}
            alt="Digital Lifterz"
            className="
              mx-auto lg:hidden
              w-24 sm:w-28
              mb-6
              rounded-xl
              drop-shadow-[0_0_25px_rgba(0,194,168,0.7)]
            "
          />

          {/* TAGLINE */}
          <motion.p
            variants={revealItem}
            className="mb-3 text-xs sm:text-sm tracking-[0.25em] text-[#00c2a8] font-semibold"
          >
            TURNING REACH TO REVENUE
          </motion.p>

          {/* HEADING */}
          <motion.h1
            variants={revealItem}
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-bold
              leading-tight
              max-w-2xl
              mx-auto
              lg:mx-0
            "
          >
            Transform your digital presence into

            <span className="gradient-text block mt-2">
              measurable business growth.
            </span>

          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            variants={revealItem}
            className="
              mt-5
              text-sm
              sm:text-base
              text-slate-300/90
              max-w-xl
              mx-auto
              lg:mx-0
            "
          >
            We help brands attract the right audience, build trust,
            and convert attention into meaningful business outcomes
            through modern digital solutions.
          </motion.p>


          {/* BUTTONS */}
          <motion.div
            variants={revealItem}
            className="
              mt-8
              flex
              flex-col
              sm:flex-row
              gap-3
              sm:gap-4
              justify-center
              lg:justify-start
            "
          >

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href="#services"
              className="btn-primary btn-animated rounded-xl px-6 py-3 font-semibold text-center"
            >
              Explore Services
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              className="btn-ghost rounded-xl px-6 py-3 font-medium text-center"
            >
              Start a Conversation
            </motion.a>

          </motion.div>


          {/* STATS */}
          <motion.div
            variants={revealItem}
            className="
              mt-10
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-3
              max-w-2xl
              mx-auto
              lg:mx-0
            "
          >

            {stats.map(stat => (

              <div
                key={stat.label}
                className="surface-card p-3 sm:p-4 text-center lg:text-left"
              >

                <h3 className={`font-bold text-lg sm:text-xl ${stat.tone}`}>
                  {stat.value}
                </h3>

                <p className="text-xs text-slate-300/75">
                  {stat.label}
                </p>

              </div>

            ))}

          </motion.div>

        </motion.div>



        {/* RIGHT SIDE (DESKTOP ONLY) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative hidden min-h-[470px] items-center justify-center lg:flex"
        >

          {/* LOGO */}
          <motion.img
            variants={floatingLogo}
            animate="animate"
            src={logo}
            alt="Digital Lifterz"
            className="
              absolute
              -top-14
              right-8
              w-32
              xl:w-40
              rounded-xl
              drop-shadow-[0_0_45px_rgba(0,194,168,0.75)]
            "
          />

          {/* MAIN CARD */}
          <div className="surface-card w-full max-w-[460px] p-7">

            <p className="text-sm text-slate-300/70 uppercase tracking-wider">
              Digital Growth System
            </p>

            <h3 className="text-2xl font-semibold mt-3">
              Attract. Engage. Convert.
            </h3>

            <p className="text-sm text-slate-300 mt-3">
              Every element strengthens your brand and turns attention into business.
            </p>

          </div>

          {/* FLOATING CARDS */}
          <motion.div
            variants={floatingCard}
            animate="animate"
            className="surface-card absolute left-2 top-10 px-4 py-2 text-sm"
          >
            Website Design
          </motion.div>

          <motion.div
            variants={floatingCard}
            animate="animate"
            className="surface-card absolute bottom-8 right-2 px-4 py-2 text-sm"
          >
            Social Media Growth
          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}

import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export default function AboutUs() {

    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        },
    };


    return (

        <main className="relative min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">

            {/* Background glow */}
            <div className="ambient-orb hidden sm:block left-[-10%] top-[10%] bg-[#22d3ee]/20 pulse-soft" />
            <div className="ambient-orb hidden sm:block right-[-10%] bottom-[10%] bg-[#22d3ee]/18 pulse-soft" />


            <div className="section-shell">


                {/* HERO */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="text-center mb-14 sm:mb-20"
                >

                    <motion.img
                        variants={item}
                        src={logo}
                        alt="Digital Lifterz"
                        className="w-16 sm:w-20 mx-auto mb-5 drop-shadow-[0_0_20px_rgba(0,194,168,0.6)] rounded-xl"
                    />

                    <motion.p
                        variants={item}
                        className="text-xs sm:text-sm tracking-[0.25em] text-[#22d3ee] font-semibold mb-3"
                    >
                        TURNING REACH TO REVENUE
                    </motion.p>

                    <motion.h1
                        variants={item}
                        className="gradient-text text-3xl sm:text-5xl font-bold mb-5"
                    >
                        About Digital Lifterz
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-lg"
                    >
                        Digital Lifterz is focused on helping brands transform their online reach
                        into real business growth. We build strategic digital presence, strengthen
                        brand authority, and create systems that convert audience attention into
                        measurable revenue.
                    </motion.p>

                </motion.div>



                {/* OUR VISION */}
                <motion.section
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mb-14 sm:mb-20"
                >

                    <motion.h2
                        variants={item}
                        className="text-2xl sm:text-3xl font-bold mb-5 gradient-text"
                    >
                        Our Vision
                    </motion.h2>

                    <motion.p
                        variants={item}
                        className="text-slate-300 leading-relaxed max-w-3xl text-sm sm:text-base"
                    >
                        Our vision is to help businesses unlock their full digital potential.
                        We believe growth happens when strategy, content, and positioning work
                        together. Digital Lifterz focuses on building strong brand presence,
                        increasing visibility, and creating growth systems that generate
                        consistent business opportunities.
                    </motion.p>

                </motion.section>



                {/* WHAT WE DO */}
                <motion.section
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mb-14 sm:mb-20"
                >

                    <motion.h2
                        variants={item}
                        className="text-2xl sm:text-3xl font-bold mb-8 gradient-text"
                    >
                        What We Do
                    </motion.h2>


                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

                        {[
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
                        ].map((card) => (

                            <motion.div
                                variants={item}
                                key={card.title}
                                className="surface-card p-5 sm:p-6"
                            >

                                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                                    {card.title}
                                </h3>

                                <p className="text-slate-300 text-sm sm:text-base">
                                    {card.desc}
                                </p>

                            </motion.div>

                        ))}

                    </div>

                </motion.section>



                {/* WHY CHOOSE US */}
                <motion.section
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mb-14 sm:mb-20"
                >

                    <motion.h2
                        variants={item}
                        className="text-2xl sm:text-3xl font-bold mb-8 gradient-text"
                    >
                        Why Digital Lifterz
                    </motion.h2>


                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

                        {[
                            "Strategic and growth-focused approach",
                            "Strong focus on brand positioning",
                            "Systems designed for real business impact",
                            "Modern and scalable digital solutions",
                            "Audience-focused content strategy",
                            "Focused on turning reach into revenue",
                        ].map((point) => (

                            <motion.div
                                variants={item}
                                key={point}
                                className="surface-card p-5 text-sm sm:text-base"
                            >
                                {point}
                            </motion.div>

                        ))}

                    </div>

                </motion.section>



                {/* CTA */}
                <motion.section
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-center"
                >

                    <motion.h2
                        variants={item}
                        className="text-xl sm:text-3xl font-bold mb-5"
                    >
                        Ready to turn your reach into revenue?
                    </motion.h2>


                    <motion.a
                        variants={item}
                        whileHover={{ scale: 1.05 }}
                        href="/#contact"
                        className="btn-primary px-6 sm:px-8 py-3 rounded-xl font-semibold text-sm sm:text-base"
                    >
                        Start Your Growth Journey
                    </motion.a>

                </motion.section>


            </div>

        </main>

    );
}
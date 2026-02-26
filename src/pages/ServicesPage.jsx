import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { serviceCategories } from "../data/serviceCategories";

export default function ServicesPage() {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);

    return (

        <main className="services-page relative px-4 sm:px-6">

            {/* Background orbs */}
            <div className="ambient-orb left-[-30%] top-[5%] bg-[#00c2a8]/20 pulse-soft" />
            <div className="ambient-orb right-[-30%] bottom-[5%] bg-[#1f8fff]/20 pulse-soft" />


            <section className="min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-20">

                <div className="section-shell">


                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10 sm:mb-16"
                    >

                        <h1 className="gradient-text text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                            Growth Solutions
                        </h1>

                        <p className="services-subtitle text-sm sm:text-base max-w-xl mx-auto">
                            Choose your industry and unlock tailored digital growth packages.
                        </p>

                    </motion.div>



                    {/* CATEGORY VIEW */}
                    {!selectedCategory && (

                        <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-5 sm:gap-6 lg:gap-8
            ">

                            {serviceCategories.map(category => (

                                <motion.div
                                    key={category.id}
                                    whileHover={{ y: -6 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedCategory(category)}
                                    className="surface-card services-card p-5 sm:p-6 lg:p-8 cursor-pointer"
                                >

                                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 gradient-text">
                                        {category.title}
                                    </h2>

                                    <p className="services-card-desc text-sm sm:text-base">
                                        {category.description}
                                    </p>

                                </motion.div>

                            ))}

                        </div>

                    )}



                    {/* PACKAGE VIEW */}
                    <AnimatePresence>

                        {selectedCategory && (

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >

                                {/* Back button */}
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="services-back mb-6 sm:mb-10 text-sm sm:text-base"
                                >
                                    ← Back to Industries
                                </button>


                                {/* Title */}
                                <h2 className="
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  font-bold
                  mb-8 sm:mb-12
                  gradient-text
                ">
                                    {selectedCategory.title} Packages
                                </h2>


                                {/* Packages grid */}
                                <div className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-3
                  gap-5 sm:gap-6
                ">

                                    {selectedCategory.packages.map((pkg) => (

                                        <motion.div
                                            key={pkg.name}
                                            whileHover={{ y: -6 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="surface-card p-5 sm:p-6 flex flex-col justify-between"
                                        >

                                            <div>

                                                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                                                    {pkg.name}
                                                </h3>

                                                <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-6 text-sm sm:text-base">

                                                    {pkg.features.map(feature => (
                                                        <li key={feature}>• {feature}</li>
                                                    ))}

                                                </ul>

                                            </div>


                                            <button
                                                onClick={() => setSelectedPackage(pkg)}
                                                className="btn-primary btn-animated py-3 rounded-xl text-center font-semibold text-sm sm:text-base"
                                            >
                                                Get Started
                                            </button>

                                        </motion.div>

                                    ))}

                                </div>

                            </motion.div>

                        )}

                    </AnimatePresence>

                </div>

            </section>



            {/* MODAL */}
            <AnimatePresence>

                {selectedPackage && (

                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPackage(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />


                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="
                fixed
                left-1/2
                top-1/2
                z-[61]
                w-[92%]
                sm:w-[90%]
                max-w-lg
                -translate-x-1/2
                -translate-y-1/2
              "
                        >

                            <div className="surface-card p-5 sm:p-6 lg:p-8">


                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 gradient-text">
                                    {selectedPackage.name}
                                </h2>


                                <p className="text-slate-300 mb-5 sm:mb-6 text-sm sm:text-base">
                                    This package is designed to build strong digital presence,
                                    attract your target audience, and convert reach into measurable growth.
                                </p>


                                <ul className="space-y-2 sm:space-y-3 mb-6 text-sm sm:text-base">

                                    {selectedPackage.features.map(feature => (
                                        <li key={feature}>• {feature}</li>
                                    ))}

                                </ul>


                                <div className="flex flex-col sm:flex-row gap-3">

                                    <a
                                        href="https://instagram.com/digitallifterz"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-primary px-6 py-3 rounded-xl text-center"
                                    >
                                        Contact on Instagram
                                    </a>


                                    <button
                                        onClick={() => setSelectedPackage(null)}
                                        className="px-6 py-3 border border-white/20 rounded-xl"
                                    >
                                        Close
                                    </button>

                                </div>

                            </div>

                        </motion.div>

                    </>
                )}

            </AnimatePresence>


        </main>

    );

}
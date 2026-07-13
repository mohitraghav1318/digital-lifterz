import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiGrid,
  FiInstagram,
  FiPackage,
  FiX,
} from "react-icons/fi";
import { fetchServices, getFallbackServices } from "../lib/servicesApi";
import "./ServicesPage.css";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function ServicesPage() {
  const [serviceCategories, setServiceCategories] = useState(getFallbackServices().categories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchServices()
      .then((data) => {
        if (isMounted && data.categories?.length) {
          setServiceCategories(data.categories);
        }
      })
      .catch(() => {
        if (isMounted) {
          setServiceCategories(getFallbackServices().categories);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="services-page">
      <section className="services-page-section">
        <div className="section-shell services-page-shell">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="services-page-hero"
          >
            <p className="services-page-eyebrow">Tailored Growth Packages</p>
            <h1 className="services-page-heading">
              Pick your industry.
              <span className="services-page-heading-accent">Launch the right growth plan.</span>
            </h1>
            <p className="services-page-subtext">
              Every package follows the same Digital Lifterz brand system you see on the home
              page, but tailored to the audience, channels, and growth goals of your business.
            </p>
          </motion.div>

          {!selectedCategory && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="services-page-grid"
            >
              {serviceCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  type="button"
                  variants={item}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedCategory(category)}
                  className="services-page-card"
                >
                  <span className="services-page-card-index">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <div className="services-page-card-icon">
                    <FiGrid />
                  </div>
                  <h2 className="services-page-card-title">{category.title}</h2>
                  <p className="services-page-card-copy">{category.description}</p>
                  <span className="services-page-card-link">
                    Explore packages <FiArrowRight />
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {selectedCategory && (
              <motion.div
                key={selectedCategory.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="services-page-packages"
              >
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="services-page-back"
                >
                  <FiArrowLeft />
                  <span>Back to Industries</span>
                </button>

                <div className="services-page-packages-head">
                  <p className="services-page-eyebrow">Curated Offers</p>
                  <h2 className="services-page-section-title">
                    {selectedCategory.title}
                    <span className="services-page-heading-accent">Packages</span>
                  </h2>
                </div>

                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="services-page-grid"
                >
                  {selectedCategory.packages.map((pkg) => (
                    <motion.div
                      key={pkg.name}
                      variants={item}
                      whileHover={{ y: -6 }}
                      className="services-page-package"
                    >
                      <div>
                        <div className="services-page-package-icon">
                          <FiPackage />
                        </div>
                        <h3 className="services-page-package-title">{pkg.name}</h3>
                        <ul className="services-page-feature-list">
                          {pkg.features.map((feature) => (
                            <li key={feature} className="services-page-feature-item">
                              <FiCheckCircle />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedPackage(pkg)}
                        className="services-page-primary-btn"
                      >
                        Get Started
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selectedPackage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPackage(null)}
              className="services-page-modal-backdrop"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="services-page-modal-shell"
            >
              <div className="services-page-modal">
                <div className="services-page-modal-badge">
                  <FiPackage />
                </div>

                <h2 className="services-page-modal-title">{selectedPackage.name}</h2>
                <p className="services-page-modal-copy">
                  This package is built to strengthen your online presence, attract the right
                  audience, and turn digital attention into measurable business growth.
                </p>

                <ul className="services-page-modal-list">
                  {selectedPackage.features.map((feature) => (
                    <li key={feature} className="services-page-modal-item">
                      <FiCheckCircle />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="services-page-modal-actions">
                  <a
                    href="https://instagram.com/digitallifterz"
                    target="_blank"
                    rel="noreferrer"
                    className="services-page-primary-btn services-page-modal-primary"
                  >
                    <FiInstagram />
                    <span>Contact on Instagram</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedPackage(null)}
                    className="services-page-secondary-btn"
                  >
                    <FiX />
                    <span>Close</span>
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

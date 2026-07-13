import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchServices, getFallbackServices } from "../../lib/servicesApi";
import "./Services.css";

export default function Services() {
  const [services, setServices] = useState(getFallbackServices().homeServices);

  useEffect(() => {
    let isMounted = true;

    fetchServices()
      .then((data) => {
        if (isMounted && data.homeServices?.length) {
          setServices(data.homeServices);
        }
      })
      .catch(() => {
        if (isMounted) {
          setServices(getFallbackServices().homeServices);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="services" className="services-section relative py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="services-eyebrow">Services</p>
            <h2 className="services-heading">
              Marketing systems designed for consistent growth
            </h2>
            <p className="services-subtext">
              Pick a plan that matches your stage and scale with confidence.
            </p>
          </div>

          <Link to="/services" className="services-view-all w-full sm:w-auto">
            View Detailed Packages
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="service-card"
            >
              <div className="service-index">0{index + 1}</div>

              <h3 className="service-title">{service.title}</h3>

              <ul className="service-features">
                {service.features.map((feature) => (
                  <li key={feature} className="service-feature-item">
                    <span className="service-feature-dot" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/services" className="service-cta">
                Know More
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
import { services } from "../../data/services";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Services() {

  return (

    <section id="services" className="relative overflow-hidden py-20 sm:py-24">

      <div className="section-shell">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">

          <h2 className="gradient-text text-4xl font-bold sm:text-5xl">
            Our Services
          </h2>

        </div>


        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {services.map((service, i) => (

            <motion.article
              key={service.title}
              whileHover={{ y: -8 }}
              className="surface-card p-6 flex flex-col"
            >

              {/* Title */}
              <h3 className="mb-6 text-2xl font-semibold">
                {service.title}
              </h3>


              {/* Features */}
              <ul className="space-y-3 text-sm">

                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}

              </ul>


              {/* Redirect button */}
              <Link
                to="/services"
                className="btn-primary mt-8 rounded-xl py-3 font-semibold text-center"
              >
                Know More
              </Link>

            </motion.article>

          ))}

        </div>

      </div>

    </section>

  );
}
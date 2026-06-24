import { Link } from "react-router-dom";
import { categoriesData } from "../../assets/assets";
import { motion } from "framer-motion";

const HomeCategories = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header row */}
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-2xl font-extrabold text-app-text text-center">
              Shop by Category
            </h2>
          </div>

          {/* Bubble Grid */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {categoriesData.map((cat) => (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                onClick={() => window.scrollTo(0, 0)}
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-orange-50 border-2 border-transparent group-hover:border-app-green-lighter transition-all duration-300 flex items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:-translate-y-1"
                  />
                </div>
                <span className="text-xs font-medium text-zinc-600 text-center leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomeCategories;

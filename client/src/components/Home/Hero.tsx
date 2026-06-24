import { ArrowRightIcon, LeafIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { heroSectionData } from "../../assets/assets";

const Hero = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden min-h-[540px] mb-10 rounded-3xl flex items-center"
    >
      <img
        src={heroSectionData.hero_image}
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-app-green via-app-green/65 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-xl xl:pl-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-app-orange bg-app-orange/15 rounded-full mb-5">
            <LeafIcon className="size-3" /> Farm-Fresh & Organic
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5">
            Nourish your home with{" "}
            <span className="text-app-orange">Earth's finest</span>
          </h1>

          <p className="text-base text-white/80 leading-relaxed mb-8 max-w-md">
            {heroSectionData.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="px-7 py-3 bg-app-orange text-white font-semibold rounded-full hover:bg-app-orange-dark transition-all flex-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Shop Now <ArrowRightIcon className="size-4" />
            </Link>

            <Link
              to="/products"
              className="px-7 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;

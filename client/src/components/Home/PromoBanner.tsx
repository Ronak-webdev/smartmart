import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Leaf } from "lucide-react";

const PromoBanner = () => {
  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-app-green to-purple-800 text-white shadow-2xl"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 px-8 md:px-14 py-12 md:py-16">
            {/* Left Content */}
            <div className="max-w-xl">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider mb-6 border border-white/20">
                <Sparkles className="size-3.5" />
                Premium Collection
              </span>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
                Explore Our Organic
                <br />
                <span className="text-app-orange">&</span> Premium Range
              </h2>

              {/* Subtitle */}
              <p className="text-white/75 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                Discover carefully curated organic products sourced directly from
                trusted local farms. Experience nature's finest with zero
                compromises on quality, taste, or freshness.
              </p>

              {/* CTA Button */}
              <Link
                to="/products"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-app-orange text-white font-semibold text-sm hover:bg-app-orange-dark transition-all duration-300 hover:scale-105 shadow-lg shadow-app-orange/30"
              >
                Explore Now
                <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Right Side - Decorative Shapes */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 hidden lg:block">
              {/* Large circle */}
              <div className="absolute inset-0 rounded-full bg-white/5 border border-white/10" />

              {/* Inner circle */}
              <div className="absolute inset-8 rounded-full bg-white/8 border border-white/10 flex-center">
                <div className="absolute inset-6 rounded-full bg-white/10 border border-white/15 flex-center">
                  <Leaf className="size-16 text-white/40" />
                </div>
              </div>

              {/* Floating orbs */}
              <div className="absolute -top-4 right-8 size-14 rounded-full bg-app-orange/30 blur-sm animate-pulse-soft" />
              <div className="absolute bottom-6 -left-6 size-20 rounded-full bg-purple-400/20 blur-md animate-pulse-soft" />
              <div className="absolute top-1/2 -right-4 size-10 rounded-full bg-white/15 blur-sm" />
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/3 translate-y-1/2 -translate-x-1/3" />
          <div className="absolute top-1/2 left-1/3 size-32 rounded-full bg-purple-500/10 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;

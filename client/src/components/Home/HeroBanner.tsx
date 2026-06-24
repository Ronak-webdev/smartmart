import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_BANNERS = [
  {
    id: 1,
    title: "Premium Fruits & Vegetables",
    subtitle: "Farm fresh produce delivered straight to your door. Handpicked for quality and freshness.",
    image: "/banner1.png",
    cta: "Shop Produce",
  },
  {
    id: 2,
    title: "Personal Care & Beauty",
    subtitle: "High-quality skincare, lotions, soaps, and beauty products for your daily routine.",
    image: "/banner_personal_care.png",
    cta: "Shop Beauty",
  },
  {
    id: 3,
    title: "Pantry Staples & Grains",
    subtitle: "Stock up your kitchen with the best organic grains, pulses, and cooking essentials.",
    image: "/banner3.png",
    cta: "Shop Staples",
  },
  {
    id: 4,
    title: "Fresh Bakery & Breads",
    subtitle: "Freshly baked artisan breads, croissants, muffins, and pastries every morning.",
    image: "/banner_bakery.png",
    cta: "Shop Bakery",
  },
  {
    id: 5,
    title: "Refreshing Beverages",
    subtitle: "Quench your thirst with our wide selection of cold drinks, fresh juices, and more.",
    image: "/banner_beverages.png",
  },
  {
    id: 7,
    title: "Snacks & Munchies",
    subtitle: "Sweet, salty, and crunchy premium snacks to satisfy all your cravings.",
    image: "/banner_snacks.png",
  },
  {
    id: 8,
    title: "Frozen Foods & Ice Cream",
    subtitle: "Convenient frozen meals, veggies, and delicious ice creams for hot days.",
    image: "/banner_frozen_foods.png",
    cta: "Shop Frozen",
  },
  {
    id: 9,
    title: "Gentle Baby Care",
    subtitle: "Safe and gentle products, diapers, and lotions for your little ones.",
    image: "/banner_baby_care.png",
    cta: "Shop Baby Care",
  },
  {
    id: 10,
    title: "Premium Dairy & Milk",
    subtitle: "Fresh milk, artisan cheeses, and butter delivered cold.",
    image: "/banner_dairy.png",
    cta: "Shop Dairy",
  },
];

const slideVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState(DEFAULT_BANNERS);

  const loadBanners = () => {
    const saved = localStorage.getItem("smartmart_banners_v4");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          setBanners(parsed);
          return;
        }
      } catch {}
    }
    setBanners(DEFAULT_BANNERS);
  };

  useEffect(() => {
    loadBanners();
    window.addEventListener("banners-updated", loadBanners);
    return () => window.removeEventListener("banners-updated", loadBanners);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);


  return (
    <section className="relative w-full aspect-[4/3] sm:aspect-[21/9] lg:aspect-[3/1] min-h-[350px] max-h-[600px] overflow-hidden shadow-2xl bg-slate-900">
      {/* Slides */}
      <AnimatePresence>
        <motion.div
          key={banners[current].id}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <img
            src={banners[current].image}
            alt={banners[current].title}
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-2xl"
              >

                {/* Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                  {banners[current].title}
                </h1>

                {/* Subtitle */}
                <p className="text-sm md:text-lg text-white/85 mb-8 max-w-xl leading-relaxed">
                  {banners[current].subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-white font-medium text-lg hover:text-app-orange-light transition-all duration-300"
                  >
                    Browse Category <ChevronRight className="size-5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>



      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 ${
              index === current
                ? "w-8 h-2.5 bg-app-orange"
                : "size-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightIcon, Clock, Flame } from "lucide-react";
import toast from "react-hot-toast";

import type { Product } from "../../types";
import ProductCard from "../ProductCard";
import api from "../../config/api";

const DealsOfTheDay = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [timeLeft, setTimeLeft] = useState(() => {
    // Random countdown between 2–8 hours
    const hours = Math.floor(Math.random() * 6) + 2;
    const minutes = Math.floor(Math.random() * 60);
    const seconds = Math.floor(Math.random() * 60);
    return hours * 3600 + minutes * 60 + seconds;
  });

  // Fetch products
  useEffect(() => {
    api
      .get("/products")
      .then(({ data }) => {
        // Shuffle the products randomly
        const shuffled = data.products.sort(() => 0.5 - Math.random());
        setProducts(shuffled);
      })
      .catch((error: any) => {
        toast.error(error.response?.data?.message || error?.message);
      });
  }, []);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-rose-500/10 flex-center">
              <Flame className="size-6 text-rose-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-rose-500 flex items-center gap-2">
                Deals of the Day
              </h2>
              <p className="text-sm text-app-text-light mt-0.5">
                Grab them before they're gone!
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-medium text-app-text-light uppercase tracking-wide">
              Ends in
            </span>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500 text-white font-mono text-sm font-bold animate-pulse-soft shadow-lg shadow-rose-500/25">
              <Clock className="size-3.5" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-3xl border border-dashed border-app-border bg-gradient-to-br from-rose-50 to-white">
            <div className="size-16 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-5">
              <span className="text-3xl">🔥</span>
            </div>
            <h3 className="text-xl font-semibold text-zinc-900">
              No Deals Available
            </h3>
            <p className="text-sm text-app-text-light mt-2 max-w-md">
              We're cooking up some amazing deals. Check back soon!
            </p>
          </div>
        )}

        {/* View All Link */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-8"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-app-border text-sm font-semibold text-app-text hover:bg-app-cream-dark transition-colors"
            >
              View All Deals
              <ArrowRightIcon className="size-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DealsOfTheDay;

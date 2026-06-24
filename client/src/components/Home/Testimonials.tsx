import { motion } from "framer-motion";
import { Star, ShieldCheck, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    rating: 5,
    content:
      "The freshest vegetables I've ever ordered online. Delivery was super fast!",
  },
  {
    name: "Rahul Verma",
    rating: 5,
    content:
      "Amazing quality and great prices. Smartmart is now my go-to for weekly groceries.",
  },
  {
    name: "Anita Desai",
    rating: 4,
    content:
      "Love the organic collection. The packaging is excellent and everything arrives fresh.",
  },
  {
    name: "Vikram Singh",
    rating: 5,
    content:
      "Best grocery delivery service! The app is smooth and customer service is outstanding.",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-app-text">
            Loved by{" "}
            <span className="text-app-orange">Thousands</span>
          </h2>
          <p className="text-app-text-light mt-3 max-w-lg mx-auto text-sm md:text-base">
            See what our happy customers have to say about their Smartmart
            experience.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-app-cream-dark rounded-2xl border border-app-border/60 p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Star Rating */}
              <div>
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < testimonial.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-zinc-200 fill-zinc-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="size-6 text-app-green/15 absolute -top-1 -left-1" />
                  <p className="text-sm italic text-app-text-light leading-relaxed pl-4">
                    "{testimonial.content}"
                  </p>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-app-border/50">
                {/* Avatar with Initials */}
                <div className="size-10 rounded-full bg-gradient-to-br from-app-green to-app-green-lighter flex-center text-white text-xs font-bold shrink-0">
                  {getInitials(testimonial.name)}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-app-text truncate">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="size-3.5 text-app-success" />
                    <span className="text-xs text-app-success font-medium">
                      Verified Buyer
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

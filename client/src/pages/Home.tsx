import HeroBanner from "../components/Home/HeroBanner";
import Features from "../components/Home/Features";
import HomeCategories from "../components/Home/HomeCategories";
import DealsOfTheDay from "../components/Home/DealsOfTheDay";
import PopularProducts from "../components/Home/PopularProducts";
import PromoBanner from "../components/Home/PromoBanner";
import Testimonials from "../components/Home/Testimonials";
import AppPromoBanner from "../components/Home/AppPromoBanner";
import Newsletter from "../components/Home/Newsletter";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Full-width Hero Carousel */}
      <HeroBanner />

      {/* Announcement Ticker */}
      <div className="w-full bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 text-white py-2 px-2 overflow-x-auto no-scrollbar shadow-inner flex justify-center items-center">
        <p className="text-[10px] sm:text-xs font-semibold tracking-wide sm:tracking-widest uppercase whitespace-nowrap">
          ✨ Free Delivery on orders over ₹500! Code: <span className="font-black text-amber-300 ml-1">SMART500</span> ✨
        </p>
      </div>
      {/* Features Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 relative z-10">
        <Features />
      </div>

      {/* Categories Bubble Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeCategories />
      </div>

      {/* Deals of the Day */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DealsOfTheDay />
      </div>

      {/* Trending / Popular Products (full-width tinted bg) */}
      <PopularProducts />

      {/* Premium Promo Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PromoBanner />
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* App Promo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AppPromoBanner />
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;

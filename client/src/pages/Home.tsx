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

import { appPromoBannerData, assets } from "../../assets/assets";

const AppPromoBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 my-14 bg-slate-900 rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Decorative glowing circle */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-app-green-lighter/20 rounded-full blur-[80px]" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 xl:px-10 relative z-10">
        {/* Left side content */}
        <div className="text-center md:text-left">
          {/* Pill badge */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold tracking-wide uppercase mb-4 border border-white/10">
            Download the App
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Get 20% Off Your First App Order!
          </h2>
          <p className="text-white/70 mb-6 max-w-md">
            {appPromoBannerData.description}
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button className="h-14 px-8 bg-white text-slate-900 font-bold rounded-xl hover:bg-gray-100 transition-colors">
              App Store
            </button>
            <button className="h-14 px-8 bg-white text-slate-900 font-bold rounded-xl hover:bg-gray-100 transition-colors">
              Google Play
            </button>
          </div>
        </div>

        {/* Right side image */}
        <img
          src={assets.delivery_truck}
          alt="Delivery Truck"
          className="max-w-60 sm:max-w-120 xl:pr-10"
        />
      </div>
    </section>
  );
};

export default AppPromoBanner;

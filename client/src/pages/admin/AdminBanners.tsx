import { useState, useEffect } from "react";
import { PlusIcon, TrashIcon, ImageIcon, GripVerticalIcon } from "lucide-react";
import toast from "react-hot-toast";

interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
}

const DEFAULT_BANNERS: BannerItem[] = [
  {
    id: "1",
    title: "Premium Fruits & Vegetables",
    subtitle: "Farm fresh produce delivered straight to your door. Handpicked for quality and freshness.",
    image: "/banner1.png",
    cta: "Shop Produce",
  },
  {
    id: "2",
    title: "Personal Care & Beauty",
    subtitle: "High-quality skincare, lotions, soaps, and beauty products for your daily routine.",
    image: "/banner_personal_care.png",
    cta: "Shop Beauty",
  },
  {
    id: "3",
    title: "Pantry Staples & Grains",
    subtitle: "Stock up your kitchen with the best organic grains, pulses, and cooking essentials.",
    image: "/banner3.png",
    cta: "Shop Staples",
  },
  {
    id: "4",
    title: "Fresh Bakery & Breads",
    subtitle: "Freshly baked artisan breads, croissants, muffins, and pastries every morning.",
    image: "/banner_bakery.png",
    cta: "Shop Bakery",
  },
  {
    id: "5",
    title: "Refreshing Beverages",
    subtitle: "Quench your thirst with our wide selection of cold drinks, fresh juices, and more.",
    image: "/banner_beverages.png",
    cta: "Shop Drinks",
  },
  {
    id: "7",
    title: "Snacks & Munchies",
    subtitle: "Sweet, salty, and crunchy premium snacks to satisfy all your cravings.",
    image: "/banner_snacks.png",
    cta: "Shop Snacks",
  },
  {
    id: "8",
    title: "Frozen Foods & Ice Cream",
    subtitle: "Convenient frozen meals, veggies, and delicious ice creams for hot days.",
    image: "/banner_frozen_foods.png",
    cta: "Shop Frozen",
  },
  {
    id: "9",
    title: "Gentle Baby Care",
    subtitle: "Safe and gentle products, diapers, and lotions for your little ones.",
    image: "/banner_baby_care.png",
    cta: "Shop Baby Care",
  },
  {
    id: "10",
    title: "Premium Dairy & Milk",
    subtitle: "Fresh milk, artisan cheeses, and butter delivered cold.",
    image: "/banner_dairy.png",
    cta: "Shop Dairy",
  },
];

export default function AdminBanners() {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("smartmart_banners_v4");
    if (saved) {
      try {
        setBanners(JSON.parse(saved));
      } catch {
        setBanners(DEFAULT_BANNERS);
      }
    } else {
      setBanners(DEFAULT_BANNERS);
    }
  }, []);

  const saveBanners = (updated: BannerItem[]) => {
    setBanners(updated);
    localStorage.setItem("smartmart_banners_v4", JSON.stringify(updated));
    // Dispatch event so HeroBanner can listen
    window.dispatchEvent(new CustomEvent("banners-updated"));
  };

  const addBanner = () => {
    const newBanner: BannerItem = {
      id: Date.now().toString(),
      title: "New Banner",
      subtitle: "Add your banner description here",
      image: "",
      cta: "Shop Now",
    };
    const updated = [...banners, newBanner];
    saveBanners(updated);
    setEditingId(newBanner.id);
    toast.success("Banner added!");
  };

  const deleteBanner = (id: string) => {
    if (banners.length <= 1) {
      toast.error("You need at least 1 banner.");
      return;
    }
    const updated = banners.filter((b) => b.id !== id);
    saveBanners(updated);
    toast.success("Banner deleted!");
  };

  const updateBanner = (id: string, field: keyof BannerItem, value: string) => {
    const updated = banners.map((b) => (b.id === id ? { ...b, [field]: value } : b));
    saveBanners(updated);
  };

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        updateBanner(id, "image", e.target.result as string);
        toast.success("Image uploaded!");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-app-green tracking-tight">Banner Management</h1>
          <p className="text-sm text-app-text-light mt-1">
            Manage the hero carousel banners on the home page.
          </p>
        </div>
        <button
          onClick={addBanner}
          className="flex items-center gap-2 px-4 py-2.5 bg-app-green text-white text-sm font-semibold rounded-xl hover:bg-app-green-light transition-colors"
        >
          <PlusIcon className="size-4" /> Add Banner
        </button>
      </div>

      <div className="space-y-4">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className="bg-white rounded-2xl border border-app-border overflow-hidden shadow-sm"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-b border-app-border">
              <GripVerticalIcon className="size-4 text-app-text-light" />
              <span className="text-sm font-bold text-app-green">Banner #{index + 1}</span>
              <div className="flex-1" />
              <button
                onClick={() => setEditingId(editingId === banner.id ? null : banner.id)}
                className="text-xs font-semibold text-app-green-light hover:underline"
              >
                {editingId === banner.id ? "Collapse" : "Edit"}
              </button>
              <button
                onClick={() => deleteBanner(banner.id)}
                className="p-1.5 text-app-error hover:bg-red-50 rounded-lg transition-colors"
              >
                <TrashIcon className="size-4" />
              </button>
            </div>

            {editingId === banner.id ? (
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-app-text-light block mb-1">Title</label>
                  <input
                    type="text"
                    value={banner.title}
                    onChange={(e) => updateBanner(banner.id, "title", e.target.value)}
                    className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:ring-2 focus:ring-app-green-lighter/30 focus:border-app-green-lighter outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-app-text-light block mb-1">Subtitle</label>
                  <textarea
                    value={banner.subtitle}
                    onChange={(e) => updateBanner(banner.id, "subtitle", e.target.value)}
                    className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:ring-2 focus:ring-app-green-lighter/30 focus:border-app-green-lighter outline-none resize-none"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-app-text-light block mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={banner.cta}
                    onChange={(e) => updateBanner(banner.id, "cta", e.target.value)}
                    className="w-full px-4 py-2.5 border border-app-border rounded-xl text-sm focus:ring-2 focus:ring-app-green-lighter/30 focus:border-app-green-lighter outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-app-text-light block mb-1">Banner Image</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-app-border rounded-xl text-sm text-app-text-light cursor-pointer hover:border-app-green-lighter hover:text-app-green transition-colors">
                      <ImageIcon className="size-4" /> Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(banner.id, file);
                        }}
                      />
                    </label>
                    <span className="text-xs text-app-text-light">or</span>
                    <input
                      type="text"
                      placeholder="Paste image URL..."
                      value={banner.image}
                      onChange={(e) => updateBanner(banner.id, "image", e.target.value)}
                      className="flex-1 px-4 py-2.5 border border-app-border rounded-xl text-sm focus:ring-2 focus:ring-app-green-lighter/30 focus:border-app-green-lighter outline-none"
                    />
                  </div>
                </div>
                {banner.image && (
                  <div className="rounded-xl overflow-hidden border border-app-border aspect-[3/1] bg-slate-100">
                    <img src={banner.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4">
                <div className="w-32 h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-app-border">
                  {banner.image ? (
                    <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex-center text-app-text-light">
                      <ImageIcon className="size-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-app-text truncate">{banner.title}</h3>
                  <p className="text-xs text-app-text-light truncate mt-0.5">{banner.subtitle}</p>
                  <span className="text-[10px] font-semibold text-app-green-light mt-1 inline-block">{banner.cta}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

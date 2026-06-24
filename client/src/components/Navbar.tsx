import {
  ArrowUpRightIcon,
  BikeIcon,
  ChevronDownIcon,
  LogOutIcon,
  MapPinIcon,
  MenuIcon,
  PackageIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { categoriesData } from "../assets/assets";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-[#2c1358] via-purple-800 to-[#2c1358] text-white py-2 text-center text-xs font-bold tracking-widest uppercase shadow-inner">
        Free delivery on all orders above ₹500! Use code SMART500
      </div>

      <nav className="bg-white/90 backdrop-blur-xl sticky top-0 z-50 border-b border-app-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-app-green to-app-green-lighter flex-center text-white font-black text-lg shadow-[0_0_20px_rgba(76,29,149,0.3)] group-hover:shadow-[0_0_30px_rgba(76,29,149,0.5)] group-hover:scale-105 transition-all">
              S
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-app-green transition-colors">
              Smartmart
            </span>
          </Link>

          <div className="w-full flex items-center justify-end gap-4 lg:gap-10">
            {/* Nav Links - Desktop */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link to="/" className={location.pathname === '/' ? "text-app-green-light" : "text-zinc-600 hover:text-app-green-light transition-colors"}>Home</Link>
              
              {/* Products with dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductsDropdownOpen(true)}
                onMouseLeave={() => setProductsDropdownOpen(false)}
              >
                <Link
                  to="/products"
                  className={`flex items-center gap-1 ${location.pathname.startsWith('/products') ? "text-app-green-light" : "text-zinc-600 hover:text-app-green-light transition-colors"}`}
                >
                  Products <ChevronDownIcon className="size-3" />
                </Link>

                {productsDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl border border-app-border p-4 w-[420px] animate-fade-in">
                      <div className="flex items-center justify-between mb-3 px-1">
                        <h4 className="text-xs font-bold text-app-text-light uppercase tracking-wider">Shop by Category</h4>
                        <Link to="/products" className="text-xs font-semibold text-app-green-light hover:underline" onClick={() => setProductsDropdownOpen(false)}>
                          View All
                        </Link>
                      </div>
                      <div className="grid grid-cols-5 gap-3">
                        {categoriesData.map((cat) => (
                          <Link
                            key={cat.slug}
                            to={`/products?category=${cat.slug}`}
                            onClick={() => { setProductsDropdownOpen(false); window.scrollTo(0, 0); }}
                            className="group flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-app-cream-dark transition-colors"
                          >
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-purple-50 border-2 border-transparent group-hover:border-app-green-lighter transition-all group-hover:-translate-y-0.5">
                              <img src={cat.image} alt={cat.name} className="w-full h-full object-contain p-1" />
                            </div>
                            <span className="text-[10px] font-semibold text-app-text-light group-hover:text-app-green text-center leading-tight">
                              {cat.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-app-border flex justify-between items-center text-[10px] font-bold text-app-text-light uppercase tracking-wider px-1">
                        <span>Free Shipping over ₹500</span>
                        <Link to="/deals" className="text-app-green-light hover:underline" onClick={() => setProductsDropdownOpen(false)}>
                          Today's Deals →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/deals" className={location.pathname.startsWith('/deals') ? "text-app-green-light" : "text-zinc-600 hover:text-app-green-light transition-colors"}>
                Deals
              </Link>
            </div>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="hidden sm:flex flex-1 max-w-sm text-xs sm:text-sm"
            >
              <div className="relative w-full group">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-app-green transition-colors" />
                <input
                  type="text"
                  placeholder="Search groceries, fruits, snacks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 rounded-full border border-transparent focus:bg-white focus:border-app-green-lighter focus:ring-4 focus:ring-app-green-lighter/20 transition-all outline-none shadow-inner text-sm"
                />
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <button
                className="relative p-2 rounded-xl hover:bg-app-green-lighter/10 transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCartIcon className="size-5 text-zinc-900" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 size-4 bg-app-orange text-white text-[10px] rounded-full flex-center">
                    {cartCount}
                  </span>
                )}
              </button>
              {/* User */}
              <div className="relative" ref={userMenuRef}>
                {user ? (
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-2 hover:bg-app-green-lighter/10 rounded-xl transition-colors"
                  >
                    <div className="size-7 rounded-full bg-gradient-to-tr from-app-green to-app-green-lighter text-white flex-center font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDownIcon className="size-3 text-zinc-500" />
                  </button>
                ) : (
                  <div className="flex-center gap-2">
                    <Link
                      to="/login"
                      className="hidden md:flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-app-green rounded-full hover:bg-app-green-light shadow-lg hover:shadow-app-green-lighter/25 transition-all"
                    >
                      <UserIcon size={16} /> Sign In
                    </Link>
                    {userMenuOpen ? (
                      <XIcon
                        className="md:hidden"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                      />
                    ) : (
                      <MenuIcon
                        className="md:hidden"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                      />
                    )}
                  </div>
                )}

                {userMenuOpen && (
                    <div className="absolute right-0 mt-2.5 w-72 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50 animate-fade-in">
                      {user && (
                        <div className="px-4 py-2 border-b border-app-border">
                          <p className="text-sm font-medium text-zinc-900">
                            {user?.name}
                          </p>
                          <p className="text-xs text-zinc-500 break-all">{user?.email}</p>
                        </div>
                      )}
                      <div onClick={() => setUserMenuOpen(false)}>
                        {!user && (
                          <Link to="/login" className="dropdown-link">
                            <UserIcon size={16} /> Sign In{" "}
                          </Link>
                        )}

                        {user && (
                          <Link to="/orders" className="dropdown-link">
                            <PackageIcon size={16} /> My Orders{" "}
                          </Link>
                        )}

                        {user && (
                          <Link to="/addresses" className="dropdown-link">
                            <MapPinIcon size={16} /> Addresses{" "}
                          </Link>
                        )}

                        <Link to="/products" className="dropdown-link md:hidden">
                          <ArrowUpRightIcon size={16} /> Products{" "}
                        </Link>

                        <Link to="/deals" className="dropdown-link md:hidden">
                          <ArrowUpRightIcon size={16} /> Deals{" "}
                        </Link>
                        {user?.isAdmin && (
                          <Link to="/admin/products" className="dropdown-link">
                            <ShieldIcon
                              className="text-app-orange-dark"
                              size={16}
                            />{" "}
                            <span className="text-app-orange-dark">
                              Admin Panel
                            </span>{" "}
                          </Link>
                        )}
                        {user && (
                          <div className="border-t border-app-border pt-1">
                            <button
                              onClick={handleLogout}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-error hover:bg-red-50 w-full transition-colors"
                            >
                              <LogOutIcon size={16} /> Logout
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

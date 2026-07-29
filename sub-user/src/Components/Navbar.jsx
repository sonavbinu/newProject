import React, { useState } from "react";
import { Store, Search, ShoppingCart, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ onSearchClick }) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  const cartItems = useSelector((state) => state.cart?.items || []);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/stores")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="h-11 w-11 rounded-2xl bg-[#8BAD2B] flex items-center justify-center shadow-md">
            <Store className="text-white" size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800 tracking-wide">
              Origin
            </h1>

            <p className="text-xs text-gray-500">Fresh Grocery Delivery</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Search */}
          {showSearch ? (
            <div className="flex items-center cursor-pointer bg-gray-100 rounded-full px-4 py-2 w-72 transition-all duration-300">
              <Search size={18} className="text-gray-500" />

              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent outline-none px-3 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setShowSearch(false);
                    setSearch("");
                  }
                }}
              />

              <button
                onClick={() => {
                  setSearch("");
                  setShowSearch(false);
                }}
              >
                <X size={18} className="text-gray-500 hover:text-red-500" />
              </button>
            </div>
          ) : (
            <button
              onClick={onSearchClick}
              className="h-11 w-11 rounded-full cursor-pointer hover:bg-[#EEF7D4] flex items-center justify-center transition"
            >
              <Search
                size={21}
                className="text-gray-700 hover:text-[#8BAD2B]"
              />
            </button>
          )}

          {/* Stores */}
          <button
            onClick={() => navigate("/stores")}
            className="h-11 w-11 rounded-full hover:bg-[#EEF7D4] flex items-center justify-center transition"
          >
            <Store
              size={21}
              className="text-gray-700 cursor-pointer hover:text-[#8BAD2B]"
            />
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative h-11 w-11 cursor-pointer rounded-full hover:bg-[#EEF7D4] flex items-center justify-center transition"
          >
            <ShoppingCart
              size={21}
              className="text-gray-700 hover:text-[#8BAD2B]"
            />

            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center font-semibold">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="h-11 w-11 rounded-full cursor-pointer bg-[#EEF7D4] hover:bg-[#8BAD2B] group flex items-center justify-center transition duration-300"
          >
            <User size={20} className="text-[#8BAD2B] group-hover:text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

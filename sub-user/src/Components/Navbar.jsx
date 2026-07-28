import React, { useState } from "react";
import { Store, Search, ShoppingCart, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ onSearchClick }) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <nav className="sticky top-0 z-50 bg-white border-b  border-b-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        <div
          onClick={() => navigate("/stores")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-[#8BAD2B] flex items-center justify-center">
            <Store className="text-white" size={20} />
          </div>
          <div>
            <h2 className="font-bold text-lg">Origin</h2>
            <p className="text-xs text-gray-500">Grocery Delivery</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {showSearch ? (
            <div className="flex items-center border rounded-lg px-3 py-2 w-72 border-gray-200 shadow-sm transition-all duration-300">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setShowSearch(false);
                    setSearch("");
                  }
                }}
                placeholder="Search products..."
                className="flex-1 px-2 outline-none text-sm"
              />
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearch("");
                }}
                className="cursor-pointer"
              >
                <X size={18} className="text-gray-500 hover:text-red-500" />
              </button>
            </div>
          ) : (
            <Search
              className="cursor-pointer hover:text-[#8BAD2B]"
              onClick={onSearchClick}
            />
          )}
          <ShoppingCart
            className="cursor-pointer hover:text-[#8BAD2B]"
            onClick={() => navigate("/cart")}
          />
          <Store
            className="cursor-pointer hover:text-[#8BAD2B]"
            onClick={() => navigate("/stores")}
          />
          <User
            className="cursor-pointer hover:text-[#8BAD2B]"
            onClick={() => navigate("/profile")}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

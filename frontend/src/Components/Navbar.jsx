import React, { useState } from "react";
import ThemeToggle from "../redux/Components/Common/themeToggle";
import {
  HandCoins,
  CirclePoundSterling,
  Bell,
  User,
  Menu,
  X,
  Languages,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useUser();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const selectedStore = useSelector((state) => state.store.selectedStore);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setMenuOpen(false);
  };

  const iconButtonClass =
    "w-10 h-10 rounded-full bg-secondary-light p-2 flex items-center justify-center hover:bg-[var(--primary-light)] hover:scale-105 transition-all cursor-pointer";

  return (
    <nav className="fixed top-0 left-0 right-0 px-4 py-3 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex flex-col pl-12 min-w-0">
          <h1
            className="text-xl sm:text-2xl font-bold truncate"
            style={{ color: "var(--primary-color)" }}
          >
            {selectedStore?.storeName || "Select Store"}
          </h1>

          <p className="text-xs sm:text-sm text-gray-400 truncate">
            {selectedStore?.address || "Welcome back!"}
          </p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-[#FFF8E7] px-3 py-2 border border-[#f5e5b8]">
            <span className="text-sm text-gray-600">{t("navbar.xcoins")}</span>
            <span className="font-bold text-[#e7b019]">300</span>
            <CirclePoundSterling className="text-[#e7b019]" size={16} />
          </div>

          <button className={iconButtonClass} title="Rewards">
            <HandCoins size={18} />
          </button>

          <button
            className={`relative ${iconButtonClass}`}
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>

          <button
            onClick={() => navigate("/profile")}
            className={iconButtonClass}
            title="Profile"
          >
            <User size={18} />
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className={iconButtonClass}
              title="Language"
            >
              <Languages size={18} />
            </button>
            {menuOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 rounded-xl bg-white shadow-lg border border-gray-100 z-50 overflow-hidden">
                <button
                  onClick={() => changeLanguage("en")}
                  className="block w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--primary-light)] cursor-pointer transition"
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage("hi")}
                  className="block w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--primary-light)] cursor-pointer transition"
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => changeLanguage("ml")}
                  className="block w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--primary-light)] cursor-pointer transition"
                >
                  മലയാളം
                </button>
              </div>
            )}
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile Button */}
        <button
          className="lg:hidden hover:bg-gray-100 transition cursor-pointer p-2 rounded-lg"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden mt-4 border-t border-gray-100 pt-4 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-[#FFF8E7] px-3 py-2 border border-[#f5e5b8]">
              <span className="text-sm text-gray-600">
                {t("navbar.xcoins")}
              </span>
              <span className="font-bold text-[#e7b019]">300</span>
              <CirclePoundSterling className="text-[#e7b019]" size={16} />
            </div>

            <div className="flex gap-2">
              <button className={iconButtonClass} title="Rewards">
                <HandCoins size={18} />
              </button>
              <button
                className={`relative ${iconButtonClass}`}
                title="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              </button>
              <button
                onClick={() => navigate("/profile")}
                className={iconButtonClass}
                title="Profile"
              >
                <User size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="relative">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className={iconButtonClass}
                title="Language"
              >
                <Languages size={18} />
              </button>
              {menuOpen && (
                <div className="absolute top-full left-0 mt-2 w-40 rounded-xl bg-white shadow-lg border border-gray-100 z-50 overflow-hidden">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="block w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--primary-light)] cursor-pointer transition"
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage("hi")}
                    className="block w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--primary-light)] cursor-pointer transition"
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={() => changeLanguage("ml")}
                    className="block w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--primary-light)] cursor-pointer transition"
                  >
                    മലയാളം
                  </button>
                </div>
              )}
            </div>

            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

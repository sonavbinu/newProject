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

  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-0 z-50 bg-white  border-b border-gray-200 shadow-md  px-6 py-3">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className=" flex flex-col ">
          <h1
            className="text-2xl sm:text-3xl font-bold pl-12 "
            style={{ color: "var(--primary-color)" }}
          >
            {selectedStore?.storeName || "Select Store"}
          </h1>

          <p className="text-sm text-gray-500 pl-12">
            {selectedStore?.address || "Welcome Back!"}
          </p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center  gap-6">
          <div className="flex items-center gap-2 rounded-xl bg-secondary-light px-3 py-2">
            {t("navbar.xcoins")}:
            <span className="font-bold text-[#e7b019]">300</span>
            <CirclePoundSterling className="text-[#e7b019]" size={18} />
          </div>

          <HandCoins className="w-10 h-10 rounded-full bg-secondary-light p-2 cursor-pointer" />
          <Bell className="w-10 h-10 rounded-full bg-secondary-light p-2 cursor-pointer" />
          <User
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full bg-secondary-light p-2 cursor-pointer"
          />

          <div>
            <div className="relative">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center"
              >
                <Languages
                  size={20}
                  className="hover:cursor-pointer hover:bg-primary-hover"
                />
              </button>{" "}
              {menuOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 rounded-lg bg-white shadow-xl border z-50 border-gray-300 ">
                  <button
                    onClick={() => {
                      i18n.changeLanguage("en");
                      localStorage.setItem("lang", "en");
                      setMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      i18n.changeLanguage("hi");
                      localStorage.setItem("lang", "hi");
                      setMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                  >
                    हिन्दी
                  </button>{" "}
                  <button
                    onClick={() => {
                      i18n.changeLanguage("ml");
                      localStorage.setItem("lang", "ml");
                      setMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                  >
                    മലയാളം
                  </button>
                </div>
              )}
            </div>
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile Button */}
        <button
          className="lg:hidden hover:shadow-lg cursor-pointer p-2 rounded-md "
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden mt-4 border-t p-3 border-gray-200 pt-4 space-y-5">
          <p className="text-sm text-gray-600">
            {t("navbar.welcome")}, {t("navbar.user")}
          </p>

          <div className="flex flex-col gap-4 ">
            <div className="flex justify-between ">
              <div className="flex items-center gap-2 rounded-xl bg-secondary-light px-3 py-2">
                {t("navbar.xcoins")}:
                <span className="font-bold text-[#e7b019]">300</span>
                <CirclePoundSterling className="text-[#e7b019]" size={18} />
              </div>
              <div className="flex justify-between gap-4">
                <HandCoins className="w-10 h-10 rounded-full bg-secondary-light p-2" />
                <Bell className="w-10 h-10 rounded-full bg-secondary-light p-2" />
                <User
                  onClick={() => navigate("/profile")}
                  className="w-10 h-10 rounded-full bg-secondary-light p-2"
                />
              </div>{" "}
            </div>{" "}
            <div className="flex  justify-between gap-4">
              <div>
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center"
                  >
                    <Languages size={20} />
                  </button>{" "}
                  {menuOpen && (
                    <div className="absolute top-full right-0 border border-gray-200 rounded-lg bg-white z-100 cursor-pointer">
                      <button
                        onClick={() => {
                          i18n.changeLanguage("en");
                          localStorage.setItem("lang", "en");
                          setMenuOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                      >
                        English
                      </button>
                      <button
                        onClick={() => {
                          i18n.changeLanguage("hi");
                          localStorage.setItem("lang", "hi");
                          setMenuOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                      >
                        हिन्दी
                      </button>{" "}
                      <button
                        onClick={() => {
                          i18n.changeLanguage("ml");
                          localStorage.setItem("lang", "ml");
                          setMenuOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                      >
                        മലയാളം
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

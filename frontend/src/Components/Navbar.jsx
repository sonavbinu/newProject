import React, { useState } from "react";
import ThemeToggle from "../redux/Components/Common/themeToggle";
import {
  HandCoins,
  CirclePoundSterling,
  Bell,
  User,
  Menu,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 shadow-md p-4">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        {/* Left */}
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold sm:px-20 lg:px-0 "
            style={{ color: "var(--primary-color)" }}
          >
            REWARDIFY
          </h1>

          <p className="hidden md:block text-sm text-gray-600">
            {t("navbar.welcome")}, {t("navbar.user")}
          </p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 rounded-xl bg-secondary-light px-3 py-2">
            {t("navbar.xcoins")}:
            <span className="font-bold text-[#e7b019]">300</span>
            <CirclePoundSterling className="text-[#e7b019]" size={18} />
          </div>

          <HandCoins className="w-10 h-10 rounded-full bg-secondary-light p-2 cursor-pointer" />
          <Bell className="w-10 h-10 rounded-full bg-secondary-light p-2 cursor-pointer" />
          <User className="w-10 h-10 rounded-full bg-secondary-light p-2 cursor-pointer" />

          <select
            value={i18n.language}
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
              localStorage.setItem("lang", e.target.value);
            }}
            className="border rounded-md px-2 py-1"
            style={{ borderColor: "var(--primary-color)" }}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="ml">മലയാളം</option>
          </select>

          <ThemeToggle />
        </div>

        {/* Mobile Button */}
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden mt-4 border-t pt-4 space-y-4">
          <p className="text-sm text-gray-600">
            {t("navbar.welcome")}, {t("navbar.user")}
          </p>

          <div className="flex justify-between gap-4">
            <div className="flex justify-between gap-2">
              <div className="flex items-center gap-2 rounded-xl bg-secondary-light px-3 py-2 w-fit">
                {t("navbar.xcoins")}:
                <span className="font-bold text-[#e7b019]">300</span>
                <CirclePoundSterling className="text-[#e7b019]" size={18} />
              </div>

              <div className="flex gap-3">
                <HandCoins className="w-10 h-10 rounded-full bg-secondary-light p-2" />
                <Bell className="w-10 h-10 rounded-full bg-secondary-light p-2" />
                <User className="w-10 h-10 rounded-full bg-secondary-light p-2" />
              </div>
            </div>{" "}
            <select
              value={i18n.language}
              onChange={(e) => {
                i18n.changeLanguage(e.target.value);
                localStorage.setItem("lang", e.target.value);
              }}
              className="w-full border rounded-md px-2 py-2"
              style={{ borderColor: "var(--primary-color)" }}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="ml">മലയാളം</option>
            </select>{" "}
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

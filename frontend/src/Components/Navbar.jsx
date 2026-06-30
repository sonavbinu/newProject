import React from "react";
import ThemeToggle from "../redux/Components/Common/themeToggle";
import { HandCoins, CirclePoundSterling, Bell, User } from "lucide-react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <nav className=" p-4 border border-b-blue-500 border-t-gray-200 shadow-xl">
        <div className="flex justify-between items-center ">
          <div className="flex gap-10 items-center ">
            <h1
              className="text-3xl font-bold "
              style={{ color: "var(--primary-color)" }}
            >
              {" "}
              REWARDIFY
            </h1>
            <p>
              {t("navbar.welcome")},{t("navbar.user")}
            </p>
          </div>
          <div className="flex justify-around gap-10 items-center">
            <h4 className="flex gap-2 bg-secondary-light  rounded-xl px-2 py-1">
              {t("navbar.xcoins")}:
              <span className="text-[#e7b019] font-bold"> 300 </span>
              <CirclePoundSterling className="text-[#e7b019] font-bold" />
            </h4>
            <div>
              <div className="flex gap-3 cursor-pointer">
                {" "}
                <HandCoins
                  size={20}
                  className=" w-10 h-10 bg-secondary-light rounded-full px-2"
                />
                <Bell
                  size={20}
                  className=" w-10 h-10 bg-secondary-light rounded-full px-2"
                />
                <User
                  size={20}
                  className=" w-10 h-10 bg-secondary-light rounded-full px-2"
                />
              </div>{" "}
            </div>{" "}
            <select
              onChange={(e) => {
                (i18n.changeLanguage(e.target.value),
                  localStorage.setItem("lang", e.target.value));
              }}
              value={i18n.language}
              className="border rounded-md 
               px-2 py-1 mb-4"
              style={{ borderColor: "var(--primary-color)" }}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="ml"> മലയാളം</option>
            </select>
            <ThemeToggle />
          </div>{" "}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

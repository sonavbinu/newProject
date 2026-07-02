import React, { useState } from "react";
import { Menu, X, User, Store, Wallet, Info, LogOut } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = [
    { name: t("profile.profileDetails"), path: "", icon: User },
    { name: t("profile.shopDetails"), path: "shop-details", icon: Store },
    { name: t("profile.myWallet"), path: "wallet", icon: Wallet },
    { name: t("profile.about"), path: "about", icon: Info },
    { name: t("profile.logout"), path: "logout", icon: LogOut },
  ];
  return (
    <div>
      <div className="lg:hidden flex justify-end ">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md hover:shadow cursor-pointer"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-3  min-h-screen  w-full">
        <div className="lg:w-72 w-full bg-white rounded-xl shadow ">
          <div className="flex gap-6">
            <div
              className={`${
                menuOpen ? "block" : "hidden"
              } lg:block w-full lg:w-72 bg-white rounded-xl `}
            >
              <nav className="flex flex-col gap-2 p-4   ">
                {menuItems.map(({ path, name, icon: Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={path === ""}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-full px-4 py-3 transition-all duration-200 ${
                        isActive
                          ? "bg-[var(--primary-light)] font-bold text-[var(--primary-color)] font-semibold"
                          : "text-gray-600 hover:bg-gray-100 "
                      }`
                    }
                  >
                    <Icon size={20} />
                    <span className="text-sm sm:text-base">{name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className=" flex-1 bg-white rounded-xl shadow p-4 sm:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;

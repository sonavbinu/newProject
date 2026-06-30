import React from "react";
import { User, Store, Wallet, Info, LogOut } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const Profile = () => {
  const menuItems = [
    { name: "Profile Details", path: "", icon: User },
    { name: "Shop Details", path: "shop-details", icon: Store },
    { name: "My Wallet", path: "wallet", icon: Wallet },
    { name: "About REWARDIFY", path: "about", icon: Info },
    { name: "Logout", path: "logout", icon: LogOut },
  ];
  return (
    <div className="w-full ">
      <div className="flex gap-10 justify-between min-h-screen p-6 w-full">
        <div className="w-72 bg-white rounded-xl shadow p-5">
          <nav className="flex flex-col gap-2 p-4 ">
            {menuItems.map(({ path, name, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--primary-light)] font-bold text-[var(--primary-color)] "
                      : "text-gray-600 hover:bg-gray-100 "
                  }`
                }
              >
                <Icon />
                <span>{name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className=" flex-1 bg-white rounded-xl shadow p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;

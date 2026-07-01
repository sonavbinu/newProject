import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  User,
  Menu,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Sidebar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuItems = [
    { name: t("sidebar.dashboard"), path: "/dashboard", icon: LayoutDashboard },
    { name: t("sidebar.orders"), path: "/order", icon: ShoppingCart },
    {
      name: t("sidebar.myProducts"),
      path: "/my-products",
      icon: Package,
    },
    {
      name: t("sidebar.profile"),
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <>
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden fixed top-3 left-4 cursor-pointer hover:bg-gray-100 z-50 p-2 bg-white rounded-md shadow"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={` fixed lg:static top-0 left-0 z-40 
      min-h-screen w-64 bg-white shadow-xl
        transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }
        lg:translate-x-0
        `}
      >
        <div className="flex flex-col items-center justify-center mt-10 w-full">
          {/* <div className="p-4 text-md font-bold mt-10">
            {t("sidebar.storeName")}
          </div>
          <p className="text-gray-300 text-sm">
            {t("sidebar.shopId")}:12345678
          </p>{" "} */}
          <div
            className={`${open ? "block" : "hidden"} lg:block w-full  bg-white rounded-xl  `}
          >
            <nav className="flex flex-col gap-2 p-4">
              {menuItems.map(({ path, name, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3  rounded-md transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--primary-light)]  font-bold border-r-4 border-[var(--primary-color)] font-semibold hover:bg-gray-100 text-md"
                        : "text-gray-600 hover:bg-gray-100 text-md"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{name}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

import { NavLink } from "react-router-dom";
import "../styles/globals.css";
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
        {!open && (
          <button onClick={() => setOpen(true)} className="sidebar-toggle ">
            <Menu size={20} />
          </button>
        )}
      </div>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-30"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <aside className={`sidebar ${open ? "sidebar-open  " : "sidebar-close"}`}>
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden absolute right-1 top-1  shadow cursor-pointer py-2 px-2 rounded-md hover:bg-gray-100"
        >
          <X size={20} />
        </button>
        <div className="flex flex-col items-center justify-center mt-1 w-full pt-10">
          <div
            className={`${open ? "block" : "hidden"} lg:block w-full   bg-white rounded-xl  `}
          >
            <nav className="flex flex-col gap-2 p-1">
              {menuItems.map(({ path, name, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
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

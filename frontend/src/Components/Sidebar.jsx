import { NavLink } from "react-router-dom";
import "../styles/globals.css";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  User,
  Menu,
  X,
  Store,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const selectedStore = useSelector((state) => state.store.selectedStore);

  const menuItems = [
    { name: t("sidebar.dashboard"), path: "/dashboard", icon: LayoutDashboard },
    { name: t("sidebar.orders"), path: "/order", icon: ShoppingCart },
    { name: t("sidebar.myProducts"), path: "/my-products", icon: Package },
    { name: t("sidebar.profile"), path: "/profile", icon: User },
  ];

  return (
    <>
      <div>
        {!open && (
          <button onClick={() => setOpen(true)} className="sidebar-toggle">
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

      <aside className={`sidebar ${open ? "sidebar-open" : "sidebar-close"}`}>
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden absolute right-3 top-3 shadow cursor-pointer py-2 px-2 rounded-md hover:bg-gray-100 transition"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col h-full w-full pt-8 px-3">
          {/* Brand mark */}
          <div className="flex items-center gap-2.5 px-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-[var(--primary-light)] flex items-center justify-center shrink-0">
              <Store className="text-[var(--primary-color)]" size={18} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-gray-900 text-sm truncate">
                {selectedStore?.storeName || "Your Store"}
              </span>
              <span className="text-xs text-gray-400">Vendor Panel</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {menuItems.map(({ path, name, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm ${
                    isActive
                      ? "bg-[var(--primary-light)] text-[var(--primary-color)] font-semibold"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={19}
                      className={
                        isActive
                          ? "text-[var(--primary-color)]"
                          : "text-gray-400 group-hover:text-gray-600"
                      }
                    />
                    <span>{name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

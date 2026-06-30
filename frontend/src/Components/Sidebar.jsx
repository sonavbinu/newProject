import { NavLink } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, Package, User } from "lucide-react";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();
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
    <aside className="w-64 h-screen bg-white border-r border-blue-400">
      <div className="flex flex-col items-center justify-center">
        <div className="p-4 text-md font-bold">{t("sidebar.storeName")}</div>
        <p className="text-gray-300 text-sm">{t("sidebar.shopId")}:12345678</p>
      </div>

      <nav className="flex flex-col gap-2 p-4">
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
    </aside>
  );
};

export default Sidebar;

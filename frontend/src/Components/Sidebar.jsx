import { NavLink } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, Package, User } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Orders", path: "/order", icon: ShoppingCart },
    {
      name: "My Products",
      path: "/my-products",

      icon: Package,
    },
    {
      name: "Profile",
      path: "/profile",

      icon: User,
    },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r">
      <div className="flex flex-col items-center justify-center">
        <div className="p-4 text-md font-bold">Kannan departmental</div>
        <p className="text-gray-300 text-sm">Shop ID :12345678</p>
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

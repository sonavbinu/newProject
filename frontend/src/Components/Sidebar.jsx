import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/users" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-100 border-r">
      <div className="p-4 text-xl font-bold">Admin Panel</div>

      <nav className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="px-4 py-2 rounded"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "var(--primary-color)" : "",
              color: isActive ? "white" : "",
            })}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

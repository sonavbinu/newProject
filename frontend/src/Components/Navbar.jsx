import React from "react";
import ThemeToggle from "../redux/Components/Common/themeToggle";

const Navbar = () => {
  return (
    <div>
      <nav
        style={{ backgroundColor: "var(--primary-color)" }}
        className="text-white p-4 flex  justify-between items-center"
      >
        <h1>Navbar</h1>
        <ThemeToggle />
      </nav>
    </div>
  );
};

export default Navbar;

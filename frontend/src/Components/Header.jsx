import React from "react";
import ColorPicker from "../redux/Components/Common/ColorPicker";
import ThemeToggle from "../redux/Components/Common/themeToggle";

const Header = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ThemeToggle />
    </div>
  );
};

export default Header;

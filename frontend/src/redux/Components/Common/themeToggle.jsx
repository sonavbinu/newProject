import { useDispatch } from "react-redux";
import { setTheme, toggleDarkMode } from "../../slices/themeSlice";
import { useState } from "react";

const ThemeToggle = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <select
        className="border rounded p-2"
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
        }}
        onChange={(e) => dispatch(setTheme(e.target.value))}
      >
        <option value="">Theme</option>
        <option value="theme-blue">Blue</option>
        <option value="theme-orange">Orange</option>
        <option value="theme-red"> Red</option>
        <option value="theme-green">Green</option>
        <option value="theme-pink">Pink</option>
        <option value="theme-amber">Amber</option>
        <option value="theme-slate">Slate</option>
        <option value="theme-purple">Purple</option>
        <option value="theme-cyan">Cyan</option>
        <option value="theme-black">Black</option>
        <option value="theme-green2">Green2</option>
      </select>
    </div>
  );
};

export default ThemeToggle;

import { useDispatch } from "react-redux";
import { setTheme, toggleDarkMode } from "../../slices/themeSlice";
import { useState } from "react";
import { Palette } from "lucide-react";

const themes = [
  { name: "Blue", value: "theme-blue" },
  { name: "Orange", value: "theme-orange" },
  { name: "Purple", value: "theme-purple" },
  { name: "Green", value: "theme-green" },
];

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center"
      >
        <Palette size={20} className="cursor-pointer" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {themes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => {
                dispatch(setTheme(theme.value));
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {theme.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;

import { useDispatch } from "react-redux";
import { setTheme, toggleDarkMode } from "../../slices/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(toggleDarkMode())}>Dark Mode</button>
      <button
        className="h-8 w-8 rounded-full bg-blue-600"
        onClick={() => dispatch(setTheme("theme-blue"))}
      ></button>
      <button
        className="h-8 w-8 rounded-full bg-orange-500"
        onClick={() => dispatch(setTheme("theme-orange"))}
      ></button>
      <button
        className="h-8 w-8 rounded-full bg-red-500"
        onClick={() => dispatch(setTheme("theme-red"))}
      ></button>
    </div>
  );
};

export default ThemeToggle;

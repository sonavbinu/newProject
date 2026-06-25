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
      <button
        className="h-8 w-8 rounded-full bg-green-500"
        onClick={() => dispatch(setTheme("theme-green"))}
      ></button>
      <button
        className="h-8 w-8 rounded-full bg-pink-500"
        onClick={() => dispatch(setTheme("theme-pink"))}
      ></button>
      <button
        className="h-8 w-8 rounded-full bg-amber-500"
        onClick={() => dispatch(setTheme("theme-amber"))}
      ></button>
      <button
        className="h-8 w-8 rounded-full bg-slate-500"
        onClick={() => dispatch(setTheme("theme-slate"))}
      ></button>
      <button
        className="h-8 w-8 rounded-full bg-purple-500"
        onClick={() => dispatch(setTheme("theme-purple"))}
      ></button>
    </div>
  );
};

export default ThemeToggle;

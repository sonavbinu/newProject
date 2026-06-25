import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { useSelector } from "react-redux";

const App = () => {
  const { color, darkMode } = useSelector((state) => state.theme);
  return (
    <div
      className={`${color} ${darkMode ? "dark" : ""}`}
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      <AppRoutes />
    </div>
  );
};

export default App;

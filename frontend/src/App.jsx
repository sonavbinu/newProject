import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;

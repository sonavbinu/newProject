import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchSelectedStore } from "./redux/slices/storeSlice";

const App = () => {
  const dispatch = useDispatch();
  const selectedStore = useSelector((state) => state.store.selectedStore);
  const { color, darkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    const savedStoreId = localStorage.getItem("selectedStoreId");
    if (savedStoreId && !selectedStore) {
      dispatch(fetchSelectedStore(savedStoreId));
    }
  }, []);
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

import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { useSelector } from "react-redux";

const App = () => {
  const theme = useSelector((state) => state.theme.color);
  return (
    <div className={theme}>
      <AppRoutes />
    </div>
  );
};

export default App;

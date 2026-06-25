import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

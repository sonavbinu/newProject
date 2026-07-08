import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <Sidebar />

      <div className="lg:ml-[260px]">
        <Navbar />

        <main className="p-6 pt-30">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

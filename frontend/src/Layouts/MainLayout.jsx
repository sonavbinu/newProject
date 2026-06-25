import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const MainLayout = () => {
  return (
    <div>
      <div className=" min-h-screen flex flex-col">
        <Navbar />

        <div className="flex">
          <Sidebar />{" "}
          <div className="flex-1 flex">
            <Header />
            <main className="p-6">
              {" "}
              <Outlet />{" "}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

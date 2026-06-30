import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const MainLayout = () => {
  return (
    <div>
      <div className=" min-h-screen flex flex-col">
        <Navbar />

        <div className="flex flex-1">
          <Sidebar />{" "}
          <div className="flex-1 flex flex-col">
            {/* <Header /> */}
            <main className="p-6" flex-1 p-6 bg-gray-50>
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

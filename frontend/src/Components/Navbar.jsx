import React from "react";
import ThemeToggle from "../redux/Components/Common/themeToggle";
import { HandCoins } from "lucide-react";
import { CirclePoundSterling } from "lucide-react";
import { Bell } from "lucide-react";
import { User } from "lucide-react";

const Navbar = () => {
  return (
    <div>
      <nav className=" p-4 border border-b-blue-500 border-t-gray-200 shadow-xl">
        <div className="flex justify-between items-center ">
          <div className="flex gap-10 items-center ">
            <h1
              className="text-3xl font-bold "
              style={{ color: "var(--primary-color)" }}
            >
              {" "}
              REWARDIFY
            </h1>
            <p>Welcome , User</p>
          </div>
          <div className="flex justify-around gap-10 items-center">
            <h4 className="flex gap-2 bg-secondary-light  rounded-xl px-2 py-1">
              XCoins:<span className="text-[#e7b019] font-bold"> 300 </span>
              <CirclePoundSterling className="text-[#e7b019] font-bold" />
            </h4>
            <div>
              <div className="flex gap-3 cursor-pointer">
                {" "}
                <HandCoins
                  size={20}
                  className=" w-10 h-10 bg-secondary-light rounded-full px-2"
                />
                <Bell
                  size={20}
                  className=" w-10 h-10 bg-secondary-light rounded-full px-2"
                />
                <User
                  size={20}
                  className=" w-10 h-10 bg-secondary-light rounded-full px-2"
                />
              </div>{" "}
            </div>{" "}
            <ThemeToggle />
          </div>{" "}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

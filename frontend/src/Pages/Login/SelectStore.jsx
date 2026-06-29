import React, { useState } from "react";
import profile from "../../assets/profile.avif";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgimg from "../../assets/bgimg.jpg";

const SelectStore = () => {
  const [selectedStore, setSelectedStore] = useState("1");
  const navigate = useNavigate();
  return (
    <div className=" relative w-full min-h-screen border border-gray-300 px-4 py-6 rounded-md">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{ backgroundImage: `url(${bgimg})` }}
      ></div>{" "}
      <ArrowLeft
        style={{ color: "#555a5f" }}
        onClick={() => navigate("/mobile-input")}
      />
      <div className="flex flex-col justify-center items-center gap-4 w-[400px] bg-white px-2 py-4 relative z-10">
        <div>
          <h2 className="text-2xl font-bold text-center">Select Your Store</h2>
          <p className="text-gray-500">
            Your number is connected with 2 stores
          </p>
        </div>
        <label
          className={`flex justify-between items-center w-full px-4 py-3 rounded-md border cursor-pointer transition-all
             ${selectedStore === "1" ? "border-[#8BD2B] ring-2 ring-[#8BAD2B] bg-[#f9f9e9]" : "border-gray-200 bg-white hover:border-[#8BAD2B]"}`}
        >
          <div className="flex gap-4">
            <img
              className="w-16 h-16 object-cover rounded-lg"
              src={profile}
              alt=""
            />
            <div className="flex flex-col  ">
              <p>Annapoorna Hotel</p>
              <p className="text-sm text-gray-400 font-medium ">
                Sitra,Coimbatore
              </p>
              <p className="text-sm text-gray-400 font-medium">
                Store ID:12345
              </p>
            </div>
          </div>

          <div>
            <input
              type="radio"
              value="1"
              checked={selectedStore === "1"}
              onChange={(e) => setSelectedStore(e.target.value)}
              name="store"
              className="w-5 h-5 text-[#8BAD2B] border-gray-300 focus:ring-[#8BAD2B]"
            />
          </div>
        </label>
        <label
          className={`flex justify-between items-center w-full px-4 py-3 rounded-md border cursor-pointer transition-all
             ${selectedStore === "2" ? "border-[#8BD2B] ring-2 ring-[#8BAD2B] bg-[#f9f9e9]" : "border-gray-200 bg-white hover:border-[#8BAD2B]"}`}
        >
          <div className="flex gap-4">
            <img
              className="w-16 h-16 object-cover rounded-lg"
              src={profile}
              alt=""
            />
            <div className="flex flex-col  ">
              <p>Annapoorna Hotel</p>
              <p className="text-sm text-gray-400 font-medium ">
                Sitra,Coimbatore
              </p>
              <p className="text-sm text-gray-400 font-medium">
                Store ID:12345
              </p>
            </div>
          </div>

          <div>
            <input
              type="radio"
              value="2"
              checked={selectedStore === "2"}
              onChange={(e) => setSelectedStore(e.target.value)}
              name="store"
              className="w-5 h-5 text-[#8BAD2B] border-gray-300 focus:ring-[#8BAD2B]"
            />
          </div>
        </label>
      </div>
      <div>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#8BAD2B] text-white w-full px-4 py-3 rounded-md font-bold cursor-pointer "
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SelectStore;

import React from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <div
      className="max-w-md w-full border border-gray-300  shadow-md
     rounded-md flex items-center justify-center"
    >
      <div className="p-6 flex flex-col items-center text-center gap-4 ">
        <h2 className="text-2xl font-bold">Enter Store Details</h2>
        <p className="text-gray-600 text-sm ">
          Enter details manually to <br /> get started into ORIGIN
        </p>
        <button
          className="bg-[var(--primary-color)] text-white py-3 
        rounded-md font-medium transition cursor-pointer 
        mt-2 max-w-md w-full hover:bg-[var(--primary-hover)] "
          onClick={() => navigate("/store-info")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default GetStarted;

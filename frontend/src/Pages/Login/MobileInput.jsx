import React, { useState } from "react";
import logo from "../../assets/logo.png";
import bgimg from "../../assets/bgimg.jpg";
import { useNavigate } from "react-router-dom";

const MobileInput = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  return (
    <div className="min-h-screen flex justify-center items-center gap-4 ">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm "
        style={{
          backgroundImage: `url(${bgimg})`,
        }}
      ></div>
      <div className="w-full bg-white  border border-gray-300 rounded-lg  flex flex-col px-20 py-10 justify-center items-center overflow-hidden animate-fadeIn relative z-10">
        {open && (
          <p className="text-green-600 text-sm text-center m-2 font-medium bg-green-100 rounded-md  w-full p-1 ">
            OTP sent successfully!
          </p>
        )}
        <img src={logo} alt="" className="mb-3" />
        <div>
          <h2 className="text-2xl font-bold mb-3 ">
            Get started with REWARDIFY
          </h2>
          <p className="text-gray-600 text-center mb-3">
            Enter your mobile number or ShopID <br /> to get started
          </p>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div>
            <input
              type="tel"
              placeholder="Enter ShopID/mobile number"
              className="w-full mb-4 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8BAD2B] focus:border-transparent transition-all duration-200 "
            />
          </div>
          <div>
            <button
              onClick={() => navigate("/otp-verification")}
              type="submit"
              className="font-medium mb-3 rounded-md transition-all duration-200 ease-in-out px-4 py-2 bg-[#8BAD2B] text-white w-full shadow-sm cursor-pointer hover:bg[#7a9925]"
            >
              Send OTP
            </button>
          </div>
        </form>

        <div>
          <p className="text-sm text-center ">
            By clicking, you agree to <br />
            our <span className="text-[#8BAD2B]">
              Terms & Conditions{" "}
            </span> and <span className="text-[#8BAD2B]">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileInput;

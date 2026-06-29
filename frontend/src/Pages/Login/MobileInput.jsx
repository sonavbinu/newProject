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
    setTimeout(() => {
      navigate("/otp-verification");
    }, 1500);
  };
  return (
    <div className="  theme-green2 relative min-h-screen flex justify-center items-center  w-full ">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm  "
        style={{
          backgroundImage: `url(${bgimg})`,
        }}
      ></div>

      <div className="absolute inset-0 bg-black/20"></div>
      <div
        className="w-full bg-white  border rounded-xl  flex flex-col px-20 py-10
        max-w-md
        justify-center items-center overflow-hidden animate-fadeIn relative z-10"
        style={{ borderColor: "var(--border-color)" }}
      >
        {open && (
          <p
            className=" success-message text-sm text-center m-2 font-medium  rounded-md  w-full p-1 "
            style={{
              color: "var(--primary-color)",
              backgroundColor: "var(--secondary-color)",
            }}
          >
            OTP sent successfully!
          </p>
        )}
        <img src={logo} alt="" className="mb-3" />
        <div>
          <h2 className="text-2xl font-bold mb-2 text-center">
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
              className="w-[300px] border  mb-4 px-4 py-3 rounded-md input-theme
              "
            />
          </div>
          <div>
            <button
              type="submit"
              className="font-medium mb-3 rounded-md  transition-all duration-200 ease-in-out px-4 py-2 btn-primary  w-full shadow-sm cursor-pointer "
            >
              Send OTP
            </button>
          </div>
        </form>

        <div>
          <p className="text-sm text-center text-gray-500  mt-8 ">
            By clicking, you agree to <br />
            our <span className="text-primary">
              Terms & Conditions{" "}
            </span> and <span className="text-primary">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileInput;

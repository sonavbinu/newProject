import React from "react";
import logo from "../../assets/logo.png";
import bgimg from "../../assets/bgimg.jpg";

const OtpVerify = () => {
  return (
    <div className=" relative min-h-screen w-full border p-10 flex flex-col justify-center items-center rounded-md p-4 md:p-6">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
        style={{ backgroundImage: `url(${bgimg})` }}
      ></div>
      <div className="relative z-10 bg-white rounded-lg shadow-lg px-10 py-10 w-full max-w-md text-center flex flex-col items-center gap-4 ">
        <div className="relative z-10 ">
          <img src={logo} alt="" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Verify your details</h2>
          <p className="text-gray-500 text-center">Enter OTP number below</p>
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 w-15 h-15 focus:ring-2 focus:ring-[#8BAD2B] focus:outline-none text-center rounded-md"
            type="text"
            maxLength={1}
            inputMode="numeric"
            autoComplete="one-time-code"
          />
          <input
            className="border border-gray-300 w-15 h-15
        focus:ring-2 focus:ring-[#8BAD2B]
        focus:outline-none text-center rounded-md
        "
            type="text"
            maxLength={1}
            inputMode="numeric"
            autoComplete="one-time-code"
          />
          <input
            className="border border-gray-300 w-15 h-15
        focus:ring-2 focus:ring-[#8BAD2B]
        focus:outline-none text-center rounded-md
        "
            maxLength={1}
            inputMode="numeric"
            autoComplete="one-time-code"
          />
          <input
            className="border border-gray-300 w-15 h-15
        focus:ring-2 focus:ring-[#8BAD2B]
        focus:outline-none text-center rounded-md
        "
            maxLength={1}
            inputMode="numeric"
            autoComplete="one-time-code"
          />
        </div>
        <div>
          <button className="bg-[#8BAD2B] hover:bg-[#7a9925] text-white p-2 w-[400px] cursor-pointer rounded-md  ">
            Verify and Continue
          </button>
        </div>
        <div>
          <p>
            Didn't receive OTP ?{" "}
            <span className="text-[#8BAD2B] hover:underline cursor-pointer">
              Resend
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;

import React, { useState, useTransition } from "react";
import logo from "../../assets/logo.png";
import bgimg from "../../assets/bgimg.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { sendOTP } from "../../api/authApi";
import { sendOtpEmail } from "../../api/emailService";

const MobileInput = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendOTP(email);

      if (res.data.success) {
        await sendOtpEmail(email, res.data.otp);
        setOpen(true);

        localStorage.setItem("email", email);
        console.log(localStorage.getItem("email"));

        setTimeout(() => {
          navigate("/otp-verification");
        }, 1000);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };
  return (
    <div className="  theme-green px-4 sm:px-6 relative min-h-screen flex justify-center items-center  w-full ">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{
          backgroundImage: `url(${bgimg})`,
        }}
      ></div>

      <div className="absolute inset-0 bg-black/20"></div>
      <div
        className="w-full bg-white  border rounded-2xl shadow-xl max-w-md flex flex-col px-6 py-8 sm:px-10 sm:py-10
        
        justify-center items-center overflow-hidden animate-fadeIn relative z-10"
        style={{ borderColor: "var(--border-color)" }}
      >
        {open && (
          <p
            className=" success-message text-sm text-center text-green-500 mb-4 font-medium  rounded-md  w-full p-1 "
            style={{
              backgroundColor: "var(--secondary-color)",
            }}
          >
            {t("mobileInput.otpSent")}
          </p>
        )}
        <img src={logo} alt="" className="mb-6  w-20 h-20" />
        <div>
          <h2 className="text-2xl sm:text-3xl  font-bold mb-2 text-center">
            {t("mobileInput.heading")}
          </h2>
          <p className="text-gray-600 text-center text-sm sm:text-base  mb-3 leading-7">
            {t("mobileInput.description")}
          </p>
        </div>
        <form className="flex flex-col w-full " onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("mobileInput.placeholder")}
              className="w-full  border  mb-4 px-4 py-3 rounded-md focus:outline-none input-theme
              "
            />
          </div>
          <div>
            <button
              disabled={!email.includes("@")}
              type="submit"
              className={`font-medium mb-3 rounded-md  transition-all duration-200 ease-in-out px-4 py-3 w-full shadow-sm cursor-pointer 
                ${email.includes("@") ? "btn-primary cursor-pointer" : "bg-[#c6d695] text-white cursor-not-allowed"}
                `}
            >
              {t("mobileInput.sendOtp")}
            </button>
          </div>
        </form>

        <div>
          <p className="text-sm text-center text-gray-500 leading-6  mt-8 ">
            {t("mobileInput.agree")}
            <br />
            <span className="text-primary cursor-pointer">
              {t("mobileInput.terms")}{" "}
            </span>{" "}
            {t("mobileInput.and")}
            <span className="text-primary cursor-pointer">
              {t("mobileInput.privacy")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileInput;

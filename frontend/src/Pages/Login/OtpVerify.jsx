import React, { useEffect, useState, useRef } from "react";
import logo from "../../assets/logo.png";
import bgimg from "../../assets/bgimg.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { sendOtpEmail } from "../../api/emailService";
import { sendOTP, verifyOTP } from "../../api/authApi";

const OtpVerify = () => {
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    try {
      const email = localStorage.getItem("email");
      console.log(email);
      const res = await sendOTP(email);

      if (res.data.success) {
        await sendOtpEmail(email, res.data.otp);
        alert("New OTP sent successfully!");
        setTimer(60);
        setOtp(["", "", "", ""]);
        inputRefs.current[0]?.focus();
        alert("A new OTP has been sent to your email");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);

    if (index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  const handleVerify = async () => {
    const enteredOTP = otp.join("");

    try {
      const email = localStorage.getItem("email");

      const res = await verifyOTP(email, enteredOTP);

      console.log("Verify response:", res.data);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);

        console.log("Token after saving:", localStorage.getItem("token"));

        navigate("/select-store");
      }
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  // const navigate = useNavigate();
  return (
    <div className="theme-green relative min-h-screen w-full  p-10 flex flex-col justify-center items-center  px-4  sm:px-6">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm "
        style={{ backgroundImage: `url(${bgimg})` }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>
      <div
        className="relative z-10 bg-white rounded-xl border shadow-xl px-6 py-8 sm:px-10 sm:py-10  w-full max-w-md text-center flex flex-col items-center gap-4 "
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="relative z-10 ">
          <img src={logo} alt="" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-center sm:text-3xl">
            {t("otpVerify.heading")}
          </h2>
          <p className="text-gray-500 text-center mb-6 text-sm sm:text-base">
            {t("otpVerify.description")}
          </p>
        </div>
        <div className="w-full max-w-md mx-auto">
          <div className="flex gap-3 justify-center mb-6">
            {otp.map((digit, index) => (
              <input
                type="text"
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                maxLength={1}
                inputMode="numeric"
                autoComplete="one-time-code"
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="border border-gray-300 w-12 h-12 sm:w-14 sm:h-14 text-lg font-semibold text-center rounded-md
                 focus:ring-2 focus:ring-[#8BAD2B] focus:outline-none"
              />
            ))}
          </div>
          <div>
            <button
              onClick={handleVerify}
              className={`text-white py-3 px-2 w-full cursor-pointer font-medium rounded-md transition ${
                otp.every((digit) => digit !== "")
                  ? "btn-primary cursor-pointer"
                  : "bg-[#c6d695] text-white cursor-not-allowed"
              }`}
            >
              {t("otpVerify.verifyButton")}
            </button>
          </div>
        </div>

        <div>
          <p>
            {t("otpVerify.didntReceive")}
            {timer > 0 ? (
              <span className="text-gray-400 ">
                {t("otpVerify.resendIn")} {timer}s
              </span>
            ) : (
              <span
                onClick={handleResend}
                className="text-primary hover:underline cursor-pointer"
              >
                {t("otpVerify.resend")}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;

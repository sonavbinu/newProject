import React from "react";
import logo from "../../assets/logo.png";
import bgimg from "../../assets/bgimg.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="theme-green2 relative min-h-screen w-full  flex  justify-center items-center   ">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm "
        style={{
          backgroundImage: `url(${bgimg})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>
      <div>
        {" "}
        <div
          className="flex bg-white   overflow-hidden animate-fadeIn  
        flex-col border border-gray-200 px-20 py-10 max-w-md justify-center 
        items-center text-center rounded-xl
         shadow-xl relative z-10"
        >
          <div>
            <img
              className="w-full h-full  object-contain mb-3"
              src={logo}
              alt="logo"
            />
            <select
              onChange={(e) => {
                (i18n.changeLanguage(e.target.value),
                  localStorage.setItem("lang", e.target.value));
              }}
              value={i18n.language}
              className="border rounded-md 
               px-2 py-1 mb-4"
              style={{ borderColor: "var(--primary-color)" }}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ml"> Malayalam</option>
            </select>
          </div>
          <h2 className="text-2xl font-bold flex mb-2">{t("login.heading")}</h2>
          <p className="text-gray-600 text-sm  mb-6">
            {t("login.description")}
          </p>
          <div className="flex gap-2 justify-center mb-6">
            <span className="h-2 w-2  rounded-full dot-primary"></span>
            <span className="h-2 w-2 rounded-full bg-gray-300"></span>
            <span className="h-2 w-2 rounded-full bg-gray-300"></span>
          </div>
          <div className="w-full space-y-3">
            <button
              className="btn-primary border px-4 py-2 w-full shadow-sm cursor-pointer font-medium rounded-md transition-all duraiton-200 ease-in-out hover:bg-[#7a9925] mb-5"
              onClick={() => navigate("/mobile-input")}
            >
              {t("login.login")}
            </button>
            <span
              className="px-4  py-3 mb-5 rounded-md font-medium transition-all duration-200 ease-in-out 
             w-full bg-transparent text-[#8BAD2B] hover:underline  text-primary
             cursor-pointer"
            >
              {t("login.contact")}
            </span>
          </div>
          <div>
            <p className="text-sm text-center  text-gray-500 mt-4 leading-6">
              {t("login.agree")}
              <span className="text-primary font-medium cursor-pointer">
                {t("login.terms")}
              </span>{" "}
              {t("login.and")}
              <span className="text-primary font-medium cursor-pointer">
                {" "}
                {t("login.privacy")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

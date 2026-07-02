import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Logout = ({ onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-md rounded-2xl bg-white px-8 py-10 shadow-xl">
        <div className="absolute left-1/2 -top-7 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary-color)] text-white shadow-lg">
          <LogOut size={28} />
        </div>
        <div className="mt flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{t("logout.title")}</h2>
          <p>
            {t("logout.message")} <strong>ORIGIN</strong>?
          </p>
          <div className="flex gap-4">
            <button
              className="bg-gray-500 text-white p-2 rounded-xl hover:bg-gray-400 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              {t("common.cancel")}
            </button>
            <button
              className="bg-[var(--primary-color)]  p-2 rounded-xl hover:bg-[var(--primary-hover)] cursor-pointer  text-white"
              onClick={handleLogout}
            >
              {t("logout.title")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;

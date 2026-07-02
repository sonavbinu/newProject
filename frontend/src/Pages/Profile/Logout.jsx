import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Logout = ({ onClose }) => {
  const navigate = useNavigate();

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
        <div className="mt">
          <h2>Logout</h2>
          <p>
            Do you really want to logout from <strong>ORIGIN</strong>?
          </p>
          <div>
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;

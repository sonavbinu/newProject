import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer hover:underline"
      onClick={() => navigate("/")}
    >
      Logout
    </div>
  );
};

export default Logout;

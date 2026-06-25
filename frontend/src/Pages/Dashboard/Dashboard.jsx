import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Link
        to="/dashboard"
        style={{
          color: "var(--primary-color)",
        }}
      >
        Dashboard
      </Link>
    </div>
  );
};

export default Dashboard;

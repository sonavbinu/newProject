import React from "react";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <div>
      <Link to="/users" style={{ color: "var(--primary-color)" }}>
        Users
      </Link>
    </div>
  );
};

export default Users;

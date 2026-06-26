import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Users from "../Pages/Users/Users";
import AuthLayout from "../Layouts/AuthLayout";
import MainLayout from "../Layouts/MainLayout";
import MobileInput from "../Pages/Login/MobileInput";
import OtpVerify from "../Pages/Login/OtpVerify";
import SelectStore from "../Pages/Login/SelectStore";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/mobile-input" element={<MobileInput />} />
          <Route path="/otp-verification" element={<OtpVerify />} />
          <Route path="/select-store" element={<SelectStore />} />
        </Route>

        {/* Main Routes */}

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;

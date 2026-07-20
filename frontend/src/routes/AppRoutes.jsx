import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import AuthLayout from "../Layouts/AuthLayout";
import MainLayout from "../Layouts/MainLayout";
import MobileInput from "../Pages/Login/MobileInput";
import OtpVerify from "../Pages/Login/OtpVerify";
import SelectStore from "../Pages/Login/SelectStore";
import Orders from "../Pages/Dashboard/Orders/Orders";
import MyProducts from "../Pages/Dashboard/MyProducts/MyProducts";
import Profile from "../Pages/Dashboard/Profile";
import ProfileDetails from "../Pages/Profile/ProfileDetails";
import ShopDetails from "../Pages/Profile/ShopDetails";
import Wallet from "../Pages/Profile/Wallet";
import About from "../Pages/Profile/About";
import Logout from "../Pages/Profile/Logout";
import AddProduct from "../Pages/Dashboard/MyProducts/AddProduct";
import ProductList from "../Pages/Dashboard/MyProducts/ProductList";
import Contact from "../Pages/Register/Contact/Contact";
import ContactModal from "../Pages/Register/Contact/ContactModal";
import ContactReceive from "../Pages/Register/Contact/ContactReceive";
import StoreInfo from "../Pages/Register/Register/StoreInfo/StoreInfo";
import Documents from "../Pages/Register/Register/StoreDocument/Documents";
import Agreement from "../Pages/Register/Register/Agreement/Agreement";
import Onboarding from "../Pages/Register/Register/onBoarding";
import ProtectedRoute from "../../ProtectedRoute";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/mobile-input" element={<MobileInput />} />
          <Route path="/otp-verification" element={<OtpVerify />} />
          <Route path="/select-store" element={<SelectStore />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-success" element={<ContactModal />} />
          <Route path="/contact-receive" element={<ContactReceive />} />
          <Route element={<Onboarding />}>
            <Route path="/store-info" element={<StoreInfo />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/agreement" element={<Agreement />} />
          </Route>
        </Route>

        {/* Main Routes */}

        <Route element={<ProtectedRoute />}>
          {" "}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/my-products" element={<MyProducts />}>
              <Route index element={<ProductList />} />
            </Route>
            <Route path="/add-product" element={<AddProduct />} />

            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfileDetails />} />
              <Route path="shop-details" element={<ShopDetails />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="about" element={<About />} />
              <Route path="logout" element={<Logout />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;

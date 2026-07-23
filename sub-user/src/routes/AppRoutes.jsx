import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import StoreSelect from "../Pages/Stores/StoreSelect";
import ProductBrowse from "../Pages/Products/ProductBrowse";
import ProtectedRoute from "../ProtectedRoute";
import Cart from "../Pages/Cart/Cart";
import OrderDetail from "../Pages/Orders/OrderDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/stores" element={<StoreSelect />} />
        <Route path="/stores/:storeId/products" element={<ProductBrowse />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

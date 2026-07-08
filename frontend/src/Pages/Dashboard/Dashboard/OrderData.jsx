import React from "react";
import { useSelector } from "react-redux";
import {
  Package,
  BadgeCheck,
  PackageCheck,
  CircleCheckBig,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderData = () => {
  const navigate = useNavigate();
  const orders = useSelector((state) => state.orders.orders);

  const totalOrders = orders.length;
  const confirmOrders = orders.filter(
    (order) => order.status === "preparing",
  ).length;

  const packedOrders = orders.filter(
    (order) => order.status === "packed",
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "completed",
  ).length;

  return (
    <div
      onClick={() => navigate("/order")}
      className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center hover:shadow-xl cursor-pointer">
        <Package size={36} className="text-[var(--primary-color)]" />
        <h3 className="text-xl font-bold text-center">Total Orders</h3>
        <h2 className="text-3xl font-bold mt-2 ">{totalOrders}</h2>
      </div>
      <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center hover:shadow-xl cursor-pointer ">
        <BadgeCheck size={36} className="text-[var(--primary-color)]" />
        <h3 className="text-xl font-bold">Confirmed</h3>
        <h2 className="text-3xl font-bold mt-3">{confirmOrders}</h2>
      </div>
      <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center hover:shadow-xl cursor-pointer">
        <PackageCheck size={36} className="text-[var(--primary-color)]" />
        <h3 className="text-xl font-bold">Packed</h3>
        <h2 className="text-3xl font-bold mt-3">{packedOrders}</h2>
      </div>
      <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center hover:shadow-xl cursor-pointer">
        <CircleCheckBig size={36} className="text-[var(--primary-color)]" />
        <h3 className="text-xl font-bold">Completed</h3>
        <h2 className="font-bold text-3xl mt-3">{completedOrders}</h2>
      </div>
    </div>
  );
};

export default OrderData;

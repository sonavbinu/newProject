import React from "react";
import { useSelector } from "react-redux";
import {
  Package,
  BadgeCheck,
  PackageCheck,
  CircleCheckBig,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#8B5CF6"];

const OrderData = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.orders.orders);

  const totalOrders = orders.length;
  const pendingConfirmation = orders.filter(
    (order) => order.status === "confirmation",
  ).length;
  const confirmOrders = orders.filter(
    (order) => order.status === "preparing",
  ).length;

  const packedOrders = orders.filter(
    (order) => order.status === "packed",
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "completed",
  ).length;

  const data = [
    { name: t("dashboard.orderData.confirmed"), value: confirmOrders },
    { name: t("dashboard.orderData.packed"), value: packedOrders },
    { name: t("dashboard.orderData.completed"), value: completedOrders },
    {
      name: t("dashboard.orderData.pendingConfirmation"),
      value: pendingConfirmation,
    },
  ];
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div
        onClick={() => navigate("/order")}
        className="grid grid-cols-1  sm:grid-cols-2 gap-6"
      >
        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center hover:shadow-xl cursor-pointer">
          <Package size={36} className="text-[var(--primary-color)]" />
          <h3 className="text-xl font-bold text-center">
            {t("dashboard.orderData.totalOrders")}
          </h3>
          <h2 className="text-3xl font-bold mt-2 ">{totalOrders}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center hover:shadow-xl cursor-pointer ">
          <BadgeCheck size={36} className="text-[var(--primary-color)]" />
          <h3 className="text-xl font-bold">
            {t("dashboard.orderData.confirmed")}
          </h3>
          <h2 className="text-3xl font-bold mt-3">{confirmOrders}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center hover:shadow-xl cursor-pointer">
          <PackageCheck size={36} className="text-[var(--primary-color)]" />
          <h3 className="text-xl font-bold">
            {t("dashboard.orderData.packed")}
          </h3>
          <h2 className="text-3xl font-bold mt-3">{packedOrders}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center hover:shadow-xl cursor-pointer">
          <CircleCheckBig size={36} className="text-[var(--primary-color)]" />
          <h3 className="text-xl font-bold">
            {t("dashboard.orderData.completed")}
          </h3>
          <h2 className="font-bold text-3xl mt-3">{completedOrders}</h2>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 ">
        <h2 className="text-xl font-bold">
          {t("dashboard.orderData.orderStatus")}
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderData;

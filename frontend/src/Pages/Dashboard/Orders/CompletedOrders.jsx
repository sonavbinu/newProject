import React from "react";
import { Phone, MapPin, Clock, Trash2, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const CompletedOrders = ({ order, onDelete }) => {
  const { t } = useTranslation();

  const formatDateTime = (date) =>
    `${new Date(date).toLocaleDateString()} | ${new Date(
      date,
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

  return (
    <div className="bg-white border border-green-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 size={14} className="text-green-600" />
          </div>
          <p className="font-semibold text-gray-900 text-sm">
            #{order._id.slice(-8).toUpperCase()}
          </p>
        </div>
        <p className="text-gray-400 text-xs">
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
          {t("orders.orderFor")}
        </p>
        <p className="font-medium text-gray-700">{order.customerName}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {order.customerPhone && (
          <div className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5">
            <Phone size={14} className="text-gray-400" />
            {order.customerPhone}
          </div>
        )}
        {order.customerAddress && (
          <div className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5">
            <MapPin size={14} className="text-gray-400" />
            {order.customerAddress}
          </div>
        )}
        <div className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5">
          <Clock size={14} className="text-gray-400" />
          {t("orders.selfPickup")}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          {t("orders.orderItems")}
        </p>
        <div className="bg-[var(--primary-light)] rounded-xl p-3 flex flex-col gap-1">
          {order.items.map((item) => (
            <div
              key={item.product}
              className="flex justify-between text-sm py-1.5 border-b border-white last:border-b-0"
            >
              <span className="text-gray-600 ">
                {item.quantity} × {item.name}
              </span>
              <span className="font-medium text-gray-700">₹{item.price}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
          <h4 className="text-sm text-gray-500">
            {t("orders.totalBillAmount")}
          </h4>
          <p className="text-lg font-bold text-gray-900">₹{order.total}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-gray-100 pt-3 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-green-500" />
            <span className="text-gray-600">{t("orders.deliveryPickup")}</span>
          </div>
          <span className="text-gray-400 text-xs">
            {order.packedAt ? formatDateTime(order.packedAt) : "-"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-green-500" />
            <span className="text-gray-600 font-medium">
              {t("orders.delivered")}
            </span>
          </div>
          <span className="text-gray-400 text-xs">
            {order.completedAt ? formatDateTime(order.completedAt) : "-"}
          </span>
        </div>
      </div>

      <button
        onClick={onDelete}
        className="flex items-center justify-center gap-2 text-red-400 hover:text-red-600 hover:bg-red-50 text-sm py-2 rounded-xl transition cursor-pointer"
        title="Delete order"
      >
        <Trash2 size={16} />
        Delete record
      </button>
    </div>
  );
};

export default CompletedOrders;

import React from "react";
import { Phone, MapPin, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const OrderCard = ({ order, activeTab, onConfirm, onReject, onDelete }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-[var(--primary-color)] font-semibold text-sm">
          #{order._id.slice(-8).toUpperCase()}
        </h3>
        <p className="text-gray-400 text-xs">
          {new Date(order.createdAt).toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="mt-3">
        <p className="font-semibold text-sm text-gray-900">
          {order.customerName}
        </p>

        <div className="flex gap-2 mt-2 flex-wrap">
          {order.customerPhone && (
            <p className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-100 bg-gray-50 rounded-lg px-2.5 py-1.5">
              <Phone size={13} className="text-[var(--primary-color)]" />
              {order.customerPhone}
            </p>
          )}

          {order.customerAddress && (
            <p className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-100 bg-gray-50 rounded-lg px-2.5 py-1.5">
              <MapPin size={13} className="text-[var(--primary-color)]" />
              {order.customerAddress}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          {t("orders.orderItems")}
        </p>

        <div className="bg-[var(--primary-light)] rounded-xl p-3 flex flex-col gap-1">
          {order.items.map((item) => (
            <div
              key={item.product}
              className="flex justify-between text-sm py-1.5 border-b border-white/60 last:border-b-0"
            >
              <span className="text-gray-700">
                {item.quantity} × {item.name}
              </span>
              <span className="font-medium text-gray-900">₹{item.price}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-1">
          <h4 className="text-sm text-gray-500">
            {t("orders.totalBillAmount")}
          </h4>
          <p className="text-lg font-bold text-gray-900">₹{order.total}</p>
        </div>

        <span className="text-xs w-fit bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
          {order.payment}
        </span>

        <div className="flex gap-2 mt-2">
          <button
            onClick={onReject}
            className="flex-1 bg-gray-100 text-gray-600 text-sm font-medium py-2.5 rounded-xl cursor-pointer hover:bg-gray-200 transition"
          >
            {t("orders.rejectOrder")}
          </button>

          <button
            onClick={onConfirm}
            className="flex-[2] bg-[var(--primary-color)] text-white text-sm font-medium py-2.5 rounded-xl cursor-pointer hover:opacity-90 transition"
          >
            {activeTab === "preparing"
              ? t("orders.verifyPackItems")
              : t("orders.confirmOrder")}
          </button>

          <button
            onClick={onDelete}
            className="bg-red-50 text-red-500 p-2.5 rounded-xl cursor-pointer hover:bg-red-100 transition"
            title="Delete order"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default OrderCard;

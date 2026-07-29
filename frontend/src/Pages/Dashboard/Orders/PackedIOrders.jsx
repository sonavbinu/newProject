import React from "react";
import {
  Phone,
  MapPin,
  Clock,
  Trash2,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const PackedIOrders = ({ order, onComplete, onDelete }) => {
  const { t } = useTranslation();

  const formatDateTime = (date) =>
    `${new Date(date).toLocaleDateString()} | ${new Date(
      date,
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <p className="font-semibold text-[var(--primary-color)] text-sm">
          #{order._id.slice(-8).toUpperCase()}
        </p>
        <p className="text-gray-400 text-xs">
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
          {t("orders.orderFor")}
        </p>
        <p className="font-medium text-gray-900">{order.customerName}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {order.customerPhone && (
          <div className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5">
            <Phone size={14} className="text-[var(--primary-color)]" />
            {order.customerPhone}
          </div>
        )}
        {order.customerAddress && (
          <div className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5">
            <MapPin size={14} className="text-[var(--primary-color)]" />
            {order.customerAddress}
          </div>
        )}
        <div className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5">
          <Clock size={14} className="text-[var(--primary-color)]" />
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
              className="flex justify-between text-sm py-1.5 border-b border-white/60 last:border-b-0"
            >
              <span className="text-gray-700">
                {item.quantity} × {item.name}
              </span>
              <span className="font-medium text-gray-900">₹{item.price}</span>
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

      <div className="flex flex-col gap-2.5 border-t border-gray-100 pt-3">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 size={16} className="text-green-500 shrink-0" />
          <div className="flex justify-between w-full text-sm">
            <span className="text-gray-700">{t("orders.orderPlaced")}</span>
            <span className="text-gray-400 text-xs">
              {formatDateTime(order.createdAt)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {order.confirmedAt ? (
            <CheckCircle2 size={16} className="text-green-500 shrink-0" />
          ) : (
            <Circle size={16} className="text-gray-300 shrink-0" />
          )}
          <div className="flex justify-between w-full text-sm">
            <span
              className={order.confirmedAt ? "text-gray-700" : "text-gray-400"}
            >
              {t("orders.storeConfirmation")}
            </span>
            <span className="text-gray-400 text-xs">
              {order.confirmedAt
                ? formatDateTime(order.confirmedAt)
                : "Pending"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {order.packedAt ? (
            <CheckCircle2 size={16} className="text-green-500 shrink-0" />
          ) : (
            <Circle size={16} className="text-gray-300 shrink-0" />
          )}
          <div className="flex justify-between w-full text-sm">
            <span
              className={order.packedAt ? "text-gray-700" : "text-gray-400"}
            >
              {t("orders.deliveryPickup")}
            </span>
            <span className="text-gray-400 text-xs">
              {order.packedAt ? formatDateTime(order.packedAt) : "Pending"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onComplete}
          className="flex-1 bg-[var(--primary-color)] text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition cursor-pointer"
        >
          {t("orders.markAsDelivered")}
        </button>
        <button
          onClick={onDelete}
          className="bg-red-50 text-red-500 p-2.5 rounded-xl hover:bg-red-100 transition cursor-pointer"
          title="Delete order"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default PackedIOrders;

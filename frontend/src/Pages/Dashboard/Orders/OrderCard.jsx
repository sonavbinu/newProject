import React from "react";
import { Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const OrderCard = ({ order, activeTab, onConfirm, onReject }) => {
  const { t } = useTranslation();
  return (
    <div className="border border-gray-300 rounded-xl p-4 shadow hover:shadow-xl">
      <div className="flex justify-between">
        <h3 className="text-[var(--primary-color)]">
          {t("orders.orderId")}: {order._id}
        </h3>
        <p className="text-gray-400">
          {t("orders.date")}: {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-3">
        <p className="font-semibold text-sm sm:text-base">
          {t("orders.orderFor")}
        </p>
        <p className="text-gray-400">{order.customerName}</p>

        <div className="flex gap-4 mt-2 flex-wrap">
          <p className="flex items-center gap-2 text-sm border border-gray-200 rounded-xl p-2">
            <Phone size={16} className="text-[var(--primary-color)]" />
            {order.customerPhone}
          </p>

          <p className="flex items-center gap-2 text-sm border border-gray-200 rounded-xl p-2">
            <MapPin size={16} className="text-[var(--primary-color)]" />
            {order.customerAddress}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <p className="font-semibold"> {t("orders.orderItems")}:</p>

        <div className="bg-[var(--primary-light)] rounded-xl p-3">
          {order.items.map((item) => (
            <div
              key={item.product}
              className="flex justify-between py-2 border-b border-gray-300 last:border-b-0"
            >
              <span>
                {item.quantity} × {item.name}
              </span>

              <span>₹{item.price}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <h4>{t("orders.totalBillAmount")}</h4>
          <p>₹{order.total}</p>
        </div>

        <span>{order.payment}</span>

        <div className="flex gap-3 mt-2">
          <button
            onClick={onReject}
            className="bg-gray-400 text-white p-2 rounded cursor-pointer"
          >
            {t("orders.rejectOrder")}
          </button>

          <button
            onClick={onConfirm}
            className="bg-[var(--primary-color)] text-white p-2 rounded cursor-pointer"
          >
            {activeTab === "preparing"
              ? t("orders.verifyPackItems")
              : t("orders.confirmOrder")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

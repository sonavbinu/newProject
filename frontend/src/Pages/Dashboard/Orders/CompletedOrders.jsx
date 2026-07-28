import React from "react";
import { Phone, MapPin, Clock, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const CompletedOrders = ({ order, onDelete }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="border border-gray-300 rounded-xl p-6 shadow hover:shadow-lg">
        <div className="flex justify-between mb-5">
          <p className="font-semibold text-[var(--primary-color)]">
            {t("orders.orderId")}: {order._id}
          </p>
          <p className="text-gray-500">
            {t("orders.date")}:{new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div>
          <h4 className="font-semibold"> {t("orders.orderFor")}</h4>
          <p className="font-medium text-gray-400">{order.customerName}</p>
        </div>
        <div className="flex flex-col lg:flex-row mt-3 gap-3">
          <div className="flex items-center sm:flex-row  flex-1 gap-3">
            <div className="flex items-center justify-center gap-2 text-sm border border-gray-200 rounded-xl p-2">
              <Phone size={16} className="text-[var(--primary-color)]" />
              {order.customerPhone}
            </div>
            <div className="flex gap-2 text-sm items-center border border-gray-200 rounded-xl p-2">
              <MapPin size={16} className="text-[var(--primary-color)]" />
              {order.customerAddress}
            </div>
          </div>

          <div className="flex  items-center gap-2 text-sm border border-gray-200 rounded-xl p-2">
            <Clock size={16} className="text-[var(--primary-color)]" />
            <span className="text-gray-500">
              {" "}
              {t("orders.selfPickup")} :{" "}
              {order.createdAt
                ? `${new Date(order.createdAt).toLocaleDateString()}  |  ${new Date(
                    order.createdAt,
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
                : "-"}
            </span>
          </div>
        </div>
        <div className="flex flex-col ">
          <h2 className="font-semibold"> {t("orders.orderItems")}</h2>
          <div className="border border-gray-300 px-4 py-3 mt-4 rounded-xl bg-[var(--primary-light)] ">
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
          <div className="flex justify-between items-center mt-2 pt-5 pb-5 border-t border-t-gray-300">
            <h4 className="font-semibold"> {t("orders.totalBillAmount")}</h4>
            <div className="flex items-center">
              <span>Rs{order.total}</span>
            </div>
          </div>
          <div className="flex  justify-between items-center p-2">
            <div className="flex flex-col items-center gap-2">
              <p className="text-[var(--primary-color)]">
                {t("orders.deliveryStatus")}:
              </p>
              <div className="flex items-center gap-2">
                <div className="bg-green-500 rounded-full w-2 h-2"></div>
                <span>{t("orders.deliveryPickup")}</span>
              </div>
            </div>
            <p className="text-gray-400 text-center">
              {order.packedAt
                ? `${new Date(order.packedAt).toLocaleDateString()} | ${new Date(
                    order.packedAt,
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
                : "-"}
            </p>
          </div>
          <div className="flex justify-between p-2">
            <div className="flex items-center gap-2">
              <div className="bg-green-500 rounded-full w-2 h-2"></div>
              <span>{t("orders.delivered")}</span>
            </div>
            <p className="text-gray-400">
              {order.completedAt
                ? `${new Date(order.completedAt).toLocaleDateString()} | ${new Date(
                    order.completedAt,
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
                : "-"}
            </p>
          </div>{" "}
          <button
            onClick={onDelete}
            className="bg-red-500  flex justify-center text-white py-2 px-4 rounded-xl hover:bg-red-600 cursor-pointer"
            title="Delete order"
          >
            <Trash2 size={18} />
          </button>
        </div>{" "}
      </div>
    </div>
  );
};

export default CompletedOrders;

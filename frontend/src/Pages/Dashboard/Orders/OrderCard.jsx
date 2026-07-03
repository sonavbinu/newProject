import React from "react";
import { Phone, MapPin } from "lucide-react";

const OrderCard = ({ order, activeTab, onConfirm }) => {
  return (
    <div className="border border-gray-300 rounded-xl p-4 shadow hover:shadow-xl">
      <div className="flex justify-between">
        <h3 className="text-[var(--primary-color)]">Order Id: {order.id}</h3>
        <p className="text-gray-400">Date: {order.date}</p>
      </div>

      <div className="mt-3">
        <p className="font-semibold text-sm sm:text-base">Order for:</p>
        <p className="text-gray-400">{order.customer.name}</p>

        <div className="flex gap-4 mt-2 flex-wrap">
          <p className="flex items-center gap-2 text-sm border border-gray-200 rounded-xl p-2">
            <Phone size={16} className="text-[var(--primary-color)]" />
            {order.customer.phone}
          </p>

          <p className="flex items-center gap-2 text-sm border border-gray-200 rounded-xl p-2">
            <MapPin size={16} className="text-[var(--primary-color)]" />
            {order.customer.address}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <p className="font-semibold">Order Items:</p>

        <div className="bg-[var(--primary-light)] rounded-xl p-3">
          {order.items.map((item) => (
            <div
              key={item.id}
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
          <h4>Total Bill Amount</h4>
          <p>₹{order.total}</p>
        </div>

        <span>{order.payment}</span>

        <div className="flex gap-3 mt-2">
          <button className="bg-gray-400 text-white p-2 rounded cursor-pointer">
            Reject Order
          </button>

          <button
            onClick={onConfirm}
            className="bg-[var(--primary-color)] text-white p-2 rounded cursor-pointer"
          >
            {activeTab === "preparing"
              ? "Verify & Pack Items"
              : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

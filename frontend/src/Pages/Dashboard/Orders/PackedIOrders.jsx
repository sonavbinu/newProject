import React from "react";
import { Phone, MapPin, Clock } from "lucide-react";
import { useDispatch } from "react-redux";
import { completeOrder } from "../../../redux/slices/orderSlice";

const PackedIOrders = ({ order, onComplete }) => {
  const dispatch = useDispatch();
  return (
    <div className="border border-gray-300 rounded-xl p-6 shadow hover:shadow-lg">
      <div className="flex justify-between mb-5">
        <p className="font-semibold text-[var(--primary-color)]">
          Order Id: {order.id}
        </p>
        <p className="text-gray-500">Date:{order.date}</p>
      </div>
      <div>
        <h4 className="font-semibold">Order for:</h4>
        <p className="font-medium">{order.customer.name}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center justify-center flex-wrap">
          <div className="flex items-center gap-2 text-sm border border-gray-200 rounded-xl p-2">
            <Phone size={16} className="text-[var(--primary-color)]" />
            {order.customer.phone}
          </div>
          <div className="flex flex-wrap gap-3 items-center text-sm border border-gray-200 rounded-xl p-2">
            <MapPin size={16} className="text-[var(--primary-color)]" />
            {order.customer.address}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm border border-gray-200 rounded-xl p-2">
          <Clock size={16} />
          <span>Self pickup : DATE |TIME</span>
        </div>
      </div>

      <div>
        <h2 className="font-semibold">Order Items:</h2>
        <div className="border border-gray-300 px-4 py-3 mt-4 rounded-xl bg-[var(--primary-light)] ">
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
        <div className="flex justify-between items-center mt-2 pt-5 pb-5 border-t border-t-gray-300">
          <h4 className="font-semibold">Total Bill Amount:</h4>
          <div className="flex items-center">
            <span>Rs{order.total}</span>
          </div>
        </div>
        <div className="flex justify-between  p-2">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 rounded-full w-2 h-2"></div>
            <span>Store Confirmation</span>
          </div>
          <p>Date | Time</p>
        </div>
        <div className="flex justify-between p-2">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 rounded-full w-2 h-2"></div>
            <span>Delivery Accepted</span>
          </div>
          <p>Date | Time</p>
        </div>{" "}
        <div className="flex justify-between  p-2">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 rounded-full w-2 h-2"></div>
            <span>Delivery Pickup</span>
          </div>
          <p>Date | Time</p>
        </div>
      </div>
      <button
        onClick={onComplete}
        className="bg-[var(--primary-color)] text-white py-2 px-4 w-full rounded-xl hover:opacity-90 cursor-pointer"
      >
        Mark as Delivered
      </button>
    </div>
  );
};

export default PackedIOrders;

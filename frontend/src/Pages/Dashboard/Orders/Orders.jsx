import React, { useState } from "react";
import { Phone, MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { confirmOrder } from "../../../redux/slices/orderSlice";
import OrderVerificationModal from "./OrderVerificationModal";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const [activeTab, setActiveTab] = useState("confirmation");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const filteredOrders = orders.filter((order) => order.status === activeTab);
  return (
    <div>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl sm:text-lg font-bold">My Orders</h2>
        <p>Last update at:</p>
        <input
          type="text"
          placeholder="Search by Order ID or Customer Name"
          className="border border-gray-300 p-3 focus:ring-2 focus:ring-[var(--primary-color)] rounded-full focus:outline-none"
        />
        <div className="flex justify-around shadow py-4 rounded-lg">
          <span
            onClick={() => setActiveTab("confirmation")}
            className={`cursor-pointer rounded-xl p-2 transition-all ${
              activeTab === "confirmation"
                ? "bg-[var(--primary-color)] text-white shadow"
                : "bg-[var(--primary-light)] hover:shadow"
            }`}
          >
            Confirmation
          </span>
          <span
            onClick={() => setActiveTab("preparing")}
            className={`rounded-xl p-2 transition-all cursor-pointer ${
              activeTab === "preparing"
                ? "bg-[var(--primary-color)] text-white"
                : "bg-[var(--primary-light)] hover:shadow"
            }`}
          >
            Preparing
          </span>
          <span
            onClick={() => setActiveTab("packed")}
            className={`rounded-xl p-2 transition-all cursor-pointer ${
              activeTab === "packed"
                ? "bg-[var(--primary-color)] text-white"
                : "bg-[var(--primary-light)] hover:shadow"
            }`}
          >
            Packed Orders
          </span>
          <span
            onClick={() => setActiveTab("completed")}
            className={`rounded-xl p-2 transition-all cursor-pointer ${
              activeTab === "completed"
                ? "bg-[var(--primary-color)] text-white"
                : "bg-[var(--primary-light)] hover:shadow"
            }`}
          >
            Completed
          </span>
        </div>

        <div className=" grid sm:grid-cols-2 grid-cols-1 gap-6 ">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-300 rounded-xl p-4 shadow hover:shadow-xl "
            >
              <div className="flex justify-between ">
                <h3 className="text-[var(--primary-color)]">
                  Order Id:{order.id}
                </h3>
                <p className="text-gray-400">Date:{order.date}</p>
              </div>

              <div>
                <p className="font-semibold text-sm sm:text-base">Order for:</p>
                <p className="text-gray-400">{order.customer.name}</p>
                <div className="flex gap-4">
                  <p className="flex items-center gap-2 text-sm border border-gray-200 rounded-xl p-1 ">
                    <Phone size={16} className="text-[var(--primary-color)] " />
                    {order.customer.phone}
                  </p>
                  <p className="text-sm flex items-center gap-2 border border-gray-200 rounded-xl p-1 ">
                    <MapPin size={16} className="text-[var(--primary-color)]" />
                    {order.customer.address}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Order Items:</p>
                <div className="bg-[var(--primary-light)] rounded-xl p-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between py-2 border-gray-300 border-b last:border-b-0"
                    >
                      <span>
                        {item.quantity} × {item.name}
                      </span>
                      <span>Rs{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center ">
                  <h4>Total Bill Amount</h4>
                  <p>Rs{order.total}</p>
                </div>

                <div>
                  <span>{order.payment}</span>
                </div>
                <div className="flex gap-3 mt-2">
                  <button className="bg-gray-400 text-white p-2 rounded cursor-pointer">
                    Reject Order
                  </button>
                  <button
                    onClick={() => {
                      if (activeTab === "preparing") {
                        setSelectedOrder(order);
                        setOpenModal(true);
                      } else {
                        dispatch(confirmOrder(order.id));
                        setActiveTab("preparing");
                      }
                    }}
                    className="bg-[var(--primary-color)] text-white p-2 rounded cursor-pointer"
                  >
                    {activeTab === "preparing"
                      ? "Verify & Pack Items"
                      : "Confirm Order"}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {openModal && selectedOrder && (
            <div>
              <OrderVerificationModal
                order={selectedOrder}
                open={openModal}
                onClose={() => {
                  setOpenModal(false);
                  setSelectedOrder(null);
                }}
                onPacked={() => setActiveTab("packed")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;

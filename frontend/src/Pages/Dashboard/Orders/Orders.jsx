import React, { useState } from "react";
import { Phone, MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { completeOrder, confirmOrder } from "../../../redux/slices/orderSlice";
import OrderVerificationModal from "./OrderVerificationModal";
import PackedIOrders from "./PackedIOrders";
import OrderCard from "./OrderCard";
import CompletedOrders from "./CompletedOrders";

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
          {["confirmation", "preparing", "packed", "completed"].map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer rounded-xl p-2 transition-all ${
                activeTab === tab
                  ? "bg-[var(--primary-color)] text-white shadow"
                  : "bg-[var(--primary-light)] hover:shadow"
              }`}
            >
              {tab === "confirmation"
                ? "Confirmation"
                : tab === "preparing"
                  ? "Preparing"
                  : tab === "packed"
                    ? "Packed Orders"
                    : "Completed"}
            </span>
          ))}
        </div>

        <div className=" grid sm:grid-cols-2 grid-cols-1 gap-6 ">
          {filteredOrders.map((order) => {
            if (activeTab === "packed") {
              return (
                <PackedIOrders
                  key={order.id}
                  order={order}
                  onComplete={() => {
                    dispatch(completeOrder(order.id));
                    setActiveTab("completed");
                  }}
                />
              );
            }

            if (activeTab === "completed") {
              return <CompletedOrders key={order.id} order={order} />;
            }

            return (
              <OrderCard
                key={order.id}
                order={order}
                activeTab={activeTab}
                onConfirm={() => {
                  if (activeTab === "preparing") {
                    setSelectedOrder(order);
                    setOpenModal(true);
                  } else {
                    dispatch(confirmOrder(order.id));
                    setActiveTab("preparing");
                  }
                }}
              />
            );
          })}
        </div>

        {openModal && selectedOrder && (
          <div>
            <OrderVerificationModal
              order={selectedOrder}
              open={openModal}
              onClose={() => {
                setOpenModal(false);
                setSelectedOrder(null);
              }}
              onPacked={() => {
                setActiveTab("packed");
                setOpenModal(false);
                setSelectedOrder(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

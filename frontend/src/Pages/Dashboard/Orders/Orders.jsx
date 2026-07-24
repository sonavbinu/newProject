import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStoreOrders,
  updateOrderStatus,
} from "../../../redux/slices/orderSlice";
import OrderVerificationModal from "./OrderVerificationModal";
import PackedIOrders from "./PackedIOrders";
import OrderCard from "./OrderCard";
import CompletedOrders from "./CompletedOrders";
import { useTranslation } from "react-i18next";

const Orders = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const selectedStore = useSelector((state) => state.store.selectedStore);
  const storeId = selectedStore?._id || localStorage.getItem("selectedStoreId");

  const [activeTab, setActiveTab] = useState("confirmation");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (storeId) dispatch(fetchStoreOrders(storeId));
  }, [storeId, dispatch]);

  const filteredOrders = orders.filter((order) => order.status === activeTab);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h2 className="text-xl sm:text-lg font-bold"> {t("orders.title")}</h2>
          <input
            type="text"
            placeholder={t("orders.searchPlaceholder")}
            className="border w-[80%] border-gray-300 py-2 px-2 focus:ring-2 focus:ring-[var(--primary-color)] rounded-xl focus:outline-none"
          />
        </div>
        <p>{t("orders.lastUpdated")}</p>
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
              {t(`orders.tabs.${tab}`)}
            </span>
          ))}
        </div>
        <div className=" grid sm:grid-cols-2 grid-cols-1 gap-6 ">
          {filteredOrders.map((order) => {
            if (activeTab === "packed") {
              return (
                <PackedIOrders
                  key={order._id}
                  order={order}
                  onComplete={() => {
                    dispatch(
                      updateOrderStatus({
                        orderId: order._id,
                        storeId,
                        status: "completed",
                      }),
                    );
                    setActiveTab("completed");
                  }}
                />
              );
            }

            if (activeTab === "completed") {
              return <CompletedOrders key={order._id} order={order} />;
            }

            return (
              <OrderCard
                key={order._id}
                order={order}
                activeTab={activeTab}
                onConfirm={() => {
                  if (activeTab === "preparing") {
                    setSelectedOrder(order);
                    setOpenModal(true);
                  } else {
                    dispatch(
                      updateOrderStatus({
                        orderId: order._id,
                        storeId,
                        status: "preparing",
                      }),
                    );
                    setActiveTab("preparing");
                  }
                }}
                onReject={() => {
                  if (window.confirm("Reject this order?")) {
                    dispatch(
                      updateOrderStatus({
                        orderId: order._id,
                        storeId,
                        status: "rejected",
                      }),
                    );
                  }
                }}
              />
            );
          })}
        </div>
        {openModal && selectedOrder && (
          <OrderVerificationModal
            order={selectedOrder}
            open={openModal}
            onClose={() => {
              setOpenModal(false);
              setSelectedOrder(null);
            }}
            onPacked={() => {
              dispatch(
                updateOrderStatus({
                  orderId: selectedOrder._id,
                  storeId,
                  status: "packed",
                }),
              );
              setOpenModal(false);
              setSelectedOrder(null);
              setActiveTab("packed");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search, Inbox } from "lucide-react";
import {
  fetchStoreOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../../redux/slices/orderSlice";
import OrderVerificationModal from "./OrderVerificationModal";
import PackedIOrders from "./PackedIOrders";
import OrderCard from "./OrderCard";
import CompletedOrders from "./CompletedOrders";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Orders = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [searchItem, setSearchItem] = useState("");
  const orders = useSelector((state) => state.orders.orders);
  const selectedStore = useSelector((state) => state.store.selectedStore);
  const storeId = selectedStore?._id || localStorage.getItem("selectedStoreId");

  const [activeTab, setActiveTab] = useState("confirmation");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (storeId) dispatch(fetchStoreOrders(storeId));
  }, [storeId, dispatch]);

  const filteredOrders = orders.filter((order) => {
    const search = searchItem.toLowerCase();

    return (
      order.status === activeTab &&
      (order.customerName?.toLowerCase().includes(search) ||
        order.customerPhone?.toLowerCase().includes(search) ||
        order._id?.toLowerCase().includes(search))
    );
  });

  const tabCounts = ["confirmation", "preparing", "packed", "completed"].reduce(
    (acc, tab) => {
      acc[tab] = orders.filter((o) => o.status === tab).length;
      return acc;
    },
    {},
  );

  const handleDelete = (orderId) => {
    if (
      window.confirm("Delete this order permanently? This cannot be undone.")
    ) {
      dispatch(deleteOrder({ orderId, storeId }))
        .unwrap()
        .then(() => toast.success("Order deleted"))
        .catch((err) => toast.error(err || "Failed to delete order"));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{t("orders.title")}</h2>
      </div>

      <div className="relative">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder={t("orders.searchPlaceholder")}
          className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-1.5 rounded-xl shadow-sm border border-gray-100">
        {["confirmation", "preparing", "packed", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center justify-center gap-1.5 cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-[var(--primary-color)] text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {t(`orders.tabs.${tab}`)}
            {tabCounts[tab] > 0 && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {tabCounts[tab]}
              </span>
            )}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-200 rounded-2xl bg-white">
          <Inbox className="text-gray-300 mb-3" size={32} />
          <p className="text-gray-500">
            {searchItem
              ? `No orders match "${searchItem}"`
              : `No ${t(`orders.tabs.${activeTab}`).toLowerCase()} orders right now`}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
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
                  onDelete={() => handleDelete(order._id)}
                />
              );
            }

            if (activeTab === "completed") {
              return (
                <CompletedOrders
                  key={order._id}
                  order={order}
                  onDelete={() => handleDelete(order._id)}
                />
              );
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
                onDelete={() => handleDelete(order._id)}
              />
            );
          })}
        </div>
      )}

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
  );
};

export default Orders;

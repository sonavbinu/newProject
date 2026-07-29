import { MapPin, Phone, X, CheckCircle2, Circle } from "lucide-react";
import React, { useState } from "react";
import { updateOrderStatus } from "../../../redux/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const OrderVerificationModal = ({ order, open, onClose, onPacked }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedStore = useSelector((state) => state.store.selectedStore);
  const storeId = selectedStore?._id || localStorage.getItem("selectedStoreId");
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (id) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((itemId) => itemId !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };
  if (!open || !order) return null;

  const allChecked = checkedItems.length === order.items.length;

  const formatDateTime = (date) =>
    `${new Date(date).toLocaleDateString()} | ${new Date(
      date,
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

  return (
    <div className="fixed z-[100] inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white flex flex-col gap-4 p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full cursor-pointer transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-900 pr-10">
          {t("orders.orderConfirmation")}
        </h2>

        <div className="flex flex-col border border-gray-100 rounded-2xl px-4 py-3 gap-3 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-[var(--primary-color)] font-semibold text-sm">
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
            <p className="text-gray-900 font-medium">{order.customerName}</p>
          </div>

          <div className="flex w-full gap-2 flex-wrap">
            {order.customerPhone && (
              <span className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 rounded-lg px-2.5 py-1.5">
                <Phone size={14} className="text-[var(--primary-color)]" />
                {order.customerPhone}
              </span>
            )}
            {order.customerAddress && (
              <span className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 rounded-lg px-2.5 py-1.5">
                <MapPin size={14} className="text-[var(--primary-color)]" />
                {order.customerAddress}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2.5 mt-1">
            <div className="flex items-center gap-2.5 w-full">
              <CheckCircle2 size={16} className="text-green-500 shrink-0" />
              <div className="flex justify-between w-full text-sm">
                <p className="text-gray-700">{t("orders.orderPlaced")}</p>
                <p className="text-gray-400 text-xs">
                  {formatDateTime(order.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full">
              {order.confirmedAt ? (
                <CheckCircle2 size={16} className="text-green-500 shrink-0" />
              ) : (
                <Circle size={16} className="text-gray-300 shrink-0" />
              )}
              <div className="flex justify-between w-full text-sm">
                <p
                  className={
                    order.confirmedAt ? "text-gray-700" : "text-gray-400"
                  }
                >
                  {t("orders.orderConfirmed")}
                </p>
                <p className="text-gray-400 text-xs">
                  {order.confirmedAt
                    ? formatDateTime(order.confirmedAt)
                    : "Pending"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col border border-gray-100 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between bg-[var(--primary-light)] px-4 py-3">
            <h2 className="font-semibold text-gray-900">
              {t("orders.verifyItems", { count: order.items.length })}
            </h2>
            <span className="text-xs font-medium text-gray-500 bg-white px-2.5 py-1 rounded-full">
              {checkedItems.length}/{order.items.length}
            </span>
          </div>

          <div className="px-4">
            {order.items.map((item) => {
              const isChecked = checkedItems.includes(item.product);
              return (
                <label
                  key={item.product}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(item.product)}
                      className="accent-[var(--primary-color)] w-4 h-4 cursor-pointer"
                    />
                    <span
                      className={
                        isChecked
                          ? "text-gray-400 line-through"
                          : "text-gray-700"
                      }
                    >
                      {item.quantity}× {item.name}
                    </span>
                  </div>
                  <span
                    className={
                      isChecked ? "text-gray-400" : "text-gray-900 font-medium"
                    }
                  >
                    ₹{item.price}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            disabled={!allChecked}
            onClick={() => {
              dispatch(
                updateOrderStatus({
                  orderId: order._id,
                  storeId,
                  status: "packed",
                }),
              );
              onClose();
              onPacked();
            }}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              allChecked
                ? "bg-[var(--primary-color)] text-white hover:opacity-90 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {t("orders.readyForDelivery")}
          </button>
          <p className="text-xs text-gray-400">*{t("orders.selectAllItems")}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderVerificationModal;

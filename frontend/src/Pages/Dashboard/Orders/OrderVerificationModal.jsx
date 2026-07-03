import { MapPin, Phone, X } from "lucide-react";
import React, { useState } from "react";
import { packOrder } from "../../../redux/slices/orderSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const OrderVerificationModal = ({ order, open, onClose, onPacked }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
  return (
    <div className="fixed  inset-0 bg-black/50 backdrop-blur flex  items-center justify-center ">
      <div className=" relative bg-white flex flex-col justify-center gap-4 p-6 rounded-xl w-full max-w-2xl ">
        <h2 className="text-xl sm:text-lg font-bold border-b  mb-2 border-b-gray-300">
          {t("orders.orderConfirmation")}
        </h2>
        <div className="flex flex-col border border-gray-300 rounded-xl px-3 py-2 hover:shadow ">
          <div className="flex justify-between ">
            <p className="text-[var(--primary-color)]">
              {" "}
              {t("orders.orderId")} :{order.id}
            </p>
            <p className="text-gray-400">
              {t("orders.date")}:{order.date}
            </p>
          </div>
          <div className="w-full">
            <h2 className="font-semibold"> {t("orders.orderFor")} :</h2>
            <p className="text-gray-500 mb-2">{order.customer.name}</p>
          </div>
          <div className="flex w-full gap-3">
            <span
              className="flex items-center gap-2 text-sm sm:text-base  border border-gray-300 
          rounded-xl p-2
          "
            >
              <Phone size={16} className="text-[var(--primary-color)]" />
              {order.customer.phone}
            </span>
            <span
              className="flex items-center gap-2 text-sm sm:text-base  border border-gray-300
            rounded-xl p-2"
            >
              <MapPin size={16} className="text-[var(--primary-color)]" />
              {order.customer.address}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2  mt-2">
            <div className="flex items-center gap-2 w-full ">
              <div className="rounded-full w-3 h-3 bg-green-500"></div>
              <div className="flex justify-between gap-2 w-full ">
                <p>{t("orders.orderPlaced")}</p>
                <p>Date | Time</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full">
              <div className="rounded-full w-3 h-3 bg-green-500"></div>
              <div className="flex justify-between w-full ">
                <p>{t("orders.orderConfirmed")}</p>
                <p>Date | Time</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col border border-gray-300 px-3 py-2 rounded-xl hover:shadow">
          <h2 className="font-semibold bg-[var(--primary-light)] p-2 rounded-xl ">
            {t("orders.verifyItems", { count: order.items.length })}
          </h2>
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between py-2 border-b border-gray-300 last:border-b-0"
            >
              <div className="flex ">
                <input
                  type="checkbox"
                  checked={checkedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="accent-[var(--primary-color)]"
                />
                <span>
                  {item.quantity}x {item.name}
                </span>
              </div>

              <span>Rs{item.price}</span>
            </div>
          ))}
          <div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-2xl text-black hover:text-gray-600 hover:shadow px-3  pb-1 cursor-pointer rounded-xl"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
          <button
            disabled={!allChecked}
            onClick={() => {
              dispatch(packOrder(order.id));
              onClose();
              onPacked();
            }}
            className={`px-6 py-2 rounded-lg ${
              allChecked
                ? "bg-[var(--primary-color)] text-white hover:opacity-90 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {t("orders.readyForDelivery")}
          </button>
          <p className="text-xs text-gray-500">*{t("orders.selectAllItems")}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderVerificationModal;

import {
  CreditCard,
  ChartColumn,
  History,
  Gift,
  ChevronRight,
  ChevronLeft,
  Users,
  File,
  Wallet,
  FileText,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderData from "./OrderData";
import ProductData from "./ProductData";
import { fetchStoreOrders } from "../../../redux/slices/orderSlice";
import { fetchMyProducts } from "../../../redux/slices/productSlice";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedStore = useSelector((state) => state.store.selectedStore);
  const storeId = selectedStore?._id || localStorage.getItem("selectedStoreId");

  useEffect(() => {
    if (storeId) {
      dispatch(fetchStoreOrders(storeId));
      dispatch(fetchMyProducts(storeId));
    }
  }, [storeId, dispatch]);

  const menuItems = [
    { key: "makePayment", icon: CreditCard },
    { key: "settlements", icon: ChartColumn },
    { key: "transactionHistory", icon: History },
    { key: "giftCards", icon: Gift },
    { key: "requestToOrigin", icon: FileText },
    { key: "referEarn", icon: Users },
    { key: "reports", icon: File },
    { key: "refundTransaction", icon: Wallet },
  ];

  const ITEMS_PER_PAGE = 4;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(menuItems.length / ITEMS_PER_PAGE);
  const currentItems = menuItems.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4 bg-white">
        <h2 className="text-lg font-bold text-gray-900">
          {t("dashboard.quickActionsTitle")}
        </h2>
        <div className="relative">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition cursor-pointer -translate-x-3"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-8">
            {currentItems.map(({ key, icon: Icon }) => (
              <button
                key={key}
                className="group bg-[var(--primary-light)] hover:bg-[var(--primary-color)] rounded-xl p-6 flex flex-col items-center gap-3 transition-all duration-200 cursor-pointer"
              >
                <Icon
                  size={26}
                  className="text-[var(--primary-color)] group-hover:text-white transition-colors"
                />
                <p className="text-center text-sm font-medium text-gray-700 group-hover:text-white transition-colors">
                  {t(`dashboard.quickActions.${key}`)}
                </p>
              </button>
            ))}
          </div>

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition cursor-pointer translate-x-3"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              className={`h-2 rounded-full cursor-pointer transition-all ${
                page === index
                  ? "w-6 bg-[var(--primary-color)]"
                  : "w-2 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {t("dashboard.orderOverview")}
          </h2>
          <OrderData />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {t("dashboard.inventoryOverview")}
          </h2>
          <ProductData />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

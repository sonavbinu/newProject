import {
  CreditCard,
  ChartColumn,
  History,
  Gift,
  ChevronRight,
  ChevronLeft,
  NotebookPen,
  Users,
  File,
  Wallet,
  FileText,
  User,
  Key,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import OrderData from "./OrderData";
import ProductData from "./ProductData";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
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

  const [menu1Open, setMenu1Open] = useState(false);
  const [menu2Open, setMenu2Open] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded shadow p-4 flex flex-col gap-2">
        <h2 className="text-xl font-bold">
          {t("dashboard.quickActionsTitle")}
        </h2>
        <div className="relative">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          >
            <ChevronLeft />
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-10">
            {currentItems.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="bg-[var(--primary-light)] rounded-xl p-8 flex flex-col items-center gap-3 "
              >
                <Icon size={30} />
                <p className="text-center">
                  {t(`dashboard.quickActions.${key}`)}
                </p>
              </div>
            ))}
          </div>

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          >
            <ChevronRight />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              onClick={() => setPage(index)}
              className={`h-2 w-2 rounded-full cursor-pointer ${page === index ? "bg-green-600" : "bg-gray-300"}`}
            ></div>
          ))}
        </div>
      </div>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">
            {t("dashboard.orderOverview")}
          </h2>
          <OrderData />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">
            {" "}
            {t("dashboard.inventoryOverview")}
          </h2>
          <ProductData />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

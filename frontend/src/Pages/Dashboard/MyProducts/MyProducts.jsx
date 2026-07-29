import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { fetchMyProducts } from "../../../redux/slices/productSlice";
import { useTranslation } from "react-i18next";

const MyProducts = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedStore = useSelector((state) => state.store.selectedStore);
  const storeId = selectedStore?._id || localStorage.getItem("selectedStoreId");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (storeId) {
      dispatch(fetchMyProducts(storeId));
    }
  }, [storeId, dispatch]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          {t("myProducts.title")}
        </h2>
        <button
          onClick={() => navigate("/add-product")}
          className="flex items-center gap-1.5 bg-[var(--primary-color)] text-white rounded-xl px-4 py-2.5 font-medium hover:opacity-90 active:scale-[0.98] transition cursor-pointer"
        >
          <Plus size={18} />
          {t("myProducts.addProduct")}
        </button>
      </div>

      <div className="relative">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("myProducts.searchPlaceholder")}
          className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition"
        />
      </div>

      <Outlet context={{ search }} />
    </div>
  );
};

export default MyProducts;

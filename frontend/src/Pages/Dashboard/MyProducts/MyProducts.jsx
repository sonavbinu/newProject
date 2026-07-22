import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchMyProducts } from "../../../redux/slices/productSlice";
import { useTranslation } from "react-i18next";

const MyProducts = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedStore = useSelector((state) => state.store.selectedStore);
  const storeId = selectedStore?._id || localStorage.getItem("selectedStoreId");

  useEffect(() => {
    if (storeId) {
      dispatch(fetchMyProducts(storeId));
    }
  }, [storeId, dispatch]);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl sm:text-lg font-bold">
          {t("myProducts.title")}
        </h2>
        <div className="flex gap-4 justify-between">
          <input
            type="text"
            placeholder={t("myProducts.searchPlaceholder")}
            className="border border-gray-300 rounded-xl px-2 py-2 focus:ring-2 focus:ring-[var(--primary-color)] 
            outline-none w-[80%]"
          />
          <button
            onClick={() => navigate("/add-product")}
            className="bg-[var(--primary-color)]  text-white rounded-xl px-2 hover:opacity-90 cursor-pointer"
          >
            {t("myProducts.addProduct")}
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MyProducts;

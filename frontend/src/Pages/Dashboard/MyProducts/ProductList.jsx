import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  SquarePen,
  PlusCircle,
  MinusCircle,
  Trash2,
  PackageSearch,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  editPrice,
  addStock,
  minusStock,
  deleteProduct,
} from "../../../redux/slices/productSlice";

const ProductList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useOutletContext();
  const [open, setOpen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [value, setValue] = useState("");

  const categories = useSelector((state) => state.products.categories);
  const selectedStore = useSelector((state) => state.store.selectedStore);
  const storeId = selectedStore?._id || localStorage.getItem("selectedStoreId");

  const toggleCategory = (id) => {
    setOpen(open === id ? null : id);
  };

  const handleAction = (action, categoryId, product) => {
    if (action === "delete") {
      if (window.confirm(t("productList.deleteConfirmation"))) {
        dispatch(
          deleteProduct({
            categoryId,
            productId: product._id,
            storeId,
          }),
        );
      }
      return;
    }

    setActionType(action);
    setSelectedProduct({
      categoryId,
      productId: product._id,
    });
    setValue("");
    setShowModal(true);
  };

  const handleSave = () => {
    if (!value) return;

    const payload = {
      categoryId: selectedProduct.categoryId,
      productId: selectedProduct.productId,
      storeId,
    };

    switch (actionType) {
      case "edit":
        dispatch(editPrice({ ...payload, newPrice: value }));
        break;

      case "add":
        dispatch(addStock({ ...payload, quantity: value }));
        break;

      case "minus":
        dispatch(minusStock({ ...payload, quantity: value }));
        break;

      default:
        return;
    }

    setShowModal(false);
    setSelectedProduct(null);
    setActionType("");
    setValue("");
  };

  const searchText = search.toLowerCase();

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      products: category.products.filter((product) => {
        return (
          product.productName?.toLowerCase().includes(searchText) ||
          product.price?.toString().includes(searchText) ||
          product.stock?.toString().includes(searchText)
        );
      }),
    }))
    .filter((category) => !search || category.products.length > 0);

  const totalProducts = filteredCategories.reduce(
    (sum, cat) => sum + cat.products.length,
    0,
  );

  return (
    <div className="flex flex-col gap-3">
      {search && (
        <p className="text-sm text-gray-400 px-1">
          {totalProducts} result{totalProducts !== 1 && "s"} for "{search}"
        </p>
      )}

      {filteredCategories.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 border border-dashed 
        border-gray-200 rounded-2xl bg-white"
        >
          <PackageSearch className="text-gray-300 mb-3" size={32} />
          <p className="text-gray-500">
            {search
              ? `No products match "${search}"`
              : t("productList.noProducts")}
          </p>
        </div>
      ) : (
        filteredCategories.map((category) => (
          <div
            key={category.id}
            className="border border-gray-100 rounded-2xl shadow-sm bg-white overflow-hidden"
          >
            <div
              onClick={() => toggleCategory(category.id)}
              className="flex items-center justify-between bg-[var(--primary-light)] px-4 py-3.5 cursor-pointer transition"
            >
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-gray-900">
                  {t(`addProduct.categories.${category.name}`)}
                </h2>
                <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">
                  {category.products.length}
                </span>
              </div>

              {open === category.id ? (
                <ChevronUp size={18} className="text-gray-500" />
              ) : (
                <ChevronDown size={18} className="text-gray-500" />
              )}
            </div>

            {open === category.id && (
              <div className="p-3">
                {category.products.length === 0 ? (
                  <p className="p-4 text-center text-gray-400 text-sm">
                    {t("productList.noProducts")}
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-400 text-xs uppercase tracking-wide">
                          <th className="px-3 py-2 font-medium">
                            {t("productList.productName")}
                          </th>
                          <th className="px-3 py-2 font-medium">
                            {t("productList.price")}
                          </th>
                          <th className="px-3 py-2 font-medium">
                            {t("productList.stock")}
                          </th>
                          <th className="px-3 py-2 font-medium">
                            {t("productList.availability")}
                          </th>
                          <th className="px-3 py-2 font-medium text-right">
                            {t("productList.action")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.products.map((product) => (
                          <tr
                            key={product._id}
                            className="border-t border-gray-100 hover:bg-gray-50 transition"
                          >
                            <td className="px-3 py-3 font-medium text-gray-900">
                              {product.productName}
                            </td>
                            <td className="px-3 py-3 text-gray-700">
                              ₹{product.price}
                            </td>
                            <td className="px-3 py-3 text-gray-700">
                              {product.stock}
                            </td>
                            <td className="px-3 py-3">
                              <span
                                className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                  product.stock > 0
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {product.stock > 0
                                  ? t("productList.inStock")
                                  : t("productList.outOfStock")}
                              </span>
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() =>
                                    navigate(`/edit-product/${product._id}`)
                                  }
                                  className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg cursor-pointer transition"
                                  title="Edit Product"
                                >
                                  <SquarePen size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleAction("edit", category.id, product)
                                  }
                                  className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg cursor-pointer transition"
                                  title={t("productList.editPrice")}
                                >
                                  <Pencil size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleAction("add", category.id, product)
                                  }
                                  className="text-green-600 hover:bg-green-50 p-2 rounded-lg cursor-pointer transition"
                                  title={t("productList.addStock")}
                                >
                                  <PlusCircle size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleAction("minus", category.id, product)
                                  }
                                  className="text-orange-500 hover:bg-orange-50 p-2 rounded-lg cursor-pointer transition"
                                  title={t("productList.minusStock")}
                                >
                                  <MinusCircle size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleAction("delete", category.id, product)
                                  }
                                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg cursor-pointer transition"
                                  title={t("productList.deleteProduct")}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {actionType === "edit" && t("productList.editPrice")}
              {actionType === "add" && t("productList.addStock")}
              {actionType === "minus" && t("productList.minusStock")}
            </h2>

            <input
              type="number"
              min={1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={
                actionType === "edit"
                  ? t("productList.enterNewPrice")
                  : t("productList.enterQuantity")
              }
              autoFocus
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedProduct(null);
                  setActionType("");
                  setValue("");
                }}
                className="px-4 py-2.5 rounded-xl hover:bg-gray-100 text-gray-600 cursor-pointer transition"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={handleSave}
                className="bg-[var(--primary-color)] text-white px-5 py-2.5 hover:opacity-90 cursor-pointer rounded-xl font-medium transition"
              >
                {t("common.save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;

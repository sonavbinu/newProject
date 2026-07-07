import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch } from "react-redux";
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
  const [open, setOpen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [value, setValue] = useState("");
  const categories = useSelector((state) => state.products.categories);

  console.log(categories);
  const toggleCategory = (id) => {
    setOpen(open === id ? null : id);
  };
  const handleAction = (action, categoryId, product) => {
    if (action === "delete") {
      if (window.confirm(t("productList.deleteConfirmation"))) {
        dispatch(
          deleteProduct({
            categoryId,
            productId: product.id,
          }),
        );
      }
      return;
    }

    setActionType(action);
    setSelectedProduct({
      categoryId,
      productId: product.id,
    });
    setValue("");
    setShowModal(true);
  };
  const handleSave = () => {
    if (!value) return;

    const payload = {
      categoryId: selectedProduct.categoryId,
      productId: selectedProduct.productId,
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
  return (
    <div className="flex flex-col border border-gray-300 gap-5 rounded p-5 ">
      {categories.map((category) => (
        <div
          key={category.id}
          className="border border-gray-300 rounded-xl shadow"
        >
          {console.log(categories[0].products)}
          <div
            onClick={() => toggleCategory(category.id)}
            className={`flex items-center justify-between bg-[var(--primary-light)]  p-3 rounded-xl cursor-pointer transition duration-150 ${
              open === category.id
                ? "rounded-t-xl rounded-b-none"
                : "rounded-xl"
            }`}
          >
            <h2>{t(`addProduct.categories.${category.name}`)}</h2>

            {open === category.id ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>
          {open === category.id && (
            <div className="overflow-x-auto border border-[var(--primary-light)] shadow-xl border-t-0 rounded-b-xl">
              {category.products.length === 0 ? (
                <p className="p-4 text-center text-gray-500">
                  {" "}
                  {t("productList.noProducts")}
                </p>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-100 ">
                    <tr>
                      <th className="px-4 py-3 text-left border border-[var(--primary-light)]">
                        {t("productList.productName")}
                      </th>
                      <th className="px-4 py-3 text-left border border-[var(--primary-light)]">
                        {t("productList.price")}
                      </th>
                      <th className="px-4 py-3 text-left border border-[var(--primary-light)]">
                        {t("productList.stock")}
                      </th>
                      <th className="px-4 py-3 text-left border border-[var(--primary-light)]">
                        {t("productList.availability")}
                      </th>
                      <th className="px-4 py-3 text-left border border-[var(--primary-light)]">
                        {t("productList.action")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        {console.log(product)}
                        <td className="px-4 py-3 border border-[var(--primary-light)]">
                          {product.productName}
                        </td>
                        <td className="px-4 py-3 border border-[var(--primary-light)]">
                          {product.price}
                        </td>
                        <td className="px-4 py-3 border border-[var(--primary-light)]">
                          {product.stock}
                        </td>
                        <td className="px-4 py-3 border border-[var(--primary-light)]">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                        <td className="px-4 py-3 text-center border border-[var(--primary-light)]">
                          <select
                            className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                            onChange={(e) => {
                              handleAction(
                                e.target.value,
                                category.id,
                                product,
                              );
                              e.target.selectedIndex = 0;
                            }}
                          >
                            <option value=""> {t("productList.action")}</option>
                            <option value="edit">
                              {t("productList.editPrice")}
                            </option>
                            <option value="add">
                              {t("productList.addStock")}
                            </option>
                            <option value="minus">
                              {t("productList.minusStock")}
                            </option>
                            <option value="delete">
                              {t("productList.deleteProduct")}
                            </option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      ))}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-5">
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
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedProduct(null);
                  setActionType("");
                  setValue("");
                }}
                className=" px-4 py-2 rounded-lg hover:opacity-90 bg-gray-500 text-white cursor-pointer"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={handleSave}
                className="bg-[var(--primary-color)] text-white px-4 py-2 hover:opacity-90 cursor-pointer rounded-lg"
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

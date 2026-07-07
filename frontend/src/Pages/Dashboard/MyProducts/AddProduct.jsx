import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/slices/productSlice";
import { useTranslation } from "react-i18next";

const AddProduct = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedDelivery, setSelectedDelivery] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    productName: "",
    mrp: "",
    price: "",
    discountType: "",
    discountValue: "",
    unit: "Kg",
    size: "",
    quantity: "",
    description: "",
    country: "",
    manufacturer: "",
    image: null,
  });

  const {
    category,
    productName,
    mrp,
    price,
    discountType,
    discountValue,
    unit,
    size,
    quantity,
    description,
    country,
    manufacturer,
    image,
  } = formData;
  const categories = [
    { id: 1, key: "fruitsVegetables" },
    { id: 2, key: "dairyBreadEggs" },
    { id: 3, key: "snacksBiscuits" },
    { id: 4, key: "attaDalRice" },
    { id: 5, key: "dryFruitsMasala" },
    { id: 6, key: "teaCoffee" },
    { id: 7, key: "chocolatesDesserts" },
  ];

  const discount = ["%", "Flat"];

  const units = ["kg", "litre", "pieces"];
  const deliveryTypes = ["instant", "schedule", "pickup"];
  const handleDeliveryChange = (type) => {
    if (selectedDelivery.includes(type)) {
      setSelectedDelivery(selectedDelivery.filter((item) => item !== type));
    } else {
      setSelectedDelivery([...selectedDelivery, type]);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const categories = [
      { id: 1, key: "fruitsVegetables" },
      { id: 2, key: "dairyBreadEggs" },
      { id: 3, key: "snacksBiscuits" },
      { id: 4, key: "attaDalRice" },
      { id: 5, key: "dryFruitsMasala" },
      { id: 6, key: "teaCoffee" },
      { id: 7, key: "chocolatesDesserts" },
    ];
    dispatch(
      addProduct({
        categoryId: Number(formData.category),
        product: {
          ...formData,
          deliveryTypes: selectedDelivery,
        },
      }),
    );
    navigate("/my-products");
  };
  return (
    <div className="border border-[var(--primary-color)]  px-4 py-3 rounded-xl shadow flex flex-col gap-3">
      <h1 className="text-xl font-bold mt-5 mb-6">{t("addProduct.title")}</h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 border border-gray-300 px-4 py-3 rounded shadow-md"
        >
          <h2 className="font-semibold">{t("addProduct.productDetails")}</h2>
          <div className="flex flex-col gap-3 ">
            <select
              name="category"
              value={category}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full "
            >
              <option value=""> {t("addProduct.selectCategory")}</option>

              {categories.map((category) => (
                <option className="" key={category.id} value={category.id}>
                  {t(`addProduct.categories.${category.key}`)}
                </option>
              ))}
            </select>
            <div className="flex flex-col gap-2">
              <input
                placeholder={t("addProduct.productName")}
                name="productName"
                value={productName}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                type="text"
              />
              <input
                name="mrp"
                value={mrp}
                onChange={handleChange}
                placeholder={t("addProduct.productMrp")}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                type="text"
              />
              <input
                name="price"
                value={price}
                onChange={handleChange}
                placeholder={t("addProduct.productPrice")}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                type="text"
              />
              <div className="flex justify-between gap-4">
                <select
                  name="discountType"
                  value={discountType}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 w-[50%] "
                >
                  <option value=""> {t("addProduct.discountType")}</option>
                  {discount.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="discountValue"
                  onChange={handleChange}
                  value={discountValue}
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  placeholder={t("addProduct.discountValue")}
                />
              </div>
              <select
                name="unit"
                value={unit}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full "
              >
                {units.map((u) => (
                  <option key={u} value={u}>
                    {t(`addProduct.units.${u}`)}
                  </option>
                ))}
              </select>
              <input
                onChange={handleChange}
                value={size}
                name="size"
                placeholder={t("addProduct.productSize")}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                type="text"
              />{" "}
              <input
                onChange={handleChange}
                value={quantity}
                name="quantity"
                placeholder={t("addProduct.availableQuantity")}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                type="text"
              />
            </div>
            <div className="border border-gray-300 px-4 py-3 rounded shadow flex flex-col gap-3">
              <h1 className="font-bold">
                {t("addProduct.productInformation")}
              </h1>
              <input
                onChange={handleChange}
                value={description}
                name="description"
                placeholder={t("addProduct.description")}
                className="px-2 py-8 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                type="text"
              />
              <input
                onChange={handleChange}
                value={country}
                name="country"
                placeholder={t("addProduct.country")}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                type="text"
              />
              <input
                onChange={handleChange}
                value={manufacturer}
                name="manufacturer"
                placeholder={t("addProduct.manufacturer")}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                type="text"
              />
            </div>
            <div className="flex flex-col sm:flex-row space-x-3 justify-around  w-full">
              <div className="flex flex-col w-[40%] gap-2 border border-gray-300 px-4 py-3 rounded shadow-md">
                <h2 className="font-bold">{t("addProduct.deliveryType")}</h2>
                <p className="text-sm text-gray-400">
                  {t("addProduct.deliveryDescription")}
                </p>
                {deliveryTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDelivery.includes(type)}
                      onChange={() => handleDeliveryChange(type)}
                      className="accent-[var(--primary-color)] w-4 h-4 hover:cursor-pointer"
                    />
                    <span>{t(`addProduct.deliveryTypes.${type}`)}</span>
                  </label>
                ))}
              </div>
              <div>
                <div className="flex flex-col gap-2 border border-gray-300 px-4 py-3 rounded shadow-md">
                  <h2 className="font-bold">{t("addProduct.productImage")}</h2>
                  <p className="text-sm text-gray-400">
                    {t("addProduct.productImageDescription")}
                  </p>
                  <label
                    htmlFor="product-image"
                    className="w-40 h-40 border border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden"
                  >
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <span className="text-3xl text-gray-400">+</span>
                        <p className="text-sm text-gray-500 mt-2">
                          {t("addProduct.uploadImage")}
                        </p>
                      </div>
                    )}
                  </label>

                  <input
                    type="file"
                    id="product-image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImage}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[var(--primary-color)] py-3 px-8 rounded-lg hover:opacity-90 text-white cursor-pointer "
            >
              {t("common.saveChanges")}
            </button>
          </div>
        </form>{" "}
      </div>
    </div>
  );
};

export default AddProduct;

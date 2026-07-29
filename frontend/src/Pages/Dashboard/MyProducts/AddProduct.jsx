import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ArrowLeft, ImagePlus } from "lucide-react";
import {
  addProduct,
  updateProduct,
  fetchProductById,
} from "../../../redux/slices/productSlice";
import { useTranslation } from "react-i18next";

const AddProduct = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const isEditMode = Boolean(productId);
  const selectedStore = useSelector((state) => state.store.selectedStore);
  const storeId = selectedStore?._id || localStorage.getItem("selectedStoreId");

  const [selectedDelivery, setSelectedDelivery] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    productName: "",
    mrp: "",
    price: "",
    discountType: "",
    discountValue: "",
    unit: "Kg",
    size: "",
    stock: "",
    description: "",
    country: "",
    manufacturer: "",
    image: null,
  });

  useEffect(() => {
    if (isEditMode && storeId) {
      dispatch(fetchProductById({ productId, storeId }))
        .unwrap()
        .then((product) => {
          setFormData({
            category: String(product.categoryId),
            productName: product.productName,
            mrp: product.mrp,
            price: product.price,
            discountType: product.discountType,
            discountValue: product.discountValue,
            unit: product.unit,
            size: product.size,
            stock: product.stock,
            description: product.description,
            country: product.country,
            manufacturer: product.manufacturer,
            image: null,
          });
          setSelectedDelivery(product.deliveryTypes || []);
          if (product.image) {
            setExistingImageUrl(`http://localhost:5000${product.image}`);
          }
        })
        .catch((err) => toast.error(err || "Failed to load product"));
    }
  }, [isEditMode, productId, storeId, dispatch]);

  const {
    category,
    productName,
    mrp,
    price,
    discountType,
    discountValue,
    unit,
    size,
    stock,
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
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storeId) {
      toast.error("No store selected");
      return;
    }
    if (!category) {
      toast.error(t("addProduct.selectCategory"));
      return;
    }

    setSubmitting(true);
    try {
      const productPayload = {
        productName,
        price: Number(price),
        mrp: Number(mrp) || 0,
        discountType,
        discountValue: Number(discountValue) || 0,
        unit,
        size,
        stock: Number(stock) || 0,
        description,
        country,
        manufacturer,
        image,
        deliveryTypes: selectedDelivery,
      };

      if (isEditMode) {
        await dispatch(
          updateProduct({
            productId,
            storeId,
            categoryId: Number(category),
            product: productPayload,
          }),
        ).unwrap();
      } else {
        await dispatch(
          addProduct({
            storeId,
            categoryId: Number(category),
            product: productPayload,
          }),
        ).unwrap();
      }

      toast.success(t("common.saveChanges"));
      navigate("/my-products");
    } catch (err) {
      toast.error(err || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition";
  const labelClass = "text-sm font-medium text-gray-600 mb-1 block";

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4 pb-10">
      <button
        onClick={() => navigate("/my-products")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--primary-color)] transition cursor-pointer w-fit"
      >
        <ArrowLeft size={16} />
        Back to products
      </button>

      <h1 className="text-2xl font-bold text-gray-900">
        {isEditMode ? "Edit Product" : t("addProduct.title")}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Basic details */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col gap-4">
          <h2 className="font-semibold text-gray-900">
            {t("addProduct.productDetails")}
          </h2>

          <div>
            <label className={labelClass}>
              {t("addProduct.selectCategory")}
            </label>
            <select
              name="category"
              value={category}
              onChange={handleChange}
              className={`${inputClass} w-full`}
            >
              <option value="">{t("addProduct.selectCategory")}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {t(`addProduct.categories.${cat.key}`)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>{t("addProduct.productName")}</label>
            <input
              placeholder={t("addProduct.productName")}
              name="productName"
              value={productName}
              onChange={handleChange}
              className={`${inputClass} w-full`}
              type="text"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>{t("addProduct.productMrp")}</label>
              <input
                name="mrp"
                value={mrp}
                onChange={handleChange}
                placeholder="0"
                className={`${inputClass} w-full`}
                type="text"
              />
            </div>
            <div>
              <label className={labelClass}>
                {t("addProduct.productPrice")}
              </label>
              <input
                name="price"
                value={price}
                onChange={handleChange}
                placeholder="0"
                className={`${inputClass} w-full`}
                type="text"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>
                {t("addProduct.discountType")}
              </label>
              <select
                name="discountType"
                value={discountType}
                onChange={handleChange}
                className={`${inputClass} w-full`}
              >
                <option value="">{t("addProduct.discountType")}</option>
                {discount.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>
                {t("addProduct.discountValue")}
              </label>
              <input
                type="text"
                name="discountValue"
                onChange={handleChange}
                value={discountValue}
                className={`${inputClass} w-full`}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>{t("addProduct.units.kg")}</label>
              <select
                name="unit"
                value={unit}
                onChange={handleChange}
                className={`${inputClass} w-full`}
              >
                {units.map((u) => (
                  <option key={u} value={u}>
                    {t(`addProduct.units.${u}`)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>
                {t("addProduct.productSize")}
              </label>
              <input
                onChange={handleChange}
                value={size}
                name="size"
                placeholder={t("addProduct.productSize")}
                className={`${inputClass} w-full`}
                type="text"
              />
            </div>
            <div>
              <label className={labelClass}>
                {t("addProduct.availableQuantity")}
              </label>
              <input
                onChange={handleChange}
                value={stock}
                name="stock"
                placeholder="0"
                className={`${inputClass} w-full`}
                type="text"
              />
            </div>
          </div>
        </div>

        {/* Product information */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col gap-4">
          <h2 className="font-semibold text-gray-900">
            {t("addProduct.productInformation")}
          </h2>

          <div>
            <label className={labelClass}>{t("addProduct.description")}</label>
            <textarea
              onChange={handleChange}
              value={description}
              name="description"
              placeholder={t("addProduct.description")}
              rows={3}
              className={`${inputClass} w-full resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>{t("addProduct.country")}</label>
              <input
                onChange={handleChange}
                value={country}
                name="country"
                placeholder={t("addProduct.country")}
                className={`${inputClass} w-full`}
                type="text"
              />
            </div>
            <div>
              <label className={labelClass}>
                {t("addProduct.manufacturer")}
              </label>
              <input
                onChange={handleChange}
                value={manufacturer}
                name="manufacturer"
                placeholder={t("addProduct.manufacturer")}
                className={`${inputClass} w-full`}
                type="text"
              />
            </div>
          </div>
        </div>

        {/* Delivery + image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col gap-3">
            <h2 className="font-semibold text-gray-900">
              {t("addProduct.deliveryType")}
            </h2>
            <p className="text-sm text-gray-400">
              {t("addProduct.deliveryDescription")}
            </p>
            <div className="flex flex-col gap-2 mt-1">
              {deliveryTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2.5 cursor-pointer text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={selectedDelivery.includes(type)}
                    onChange={() => handleDeliveryChange(type)}
                    className="accent-[var(--primary-color)] w-4 h-4 cursor-pointer"
                  />
                  {t(`addProduct.deliveryTypes.${type}`)}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col gap-3">
            <h2 className="font-semibold text-gray-900">
              {t("addProduct.productImage")}
            </h2>
            <p className="text-sm text-gray-400">
              {t("addProduct.productImageDescription")}
            </p>
            <label
              htmlFor="product-image"
              className="w-full h-36 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden hover:border-[var(--primary-color)] transition"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : existingImageUrl ? (
                <img
                  src={existingImageUrl}
                  alt="Current"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <ImagePlus size={24} />
                  <p className="text-sm mt-2">{t("addProduct.uploadImage")}</p>
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

        <button
          type="submit"
          disabled={submitting}
          className="bg-[var(--primary-color)] py-3.5 rounded-xl hover:opacity-90 text-white font-semibold cursor-pointer disabled:opacity-50 active:scale-[0.99] transition"
        >
          {submitting
            ? t("common.loading")
            : isEditMode
              ? "Update Product"
              : t("common.saveChanges")}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

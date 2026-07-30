import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, User, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getStoreById, saveStore, removeStoreImage } from "../../api/storeApi";

const BACKEND_URL = import.meta.env.VITE_API_URL?.replace("/api", "");

const ShopDetails = () => {
  const { t } = useTranslation();
  const selectedStore = useSelector((state) => state.store.selectedStore);
  const storeId = selectedStore?._id;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [storeImage, setStoreImage] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [workingDays, setWorkingDays] = useState([]);
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

  const days = [
    { key: "Mon", label: t("workingDays.mon") },
    { key: "Tue", label: t("workingDays.tue") },
    { key: "Wed", label: t("workingDays.wed") },
    { key: "Thu", label: t("workingDays.thu") },
    { key: "Fri", label: t("workingDays.fri") },
    { key: "Sat", label: t("workingDays.sat") },
    { key: "Sun", label: t("workingDays.sun") },
  ];

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!storeId) {
      setLoading(false);
      return;
    }

    const fetchStore = async () => {
      setLoading(true);
      try {
        const res = await getStoreById(storeId);
        const store = res.data.store;
        setFormData({
          name: store.storeName || "",
          address: store.address || "",
          phone: store.phone || "",
        });
        setWorkingDays(store.workingDays || []);
        setOpeningTime(store.openingTime || "");
        setClosingTime(store.closingTime || "");
        setStoreImage(
          store.storeImage ? `${BACKEND_URL}${store.storeImage}` : null,
        );
      } catch (err) {
        if (err.response?.status !== 404) {
          toast.error("Failed to load shop details");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, [storeId]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    setNewImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
    setIsEditing(true);
    toast.success("Image ready to upload — click Save to confirm");
  };

  const fields = [
    {
      name: "name",
      label: t("shopDetails.shopName"),
      type: "text",
      icon: User,
    },
    {
      name: "address",
      label: t("shopDetails.address"),
      type: "address",
      icon: MapPin,
    },
    {
      name: "phone",
      label: t("shopDetails.phone"),
      type: "tel",
      icon: Phone,
    },
  ];
  const handleRemoveImage = async () => {
    setPreviewImage(null);
    setNewImageFile(null);
    fileInputRef.current.value = "";

    if (!storeImage) return;

    try {
      await removeStoreImage(storeId);
      setStoreImage(null);
      toast.success("Image removed successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove image");
    }
  };

  const handleCheckboxChange = (dayKey) => {
    setWorkingDays((prev) =>
      prev.includes(dayKey)
        ? prev.filter((d) => d !== dayKey)
        : [...prev, dayKey],
    );
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectAll = () => {
    setWorkingDays(
      workingDays.length === days.length ? [] : days.map((d) => d.key),
    );
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!storeId) {
      toast.error("No store selected");
      return;
    }
    if (!formData.name.trim()) return toast.error("Please enter shop name");
    if (!formData.address.trim())
      return toast.error("Please enter shop address");
    if (!formData.phone.trim()) return toast.error("Please enter phone number");

    setIsSaving(true);
    try {
      const payload = new FormData();
      payload.append("storeId", storeId);
      payload.append("storeName", formData.name);
      payload.append("address", formData.address);
      payload.append("phone", formData.phone);
      payload.append("workingDays", JSON.stringify(workingDays));
      payload.append("openingTime", openingTime);
      payload.append("closingTime", closingTime);
      if (newImageFile) {
        payload.append("storeImage", newImageFile);
      }

      const res = await saveStore(payload);
      const savedStore = res.data.store;

      setFormData({
        name: savedStore.storeName || "",
        address: savedStore.address || "",
        phone: savedStore.phone || "",
      });
      setWorkingDays(savedStore.workingDays || []);
      setOpeningTime(savedStore.openingTime || "");
      setClosingTime(savedStore.closingTime || "");
      setStoreImage(
        savedStore.storeImage ? `${BACKEND_URL}${savedStore.storeImage}` : null,
      );
      setNewImageFile(null);
      setPreviewImage(null);
      toast.success("Shop details updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save shop details");
    } finally {
      setIsSaving(false);
    }
  };

  const displayImage = previewImage || storeImage;

  if (!storeId) {
    return (
      <p className="text-sm text-gray-400">
        No store selected. Please select a store first.
      </p>
    );
  }

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-2xl">
        <p className="text-gray-400 text-sm">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl  text-gray-900 font-bold">
          {t("shopDetails.title")}
        </h2>
        <p className="text-md  text-gray-500 mt-1">
          {t("shopDetails.subtitle")}
        </p>
      </div>
      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 ">
          <label className="text-sm font-medium text-gray-600">Shop Name</label>
          <div
            className={`flex items-center rounded-xl border transition-all duration-200 ${
              isEditing
                ? "border-gray-300 focus-within:border-[var(--primary-color)] focus-within:ring-4 focus-within:ring-[var(--primary-color)]/40 bg-white"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <User className="ml-2 text-[var(--primary-color)]" />{" "}
            <input
              onClick={() => setIsEditing(true)}
              type="text"
              name="name"
              onChange={handleChange}
              placeholder={t("shopDetails.shopName")}
              value={formData.name}
              readOnly={!isEditing}
              className="w-full  px-4 py-3 
             text-sm sm:text-base focus:ring-[var(--primary-color)]
             focus:outline-none rounded-xl"
            />
          </div>

          <label className="text-sm font-medium text-gray-600">Address</label>
          <div
            className={`flex items-center rounded-xl border transition-all duration-200 ${
              isEditing
                ? "border-gray-300 focus-within:border-[var(--primary-color)] focus-within:ring-4 focus-within:ring-[var(--primary-color)]/40 bg-white"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <MapPin className="ml-2 text-[var(--primary-color)]" />{" "}
            <input
              onClick={() => setIsEditing(true)}
              type="text"
              name="address"
              placeholder={t("shopDetails.address")}
              onChange={handleChange}
              value={formData.address}
              readOnly={!isEditing}
              className="w-full   px-3 py-6 rounded-xl 
            text-sm sm:text-base focus:ring-[var(--primary-color)]
            focus:outline-none flex"
            ></input>
          </div>

          <label className="text-sm font-medium text-gray-600">Phone</label>
          <div
            className={`flex items-center rounded-xl border transition-all duration-200 ${
              isEditing
                ? "border-gray-300 focus-within:border-[var(--primary-color)] focus-within:ring-4 focus-within:ring-[var(--primary-color)]/40 bg-white"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <Phone className=" ml-2 text-[var(--primary-color)]" />{" "}
            <input
              onClick={() => setIsEditing(true)}
              type="text"
              name="phone"
              onChange={handleChange}
              placeholder={t("shopDetails.phone")}
              readOnly={!isEditing}
              value={formData.phone}
              className="w-full px-3 py-2.5 rounded  text-sm
             sm:text-base focus:ring-[var(--primary-color)] focus:outline-none"
            />
          </div>

          <button
            type="button"
            className=" w-full border flex justify-between items-center
           border-gray-300 px-3 py-3
           hover:bg-gray-50 hover:border-[var(--primary-color)] transition-all duration-150 
           cursor-pointer rounded-xl group"
          >
            <span className="text-sm font-medium text-gray-700">
              {t("shopDetails.mapLocation")}
            </span>

            <p>
              <ArrowRight
                size={18}
                className="text-gray-500 group-hover:text-[var(--primary-color)] group-hover:translate-x-1 transition-all 
              duration-200"
              />
            </p>
          </button>
        </div>

        <div className="border border-gray-200 gap-2 bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between mb-4 items-center">
            <p className="text-base font-semibold text-gray-900">
              {t("shopDetails.workingDays")}
            </p>
            <p className="text-sm text-gray-500">
              Select the days your store will be open
            </p>
            <button
              type="button"
              className=" text-sm font-medium text-[var(--primary-color)] hover:underline cursor-pointer"
              onClick={handleSelectAll}
            >
              {workingDays.length === days.length
                ? t("shopDetails.unselectAll")
                : t("shopDetails.selectAll")}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {days.map((day) => (
              <label
                key={day.key}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="accent-[var(--primary-color)] w-4 h-4"
                  checked={workingDays.includes(day.key)}
                  onChange={() => handleCheckboxChange(day.key)}
                />
                <span className="text-sm font-medium text-gray-700">
                  {day.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 bg-white p-5 flex flex-col gap-2 rounded-2xl">
          <h2 className="font-semibold">{t("shopDetails.workingTime")}</h2>
          <p className="text-sm sm:text-base ">{t("shopDetails.selectTime")}</p>
          <div className="flex justify-between gap-4">
            <input
              type="time"
              value={openingTime}
              onChange={(e) => {
                setOpeningTime(e.target.value);
                setIsEditing(true);
              }}
              className="border border-gray-300 rounded-full px-3 py-2 w-full cursor-pointer"
            />
            <input
              type="time"
              value={closingTime}
              onChange={(e) => {
                setClosingTime(e.target.value);
                setIsEditing(true);
              }}
              className="border border-gray-300 rounded-full px-3 py-2 w-full cursor-pointer"
            />
          </div>
        </div>

        <div className="flex border border-gray-300 flex-col justify-center items-center gap-2 px-3 py-2 rounded">
          <h2 className="font-semibold">{t("shopDetails.editStoreImage")}</h2>
          <p className="text-sm sm:text-base text-gray-500">
            {t("shopDetails.editStoreImageDesc")}
          </p>
          <div className="flex flex-col items-center">
            {displayImage ? (
              <img
                src={displayImage}
                alt="Store"
                className="w-40 h-40 rounded-lg object-cover border"
              />
            ) : (
              <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                {t("shopDetails.noImage")}
              </div>
            )}
            <div className="flex items-center justify-around gap-2">
              <button
                type="button"
                onClick={handleImageClick}
                className="text-[var(--primary-light)] px-3 py-2 mt-5 rounded-xl hover:bg-[var(--primary-hover)] cursor-pointer bg-[var(--primary-color)]"
              >
                {t("shopDetails.changeImage")}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-red-100 bg-red-500 px-3 py-2 mt-5 rounded-xl hover:bg-red-600 cursor-pointer"
              >
                {t("shopDetails.removeImage")}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isEditing || isSaving}
          className={`rounded py-2 text-white transition ${
            isEditing && !isSaving
              ? "bg-[var(--primary-color)] hover:bg-[var(--primary-hover)]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isSaving ? "Saving..." : t("shopDetails.saveChanges")}
        </button>
      </form>
    </div>
  );
};

export default ShopDetails;

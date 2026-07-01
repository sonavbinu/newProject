import React, { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const ShopDetails = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("shopDetails");
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          address: "",
          phone: "",
        };
  });
  const [storeImage, setStoreImage] = useState(null);
  const [workingDays, setWorkingDays] = useState([]);
  const [workingTime, setWorkingTime] = useState({
    open: "",
    close: "",
  });

  const days = [
    t("shopDetails.days.monday"),
    t("shopDetails.days.tuesday"),
    t("shopDetails.days.wednesday"),
    t("shopDetails.days.thursday"),
    t("shopDetails.days.friday"),
    t("shopDetails.days.saturday"),
    t("shopDetails.days.sunday"),
  ];

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setStoreImage(reader.result);
    };
    reader.readAsDataURL(file);

    if (file) {
      setStoreImage(URL.createObjectURL(file));
    }

    setIsEditing(true);
  };

  const handleRemoveImage = () => {
    setStoreImage(null);
    fileInputRef.current.value = "";
    setIsEditing(true);
  };

  const handleCheckboxChange = (day) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const shopData = {
      ...formData,
      workingDays,
      storeImage,
      workingTime,
    };

    localStorage.setItem("shopDetails", JSON.stringify(shopData));
    setIsEditing(false);
  };

  const handleSelectAll = () => {
    if (workingDays.length === days.length) {
      setWorkingDays([]);
    } else {
      setWorkingDays(days);
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem("shopDetails");

    if (savedData) {
      const data = JSON.parse(savedData);

      setWorkingDays(data.workingDays || []);
      setStoreImage(data.storeImage || null);
      setWorkingTime(data.workingTime || { open: "", close: "" });
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold">
          {t("shopDetails.title")}
        </h2>
        <p className="text-sm sm:text-text-base text-gray-400">
          {t("shopDetails.subtitle")}
        </p>
      </div>
      <form onSubmit={handleSave} className="flex  flex-col gap-4">
        <div className="flex flex-col  gap-4">
          <input
            onClick={() => setIsEditing(true)}
            type="text"
            name="name"
            onChange={handleChange}
            placeholder={t("shopDetails.shopName")}
            value={formData.name}
            readOnly={!isEditing}
            className="w-full border border-gray-300 px-3 py-2.5 focus:ring-2
             text-sm sm:text-base focus:ring-[var(--primary-color)] 
             focus:outline-none rounded"
          />
          <input
            onClick={() => setIsEditing(true)}
            type="text"
            name="address"
            placeholder={t("shopDetails.address")}
            onChange={handleChange}
            value={formData.address}
            readOnly={!isEditing}
            className="w-full border border-gray-300 px-3 py-6 rounded focus:ring-2
            text-sm sm:text-base focus:ring-[var(--primary-color)]
            focus:outline-none 
            "
          />
          <input
            onClick={() => setIsEditing(true)}
            type="text"
            name="phone"
            onChange={handleChange}
            placeholder={t("shopDetails.phone")}
            readOnly={!isEditing}
            value={formData.phone}
            className="w-full border border-gray-300 px-3 py-2.5 rounded focus:ring-2 text-sm
             sm:text-base focus:ring-[var(--primary-color)] focus:outline-none"
          />
          <h4 className="border flex justify-between border-gray-300 px-3 py-2.5 hover:bg-gray-200 transition-all duration-150 cursor-pointer rounded">
            {t("shopDetails.mapLocation")}
            <p>
              <ArrowRight />
            </p>
          </h4>
        </div>
        <div className="flex flex-col border border-gray-300 gap-2 rounded px-4 py-2">
          <div className="flex  justify-between">
            <p className="text-md font-semibold">
              {" "}
              {t("shopDetails.workingDays")}
            </p>
            <button
              type="button"
              className="text-[var(--primary-color)] hover:underline cursor-pointer"
              onClick={handleSelectAll}
            >
              {workingDays.length === days.length
                ? t("shopDetails.unselectAll")
                : t("shopDetails.selectAll")}
            </button>{" "}
          </div>

          <div className="flex flex-col gap-2">
            {days.map((day) => (
              <label
                key={day}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  onClick={() => setIsEditing(true)}
                  type="checkbox"
                  className="accent-[var(--primary-color)] w-4 h-4"
                  checked={workingDays.includes(day)}
                  onChange={() => handleCheckboxChange(day)}
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="border border-gray-300 px-3 py-2 flex flex-col gap-2 rounded">
          <h2 className="font-semibold"> {t("shopDetails.workingTime")}</h2>
          <p className="text-sm sm:text-base ">{t("shopDetails.selectTime")}</p>
          <div className="flex justify-between gap-4">
            <input
              onClick={() => setIsEditing(true)}
              type="time"
              value={workingTime.open}
              onChange={(e) =>
                setWorkingTime((prev) => ({
                  ...prev,
                  open: e.target.value,
                }))
              }
              className="border border-gray-300 rounded-full px-3 py-2 w-full cursor-pointer"
            />
            <input
              onClick={() => setIsEditing(true)}
              type="time"
              value={workingTime.close}
              onChange={(e) =>
                setWorkingTime((prev) => ({
                  ...prev,
                  close: e.target.value,
                }))
              }
              className="border border-gray-300 rounded-full px-3 py-2 w-full cursor-pointer"
            />
          </div>
        </div>
        <div className="flex border border-gray-300 flex-col justify-center items-center gap-2 px-3 py-2 rounded">
          <h2 className="font-semibold"> {t("shopDetails.editStoreImage")}</h2>
          <p className="text-sm sm:text-base text-gray-500">
            {t("shopDetails.editStoreImageDesc")}
          </p>
          <div className="flex flex-col items-center">
            {storeImage ? (
              <img
                src={storeImage}
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
                className="text-[var(--primary-light)] px-3 py-2 mt-5 rounded-xl hover:bg-[var(--primary-hover)] cursor-pointer  bg-[var(--primary-color)]"
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
                className="text-red-100 bg-red-500 px-3 py-2 mt-5 rounded-xl hover:bg-red-600  cursor-pointer"
              >
                {t("shopDetails.removeImage")}
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={!isEditing}
          className={`rounded py-2 text-white transition ${
            isEditing
              ? "bg-[var(--primary-color)] hover:bg-[var(--primary-hover)]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {t("shopDetails.saveChanges")}
        </button>
      </form>
    </div>
  );
};

export default ShopDetails;

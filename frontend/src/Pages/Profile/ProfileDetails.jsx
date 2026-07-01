import { Truck } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const ProfileDetails = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("profile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          phone: "",
          email: "",
        };
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("profile", JSON.stringify(formData));

    toast.success("Profile updated successfully!");

    console.log(formData);

    setIsEditing(false);
  };

  return (
    <div className=" w-full max-w-xl mx-auto rounded-lg flex flex-col gap-4 shadow p-4 sm:p-6 bg-white">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg sm:text-xl  font-semibold ">
          {t("profileDetails.title")}
        </h2>
        <p className="text-sm text-gray-400">{t("profileDetails.subtitle")}</p>
        <form className="flex flex-col gap-2" onSubmit={handleSave}>
          <div className="flex flex-col gap-2 font-medium text-sm sm:text-base">
            <label className="font-semibold">{t("profileDetails.name")}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={!isEditing}
              className=" w-full border border-gray-300 px-3 py-2.5 focus:ring-2 text-sm sm:text-base  focus:ring-[var(--primary-color)] focus:outline-none rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm sm:text-base">
              {t("profileDetails.phone")}
            </label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              readOnly={!isEditing}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2.5 focus:ring-2 text-sm sm:text-base  focus:ring-[var(--primary-color)] focus:outline-none rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">{t("profileDetails.email")}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly={!isEditing}
              onChange={handleChange}
              className=" w-full border border-gray-300 px-3 py-2.5 focus:ring-2 text-sm sm:text-base  focus:ring-[var(--primary-color)] focus:outline-none rounded"
            />

            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-[var(--primary-color)] hover:underline"
            >
              {t("profileDetails.change")}
            </button>
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
            {t("profileDetails.saveChanges")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;

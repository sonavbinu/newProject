import { Truck } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { getProfile, updateProfile } from "../../api/partnerApi";

const ProfileDetails = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
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

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      const { name, phone, email } = res.data.user;
      setFormData({ name: name || "", phone: phone || "", email: email || "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateProfile(formData);
      setFormData({
        name: res.data.user.name,
        phone: res.data.user.phone,
        email: res.data.user.email,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-lg">Loding profile...</div>
    );
  }

  return (
    <div className=" w-full  rounded-lg flex flex-col gap-4  p-4 sm:p-6 bg-white">
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
            disabled={!isEditing || saving}
            className={`rounded py-2 text-white transition ${
              isEditing
                ? "bg-[var(--primary-color)] hover:bg-[var(--primary-hover)]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {saving ? "Saving..." : t("profileDetails.saveChanges")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;

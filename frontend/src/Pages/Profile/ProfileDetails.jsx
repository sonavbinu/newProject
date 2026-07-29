import { Truck, User, Phone, Mail } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { getProfile, updateProfile } from "../../api/partnerApi";
import { useSelector } from "react-redux";

const ProfileDetails = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
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

  const selectedStore = useSelector((state) => state.store.selectedStore);

  useEffect(() => {
    if (selectedStore) {
      setFormData({
        name: selectedStore.ownerName,
        phone: selectedStore.phone,
        email: selectedStore.email,
      });
    }
  }, [selectedStore]);
  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      const { name, phone, email } = res.data.user;
      console.log("API response:", res.data);
      console.log("user:", res.data.user);
      setFormData({
        name: name || "",
        phone: phone || "",
        email: email || "",
      });
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

    console.log("Sending:", formData);
    try {
      const res = await updateProfile(formData);
      console.log("Response:", res.data);
      setFormData({
        name: res.data.user.name,
        phone: res.data.user.phone,
        email: res.data.user.email,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.log("Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <p className="text-gray-400 text-sm">Loading profile...</p>
      </div>
    );
  }

  const fields = [
    {
      name: "name",
      label: t("profileDetails.name"),
      type: "text",
      icon: User,
    },
    {
      name: "phone",
      label: t("profileDetails.phone"),
      type: "tel",
      icon: Phone,
    },
    {
      name: "email",
      label: t("profileDetails.email"),
      type: "email",
      icon: Mail,
    },
  ];

  return (
    <div className=" w-full  rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-5  p-5 sm:p-6 bg-white">
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {t("profileDetails.title")}
          </h2>

          <p className="text-gray-500 mt-1">{t("profileDetails.subtitle")}</p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSave}>
          {fields.map(({ name, label, type, icon: Icon }) => (
            <div key={name} className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                {label}
              </label>

              <div
                className={`flex items-center rounded-xl border transition-all duration-200 ${
                  isEditing
                    ? "border-gray-300 focus-within:border-[var(--primary-color)] focus-within:ring-4 focus-within:ring-[var(--primary-color)]/40 bg-white"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <Icon
                  size={18}
                  className="ml-4 text-[var(--primary-color)] shrink-0"
                />

                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full bg-transparent px-4 py-3 text-sm sm:text-base outline-none ${
                    !isEditing
                      ? "text-gray-500 cursor-default"
                      : "text-gray-900"
                  }`}
                />
              </div>
            </div>
          ))}

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="self-start px-5 py-2.5 rounded-xl bg-[var(--primary-color)] text-white font-medium hover:opacity-90 transition cursor-pointer"
            >
              {t("profileDetails.change")}
            </button>
          ) : (
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  fetchProfile();
                }}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition cursor-pointer"
              >
                {t("common.cancel")}
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-3 rounded-xl bg-[var(--primary-color)] text-white font-medium hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
              >
                {saving ? "Saving..." : t("profileDetails.saveChanges")}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;

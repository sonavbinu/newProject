import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import Stepper from "./Stepper";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Agreement = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { storeData } = useOutletContext();

  useEffect(() => {
    console.log("Agreement token:", localStorage.getItem("token"));
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(storeData).forEach((key) => {
        const value = storeData[key];

        // Handle arrays
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        }
        // Handle files
        else if (value instanceof File) {
          formData.append(key, value);
        }
        // Handle normal values
        else {
          formData.append(key, value ?? "");
        }
      });

      formData.append("email", storeData.ownerEmail ?? "");

      const token = localStorage.getItem("token");
      console.log("Agreement token:", token);

      const res = await axios.post(
        "http://localhost:5000/api/stores/register",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert(res.data.message);

      navigate("/select-store");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Stepper */}
        <aside>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:sticky lg:top-24">
            <Stepper agreementCompleted={accepted} />
          </div>
        </aside>

        {/* Agreement Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          {/* Final Step Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-5">
            {t("agreement.finalStep")}
          </div>

          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 rounded-xl bg-[var(--primary-color)]/10">
              <ShieldCheck size={32} className="text-[var(--primary-color)]" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {t("agreement.title")}
              </h2>

              <p className="text-gray-500 mt-1">{t("agreement.subtitle")}</p>
            </div>
          </div>

          {/* Agreement Content */}
          <div className="h-96 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-6 text-gray-600 leading-8">
            <h3 className="font-semibold text-gray-900 mb-2">
              {t("agreement.accountTitle")}
            </h3>

            <p className="mb-5">{t("agreement.accountText")}</p>

            <h3 className="font-semibold text-gray-900 mb-2">
              {t("agreement.productTitle")}
            </h3>

            <p className="mb-5">{t("agreement.productText")}</p>

            <h3 className="font-semibold text-gray-900 mb-2">
              {t("agreement.orderTitle")}
            </h3>

            <p className="mb-5">{t("agreement.orderText")}</p>

            <h3 className="font-semibold text-gray-900 mb-2">
              {t("agreement.businessTitle")}
            </h3>

            <p className="mb-5">{t("agreement.businessText")}</p>

            <h3 className="font-semibold text-gray-900 mb-2">
              {t("agreement.policyTitle")}
            </h3>

            <p className="mb-5">{t("agreement.policyText")}</p>

            <h3 className="font-semibold text-gray-900 mb-2">
              {t("agreement.paymentTitle")}
            </h3>

            <p className="mb-5">{t("agreement.paymentText")}</p>

            <h3 className="font-semibold text-gray-900 mb-2">
              {t("agreement.suspensionTitle")}
            </h3>

            <p>{t("agreement.suspensionText")}</p>
          </div>

          {/* Info Box */}
          <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-700">{t("agreement.infoBox")}</p>
          </div>

          {/* Agreement Checkbox */}
          <label className="flex items-start gap-3 mt-6 cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 w-5 h-5 accent-[var(--primary-color)]"
            />

            <div>
              <p className="font-medium text-gray-900">
                {t("agreement.checkboxTitle")}
              </p>

              <p className="text-sm text-gray-500">
                {t("agreement.checkboxText")}
              </p>
            </div>
          </label>

          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <button
              disabled={!accepted || loading}
              onClick={handleSubmit}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                accepted
                  ? "bg-[var(--primary-color)] text-white hover:opacity-90 shadow-sm"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? t("agreement.submitting") : t("agreement.finish")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agreement;

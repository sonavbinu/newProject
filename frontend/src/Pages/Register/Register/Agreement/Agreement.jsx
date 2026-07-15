import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import Stepper from "./Stepper";
import axios from "axios";

const Agreement = () => {
  const navigate = useNavigate();

  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { storeData } = useOutletContext();

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

      const token = localStorage.getItem("token");

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
            Final Step
          </div>

          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 rounded-xl bg-[var(--primary-color)]/10">
              <ShieldCheck size={32} className="text-[var(--primary-color)]" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Partner Agreement
              </h2>

              <p className="text-gray-500 mt-1">
                Please review and accept the agreement before continuing.
              </p>
            </div>
          </div>

          {/* Agreement Content */}
          <div className="h-96 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-6 text-gray-600 leading-8">
            <h3 className="font-semibold text-gray-900 mb-2">
              1. Account Responsibilities
            </h3>

            <p className="mb-5">
              By registering as an ORIGIN Partner, you confirm that all
              information provided is accurate, complete, and up to date.
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">
              2. Product Quality
            </h3>

            <p className="mb-5">
              You agree to maintain product quality standards and ensure that
              all products listed on the platform are genuine and accurately
              represented.
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">
              3. Order Fulfillment
            </h3>

            <p className="mb-5">
              Partners are responsible for processing and fulfilling customer
              orders promptly while maintaining a positive customer experience.
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">
              4. Business Information
            </h3>

            <p className="mb-5">
              You are responsible for keeping your store details, contact
              information, operating hours, and product inventory accurate and
              up to date.
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">
              5. Policy Compliance
            </h3>

            <p className="mb-5">
              All partners must comply with ORIGIN policies, applicable laws,
              and any future guidelines communicated by the platform while using
              ORIGIN services.
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">
              6. Payments & Settlements
            </h3>

            <p className="mb-5">
              Payments will be processed only to the verified bank account
              provided during registration. ORIGIN reserves the right to hold
              settlements in case of disputes, fraud detection, or policy
              violations.
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">
              7. Account Suspension
            </h3>

            <p>
              ORIGIN reserves the right to suspend or terminate partner accounts
              that violate platform policies, provide false information, engage
              in fraudulent activities, or fail to meet required quality
              standards.
            </p>
          </div>

          {/* Info Box */}
          <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-700">
              Once accepted, this agreement remains valid unless updated by
              ORIGIN. Any future changes will be communicated to partners.
            </p>
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
                I agree to the ORIGIN Partner Agreement
              </p>

              <p className="text-sm text-gray-500">
                You must accept the agreement before continuing.
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
              {loading ? "Submitting..." : "Finish Registration"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agreement;

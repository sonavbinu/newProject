import React, { useState, useEffect } from "react";
import { User, Mail, Phone, MessageCircle, ShieldCheck } from "lucide-react";

const OwnerForm = ({ storeData, setStoreData }) => {
  const [sameWhatsApp, setSameWhatsApp] = useState(true);

  // Keep whatsapp same as phone when selected
  useEffect(() => {
    if (sameWhatsApp) {
      setStoreData((prev) => ({
        ...prev,
        whatsapp: prev.ownerPhone,
      }));
    }
  }, [sameWhatsApp, storeData.ownerPhone, setStoreData]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
          <User size={22} className="text-[var(--primary-color)]" />
        </div>
      </div>

      <div className="border border-gray-200 shadow-md rounded-xl p-6 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Owner Information
          </h1>
          <p className="text-sm text-gray-500">
            Enter the owner's contact details
          </p>
        </div>

        <form className="space-y-5">
          {/* Owner Name */}
          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Owner's Name"
              value={storeData.ownerName}
              onChange={(e) =>
                setStoreData((prev) => ({
                  ...prev,
                  ownerName: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={storeData.ownerEmail}
              onChange={(e) =>
                setStoreData((prev) => ({
                  ...prev,
                  ownerEmail: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>

          {/* Phone */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Phone
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="tel"
                placeholder="Mobile Number"
                value={storeData.ownerPhone}
                onChange={(e) =>
                  setStoreData((prev) => ({
                    ...prev,
                    ownerPhone: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>

            <button
              type="button"
              className="px-6 rounded-xl bg-[var(--primary-color)] text-white font-medium hover:bg-[var(--primary-hover)] transition"
            >
              Send OTP
            </button>
          </div>
        </form>

        {/* WhatsApp */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">
            By providing your WhatsApp number, you'll receive updates on
            payments, order confirmations, and more.
          </p>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={sameWhatsApp}
              onChange={() => setSameWhatsApp(true)}
              className="accent-[var(--primary-color)]"
            />

            <span className="text-sm text-gray-600">
              My WhatsApp number is same as above
            </span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={!sameWhatsApp}
              onChange={() => setSameWhatsApp(false)}
              className="accent-[var(--primary-color)]"
            />

            <span className="text-sm text-gray-600">
              I have a different WhatsApp number
            </span>
          </label>
        </div>

        {!sameWhatsApp && (
          <div className="relative">
            <MessageCircle
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="tel"
              placeholder="WhatsApp Number"
              value={storeData.whatsapp}
              onChange={(e) =>
                setStoreData((prev) => ({
                  ...prev,
                  whatsapp: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-green-50 border border-green-200 p-4 mt-6">
        <ShieldCheck size={20} className="text-green-600 mt-0.5" />

        <p className="text-sm text-green-700">
          Your contact information is used only for account verification and
          important business communications.
        </p>
      </div>
    </div>
  );
};

export default OwnerForm;

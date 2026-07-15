import React, { useState, useEffect } from "react";
import { Store, MapPin, Phone, ShieldCheck } from "lucide-react";

const StoreForm = ({ storeData, setStoreData }) => {
  const [sameContact, setSameContact] = useState(true);

  useEffect(() => {
    if (sameContact) {
      setStoreData((prev) => ({
        ...prev,
        storePhone: prev.ownerPhone,
      }));
    }
  }, [sameContact, storeData.ownerPhone, setStoreData]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
          <Store size={22} className="text-[var(--primary-color)]" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Store Information
          </h2>
          <p className="text-sm text-gray-500">
            Provide your business details.
          </p>
        </div>
      </div>

      <form className="space-y-5">
        {/* Store Name */}
        <div className="relative">
          <Store
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Store Name"
            value={storeData.storeName}
            onChange={(e) =>
              setStoreData((prev) => ({
                ...prev,
                storeName: e.target.value,
              }))
            }
            className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          />
        </div>

        {/* Address */}
        <div className="relative">
          <MapPin size={18} className="absolute left-4 top-4 text-gray-400" />

          <textarea
            rows={3}
            placeholder="Store Full Address"
            value={storeData.address}
            onChange={(e) =>
              setStoreData((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
            className="w-full resize-none rounded-xl border border-gray-300 py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          />
        </div>

        {/* Same Contact */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={sameContact}
            onChange={(e) => setSameContact(e.target.checked)}
            className="w-4 h-4 accent-[var(--primary-color)]"
          />

          <span className="text-gray-700">
            Use my owner's contact number as the store contact number
          </span>
        </label>

        {/* Store Phone */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Phone
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="tel"
              placeholder="Store Contact Number"
              value={storeData.storePhone}
              onChange={(e) =>
                setStoreData((prev) => ({
                  ...prev,
                  storePhone: e.target.value,
                }))
              }
              disabled={sameContact}
              className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] disabled:bg-gray-100"
            />
          </div>

          <button
            type="button"
            className="px-6 rounded-xl bg-[var(--primary-color)] text-white font-medium hover:bg-[var(--primary-hover)] transition"
          >
            Verify
          </button>
        </div>

        {/* Info */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <ShieldCheck size={20} className="text-blue-600 mt-0.5" />

          <p className="text-sm text-blue-700">
            The store contact number will be displayed to customers for
            order-related communication and delivery assistance.
          </p>
        </div>
      </form>
    </div>
  );
};

export default StoreForm;

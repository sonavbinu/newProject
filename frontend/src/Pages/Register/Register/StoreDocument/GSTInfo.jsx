import React from "react";
import { BadgeCheck, CreditCard, FileBadge, ShieldCheck } from "lucide-react";

const GSTInfo = ({ storeData, setStoreData }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
          <BadgeCheck size={22} className="text-[var(--primary-color)]" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            PAN & GST Details
          </h2>
          <p className="text-sm text-gray-500">
            Enter your business tax information for verification.
          </p>
        </div>
      </div>

      <form className="space-y-5">
        {/* PAN */}
        <div className="relative">
          <CreditCard
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Store / Owner PAN"
            value={storeData.pan}
            onChange={(e) =>
              setStoreData({
                ...storeData,
                pan: e.target.value.toUpperCase(),
              })
            }
            className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 uppercase
            focus:outline-none
            focus:ring-2
            focus:ring-[var(--primary-color)]"
          />
        </div>

        {/* GST */}
        <div className="relative">
          <FileBadge
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="GSTIN"
            value={storeData.gst}
            onChange={(e) =>
              setStoreData({
                ...storeData,
                gst: e.target.value.toUpperCase(),
              })
            }
            className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 uppercase
            focus:outline-none
            focus:ring-2
            focus:ring-[var(--primary-color)]"
          />
        </div>

        {/* Information Box */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <ShieldCheck
            size={20}
            className="text-blue-600 mt-0.5 flex-shrink-0"
          />

          <p className="text-sm text-blue-700">
            Your PAN and GSTIN are securely stored and used only for business
            verification, compliance, and tax-related purposes.
          </p>
        </div>
      </form>
    </div>
  );
};

export default GSTInfo;

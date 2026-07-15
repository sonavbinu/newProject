import React from "react";
import { Clock3, Info } from "lucide-react";

const WorkingTime = ({ storeData, setStoreData }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
          <Clock3 size={22} className="text-[var(--primary-color)]" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Working Time</h2>
          <p className="text-sm text-gray-500">
            Set your business operating hours.
          </p>
        </div>
      </div>

      {/* Time Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Opening Time */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Opening Time
          </label>

          <input
            type="time"
            value={storeData.openingTime}
            onChange={(e) =>
              setStoreData({
                ...storeData,
                openingTime: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3
              focus:outline-none focus:ring-2
              focus:ring-[var(--primary-color)]
              focus:border-transparent transition"
          />
        </div>

        {/* Closing Time */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Closing Time
          </label>

          <input
            type="time"
            value={storeData.closingTime}
            onChange={(e) =>
              setStoreData({
                ...storeData,
                closingTime: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3
              focus:outline-none focus:ring-2
              focus:ring-[var(--primary-color)]
              focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <Info size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />

        <p className="text-sm text-blue-700">
          Customers will see these timings while placing orders. Please make
          sure they match your actual business hours.
        </p>
      </div>
    </div>
  );
};

export default WorkingTime;

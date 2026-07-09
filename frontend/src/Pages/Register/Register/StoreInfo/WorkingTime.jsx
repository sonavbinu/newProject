import React from "react";

const WorkingTime = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
      <h2 className="text-2xl font-bold mb-6">Working Time</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Opening Time */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Opening Time
          </label>

          <input
            type="time"
            className="w-full border border-gray-300 rounded-lg px-4 py-3
            focus:outline-none focus:ring-2
            focus:ring-[var(--primary-color)]
            focus:border-[var(--primary-color)]"
          />
        </div>

        {/* Closing Time */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Closing Time
          </label>

          <input
            type="time"
            className="w-full border border-gray-300 rounded-lg px-4 py-3
            focus:outline-none focus:ring-2
            focus:ring-[var(--primary-color)]
            focus:border-[var(--primary-color)]"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkingTime;

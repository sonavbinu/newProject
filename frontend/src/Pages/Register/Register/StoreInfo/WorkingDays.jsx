import React from "react";
import { CalendarDays } from "lucide-react";

const WorkingDays = ({ storeData, setStoreData }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const selectedDays = storeData.workingDays;

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setStoreData((prev) => ({
        ...prev,
        workingDays: selectedDays.filter((d) => d !== day),
      }));
    } else {
      setStoreData((prev) => ({
        ...prev,
        workingDays: [...selectedDays, day],
      }));
    }
  };

  const handleSelectAll = () => {
    if (selectedDays.length === days.length) {
      setStoreData((prev) => ({
        ...prev,
        workingDays: [],
      }));
    } else {
      setStoreData((prev) => ({
        ...prev,
        workingDays: [...days],
      }));
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mt-8">
      <div className="flex justify-between items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
          <CalendarDays size={22} className="text-[var(--primary-color)]" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Working Days</h1>
          <p className="text-sm text-gray-500">
            Select the days your store is open.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSelectAll}
          className="text-[var(--primary-color)] font-medium hover:underline"
        >
          {selectedDays.length === days.length ? "Unselect All" : "Select All"}
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {days.map((day) => {
          const selected = selectedDays.includes(day);

          return (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                selected
                  ? "bg-[var(--primary-color)] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WorkingDays;

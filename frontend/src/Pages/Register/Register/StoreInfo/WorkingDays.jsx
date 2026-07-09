import React from "react";

const WorkingDays = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mt-8 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Working Days</h1>
        <button className="text-[var(--primary-color)] font-medium hover:underline">
          Select All
        </button>
      </div>
      <div className="flex gap-10">
        {days.map((day) => (
          <button
            key={day}
            className="py-3 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorkingDays;

import React from "react";
import { CalendarDays } from "lucide-react";
import { useTranslation } from "react-i18next";

const WorkingDays = ({ storeData, setStoreData }) => {
  const { t } = useTranslation();

  const days = [
    { key: "Mon", label: t("workingDays.mon") },
    { key: "Tue", label: t("workingDays.tue") },
    { key: "Wed", label: t("workingDays.wed") },
    { key: "Thu", label: t("workingDays.thu") },
    { key: "Fri", label: t("workingDays.fri") },
    { key: "Sat", label: t("workingDays.sat") },
    { key: "Sun", label: t("workingDays.sun") },
  ];

  const selectedDays = storeData.workingDays || [];

  const toggleDay = (day) => {
    setStoreData((prev) => {
      const currentDays = prev.workingDays || [];

      return {
        ...prev,
        workingDays: currentDays.includes(day)
          ? currentDays.filter((d) => d !== day)
          : [...currentDays, day],
      };
    });
  };

  const handleSelectAll = () => {
    setStoreData((prev) => ({
      ...prev,
      workingDays:
        selectedDays.length === days.length ? [] : days.map((day) => day.key),
    }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mt-8">
      <div className="flex justify-between items-center mb-6">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
          <CalendarDays size={22} className="text-[var(--primary-color)]" />
        </div>

        {/* Heading */}
        <div className="flex-1 ml-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {t("workingDays.title")}
          </h1>

          <p className="text-sm text-gray-500">{t("workingDays.subtitle")}</p>
        </div>

        {/* Select All */}
        <button
          type="button"
          onClick={handleSelectAll}
          className="text-[var(--primary-color)] font-medium hover:underline"
        >
          {selectedDays.length === days.length
            ? t("workingDays.unselectAll")
            : t("workingDays.selectAll")}
        </button>
      </div>

      {/* Days */}
      <div className="flex flex-wrap gap-3">
        {days.map((day) => {
          const selected = selectedDays.includes(day.key);

          return (
            <button
              key={day.key}
              type="button"
              onClick={() => toggleDay(day.key)}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                selected
                  ? "bg-[var(--primary-color)] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {day.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WorkingDays;

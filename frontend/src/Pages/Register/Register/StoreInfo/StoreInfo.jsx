import React from "react";
import Stepper from "./Stepper";
import OwnerForm from "./OwnerForm";
import StoreForm from "./StoreForm";
import WorkingDays from "./WorkingDays";
import WorkingTime from "./WorkingTime";
import StoreImage from "./StoreImage";

const StoreInfo = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 ">
          Start your Onboarding Process with Us
        </h1>
        <p className="mt-2 text-gray-500 max-w-2xl mx-auto">
          Kindly fill all the information correctly to get onboarded quickly
          with <span className="font-semibold">ORIGIN</span>
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {" "}
        <div className="flex flex-col   lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-1/4">
            <Stepper />
          </div>
          <div className="w-full lg:w-3/4">
            <OwnerForm />
          </div>
        </div>
        <div className="mt-8 space-y-8">
          <StoreForm />
          <WorkingDays />
          <WorkingTime />
          <StoreImage />
        </div>
        <div className="flex justify-center mt-10">
          <button className="px-8 py-3 rounded-lg bg-[var(--primary-color)] text-white font-medium hover:opacity-90 transition">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;

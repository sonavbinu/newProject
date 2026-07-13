import React from "react";
import Stepper from "./Stepper";
import OwnerForm from "./OwnerForm";
import StoreForm from "./StoreForm";
import WorkingDays from "./WorkingDays";
import WorkingTime from "./WorkingTime";
import StoreImage from "./StoreImage";
import { useNavigate } from "react-router-dom";
import { Store } from "lucide-react";

const StoreInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {" "}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto rounded-full bg-[var(--primary-light)] flex items-center justify-center mb-5">
            <Store size={30} className="text-[var(--primary-color)]" />
          </div>
          <span className="inline-block px-4 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary-color)] text-sm font-medium mb-4">
            Step 1 to 3
          </span>
          <h1 className="text-4xl font-bold text-gray-900 ">
            Start your Onboarding Process with Us
          </h1>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Kindly fill all the information correctly to get onboarded quickly
            with <span className="font-semibold">ORIGIN</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <aside>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 sticky top-24">
              <Stepper />
            </div>
          </aside>

          {/* Form */}
          <main className=" space-y-8">
            <OwnerForm />
            <StoreForm />
            <WorkingDays />
            <WorkingTime />
            <StoreImage />

            <div className="flex pt-4 justify-end">
              <button
                onClick={() => {
                  navigate("/documents");
                }}
                className="px-10 py-3 rounded-xl bg-[var(--primary-color)]
                font-semibold shadow-md transition hover:bg-[var(--primary-hover)]
                hover:shadow-lg
                text-white"
              >
                Continue
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;

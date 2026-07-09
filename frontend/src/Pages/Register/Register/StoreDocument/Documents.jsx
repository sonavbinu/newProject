import React from "react";
import Stepper from "./Stepper";
import GSTInfo from "./GSTInfo";
import BankInfo from "./BankInfo";
import QR from "./QR";
import { useNavigate } from "react-router-dom";

const Documents = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 ">
          Start your Onboarding Process with Us
        </h1>
        <p className="mt-2 text-gray-500 max-w-2xl mx-auto">
          Kindly fill all the information correctly to get onboarded quickly
          with <span className="font-semibold">ORIGIN</span>
        </p>
      </div>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          {/* Header */}

          <div className="text-center mb-10">...</div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-72">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 lg:sticky lg:top-24">
                <Stepper />
              </div>
            </aside>

            {/* Form */}
            <main className="flex-1 w-full space-y-8">
              <GSTInfo />
              <BankInfo />
              <QR />

              <div className="flex justify-center lg:justify-end">
                <button
                  onClick={() => {
                    navigate("/agreement");
                  }}
                  className="px-8 py-3 rounded-lg bg-[var(--primary-color)] text-white"
                >
                  Continue
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;

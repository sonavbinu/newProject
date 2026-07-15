import React from "react";
import { useNavigate } from "react-router-dom";
import { FileCheck } from "lucide-react";

import Stepper from "./Stepper";
import GSTInfo from "./GSTInfo";
import BankInfo from "./BankInfo";
import QR from "./QR";
import { useOutletContext } from "react-router-dom";

const Documents = () => {
  const { storeData, setStoreData } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto rounded-full bg-[var(--primary-light)] flex items-center justify-center mb-5">
            <FileCheck size={30} className="text-[var(--primary-color)]" />
          </div>

          <span className="inline-block px-4 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary-color)] text-sm font-medium mb-4">
            Step 2 of 3
          </span>

          <h1 className="text-4xl font-bold text-gray-900">
            Business Documents
          </h1>

          <p className="mt-3 text-gray-500 max-w-2xl mx-auto leading-7">
            Provide your GST, bank account, and payment details. This
            information is required to verify your business and process payouts
            securely.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 sticky top-24">
              <Stepper />
            </div>
          </aside>

          {/* Forms */}
          <main className="space-y-8">
            <GSTInfo storeData={storeData} setStoreData={setStoreData} />

            <BankInfo storeData={storeData} setStoreData={setStoreData} />

            <QR storeData={storeData} setStoreData={setStoreData} />

            <div className="flex justify-end pt-4">
              <button
                onClick={() => navigate("/agreement")}
                className="px-10 py-3 rounded-xl bg-[var(--primary-color)] text-white font-semibold shadow-md transition hover:bg-[var(--primary-hover)] hover:shadow-lg"
              >
                Continue →
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Documents;

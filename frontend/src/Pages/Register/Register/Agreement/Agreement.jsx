import React from "react";
import Stepper from "./Stepper";
import { useNavigate } from "react-router-dom";

const Agreement = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <Stepper />
        <h2 className="text-2xl font-bold mb-6">Partner Agreement</h2>

        <div className="h-80 overflow-y-auto border rounded-lg p-5 text-sm text-gray-600 leading-7">
          By registering as an ORIGIN Partner, you confirm that all the
          information provided is accurate and complete. You agree to comply
          with ORIGIN's policies, maintain product quality, fulfill customer
          orders responsibly, and keep your business details up to date. ORIGIN
          reserves the right to suspend or terminate accounts that violate these
          terms.
        </div>

        <div className="flex items-center gap-3 mt-6">
          <input
            type="checkbox"
            className="w-5 h-5 accent-[var(--primary-color)]"
          />

          <span>I have read and agree to the ORIGIN Partner Agreement.</span>
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="px-8 py-3 rounded-lg bg-[var(--primary-color)] text-white"
      >
        Continue
      </button>
    </div>
  );
};

export default Agreement;

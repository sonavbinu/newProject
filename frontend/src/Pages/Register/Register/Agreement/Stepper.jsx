import React from "react";
import { Check } from "lucide-react";

const Stepper = ({ agreementCompleted }) => {
  return (
    <div>
      <div className="flex flex-col ">
        <div className="flex items-start gap-4 ">
          <div className="flex flex-col items-center">
            <div
              className="w-6 h-6 rounded-full flex items-center bg-[var(--primary-light)]
                border-2 border-[var(--primary-color)]
                "
            >
              <Check
                size={20}
                className="text-[var(--primary-color)] font-bold"
              />
            </div>
            <div className="w-0.5 h-16 bg-[var(--primary-color)]"></div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900">
              Store Information
            </h3>
            <p className="text-xs text-gray-500">
              Owner name,Store location,Store address
            </p>
          </div>
        </div>
        <div className="flex  gap-4">
          <div className="flex flex-col items-center">
            <div
              className="w-6 h-6 rounded-full flex items-center bg-[var(--primary-light)]
                border-2 border-[var(--primary-color)]
                "
            >
              <Check
                size={20}
                className="text-[var(--primary-color)] font-bold"
              />
            </div>
            <div className="w-0.5 h-16 bg-[var(--primary-color)]"></div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900">
              Store Document
            </h3>
            <p className="text-xs text-gray-500">
              GSTIN Number, PAN Number, Bank details
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2
      ${
        agreementCompleted
          ? "bg-[var(--primary-light)] border-[var(--primary-color)]"
          : "bg-[var(--primary-light)] border-[var(--primary-color)]"
      }`}
            >
              {agreementCompleted && (
                <Check size={18} className="text-[var(--primary-color)]" />
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900">Agreement</h3>
            <p className="text-xs text-gray-500">ORIGIN Partner Agreement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;

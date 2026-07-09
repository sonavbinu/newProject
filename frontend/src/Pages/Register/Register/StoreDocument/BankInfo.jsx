import React from "react";

const BankInfo = () => {
  return (
    <div>
      <form className="flex flex-col gap-4">
        <div className=" gap-3 border-gray-200 shadow-md border p-6 mt-2 rounded-xl flex flex-col">
          <h1 className="font-bold text-xl">Bank Details</h1>
          <input
            className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
            type="text"
            placeholder="Bank Name"
          />
          <input
            className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
            type="text"
            placeholder="Bank Account Number"
          />
          <div className="flex justify-between gap-3">
            <input
              className="p-3 border border-gray-300 rounded focus:ring-2
              focus:ring-[var(--primary-color)] outline-none w-full"
              type="text"
              placeholder="Bank IFSC Code"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BankInfo;

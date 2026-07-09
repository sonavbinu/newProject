import React from "react";

const GSTInfo = () => {
  return (
    <div>
      <form className="flex flex-col gap-4">
        <div>
          <div className="flex flex-col border rounded-lg border-gray-200 shadow p-6 gap-3 ">
            <h1 className="font-bold text-xl">Enter PAN & GSTIN details</h1>
            <input
              className="p-3 border border-gray-300 rounded focus:ring-2
              focus:ring-[var(--primary-color)] outline-none w-full"
              type="text"
              placeholder="Store/Owner PAN"
            />
            <input
              className="p-3 border border-gray-300 rounded focus:ring-2
              focus:ring-[var(--primary-color)] outline-none w-full"
              type="text"
              placeholder="GSTIN"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default GSTInfo;

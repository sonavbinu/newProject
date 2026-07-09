import React from "react";

const StoreForm = () => {
  return (
    <div>
      <form className="flex flex-col gap-4">
        <div>
          <div className="flex flex-col border rounded-lg border-gray-200 shadow p-6 gap-3 ">
            <h1 className="font-bold text-xl">Store Information</h1>
            <input
              className="p-3 border border-gray-300 rounded focus:ring-2
              focus:ring-[var(--primary-color)] outline-none w-full"
              type="text"
              placeholder="Store Name"
            />
            <input
              className="p-3 border border-gray-300 rounded focus:ring-2
              focus:ring-[var(--primary-color)] outline-none w-full"
              type="text"
              placeholder="Store Full Address"
            />
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <p>Same as my contact number</p>
            </div>

            <div className="flex gap-3">
              <input
                className="p-3 border border-gray-300 rounded focus:ring-2
              focus:ring-[var(--primary-color)] outline-none w-full"
                type="text"
                placeholder="Store Contact Number"
              />
              <button className="bg-gray-300 text-black p-3 rounded w-full">
                Verify
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StoreForm;

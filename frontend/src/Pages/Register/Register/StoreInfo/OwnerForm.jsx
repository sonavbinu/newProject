import React from "react";

const OwnerForm = () => {
  return (
    <div>
      <form className="flex flex-col gap-4">
        <div className=" gap-3 border-gray-200 shadow-md border p-6 mt-2 rounded-xl flex flex-col">
          <h1 className="font-bold text-xl">Owner Information</h1>
          <input
            className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
            type="text"
            placeholder="Owner's Name"
          />
          <input
            className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
            type="text"
            placeholder="Email Address"
          />
          <div className="flex justify-between gap-3">
            <input
              className="p-3 border border-gray-300 rounded focus:ring-2
              focus:ring-[var(--primary-color)] outline-none w-full"
              type="text"
              placeholder="Mobile Number"
            />
            <button className="bg-gray-300 text-black p-3 rounded w-full">
              Send OTP
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">
              By providing your Whatsapp Number to get updates on payments,
              order confirmation etc.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-[var(--primary-color)] w-4 h-4"
              />
              <p className="text-sm text-gray-500">
                My whatsapp number is same as above
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-[var(--primary-color)] w-4 h-4"
              />
              <p className="text-sm text-gray-500">
                I have a different whatsapp number
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OwnerForm;

import React from "react";
import { UploadCloud } from "lucide-react";

const QR = () => {
  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold">Scan Store QR Code</h2>

        <p className="text-gray-500 mt-2 mb-6">
          Scan the store's QR Code. It will help the customer to make the
          payments easy and faster.
        </p>

        <label
          htmlFor="storeImage"
          className="flex flex-col items-center justify-center h-60 border-2 border-dashed
        border-gray-300 rounded-xl cursor-pointer hover:border-[var(--primary-color)]
        hover:bg-[var(--primary-light)] transition"
        >
          <UploadCloud size={48} className="text-[var(--primary-color)] mb-4" />

          <p className="font-medium text-gray-700">Scan QR Code</p>

          <p className="text-sm text-gray-500 mt-2">
            Take a Picture from the Camera to upload the QR Code
          </p>

          <input
            id="storeImage"
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default QR;

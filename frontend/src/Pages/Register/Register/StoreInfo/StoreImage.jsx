import React from "react";
import { UploadCloud } from "lucide-react";

const StoreImage = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
      <h2 className="text-2xl font-bold">Upload Store Image</h2>

      <p className="text-gray-500 mt-2 mb-6">
        Uploading an image will help customers easily recognize your store.
      </p>

      <label
        htmlFor="storeImage"
        className="flex flex-col items-center justify-center h-60 border-2 border-dashed
        border-gray-300 rounded-xl cursor-pointer hover:border-[var(--primary-color)]
        hover:bg-[var(--primary-light)] transition"
      >
        <UploadCloud size={48} className="text-[var(--primary-color)] mb-4" />

        <p className="font-medium text-gray-700">
          Click to upload or drag & drop
        </p>

        <p className="text-sm text-gray-500 mt-2">
          PNG, JPG or JPEG (Maximum 5MB)
        </p>

        <input
          id="storeImage"
          type="file"
          accept="image/*"
          className="hidden"
        />
      </label>
    </div>
  );
};

export default StoreImage;

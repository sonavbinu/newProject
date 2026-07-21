import React, { useState, useEffect } from "react";
import { UploadCloud, ImageIcon, Info } from "lucide-react";

const StoreImage = ({ storeData, setStoreData }) => {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (storeData.storeImage instanceof File) {
      const imageUrl = URL.createObjectURL(storeData.storeImage);

      setPreview(imageUrl);
      setFileName(storeData.storeImage.name);

      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    } else {
      setPreview(null);
      setFileName("");
    }
  }, [storeData.storeImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Optional validation
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setStoreData((prev) => ({
      ...prev,
      storeImage: file,
    }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] flex justify-center items-center">
          <ImageIcon size={22} className="text-[var(--primary-color)]" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900">Upload Store Image</h2>

      <p className="text-gray-500 text-sm mb-3">
        Uploading an image will help customers easily recognize your store.
      </p>

      <label
        htmlFor="storeImage"
        className="flex flex-col items-center justify-center border-2 border-dashed
        border-gray-300 rounded-2xl cursor-pointer p-8
        hover:border-[var(--primary-color)]
        hover:bg-[var(--primary-light)] transition"
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Store Preview"
              className="h-56 w-full rounded-xl object-cover shadow-md"
            />

            <p className="mt-4 font-medium text-gray-800">{fileName}</p>

            <span className="mt-2 text-sm text-[var(--primary-color)] font-medium">
              Click to replace image
            </span>
          </>
        ) : (
          <>
            <UploadCloud
              size={50}
              className="mb-4 text-[var(--primary-color)]"
            />

            <h3 className="text-lg font-semibold text-gray-800">
              Upload Store Image
            </h3>

            <p className="mt-2 text-center text-gray-500">
              Click to browse or drag & drop your image here.
            </p>

            <p className="mt-1 text-sm text-gray-400">
              PNG, JPG or JPEG (Maximum 5 MB)
            </p>
          </>
        )}

        <input
          id="storeImage"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>

      {/* Info */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <Info size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />

        <p className="text-sm text-blue-700">
          Use a high-quality image of your storefront or business logo. A clear
          image helps customers identify your store more easily.
        </p>
      </div>
    </div>
  );
};

export default StoreImage;

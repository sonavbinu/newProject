import React, { useState } from "react";
import { UploadCloud, QrCode, Info } from "lucide-react";

const QR = () => {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleQRChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
          <QrCode size={22} className="text-[var(--primary-color)]" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment QR Code</h2>

          <p className="text-sm text-gray-500">
            Upload your store's payment QR code.
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <label
        htmlFor="qrImage"
        className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-8 cursor-pointer transition hover:border-[var(--primary-color)] hover:bg-[var(--primary-light)]"
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="QR Preview"
              className="h-56 w-56 rounded-xl object-contain bg-white shadow-md"
            />

            <p className="mt-4 font-medium text-gray-800">{fileName}</p>

            <span className="mt-2 text-sm font-medium text-[var(--primary-color)]">
              Click to replace QR Code
            </span>
          </>
        ) : (
          <>
            <UploadCloud
              size={50}
              className="mb-4 text-[var(--primary-color)]"
            />

            <h3 className="text-lg font-semibold text-gray-800">
              Upload QR Code
            </h3>

            <p className="mt-2 text-center text-gray-500">
              Click to browse or drag & drop your QR image here.
            </p>

            <p className="mt-1 text-sm text-gray-400">
              PNG, JPG or JPEG (Maximum 5 MB)
            </p>
          </>
        )}

        <input
          id="qrImage"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleQRChange}
        />
      </label>

      {/* Information Box */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <Info size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />

        <p className="text-sm text-blue-700">
          Customers can scan this QR code to make secure and faster payments
          directly to your registered account. Please upload a clear,
          high-quality image.
        </p>
      </div>
    </div>
  );
};

export default QR;

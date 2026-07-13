import React from "react";
import { Handshake, CheckCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactModal = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        {/* Optional Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primary-light)]">
            <Handshake size={40} className="text-[var(--primary-color)]" />
          </div>

          {/* Success Badge */}
          <div className="mt-5 flex items-center gap-2 rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
            <CheckCircle size={16} />
            Submitted Successfully
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Thank You!</h2>

          <p className="mt-3 text-gray-600 leading-7">
            Your contact form has been submitted successfully.
            <br />
            Our team will review your request and get in touch with you shortly.
          </p>

          {/* Info Box */}
          <div className="mt-6 w-full rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="text-sm text-green-700">
              ✓ Most partner requests receive a response within 24 hours.
            </p>
          </div>

          {/* Continue Button */}
          <button
            onClick={() => navigate("/contact-receive")}
            className="mt-8 w-full rounded-xl bg-[var(--primary-color)] py-3 font-semibold text-white transition hover:bg-[var(--primary-hover)] hover:shadow-lg"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;

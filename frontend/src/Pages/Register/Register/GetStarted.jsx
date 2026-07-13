import React from "react";
import { useNavigate } from "react-router-dom";
import { Store, ArrowRight } from "lucide-react";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Top Accent */}
      <div className="h-2 bg-[var(--primary-color)]"></div>

      <div className="p-8 flex flex-col items-center text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[var(--primary-light)] flex items-center justify-center mb-5">
          <Store size={30} className="text-[var(--primary-color)]" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900">
          Ready to Join ORIGIN?
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-600 leading-7">
          Enter your store details and complete your registration to start
          selling with ORIGIN.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/store-info")}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary-color)] py-3 font-semibold text-white transition hover:bg-[var(--primary-hover)] hover:shadow-lg"
        >
          Get Started
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default GetStarted;

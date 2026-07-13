import React from "react";
import handShake from "./../../../../src/assets/handshake.jpeg";
import { Phone, MessageCircle, CheckCircle } from "lucide-react";
import GetStarted from "../Register/GetStarted";

const ContactReceive = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Logo */}
      <div className="py-8 text-center">
        <h1 className="text-4xl font-bold text-[var(--primary-color)]">
          ORIGIN
        </h1>
      </div>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-4">
        <img
          src={handShake}
          alt="Handshake"
          className="w-full h-64 md:h-80 object-cover rounded-3xl shadow-lg"
        />
      </div>

      {/* Success Card */}
      <div className="max-w-xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={42} className="text-green-600" />
            </div>

            <span className="mt-5 px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              Request Received
            </span>

            <h2 className="mt-5 text-3xl font-bold">Thank You!</h2>

            <p className="mt-4 text-gray-600 leading-7">
              We have successfully received your contact request. Our partner
              support team will review your details and reach out to you
              shortly.
            </p>

            <div className="w-full mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm text-green-700">
                ✓ Most partner requests are responded to within
                <span className="font-semibold"> 24 hours.</span>
              </p>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-center">
              Need Immediate Assistance?
            </h3>

            <p className="text-center text-gray-500 mt-2 mb-6">
              Our support team is happy to help.
            </p>

            <div className="space-y-4">
              <button
                className="w-full flex items-center justify-center gap-3
                rounded-xl border border-[var(--primary-color)]
                py-3 font-medium text-[var(--primary-color)]
                hover:bg-[var(--primary-light)]
                transition"
              >
                <Phone size={20} />
                Contact via Call
              </button>

              <button
                className="w-full flex items-center justify-center gap-3
                rounded-xl bg-[var(--primary-color)]
                py-3 text-white font-medium
                hover:bg-[var(--primary-hover)]
                transition"
              >
                <MessageCircle size={20} />
                Contact via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Get Started */}
      <div className="max-w-5xl mx-auto px-4 pb-12 flex justify-center">
        <GetStarted />
      </div>
    </div>
  );
};

export default ContactReceive;

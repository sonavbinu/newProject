import React from "react";
import handShake from "./../../../../src/assets/handshake.jpeg";
import { useNavigate } from "react-router-dom";
import GetStarted from "../Register/GetStarted";
import { PhoneCall, User, Store, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/contact-success");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col">
      {/* Logo */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-[var(--primary-color)]">
          ORIGIN
        </h1>
      </div>

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-4">
        <img
          src={handShake}
          alt="Handshake"
          className="w-full h-64 md:h-96 object-cover rounded-3xl shadow-lg"
        />
      </div>

      {/* Contact Form */}
      <div className="max-w-lg mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[var(--primary-light)] flex items-center justify-center mb-4">
              <PhoneCall size={30} className="text-[var(--primary-color)]" />
            </div>

            <span className="px-4 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary-color)] text-sm font-medium">
              Partner Registration
            </span>

            <h2 className="text-3xl font-bold mt-4">Let's Connect</h2>

            <p className="text-gray-500 text-center mt-2 mb-8">
              Fill in your business details and our team will contact you
              shortly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Owner Name */}
            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Owner Name"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
                required
              />
            </div>

            {/* Shop Name */}
            <div className="relative">
              <Store
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Shop Name"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
                required
              />
            </div>

            {/* Location */}
            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="relative">
              <Phone
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[var(--primary-color)] text-white font-semibold hover:bg-[var(--primary-hover)] transition duration-300 shadow-md hover:shadow-lg"
            >
              Submit Request →
            </button>
          </form>

          {/* Trust Message */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-700 text-center">
              ✓ Our executive usually contacts new partners within 24 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Get Started Section */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <GetStarted />
      </div>
    </div>
  );
};

export default Contact;

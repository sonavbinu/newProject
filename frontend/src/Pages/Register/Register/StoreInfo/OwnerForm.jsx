import React, { useState } from "react";
import { User, Mail, Phone, MessageCircle, ShieldCheck } from "lucide-react";

const OwnerForm = () => {
  const [sameWhatsApp, setSameWhatsApp] = useState(true);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] flex  items-center justify-center ">
          {" "}
          <User size={22} className="text-[var(--primary-color)]" />
        </div>
      </div>
      <div className="">
        <div className=" gap-3 border-gray-200 shadow-md border p-6 mt-2 rounded-xl flex flex-col">
          <div>
            <h1 className="font-bold text-2xl text-gray-900">
              Owner Information
            </h1>
            <p className="text-sm text-gray-500">
              Enter the owner's contact details
            </p>
          </div>
          <form className="space-y-5">
            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                className="py-3 pl-11 pr-4 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
                type="text"
                placeholder="Owner's Name"
              />
            </div>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                className="py-3 pl-11 pr-4 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
                type="text"
                placeholder="Email Address"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              </div>

              <button
                type="button"
                className="px-6 rounded-xl bg-[var(--primary-color)] text-white font-medium hover:bg-[var(--primary-hover)] transition"
              >
                Send OTP
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">
              By providing your Whatsapp Number to get updates on payments,
              order confirmation etc.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                checked={sameWhatsApp}
                onChange={() => setSameWhatsApp(true)}
                className="accent-[var(--primary-color)] w-4 h-4 "
              />
              <span className="text-sm text-gray-500">
                My whatsapp number is same as above
              </span>
            </div>
            <div className="flex items-center gap-2 ">
              <input
                type="radio"
                checked={!sameWhatsApp}
                onChange={() => setSameWhatsApp(false)}
                className="accent-[var(--primary-color)] w-4 h-4"
              />
              <p className="text-sm text-gray-500">
                I have a different whatsapp number
              </p>
            </div>
          </div>
          {!sameWhatsApp && (
            <div className="relative mt-4">
              <MessageCircle
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="tel"
                placeholder="WhatsApp Number"
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>
          )}
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-green-50 border border-green-200 p-4 mt-6">
          <ShieldCheck size={20} className="text-green-600 mt-0.5" />

          <p className="text-sm text-green-700">
            Your contact information is used only for account verification and
            important business communications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OwnerForm;

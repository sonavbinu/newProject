import React from "react";
import {
  Landmark,
  Building2,
  CreditCard,
  Hash,
  ShieldCheck,
  User,
} from "lucide-react";

const BankInfo = ({ storeData, setStoreData }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
          <Landmark size={22} className="text-[var(--primary-color)]" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bank Details</h2>
          <p className="text-sm text-gray-500">
            Enter the bank account where payouts will be credited.
          </p>
        </div>
      </div>

      <form className="space-y-5">
        {/* Account Holder Name */}
        <div className="relative">
          <User
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Account Holder Name"
            value={storeData.accountHolderName}
            onChange={(e) =>
              setStoreData({
                ...storeData,
                accountHolderName: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4
            focus:outline-none focus:ring-2
            focus:ring-[var(--primary-color)]"
          />
        </div>

        {/* Bank Name */}
        <div className="relative">
          <Building2
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Bank Name"
            value={storeData.bankName}
            onChange={(e) =>
              setStoreData({
                ...storeData,
                bankName: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4
            focus:outline-none focus:ring-2
            focus:ring-[var(--primary-color)]"
          />
        </div>

        {/* Account Number */}
        <div className="relative">
          <CreditCard
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Bank Account Number"
            value={storeData.accountNumber}
            onChange={(e) =>
              setStoreData({
                ...storeData,
                accountNumber: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4
            focus:outline-none focus:ring-2
            focus:ring-[var(--primary-color)]"
          />
        </div>

        {/* IFSC */}
        <div className="relative">
          <Hash
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="IFSC Code"
            value={storeData.ifsc}
            onChange={(e) =>
              setStoreData({
                ...storeData,
                ifsc: e.target.value.toUpperCase(),
              })
            }
            className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 uppercase
            focus:outline-none focus:ring-2
            focus:ring-[var(--primary-color)]"
          />
        </div>

        {/* Security Note */}
        <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
          <ShieldCheck
            size={20}
            className="text-green-600 mt-0.5 flex-shrink-0"
          />

          <p className="text-sm text-green-700">
            Your bank details are securely stored and will only be used for
            transferring your earnings and settlements.
          </p>
        </div>
      </form>
    </div>
  );
};

export default BankInfo;

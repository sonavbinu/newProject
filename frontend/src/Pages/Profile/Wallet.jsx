import React from "react";

const Wallet = () => {
  return (
    <div>
      <div>
        <h2 className="font-semibold text-lg sm:text-xl">My Wallet</h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Here you can view your wallet details
        </p>
      </div>
      <div>
        <label>Bank Details</label>
        <input type="text" />
        <input type="text" />
        <input type="text" />
      </div>
    </div>
  );
};

export default Wallet;

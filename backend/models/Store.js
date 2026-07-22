const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    phone: String,
    email: String,
    address: String,
    gstNumber: String,
    bankName: String,
    accountHolderName: {
      type: String,
      default: "",
    },
    accountNumber: String,
    ifscCode: String,
    upiDetails: {
      gpay: { type: String, default: "" },
      phonepe: { type: String, default: "" },
      paytm: { type: String, default: "" },
    },
    workingDays: [String],
    openingTime: String,
    closingTime: String,
    storeImage: {
      type: String,
      default: "",
    },
    qrImage: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Store", storeSchema);

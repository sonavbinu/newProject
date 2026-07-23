const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Customer", customerSchema);

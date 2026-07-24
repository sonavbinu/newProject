const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    customerName: { type: String, required: true },
    customerPhone: { type: String, default: "" },
    customerAddress: { type: String, default: "" },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    payment: { type: String, default: "COD" },
    status: {
      type: String,
      enum: ["confirmation", "preparing", "packed", "completed", "rejected"],
      default: "confirmation",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);

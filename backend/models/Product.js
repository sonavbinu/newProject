const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    categoryId: { type: Number, required: true },
    productName: { type: String, required: true },
    mrp: { type: Number, default: 0 },
    price: { type: Number, required: true },
    discountType: { type: String, default: "" },
    discountValue: { type: Number, default: 0 },
    unit: { type: String, default: "kg" },
    size: { type: String, default: "" },
    stock: { type: Number, default: 0 },
    description: { type: String, default: "" },
    country: { type: String, default: "" },
    manufacturer: { type: String, default: "" },
    image: { type: String, default: "" },
    deliveryTypes: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);

const Order = require("../models/Order");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {
  try {
    const { storeId, items } = req.body;

    if (!storeId || !items?.length) {
      return res
        .status(400)
        .json({ message: "storeId and items are required" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findOne({
        _id: item.productId,
        store: storeId,
      });
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.productId}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.productName}`,
        });
      }

      const price =
        product.discountType === "%"
          ? Math.round(
              product.price - (product.price * product.discountValue) / 100,
            )
          : product.discountType === "Flat"
            ? Math.max(0, product.price - product.discountValue)
            : product.price;

      orderItems.push({
        product: product._id,
        productName: product.productName,
        price,
        quantity: item.quantity,
      });

      totalAmount += price * item.quantity;

      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      customer: req.customer.id,
      store: storeId,
      items: orderItems,
      totalAmount,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.log("PLACE ORDER ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.customer.id })
      .populate("store", "storeName")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      customer: req.customer.id,
    }).populate("store", "storeName address");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { placeOrder, getMyOrders, getOrderById };

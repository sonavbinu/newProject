const Order = require("../models/Order");
const Product = require("../models/Product");
const Customer = require("../models/customer");

const placeOrder = async (req, res) => {
  try {
    const { storeId, items, phone, address } = req.body;

    if (!storeId || !items?.length) {
      return res
        .status(400)
        .json({ message: "storeId and items are required" });
    }

    const customer = await Customer.findById(req.customer.id);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    let total = 0;
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
        return res
          .status(400)
          .json({ message: `Not enough stock for ${product.productName}` });
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
        name: product.productName,
        price,
        quantity: item.quantity,
      });

      total += price * item.quantity;
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      customer: customer._id,
      store: storeId,
      customerName: customer.name || "Customer",
      customerPhone: phone || customer.phone || "",
      customerAddress: address || "",
      items: orderItems,
      total,
      payment: "COD",
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.log("PLACE ORDER ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      customer: req.customer.id,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
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

module.exports = { placeOrder, getMyOrders, getOrderById, deleteOrder };

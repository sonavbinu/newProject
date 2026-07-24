const Order = require("../models/Order");
const Store = require("../models/Store");

const verifyStoreOwnership = async (storeId, userId) => {
  return Store.findOne({ _id: storeId, owner: userId });
};

const getStoreOrders = async (req, res) => {
  try {
    const { storeId } = req.query;
    if (!storeId)
      return res.status(400).json({
        message: "StoreId is required",
      });
    const store = await verifyStoreOwnership(storeId, req.user.id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    const orders = await Order.find({ store: storeId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log("GET STORE ORDERS ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, storeId, status } = req.body;
    const validStatuses = [
      "confirmation",
      "preparing",
      "packed",
      "completed",
      "rejected",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const store = await verifyStoreOwnership(storeId, req.user.id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    const order = await Order.findOneAndUpdate(
      { _id: orderId, store: storeId },
      { $set: { status } },
      { new: true },
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = { getStoreOrders, updateOrderStatus };

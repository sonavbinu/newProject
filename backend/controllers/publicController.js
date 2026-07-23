const Store = require("../models/Store");
const Product = require("../models/Product");

const getApprovedStores = async (req, res) => {
  try {
    const stores = await Store.find().select("storeName address storeImage");
    res.status(200).json({ success: true, stores });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getStoreProducts = async (req, res) => {
  try {
    const { storeId } = req.params;
    const store = await Store.findById(storeId);
    if (!store) return res.status(404).json({ message: "Store not found" });

    const products = await Product.find({ store: storeId, stock: { $gt: 0 } });
    res.status(200).json({ success: true, store, products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getApprovedStores, getStoreProducts };

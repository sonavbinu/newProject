const Product = require("../models/Product");
const Store = require("../models/Store");

const verifyStoreOwnership = async (storeId, userId) => {
  return Store.findOne({ _id: storeId, owner: userId });
};

const addProduct = async (req, res) => {
  try {
    const { storeId, categoryId, ...productData } = req.body;
    if (!storeId)
      return res.status(400).json({ message: "storeId is required" });

    const store = await verifyStoreOwnership(storeId, req.user.id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    const image = req.file ? `/uploads/products/${req.file.filename}` : "";

    const product = await Product.create({
      store: storeId,
      categoryId: Number(categoryId),
      productName: productData.productName,
      mrp: Number(productData.mrp) || 0,
      price: Number(productData.price),
      discountType: productData.discountType || "",
      discountValue: Number(productData.discountValue) || 0,
      unit: productData.unit || "kg",
      size: productData.size || "",
      stock: Number(productData.stock) || 0,
      description: productData.description || "",
      country: productData.country || "",
      manufacturer: productData.manufacturer || "",
      image,
      deliveryTypes: productData.deliveryTypes
        ? JSON.parse(productData.deliveryTypes)
        : [],
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMyProducts = async (req, res) => {
  try {
    const { storeId } = req.query;
    if (!storeId)
      return res.status(400).json({ message: "storeId is required" });

    const store = await verifyStoreOwnership(storeId, req.user.id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    const products = await Product.find({ store: storeId });

    const categoryDefs = [
      { id: 1, name: "fruitsVegetables" },
      { id: 2, name: "dairyBreadEggs" },
      { id: 3, name: "snacksBiscuits" },
      { id: 4, name: "attaDalRice" },
      { id: 5, name: "dryFruitsMasala" },
      { id: 6, name: "teaCoffee" },
      { id: 7, name: "chocolatesDesserts" },
    ];

    const categories = categoryDefs.map((cat) => ({
      ...cat,
      products: products.filter((p) => p.categoryId === cat.id),
    }));

    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.log("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const editPrice = async (req, res) => {
  try {
    const { productId, storeId, newPrice } = req.body;
    const store = await verifyStoreOwnership(storeId, req.user.id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    const product = await Product.findOneAndUpdate(
      { _id: productId, store: storeId },
      { $set: { price: Number(newPrice) } },
      { new: true },
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addStock = async (req, res) => {
  try {
    const { productId, storeId, quantity } = req.body;
    const store = await verifyStoreOwnership(storeId, req.user.id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    const product = await Product.findOne({ _id: productId, store: storeId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.stock = Number(product.stock) + Number(quantity);
    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const minusStock = async (req, res) => {
  try {
    const { productId, storeId, quantity } = req.body;
    const store = await verifyStoreOwnership(storeId, req.user.id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    const product = await Product.findOne({ _id: productId, store: storeId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.stock = Math.max(0, Number(product.stock) - Number(quantity));
    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { storeId } = req.body;
    const store = await verifyStoreOwnership(storeId, req.user.id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      store: storeId,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addProduct,
  getMyProducts,
  editPrice,
  addStock,
  minusStock,
  deleteProduct,
};

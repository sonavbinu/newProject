const Store = require("../models/Store");
const fs = require("fs");

const registerStore = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("Headers:", req.headers);
    console.log("User:", req.user);
    console.log("Files:", req.files);

    let {
      ownerName,
      ownerEmail,
      ownerPhone,
      whatsapp,
      storeName,
      address,
      storePhone,
      workingDays,
      openingTime,
      closingTime,
      pan,
      gst,
      bankName,
      accountNumber,
      ifsc,
    } = req.body;

    if (workingDays) {
      workingDays = JSON.parse(workingDays);
    }

    const storeImage = req.files?.storeImage?.[0]?.originalname || "";
    const qrImage = req.files?.qrImage?.[0]?.originalname || "";

    const store = await Store.create({
      owner: req.user.id,

      ownerName,

      storeName,

      email: ownerEmail,

      phone: storePhone || ownerPhone,

      address,

      gstNumber: gst,

      bankName,

      accountNumber,

      ifscCode: ifsc,

      workingDays,

      openingTime,

      closingTime,
      image: [storeImage, qrImage],
    });

    res.status(201).json({
      success: true,
      message: "Store registered successfully",
      store,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyStores = async (req, res) => {
  try {
    const store = await Store.findOne({ owner: req.user.id });
    if (!store) {
      return res.status(404).json({ message: "Store details not found" });
    }
    res.status(200).json({ success: true, store });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getStores = async (req, res) => {
  try {
    const stores = await Store.find({ owner: req.user.id });

    res.status(200).json({
      success: true,
      stores,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const saveStore = async (req, res) => {
  try {
    const { name, address, phone, workingDays, workingTime } = req.body;

    if (!name?.trim() || !address?.trim() || !phone?.trim()) {
      return res
        .status(400)
        .json({ message: "name,address and phone are required" });
    }

    const updateData = {
      name,
      address,
      phone,
      workingDays: workingDays ? JSON.parse(workingDays) : [],
      workingTime: workingTime
        ? JSON.parse(workingTime)
        : { open: "", close: "" },
    };
    if (req.file) {
      updateData.storeImage = `/uploads/stores/${req.file.filename}`;
    }

    const store = await Store.findOneAndUpdate(
      { owner: req.user._id },
      { $set: updateData, owner: req.user._id },
      { new: true, upsert: true, runValidators: true },
    );
    res
      .status(200)
      .json({ message: "Store details saved successfully", store });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const removeStoreImage = async (req, res) => {
  try {
    const store = await Store.findOne({ owner: req.user._id });
    if (!store) return res.status(404).json({ message: "Store not found" });

    if (store.storeImage) {
      const filePath = `.${store.storeImage}`;
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete image file:", err.message);
      });
    }

    store.storeImage = "";
    await store.save();

    res.status(200).json({ message: "Image removed", store });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  registerStore,
  getMyStores,
  saveStore,
  removeStoreImage,
  getStores,
};

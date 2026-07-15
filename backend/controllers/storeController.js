const Store = require("../models/Store");

const registerStore = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("Headers:", req.headers);
    console.log("User:", req.user);
    console.log("Files:", req.files);

    const {
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

module.exports = {
  registerStore,
};

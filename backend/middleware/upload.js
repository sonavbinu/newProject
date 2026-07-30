const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    console.log("FILE RECEIVED:");
    console.dir(file, { depth: null });

    return {
      folder: req.baseUrl.includes("products")
        ? "origin/products"
        : "origin/stores",
      public_id: Date.now().toString(),
    };
  },
});

const upload = multer({
  storage,
});

module.exports = upload;

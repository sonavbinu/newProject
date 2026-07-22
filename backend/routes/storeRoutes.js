const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
  registerStore,
  getMyStores,
  getStores,
  saveStore,
  saveWalletDetails,
  removeStoreImage,
  getStoreById,
  deleteStore,
} = require("../controllers/storeController");

router.post(
  "/register",
  auth,
  upload.fields([
    { name: "storeImage", maxCount: 1 },
    { name: "qrImage", maxCount: 1 },
  ]),
  registerStore,
);
router.get("/", auth, getStores);
router.get("/me", auth, getMyStores);
router.get("/:id", auth, getStoreById);
router.post("/", auth, upload.single("storeImage"), saveStore);
router.put("/wallet", auth, saveWalletDetails);
router.delete("/image", auth, removeStoreImage);
router.delete("/:id", auth, deleteStore);

module.exports = router;

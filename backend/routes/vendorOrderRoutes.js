const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getStoreOrders,
  updateOrderStatus,
} = require("../controllers/vendorOrderController");

router.get("/", auth, getStoreOrders);
router.put("/status", auth, updateOrderStatus);

module.exports = router;

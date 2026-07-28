const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getStoreOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/vendorOrderController");

router.get("/", auth, getStoreOrders);
router.put("/status", auth, updateOrderStatus);
router.delete("/:id", auth, deleteOrder);

module.exports = router;

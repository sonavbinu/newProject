const express = require("express");
const router = express.Router();
const customerAuth = require("../middleware/customerAuthMiddleware");
const {
  placeOrder,
  getMyOrders,
  getOrderById,
} = require("../controllers/orderController");

router.post("/", customerAuth, placeOrder);
router.get("/my-orders", customerAuth, getMyOrders);
router.get("/:id", customerAuth, getOrderById);

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
  addProduct,
  getMyProducts,
  editPrice,
  addStock,
  minusStock,
  deleteProduct,
} = require("../controllers/productController");

router.post("/", auth, upload.single("image"), addProduct);
router.get("/my-products", auth, getMyProducts);
router.put("/price", auth, editPrice);
router.put("/add-stock", auth, addStock);
router.put("/minus-stock", auth, minusStock);
router.delete("/:id", auth, deleteProduct);

module.exports = router;

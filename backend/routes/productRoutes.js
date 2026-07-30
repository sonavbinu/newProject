const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
  addProduct,
  getMyProducts,
  getProductById,
  updateProduct,
  editPrice,
  addStock,
  minusStock,
  deleteProduct,
} = require("../controllers/productController");
router.post(
  "/",
  auth,
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.log("UPLOAD ERROR:");
        console.dir(err, { depth: null });
        return res.status(500).json({
          message: err.message,
          error: err,
        });
      }
      next();
    });
  },
  addProduct,
);
router.get("/my-products", auth, getMyProducts);

router.put("/price", auth, editPrice);
router.put("/add-stock", auth, addStock);
router.put("/minus-stock", auth, minusStock);

router.get("/:id", auth, getProductById);
router.put("/:id", auth, upload.single("image"), updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getApprovedStores,
  getStoreProducts,
} = require("../controllers/publicController");

router.get("/stores", getApprovedStores);
router.get("/stores/:storeId/products", getStoreProducts);

module.exports = router;

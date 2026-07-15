const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const { registerStore } = require("../controllers/storeController");

router.post(
  "/register",
  auth,
  upload.fields([
    { name: "storeImage", maxCount: 1 },
    { name: "qrImage", maxCount: 1 },
  ]),
  registerStore,
);

module.exports = router;

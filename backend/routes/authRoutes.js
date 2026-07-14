const express = require("express");

const router = express.Router();

const { sendOTP, verifyOTP } = require("../controllers/authController");
router.get("/test", (req, res) => {
  res.json({
    message: "Auth routes working!",
  });
});

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
module.exports = router;

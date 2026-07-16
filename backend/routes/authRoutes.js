const express = require("express");

const router = express.Router();

const {
  sendOTP,
  verifyOTP,
  firebaseLogin,
} = require("../controllers/authController");
router.get("/test", (req, res) => {
  res.json({
    message: "Auth routes working!",
  });
});

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/firebase-login", firebaseLogin);
module.exports = router;

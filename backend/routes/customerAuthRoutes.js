const express = require("express");
const router = express.Router();
const customerAuth = require("../middleware/customerAuthMiddleware");
const {
  register,
  login,
  getprofile,
  updateProfile,
} = require("../controllers/customerAuthController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", customerAuth, getprofile);
router.put("/profile", customerAuth, updateProfile);

module.exports = router;

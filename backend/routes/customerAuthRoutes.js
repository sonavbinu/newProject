const express = require("express");
const router = express.Router();
const customerAuth = require("../middleware/customerAuthMiddleware");
const {
  register,
  login,
  getprofile,
} = require("../controllers/customerAuthController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", customerAuth, getprofile);

module.exports = router;

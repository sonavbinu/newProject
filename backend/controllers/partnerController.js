const User = require("../models/user");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-otp -otpExpires");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("User ID:", req.user.id);
    const { name, phone, email } = req.body;

    // Basic validation
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be 10 digits",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, email },
      { new: true, runValidators: true },
    ).select("-otp -otpExpires");
    console.log("Updated user:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    // Mongo duplicate key error
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(409).json({
        success: false,
        message: `This ${field} is already registered with another account`,
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};

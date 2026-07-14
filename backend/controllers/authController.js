const User = require("../models/user");
const jwt = require("jsonwebtoken");

const sendOTP = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { email } = req.body;
    console.log("Email:", email);
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    console.log("Searching user...");
    //find existing user
    let user = await User.findOne({ email });

    //create user if not found
    if (!user) {
      console.log("Creating new user...");
      user = new User({
        email,
      });
    }
    //fixed otp for development

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.otp !== otp) {
      console.log("Entered OTP:", otp);
      console.log("Stored OTP:", user.otp);
      console.log("Entered OTP Type:", typeof otp);
      console.log("Stored OTP Type:", typeof user.otp);
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    if (new Date() > user.otpExpires) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
module.exports = {
  sendOTP,
  verifyOTP,
};

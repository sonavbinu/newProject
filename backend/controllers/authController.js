const User = require("../models/user");
const jwt = require("jsonwebtoken");

const sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone || phone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit phone number",
      });
    }
    //find existing user
    let user = await User.findOne({ phone });

    //create user if not found
    if (!user) {
      user = new User({
        phone,
      });
    }
    //fixed otp for development
    const otp = "1111";
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
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
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone and OTP are required",
      });
    }

    const user = await User.findOne({ phone });
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
        phone: user.phone,
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
      user,
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

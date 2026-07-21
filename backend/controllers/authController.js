const User = require("../models/user");
const jwt = require("jsonwebtoken");

const sendOTP = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { email, name, phone } = req.body;
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
        name,
        phone,
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
    console.error("send otp error");
    console.error(error);
    console.error(error.message);
    console.error(error.stack);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const firebaseLogin = async (req, res) => {
  try {
    const { phone, email } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Look up by phone OR email, since either could already exist
    let user = await User.findOne({ $or: [{ phone }, { email }] });

    if (!user) {
      user = await User.create({
        phone,
        email,
        isVerified: true,
      });
    } else {
      // Fill in whichever field was missing on the existing record
      let changed = false;
      if (!user.phone) {
        user.phone = phone;
        changed = true;
      }
      if (!user.email) {
        user.email = email;
        changed = true;
      }
      if (changed) await user.save();
    }

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

    res.json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
  firebaseLogin,
};

require("dotenv").config();
const signup = require("../models/signup");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require("uuid");
const sendOTPToEmail = require("../util/sendemail");
const generateUniqueOTP = require("../util/generateuniquotp");
const { sequelize } = require("../models/signup");
const otpId = uuidv4();

function validatestring(string) {
  if (string == undefined || string.length === 0) return true;
  else {
    return false;
  }
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function generateToken(name, email) {
  return jwt.sign({ name: name, email: email }, process.env.JWT_SECRET_KEY);
}

exports.login = async (req, res, next) => {
  const t = await sequelize.transaction(); // Start a transaction

  try {
    const { email } = req.body;
    if (validatestring(email)) {
      return res.status(400).json({ message: "email is requried" });
    }
    //  if ( validateEmail(email) ) {
    //     return res.status(204).json({ message: "email is not in valid format" });
    //   }
    const user = await signup.findOne({ where: { email }, transaction: t });

    if (user && user.emailstatus == "not verified") {
      await t.rollback(); // Rollback the transaction
      return res
        .status(200)
        .json({
          success: false,
          message:
            "You are not a verified user yet. Please verify your account.",
        });
    } else if (user && user.emailstatus == "verified") {
      const otp = await generateUniqueOTP();
      const expiryTime = new Date(Date.now() + 3 * 60 * 1000); // sets expiry time to 3 minutes from now
      const hashedOtp = await bcrypt.hash(otp, 10); // Hash the OTP

      user.otp = hashedOtp;
      user.expiry = expiryTime;
      await user.save({ transaction: t });

      await sendOTPToEmail(email, otp); // Assuming sendOTPToEmail is an asynchronous function

      await t.commit(); // Commit the transaction

      return res.status(201).json({
        success: true,
        message: "Check your mailbox for OTP",
        token: generateToken(user.name, email),
      });
    } else {
      await t.rollback(); // Rollback the transaction
      return res
        .status(202)
        .json({
          success: false,
          message:
            "this email is not registered with us. plz create an account",
        });
    }
  } catch (err) {
    await t.rollback(); // Rollback the transaction
    console.log(err);
    return res.status(500).json({ message: err, success: false });
  }
};

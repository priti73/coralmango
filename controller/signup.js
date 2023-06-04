const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../models/signup'); 
const User = require('../models/signup');
const sendOTPToEmail = require('../util/sendemail');
const generateUniqueOTP = require('../util/generateuniquotp');

function validateString(string) {
  return !string || string.length === 0;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

exports.signup = async (req, res, next) => {
  const t = await sequelize.transaction(); // Start a new transaction

  try {
    console.log(req.body);
    const { name, email } = req.body;

    if (validateString(name) || validateString(email)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ where: { email: email } }, { transaction: t });

    if (existingUser) {
      if (existingUser.emailstatus === 'verified') {
        await t.commit(); // Commit the transaction
        return res.status(200).send({ message: "User already registered and verified" });
      } else if (existingUser.emailstatus === 'not verified') {
        // Update user name and generate a new OTP
        const otp = await generateUniqueOTP();
        const expiryTime = new Date(Date.now() + (3 * 60 * 1000)); // sets expiry time to 3 minutes from now
         const hashedOtp = await bcrypt.hash(otp, 10);
        const updatedUser = await User.update(
          { name: name, otp: hashedOtp, expiry: expiryTime },
          { where: { email: email }, transaction: t }
        );
        await sendOTPToEmail(email, otp);
        await t.commit(); // Commit the transaction
        return res.status(201).json({ message: "User already registered but not verified. OTP sent to the email." ,email:email});
      }
    }
    // User doesn't exist, create a new one with a unique OTP
    const otp = await generateUniqueOTP();
    const expiryTime = new Date(Date.now() + (3 * 60 * 1000)); // sets expiry time to 3 minutes from now
    const hashedOtp = await bcrypt.hash(otp, 10);
    const newUser = await User.create(
      {
        email,
        name,
        otp: hashedOtp,
        emailstatus: "not verified",
        expiry: expiryTime
      },
      { transaction: t }
    );

    await sendOTPToEmail(email, otp);
    await t.commit(); // Commit the transaction

    res.status(202).json({ message: "OTP sent to provided email.",email:email });
  } catch (err) {
    console.log(err);
    await t.rollback(); // Rollback the transaction in case of an error
    res.status(500).json({ error: err });
  }
};

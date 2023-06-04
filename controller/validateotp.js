const bcrypt = require('bcrypt');
const signup = require('../models/signup');

function validateString(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.validateotp = async (req, res, next) => {
  try {
    const { otp } = req.body;
    const email = req.params.email;
    if (validateString(otp)) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const signupDetails = await signup.findOne({
      where: {
        email: email,
        emailstatus: "not verified",
      },
    });
    if (signupDetails) {

      const currentDateTime = new Date();
      const expiryDateTime = new Date(signupDetails.expiry);

      if (isMatch = await bcrypt.compare(otp, signupDetails.otp) && expiryDateTime >= currentDateTime) {
        signupDetails.emailstatus = "verified";
        await signupDetails.save();
       return res.status(201).json({ message: "Successfully verified" });
      }
      else if (isMatch = await bcrypt.compare(otp, signupDetails.otp) && expiryDateTime < currentDateTime) {
       return res.status(202).json({ message: "You need to get a new OTP. Your otp has expired" });
      }
      else {
       return res.status(203).json({ message: "Please enter correct OTP" });
      }
    } else {
     return res.status(204).json({ message: "You are already a verified user" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

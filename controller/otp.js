
const bcrypt = require('bcrypt');
const signup=require('../models/signup');

function validateString(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.verifyotp = async (req, res, next) => {
  try {
    const { otp } = req.body;
    if (validateString(otp)) {
      return res.status(400).json({ error: "otp is required" });
    }
    const signupDetails = await signup.findOne({
      where: {
        email:req.user.email
      }, });
    if (signupDetails) {
      
      const currentDateTime = new Date();
      const expiryDateTime = new Date(signupDetails.expiry);

      if (isMatch = await bcrypt.compare(otp, signupDetails.otp)&& expiryDateTime >= currentDateTime) {
        
       return  res.status(201).json({ message: "Successfully logged in",userdetails:signupDetails });
      }
      else if (isMatch = await bcrypt.compare(otp, signupDetails.otp) && expiryDateTime < currentDateTime) {
        res.status(202).json({ message: "You need to get a new OTP. Your otp has expired" });
      } else {
        res.status(203).json({ message: "Please enter correct OTP" });
      }
    } else {
      res.status(203).json({ message: "Please enter correct details" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

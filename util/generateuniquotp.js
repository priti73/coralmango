const otpGenerator = require('otp-generator');
const User = require('../models/signup');


async function generateUniqueOTP() {
    let otp = otpGenerator.generate(6, { digits: true, alphabets: true, upperCase: true, specialChars: true });
    let isUnique = false;
    
    while (!isUnique) {
      const existingUser = await User.findOne({ where: { otp: otp } });
      if (existingUser) {
        otp = otpGenerator.generate(6, { digits: true, alphabets: true, upperCase: true, specialChars: true });
      } else {
        isUnique = true;
      }
    }
  
    return otp;
  }
module.exports=generateUniqueOTP;  
require("dotenv").config();
const Sib = require('sib-api-v3-sdk');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const { RequestSmsRecipientExport } = require("@sendinblue/client");

async function sendOTPToEmail(email, otp) {
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;
  
    const transEmailApi = new Sib.TransactionalEmailsApi();
  
    const sender = {
      email: 'kumaripriti3298@gmail.com',
      name: 'Priti',
    };
  
    const receivers = [{ email: email }];
  
    const emailResponse = await transEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Received OTP',
      textContent: 'Hey, received OTP',
      htmlContent: `<h1>Your OTP is ${otp}</h1>`,
      params: { requestId: email },
    });
  }
  
  module.exports = sendOTPToEmail;
  
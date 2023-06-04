const path= require('path');

const express=require('express');
const otpcontroller=require('../controller/otp');
const validateotpcontroller=require('../controller/validateotp');


const auntheticateController=require('../middleware/auth');

const router=express.Router();

router.post('/otp',auntheticateController.authenticate,otpcontroller.verifyotp);
router.post('/validateotp/:email',validateotpcontroller.validateotp);
module.exports=router;

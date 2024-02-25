require("dotenv").config();
const express=require("express");
const router = express.Router(); 

//const userController=require("../controller/userController");
const {sendOtp,verifyOtp}=require("../controller/userController");

router.post("/send-otp",sendOtp);
router.post("/verify-otp",verifyOtp);


module.exports=router;
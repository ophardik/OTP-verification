require("dotenv").config();
const express=require("express");
const router = express.Router(); 


const {sendOtp,verifyOtp,signup,login}=require("../controller/userController");

router.post("/send-otp",sendOtp);
router.post("/verify-otp",verifyOtp);
router.post("/sign-up",signup);
router.post("/log-in",login);


module.exports=router;

const mongoose=require("mongoose");
const loginSchema=new mongoose.Schema({

    phoneNumber:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    otplogin:{
        type:String,
        required:true,
    },
    otpExpiration:{
        type:Date,
        default:Date.now(),
        get:(otpExpiration)=>otpExpiration.getTime(),
        set:(otpExpiration)=>new Date(otpExpiration),
   }


});
   const loginModel=mongoose.model("login",loginSchema);
   
   module.exports=loginModel;
   



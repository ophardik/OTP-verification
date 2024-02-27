const mongoose=require("mongoose");
const signupSchema=new mongoose.Schema({

    phoneNumber:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
   
    

});

const signupModel=mongoose.model("signup",signupSchema);

module.exports=signupModel;
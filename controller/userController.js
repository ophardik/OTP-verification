const otpModel=require("../model/otp");
const {otpVerification}=require("../helper/otpValidate");

const otpGenerator=require("otp-generator");
const twilio=require("twilio");

const accountSid=process.env.TWILIO_ACCOUNT_SID;
const authToken=process.env.TWILIO_AUTH_TOKEN;
//const number=process.env.TWILIO_MOBILE_NNUMBER;

const twilioClient=new twilio(accountSid,authToken);


const sendOtp =async(req,res)=>{
    try{
        
        const {phoneNumber}=req.body;
        const otp=otpGenerator.generate(4,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false});

        const cDate=new Date();
        

        await otpModel.findOneAndUpdate(
            {phoneNumber},
            {otp,otpExpiration: new Date(cDate.getTime()) },
            {upsert:true, new:true, setDefaultOnInsert:true, },
        );
        console.log(phoneNumber);
      await twilioClient.messages.create({
            body:`Your OTP is${otp}`,
           to:phoneNumber,
           
            from:process.env.TWILIO_MOBILE_NNUMBER,
        });

        
        // await otpModel.create({
        //     phoneNumber,
        //     otp,
        // })
        
        return res.status(200).json({
            success:true,
            msg:otp,
           });
    }
    catch(error){
        console.log("error",error);
       return res.status(400).json({
        success:false,
        msg:error.message,
       });
    }
}



const verifyOtp=async(req,res)=>{
    try{
    
        const {phoneNumber,otp}=req.body;
        const otpData=await otpModel.findOne({
            phoneNumber,
            otp,
        });

        if(!otpData){
            return res.status(400).json({
                success:false,
                msg:"Please enter the correct OTP",
               });
        }

       const isOtpExpired= await otpVerification(otpData.otpExpiration);

       if(isOtpExpired){
        return res.status(400).json({
            success:false,
            msg:"Your OTP has been expired",
           });
       }
       return res.status(200).json({
        success:true,
        msg:"OTP has been verified",
       });


    }
    catch(error){
        return res.status(400).json({
         success:false,
         msg:error.message,
        });
     }
}


module.exports={
    sendOtp,
    verifyOtp,
}
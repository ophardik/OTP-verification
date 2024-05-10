const otpModel=require("../model/otp");
const signupModel=require("../model/signup");
const loginModel=require("../model/login");
const {otpVerification}=require("../helper/otpValidate");

const twilio=require("twilio");
const otpGenerator=require("otp-generator");

const accountSid=process.env.TWILIO_ACCOUNT_SID;
const authToken=process.env.TWILIO_AUTH_TOKEN;

const twilioClient=new twilio(accountSid,authToken);


const sendOtp =async(req,res)=>{
    try{
        
       const {phoneNumber}=req.body;
    //    console.log(req.body);
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

        
        await otpModel.create({
            phoneNumber,
            otp,
        })
        
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
    
        const {phoneNumber,otplogin}=req.body;

        console.log(otplogin);

        

        const loginData=await loginModel.findOne({
            phoneNumber,
            otplogin,
        });
        
        if(!loginData){
            return res.status(400).json({
                success:false,
                msg:"Please enter the correct OTP",
               });
        }

       

       const isOtpExpired= await otpVerification(loginData.otpExpiration);

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


const signup=async(req,res)=>{
    
    try{
       
        const{phoneNumber,password}=req.body;

       
     await signupModel.create({
            phoneNumber,
            password,
            
        });

        //console.log("New User:", newUser)
        return res.status(200).json({
            success:true,
            msg:"SignUP successful",

        });

    }

    catch(error){
        return res.status(400).json({
         success:false,
         msg:error.message,
        });
     }
}



const login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        const otplogin = otpGenerator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        const cDate = new Date();

        // Find the user by phoneNumber and password
        const user = await signupModel.findOne({ phoneNumber, password });

        if (!user) {
            return res.status(401).json({ message: "Enter correct phoneNumber or password" });
        }

        

        await twilioClient.messages.create({
            body:`Your OTP is${otplogin}`,
            to:phoneNumber,
            from:process.env.TWILIO_MOBILE_NNUMBER,
        });

        // Create a login entry
        await loginModel.create({
            phoneNumber,
            password,
            otplogin,
        });

        return res.status(200).json({
            success: true,
            msg: otplogin,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
}

module.exports={
    sendOtp,
    verifyOtp,
    signup,
    login,
}

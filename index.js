require("dotenv").config();
const express=require("express");
const {connectToMongoDB}=require("./connection");
const userRoute=require("./routes/userRoute");

const app=express();

app.use(express.json());
const port=8002;

connectToMongoDB("mongodb://127.0.0.1:27017/Project-3")
.then(()=>console.log("MongoDB connected"))
.catch((error)=> console.log("MongoDB error",error));


app.use("/api",userRoute);
// app.use("/api/send-otp",userRoute);
// app.use("api/verify-otp",userRoute);


app.listen(port,()=>{
    console.log("Server is running on port",port);
});

module.exports=app;

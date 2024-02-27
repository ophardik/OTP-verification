const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index.js");


chai.should();
chai.use(chaiHttp);
//const number = process.env.TWILIO_MOBILE_NNUMBER; 
describe("OTP coming", () => {
  it("Should send OTP to the given mobile number", async() => {
    
    try{
      const res=await chai
      .request(server)
      .post("/api/send-otp")
      .send({ phoneNumber: "+919828609896" });

      //res.should.have.status(200, `Expected status code 200 but got ${res.status}. Response body: ${JSON.stringify(res.body)}`);
     
      res.should.have.status(200);
      console.log("Success");
      res.body.should.be.a('object');
      console.log("Success");
      // console.log(res)
 
    }catch(error){
      console.log('ERROR in testcase',error);
      throw error;
    }
      
  }).timeout(5000);
});




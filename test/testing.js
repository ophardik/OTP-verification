const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index.js");


chai.should();
chai.use(chaiHttp);

describe("OTP coming", () => {
  it("Should send OTP to the given mobile number", async() => {
    
    try{
      const res=await chai
      .request(server)
      .post("/api/send-otp")
      .send({ phoneNumber: "+919828609896" });

      
      res.should.have.status(200);
      console.log("Success");
      res.body.should.be.a('object');
      console.log("Success");
      /
 
    }catch(error){
      console.log('ERROR in testcase',error);
      throw error;
    }
      
  }).timeout(5000);
});




const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index.js");
const otps=require("../controller/userController.js");
const routes=require("../routes/userRoute.js")

chai.should();
chai.use(chaiHttp);
//const number = process.env.TWILIO_MOBILE_NNUMBER; 
describe("OTP coming", () => {
  it("Should send OTP to the given mobile number", (done) => {
    chai.request(server)
      .post("/api/send-otp")
      .send({ to: { phoneNumber: "+14352384077" } }) 
      .end((error, res) => {
        
        if (error) {
          console.log(error);
          return done(error);

        } else {
          console.log(res.status);
           //.should.have.status(200);
           //res.body.should.be.a('array');
          done();
        }
      });
  });
});




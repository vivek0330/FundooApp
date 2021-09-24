/* eslint-disable node/handle-callback-err */
/* eslint-disable no-undef */
const server = require("../server");

// Require the dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const userDB = require("./user.json");

chai.should();
chai.use(chaiHttp);

// test for registration Api
describe("registration API", () => {
  it("User Registration", (done) => {
    const registrationDetails = userDB.user.register;
    console.log(registrationDetails);
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("givenRegistrationDetails_whenDataExits_shouldNotSaveInDB", (done) => {
    const registrationDetails = userDB.user.registerCopy;
    console.log(registrationDetails);
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("User already exits");
        done();
      });
  });

  it("givenRegistrationDetails_whenNolastName_shouldNotSaveInDB", (done) => {
    const registrationDetails = userDB.user.registerWithNoLastName;
    console.log(registrationDetails);
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });

  it("givenRegistrationDetails_whenNoemailId_shouldNotSaveInDB", (done) => {
    const registrationDetails = userDB.user.registerWithNoemail;
    console.log(registrationDetails);
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });

  it("givenRegistrationDetails_whenNoPassword_shouldNotSaveInDB", (done) => {
    const registrationDetails = userDB.user.registerWithNoPassword;
    console.log(registrationDetails);
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Wrong Input Validations");
        done();
      });
  });
});

// test for login Api
describe("signin API", () => {
  it("givenloginDetails_whenProper_shouldAbleToLogin", (done) => {
    const registrationDB = userDB.user.login;
    console.log(registrationDB);
    chai
      .request(server)
      .post("/signin")
      .send(registrationDB)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have
          .property("message")
          .eql("User successfully logged In");
        done();
      });
  });

  it("givenLoginDetails_whenInvalidEmailId_shouldNotAbleToLogin", (done) => {
    const registrationDB = userDB.user.loginwithWrongInput;
    console.log(registrationDB);
    chai
      .request(server)
      .post("/signin")
      .send(registrationDB)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property("success").eql(false);
        res.body.should.have
          .property("message")
          .eql("Incorrect email and password");
        done();
      });
  });
});

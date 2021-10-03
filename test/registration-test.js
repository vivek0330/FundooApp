/* eslint-disable node/handle-callback-err */
/* eslint-disable no-undef */
const server = require("../server");

// Require the dependencies
const chai = require("chai");
const assert = require("chai").assert;
const chaiHttp = require("chai-http");
const userDB = require("./user.json");
const userValidate = require("../helpers/joiValidation.js");
const faker = require("faker");

chai.should();
chai.use(chaiHttp);

// test cases for registration Api
describe("registration API", () => {
  it("User Registration", (done) => {
    const register = {
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    console.log(register);
    chai
      .request(server)
      .post("/register")
      .send(register)
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

  it("givenRegistrationDetails_whenNofirstName_shouldNotSaveInDB", (done) => {
    const registrationDetails = userDB.user.registerWithNofirstName;
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

  it("givenRegistrationDetails_whenfirstNameNotStartingWithCapitalLetter_shouldNotSaveInDB", (done) => {
    const registrationDetails = userDB.user.registerWithfirstNameNotStartingWithCapitalLetter;
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

  it("givenRegistrationDetails_whenfirstNameLessThreeCharacter_shouldNotSaveInDB", (done) => {
    const registrationDetails = userDB.user.registerWithfirstNameLessThreeCharacter;
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

  it("givenRegistrationDetails_whenlastNameLessThenTwoCharacter_shouldNotSaveInDB", (done) => {
    const registrationDetails = userDB.user.registerWithLastNameLessThenTwoCharacter;
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

  it("givenRegistrationDetails_whenPasswordLessThenSixCharacter_shouldNotSaveInDB", (done) => {
    const registrationDetails = userDB.user.registerWithPasswordLessThenSixCharacter;
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

  it("givenRegistrationDetails_whenPasswordNotFollowRegex_shouldNotSaveInDB", (done) => {
    const registrationDetails = userDB.user.registerWithPasswordNotFollowRegex;
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

  it("givenLoginDetails_whenInvalidPassword_shouldNotAbleToLogin", (done) => {
    const registrationDB = userDB.user.loginwithWrongPassword;
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

// validation Test cases
describe("user data Validation", () => {
  it("for given valid data should return null error", () => {
    const user = userDB.user.registerAuth;
    assert.equal(userValidate.registraionAuth.validate(user).error, null);
  });

  it("for given valid data should return null error", () => {
    const user = userDB.user.registerAuth1;
    assert.equal(userValidate.registraionAuth.validate(user).error, null);
  });

  it("for given Invalid data should return null data", () => {
    const user = userDB.user.registerunAuth;
    assert.equal(userValidate.registraionAuth.validate(user).data, null);
  });
});

// Forgot password test case
describe("Forgot Password API", () => {
  it("givenforgetdetails_whenproper_shouldbeforgotlinkSent", (done) => {
    const forgottenPassword = userDB.user.forgottenPasswordWithInvalidEmail;
    console.log(forgottenPassword);
    chai
      .request(server)
      .put("/forgotPassword")
      .send(forgottenPassword)
      .end((error, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("givenforgetdetails_whenproper_shouldbeforgotlinkSent", (done) => {
    const forgottenPassword = userDB.user.validEmailButNotExits;
    console.log(forgottenPassword);
    chai
      .request(server)
      .put("/forgotPassword")
      .send(forgottenPassword)
      .end((error, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("givenforgetdetails_whenproper_shouldbeforgotlinkSent", (done) => {
    const forgottenPassword = userDB.user.forgottenPasswordWithCorrectEmail;
    console.log(forgottenPassword);
    chai
      .request(server)
      .put("/forgotPassword")
      .send(forgottenPassword)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("Email forgot password link sent succesfully");
        done();
      });
  }).timeout(10000);
});

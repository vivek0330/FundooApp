const server = require("../server");

//Require the dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const userDB = require("./user.json");

chai.should();
chai.use(chaiHttp);

// test for registration Api
describe("registration API", () => {
  it("User Registration", (done) => {
    let registrationDetails = userDB.user.register;
    console.log(registrationDetails);
    chai
      .request(server)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("success").eql(true);
        res.body.should.have
          .property("message")
          .eql("User registration successfully");
        done();
      });
  });
});

// test for registration Api
// describe("registration API", () => {
//   it("User Registered successfully", (done) => {
//     let registrationDetails = {
//       firstName: "Xxx",
//       lastName: "Varshney",
//       email: "raginddi8@gmail.com",
//       password: "grassginiyG@@",
//     };
//     console.log(registrationDetails);
//     chai
//       .request(server)
//       .post("/register")
//       .send(registrationDetails)
//       .end((err, res) => {
//         res.should.have.status(201);
//         done();
//       });
//   });
// });

// test for registration Api
// describe("registration API", () => {
//   it("User Registered successfully", (done) => {
//     let registrationDetails = {
//       firstName: "Anshul",
//       lastName: "Varshney",
//       email: "ragssini8@gmail.com",
//       password: "gaaraginiyG@@",
//     };
//     console.log(registrationDetails);
//     chai
//       .request(server)
//       .post("/register")
//       .send(registrationDetails)
//       .end((err, res) => {
//         res.should.have.status(201);
//         done();
//       });
//   });
// });

// test for registration Api
// describe("registration API", () => {
//   it("User Registered successfully", (done) => {
//     let registrationDetails = {
//       firstName: "RaginiMMS",
//       email: "ragissni8@gmail.com",
//       password: "grqaaginiyG@@",
//     };
//     console.log(registrationDetails);
//     chai
//       .request(server)
//       .post("/register")
//       .send(registrationDetails)
//       .end((err, res) => {
//         res.should.have.status(201);
//         done();
//       });
//   });
// });

// test for login Api
// describe("signin API", () => {
//   it("User successfully logged In", (done) => {
//     let registrationDB = {
//       email: "vkfh8@gmail.com",
//       password: "ganefghG@@",
//     };
//     console.log(registrationDB);
//     chai
//       .request(server)
//       .post("/signin")
//       .send(registrationDB)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
// });

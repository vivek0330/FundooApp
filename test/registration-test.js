// const server = require("../server");

// //Require the dependencies
// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const userDB = require("./user.json");

// chai.should();
// chai.use(chaiHttp);

// // test for registration Api
// describe("registration API", () => {
//   it("User Registration", (done) => {
//     let registrationDetails = userDB.user.register;
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

// // test for login Api
// describe("signin API", () => {
//   it("User successfully logged In", (done) => {
//     let registrationDB = {
//       email: "Lalit@gmail.com",
//       password: "Lalit@@",
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

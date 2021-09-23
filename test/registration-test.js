const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("registration API", () => {
  it("it should not post without data", (done) => {
    let registrationDB = {
      firstName: "Vinni",
      lastName: "Vivek",
      email: "vkfh8@gmail.com",
      password: "ganefghG@@",
    };

    chai
      .request(server)
      .post("/register")
      .send(registrationDB)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

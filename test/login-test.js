const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("signin API", () => {
  it("User successfully logged In", (done) => {
    let registrationDB = {
      email: "vkfh8@gmail.com",
      password: "ganefghG@@",
    };

    chai
      .request(server)
      .post("/signin")
      .send(registrationDB)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

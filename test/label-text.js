/* eslint-disable node/handle-callback-err */
/* eslint-disable no-undef */

/*********************************************************************
 * Execution    : 1. Default run test cases   cmd> npm run test
 *                2. If nodemon installed    cmd> npm run server
 *
 * Purpose      : To test the API's
 *
 * @description : tests all the positive and negative cases
 *
 * @file        : test/label-test.js
 * @overview    : tests the HTTP methods with different possibilities
 * @module      : this is necessary to make sure the program works properly
 * @author      : Vivek Varshney
 *********************************************************************/
const chai = require("chai");
const chaiHttp = require("chai-http");
const labelDB = require("./label.json");
const faker = require("faker");
const server = require("../server");

chai.should();
chai.use(chaiHttp);

// create test cases
describe("create label api", () => {
  it("label", (done) => {
    const token = labelDB.label.validToken;
    const createLabels = {
      labelName: faker.lorem.word()
    };
    console.log(createLabels);
    chai
      .request(server)
      .post("/labelCreate")
      .set({ authorization: token })
      .send(createLabels)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("givenCreateLebals_whenInvalidToken_shouldNotbeCreated", (done) => {
    const token = labelDB.label.invalidToken;
    const createLabels = {
      labelName: faker.lorem.word()
    };
    console.log(createLabels);
    chai
      .request(server)
      .post("/createnotes")
      .set({ authorization: token })
      .send(createLabels)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// get note test cases
describe("get label api", () => {
  it("label", (done) => {
    const token = labelDB.label.getNoteWithValidToken;
    chai
      .request(server)
      .get("/labelGet/all")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenCreateNotes_whenInvalidToken_shouldNotbeGet", (done) => {
    const token = labelDB.label.getNoteWithInValidToken;
    chai
      .request(server)
      .get("/labelGet/all")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// update note test cases
describe("Update label api", () => {
  it("givenPoperDetails_ShouldUpdateNote", (done) => {
    const token = labelDB.label.getNoteWithValidToken;
    const label = labelDB.updatelabel.validData;
    chai
      .request(server)
      .put("/updatenotes/616448f978bd883893b336ca")
      .set({ authorization: token })
      .send(label)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("givenInvalidToken_ShouldNotUpdateLabel", (done) => {
    const token = labelDB.label.getNoteWithInValidToken;
    const note = labelDB.updatelabel.validData;
    chai
      .request(server)
      .put("/updatenotes/616448f978bd883893b336ca")
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// delete note test cases
describe("delete notes api", () => {
  it("givenPoperDetails_ShouldDeleteNote", (done) => {
    const token = labelDB.label.getNoteWithValidToken;
    chai
      .request(server)
      .delete("/labelDelete/616468d64dab5d648095d278")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenInvalidToken_ShouldUpdateNote", (done) => {
    const token = labelDB.label.getNoteWithInValidToken;
    chai
      .request(server)
      .delete("/labelDelete/616468f54dab5d648095d27a")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// get data by id
describe("Get notes by ID api", () => {
  it("givenPoperDetails_ShouldGetNote", (done) => {
    const token = labelDB.label.getNoteWithValidToken;
    chai
      .request(server)
      .get("/labelGet/616448f978bd883893b336ca")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

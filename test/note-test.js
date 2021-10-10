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
 * @file        : test/note-test.js
 * @overview    : tests the HTTP methods with different possibilities
 * @module      : this is necessary to make sure the program works properly
 * @author      : Vivek Varshney
 *********************************************************************/
const chai = require("chai");
const chaiHttp = require("chai-http");
const noteDB = require("./note.json");
const faker = require("faker");
const server = require("../server");

chai.should();
chai.use(chaiHttp);

// create test cases
describe("create notes api", () => {
  it("notes", (done) => {
    const token = noteDB.notes.validToken;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    console.log(createNotes);
    chai
      .request(server)
      .post("/createnotes")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("givenCreateNotes_whenInvalidToken_shouldNotbeCreated", (done) => {
    const token = noteDB.notes.invalidToken;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    console.log(createNotes);
    chai
      .request(server)
      .post("/createnotes")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// get note test cases
describe("get notes api", () => {
  it("notes", (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    chai
      .request(server)
      .get("/getnotes")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("givenCreateNotes_whenInvalidToken_shouldNotbeGet", (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    chai
      .request(server)
      .get("/getnotes")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// update note test cases
describe("Udate notes api", () => {
  it("givenPoperDetails_ShouldUpdateNote", (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    const note = noteDB.updateNote.validData;
    chai
      .request(server)
      .put("/updatenotes/6162b06457eadf4fa2945b43")
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("givenInvalidToken_ShouldUpdateNote", (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    const note = noteDB.updateNote.validData;
    chai
      .request(server)
      .put("/updatenotes/6162b06457eadf4fa2945b43")
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

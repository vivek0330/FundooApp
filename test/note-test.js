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
describe("Update notes api", () => {
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
  // });

  // // delete note test cases
  describe("delete notes api", () => {
    // //   it("givenPoperDetails_ShouldDeleteNote", (done) => {
    // //     const token = noteDB.notes.getNoteWithValidToken;
    // //     chai
    // //       .request(server)
    // //       .delete("/deletenotes/61630b5d2f6b2e71d545ac9b")
    // //       .set({ authorization: token })
    // //       .end((err, res) => {
    // //         res.should.have.status(200);
    // //         done();
    // //       });
    // //   });

    it("givenInvalidToken_ShouldUpdateNote", (done) => {
      const token = noteDB.notes.getNoteWithInValidToken;
      chai
        .request(server)
        .delete("/deletenotes/6162b06457eadf4fa2945b43")
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  // // get data by id
  describe("Get notes by ID api", () => {
    it("givenPoperDetails_ShouldGetNote", (done) => {
      const token = noteDB.notes.getNoteWithValidToken;
      chai
        .request(server)
        .get("/getnotes/6155e2bf001d0213dce6480d")
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  // add lebel in note and add note in label
  describe("Add label in notes api", () => {
    it("givenPoperDetails_ShouldAddLabelInNote", (done) => {
      const token = noteDB.addLebel.validToken;
      const note = noteDB.addLabelBodyData;
      console.log(note);
      chai
        .request(server)
        .post("/addlabel/616301d4e79bcacafb1aad14")
        .set({ authorization: token })
        .send(note)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("Delete label in notes api", () => {
    it("givenPoperDetails_ShouldDeleteLabelInNote", (done) => {
      const token = noteDB.addLebel.validToken;
      const note = noteDB.deleteLabelBodyData;
      console.log(note);
      chai
        .request(server)
        .delete("/deleteLabelFromNote/616301d4e79bcacafb1aad14")
        .set({ authorization: token })
        .send(note)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
});

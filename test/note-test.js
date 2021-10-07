// /* eslint-disable node/handle-callback-err */
// /* eslint-disable no-undef */
// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const noteDB = require("./note.json");
// const faker = require("faker");
// const server = require("../server");

// chai.should();
// chai.use(chaiHttp);

// describe("create notes api", () => {
//   it("notes", (done) => {
//     const token = noteDB.notes.validToken;
//     const createNotes = {
//       title: faker.lorem.word(),
//       description: faker.lorem.sentence()
//     };
//     console.log(createNotes);
//     chai
//       .request(server)
//       .post("/createnotes")
//       .set({ authorization: token })
//       .send(createNotes)
//       .end((err, res) => {
//         res.should.have.status(201);
//         done();
//       });
//   });

//   it("givenCreateNotes_whenInvalidToken_shouldNotbeCreated", (done) => {
//     const token = noteDB.notes.invalidToken;
//     const createNotes = {
//       title: faker.lorem.word(),
//       description: faker.lorem.sentence()
//     };
//     console.log(createNotes);
//     chai
//       .request(server)
//       .post("/createnotes")
//       .set({ authorization: token })
//       .send(createNotes)
//       .end((err, res) => {
//         res.should.have.status(401);
//         done();
//       });
//   });
// });

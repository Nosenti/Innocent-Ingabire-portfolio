const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./../index");
// const { deleteOne } = require("../models/Query");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Testing Get Queries posts", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .get("/api/user/queries")

      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });
});

describe("Testing Post queries", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .post("/api/queries")
      .send({
        name: "Innocent Ingabire",
        email: "nosenti@gmail.com",
        message: "This is the message",
      })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });
});

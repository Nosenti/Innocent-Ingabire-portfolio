import chai from "chai";
import chaiHttp from "chai-http";
import app from "./../index";
require("regenerator-runtime/runtime");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Testing Get Queries ", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .get("/api/user/queries")

      .end((error, response) => {
        expect(response).to.have.status(200);
        done();
      });
  });
});

describe("Testing Get one query ", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .get("/api/user/queries/:id")

      .end((error, response) => {
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
        expect(response).to.have.status(200);
        done();
      });
  });
});

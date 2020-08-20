const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./../index");
const { deleteOne } = require("../models/Blog");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Testing login", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({
        email: "nosenti@gmail.com",
        password: "nosenti",
      })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });
  it("should return success message", (done) => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({
        email: "nosenti@gmail.com",
        password: "nosenti",
      })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response.body.status).to.deep.equal("success");
        done();
      });
  });
  it("should return an object", (done) => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({
        email: "nosenti@gmail.com",
        password: "nosenti",
      })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.be.an("object");

        done();
      });
  });
});

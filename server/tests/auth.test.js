import chai from "chai";
import chaiHttp from "chai-http";
import app from "./../index";

chai.use(chaiHttp);
const expect = chai.expect;
let token;
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
        token = response.body.token;
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

export default token;

import chai from "chai";
import chaiHttp from "chai-http";
import app from "./../index";

chai.use(chaiHttp);
const expect = chai.expect;
let token;
describe("Testing login", () => {
  it("should return invalid credentials", (done) => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({
        email: "",
        password: "",
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        token = response.body.token;
        done();
      });
  });
  it("should return 200", (done) => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({
        email: "nosenti@gmail.com",
        password: "nosenti",
      })
      .end((error, response) => {
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
        expect(response).to.be.an("object");

        done();
      });
  });
});

export default token;

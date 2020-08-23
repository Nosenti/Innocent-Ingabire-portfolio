import chai from "chai";
import chaiHttp from "chai-http";
import app from "./../index";
require("regenerator-runtime/runtime");

chai.use(chaiHttp);
const expect = chai.expect;
let queryId;
let token;

describe("POST /api/user/login", () => {
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
});

describe("QUERY", () => {
  describe("QUERY_USER", () => {
    it("POST api/queries", (done) => {
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
          queryId = response.body.data._id;
          done();
        });
    });
    it("should not create a query", (done) => {
      chai
        .request(app)
        .post("/api/queries")
        .send({
          name: "",
          email: "",
          message: "",
        })
        .end((error, response) => {
          expect(response).to.have.status(400);

          done();
        });
    });
  });
  describe("QUERY_ADMIN", () => {
    it("GET api/user/queries", (done) => {
      chai
        .request(app)
        .get("/api/user/queries")
        .set("authorization", `Bearer ${token}`)
        .end((error, response) => {
          expect(response).to.have.status(200);
          done();
        });
    });
    it("GET api/user/queries", (done) => {
      chai
        .request(app)
        .get(`/api/user/queries/${queryId}`)
        .set("authorization", `Bearer ${token}`)
        .end((error, response) => {
          expect(response).to.have.status(200);
          done();
        });
    });
    it("Should not get a query", (done) => {
      chai
        .request(app)
        .get(`/api/user/queries/hehfhah`)
        .set("authorization", `Bearer ${token}`)
        .end((error, response) => {
          expect(response).to.have.status(404);
          done();
        });
    });
  });
});

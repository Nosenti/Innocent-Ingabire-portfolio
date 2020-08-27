import chai from "chai";
import chaiHttp from "chai-http";
import app from "./../index";
require("regenerator-runtime/runtime");

chai.use(chaiHttp);
const expect = chai.expect;
let pro_id;
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

describe("PROFILE/PROJECT", () => {
  it("GET api/user/profile", (done) => {
    chai
      .request(app)
      .get("/api/user/profile")
      .set("authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        pro_id = response.body._id;
        done();
      });
  });
  it("Should return 404", (done) => {
    chai
      .request(app)
      .get("/api/user/profile/4")
      .set("authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(404);
        pro_id = response.body._id;
        done();
      });
  });
  // it("PATCH api/user/profile", (done) => {
  //   chai
  //     .request(app)
  //     .patch("/api/user/profile/:id")
  //     .set("authorization", `Bearer ${token}`)
  //     .end((error, response) => {
  //       expect(response).to.have.status(200);
  //       pro_id = response.body._id;
  //       done();
  //     });
  // });
  it("POST api/user/profile", (done) => {
    chai
      .request(app)
      .post("/api/user/profile")
      .set("authorization", `Bearer ${token}`)
      .send({
        message: "Profile Created",
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        pro_id = response.body._id;
        done();
      });
  });
  it("PUT api/user/profile/projects", (done) => {
    chai
      .request(app)
      .put("/api/user/profile/projects")
      .set("authorization", `Bearer ${token}`)
      .send({
        title: "This is the first project",
        description: "Yea, this is the first project",
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        pro_id = response.body._id;
        done();
      });
  });
  it("Should not create a project", (done) => {
    chai
      .request(app)
      .put("/api/user/profile/projects")
      .set("authorization", `Bearer ${token}`)
      .send({
        title: "This is the first project",
        description: "Yea, this is the first project",
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        pro_id = response.body._id;
        done();
      });
  });
  it("Should not create a project", (done) => {
    chai
      .request(app)
      .put("/api/user/profile/projects")
      .set("authorization", `${token}`)
      .send({
        title: "This is the first project",
        description: "Yea, this is the first project",
      })
      .end((error, response) => {
        expect(response).to.have.status(401);
        pro_id = response.body._id;
        done();
      });
  });

  it("DELETE api/user/profile/projects/:id", (done) => {
    chai
      .request(app)
      .delete(`/api/user/profile/projects/${pro_id}`)
      .set("authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        done();
      });
  });
});

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./../index");
const { deleteOne } = require("../models/Blog");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Testing Update profile/ creating a project", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .put("/api/user/profile/projects")
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });
});

describe("Testing Delete a project", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .delete("/api/user/profile/projects/:pro_id")
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });
});

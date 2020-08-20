const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./../index");
const { deleteOne } = require("../models/Blog");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Testing Get blog posts", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .get("/api/user/blogs")
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });
});

// Getting one blog post
describe("Testing Get one blog post", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .get("/api/blogs/5f3cab08d9e9730c64b84c0b")
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });
});

// Updating a blog post
describe("Testing updating a blog post", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .patch("/api/user/blogs/:id")
      .send({
        title: "This is the title of the blog",
        image: "image url",
        content: "This is the paragraph",
      })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });
});

describe("Testing Post blog posts", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .post("/api/user/blogs")
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });
});

// deleting a blog post
describe("Testing delete a blog post", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .delete("/api/user/blogs/:id")
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });
});

// comment on a post
describe("Testing posting a comment on blog posts", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .post("/api/user/blogs/comment/5f3cab08d9e9730c64b84c0b")
      .send({
        name: "Nosenti",
        text: "It is Innocent",
      })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);

        done();
      });
  });
});

describe("Testing Liking a blog post", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .put("/api/user/blogs/like/:id")
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });
});

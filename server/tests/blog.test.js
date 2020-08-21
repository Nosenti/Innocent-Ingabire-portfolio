import chai from "chai";
import chaiHttp from "chai-http";
import app from "./../index";

chai.use(chaiHttp);
const expect = chai.expect;
let blogId;

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
});

describe("Testing Get blog posts", () => {
  // it("should return 200", (done) => {
  //   chai
  //     .request(app)
  //     .get("/api/user/blogs")
  //     .end((error, response) => {
  //       expect(error).to.be.null;
  //       expect(response).to.have.status(200);
  //       done();
  //     });
  // });
  it("should update and return 200", (done) => {
    chai
      .request(app)
      .patch(`/api/user/blogs/${blogId}`)
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
  // it("should not update the blog", (done) => {
  //   chai
  //     .request(app)
  //     .patch("/api/user/blogs/hehehe")
  //     // .set("token", token)
  //     .end((error, response) => {
  //       expect(response).to.have.status(404);
  //       done();
  //     });
  // });
  // it("should return 200", (done) => {
  //   chai
  //     .request(app)
  //     .post("/api/user/blogs")
  //     // .set("token", token)
  //     .send({
  //       title: "My blog post",
  //       content: "I had been here before",
  //       image: "https://picsum.photos/600/300",
  //     })
  //     .end((error, response) => {
  //       expect(error).to.be.null;
  //       expect(response).to.have.status(200);
  //       blogId = response.body.data._id;
  //       console.log(blogId);
  //       done();
  //     });
  // });
  // it("should not create a blog post", (done) => {
  //   chai
  //     .request(app)
  //     .post("/api/user/blogs")
  //     .set("token", "anyonymours")
  //     .send({
  //       title: "My blog post",
  //       content: "I had been here before",
  //       image: "https://picsum.photos/600/300",
  //     })
  //     .end((err, response) => {
  //       expect(response).to.have.status(401);
  //       done();
  //     });
  // });
  // it("It should not create a blog", (done) => {
  //   chai
  //     .request(app)
  //     .post("/api/user/blogs")
  //     .set("token", "ertohaogphhhhhhhhhhhh35")
  //     .send({
  //       title: "",
  //       content: "",
  //       image: "",
  //     })
  //     .end((err, response) => {
  //       expect(response).to.have.status(400);
  //       done();
  //     });
  // });
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
  // it("should return 200", (done) => {
  //   chai
  //     .request(app)
  //     .post(`/api/user/blogs/comment/${blogId}`)
  //     .send({
  //       name: "Nosenti",
  //       text: "It is Innocent",
  //     })
  //     .end((error, response) => {
  //       expect(error).to.be.null;
  //       expect(response).to.have.status(200);

  //       done();
  //     });
  // });
  it("should return 200", (done) => {
    chai
      .request(app)
      .put(`/api/user/blogs/like/${blogId}`)
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });
});

describe("Testing for user/ Blog", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .get("/api/blogs")
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        done();
      });
  });
  // it("should return 200 on getting one blog", (done) => {
  //   chai
  //     .request(app)
  //     .get("/api/blogs/:id")
  //     .end((error, response) => {
  //       expect(error).to.be.null;
  //       expect(response).to.have.status(200);
  //       done();
  //     });
  // });
  it("should not get a blog", (done) => {
    chai
      .request(app)
      .get("/api/blogs/hey there")
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(404);
        done();
      });
  });
});

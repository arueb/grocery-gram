const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;

// Reference: https://dev.to/easybuoy/testing-node-api-with-mocha-chai-248b
// Reference: https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai

chai.use(chaiHttp);
describe("GroceryGram Backend Tests", function () {

  it("Post /auth - No Credentials", done => {
    chai
      .request(app)
      .post("/api/auth")
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.not.have.header("x-auth-token");
        done();
      })
  });

  it("Post /auth - Incorrect email", done => {
    chai
      .request(app)
      .post("/api/auth")
      .send({ email: "aint@no.email", password: "brooks" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.not.have.header("x-auth-token");
        done();
      })
  });

  it("Post /auth - Incorrect Password", done => {
    chai
      .request(app)
      .post("/api/auth")
      .send({ email: "bp@bp.com", password: "NoThatsNotMyPassword" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.not.have.header("x-auth-token");
        done();
      })
  });

  let authToken = "";

  it("Post /auth - Get Token", done => {
    chai
      .request(app)
      .post("/api/auth")
      .send({ email: "bp@bp.com", password: "brooks" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.header("x-auth-token");
        authToken = res.header["x-auth-token"];
        done();
      })
  });

  it("GET /users - No Auth", done => {
    chai
      .request(app)
      .get("/api/users")
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.not.be.a('array');
        done();
      });
  });

  it("GET /users", done => {
    chai
      .request(app)
      .get("/api/users")
      .set("x-auth-token", authToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.not.eql(0);
        done();
      });
  });

});
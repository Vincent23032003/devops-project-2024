const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const { app } = require('../src/index');
require('./test-setup');

chai.use(chaiHttp);

describe('API Tests', () => {
  describe('Health Check', () => {
    it('should return status UP on /health', (done) => {
      chai.request(app)
        .get('/health')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status', 'UP');
          done();
        });
    });
  });

  describe('User CRUD Operations', () => {
    const testUser = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com'
    };

    it('should create a new user on POST /users', (done) => {
      chai.request(app)
        .post('/users')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message', 'User created');
          expect(res.body.user).to.deep.equal(testUser);
          done();
        });
    });

    it('should not create user with missing fields', (done) => {
      chai.request(app)
        .post('/users')
        .send({ id: '123' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should get user by id', (done) => {
      chai.request(app)
        .get(`/users/${testUser.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name', testUser.name);
          expect(res.body).to.have.property('email', testUser.email);
          done();
        });
    });

    it('should return 404 for non-existent user', (done) => {
      chai.request(app)
        .get('/users/nonexistent')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should update user', (done) => {
      const updateData = { name: 'Updated Name' };
      chai.request(app)
        .put(`/users/${testUser.id}`)
        .send(updateData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.user.name).to.equal(updateData.name);
          done();
        });
    });

    it('should delete user', (done) => {
      chai.request(app)
        .delete(`/users/${testUser.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
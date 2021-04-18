// Test suite
const chai = require('chai'); // test framework
const { expect } = require('chai');
const chaiHttp = require('chai-http'); // http client 
const News = require('../src/models/news')
const app = require('../src/app')
const conn = require('../src/db/mongoose.test')
const request = require('supertest');
const User = require('../src/models/user');
const { getMaxListeners } = require('../src/app');
const mongoose = require('mongoose')

chai.use(chaiHttp);

describe('users', () => {

    let authenticatedUser = request.agent(app)

    // connect to db
    before((done) => {
        conn.connect()
        .then(() => {
            mongoose.connection.db.collection('users').deleteMany({})
            done()
        })
        .catch((err) => console.log(err));
    })

    // disconnect from db
    after((done) => {
        mongoose.connection.db.collection('users').deleteMany({})
        conn.close()
        .then(() => {
            done()
        })
        .catch((err) => console.log(err));
    })

    // view singup
    it('should return status 200 for signup page', (done) => {
        request(app).get('/users/signup')
            .then((res) => {
                expect(res).to.have.status(200);
                done()
            })
            .catch((err) => {
                done(err)
            });
    });

    // view login
    it('should return status 200 for login page', (done) => {
        request(app).get('/users/login')
            .then((res) => {
                expect(res).to.have.status(200);
                done()
            })
            .catch((err) => {
                console.log(err)
                done(err)
            });
    });

    // signup
    it('should return status 302 for signing up', (done) => {
        request(app).post('/users')
            .send({
                name: 'admin',
                email: 'admin@gmail.com',
                password: '1234567'
            })
            .then((res) => {
                expect(res).to.have.status(302);
                done()
            })
            .catch((err) => {
                done(err)
            });
    });

    // login
    it('should return status 302 for logging in successfully', (done) => {
        authenticatedUser.post('/users/login')
            .send({email: 'admin@gmail.com', password: '1234567'})
            .end((err, res) => {
                expect(res.statusCode).to.equal(302)
                expect('Location', '/')
                done()
            })
    });

    // logout
    it('should return status 200 for logging out successfully', (done) => {
        authenticatedUser.get('/users/logout')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                done()
            })
    });

})

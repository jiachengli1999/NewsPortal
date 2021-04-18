// Test suite
const chai = require('chai'); // test framework
const { expect } = require('chai');
const chaiHttp = require('chai-http'); // http client 
const News = require('../src/models/news')
const app = require('../src/app')
const conn = require('../src/db/mongoose.test')
const request = require('supertest');
const mongoose = require('mongoose')
const User = require('../src/models/user')

chai.use(chaiHttp);

describe('Sports', () => {
    let userDao = new User({
        name: 'admin', 
        email: 'admin@gmail.com',
        password: '1234567'
    })

    let authenticatedUser = request.agent(app)
    // connect to db
    before((done) => {
        conn.connect()
        .then(() => {
            mongoose.connection.db.collection('news').deleteMany({})
            mongoose.connection.db.collection('users').deleteMany({})
            // create user
            userDao.save()
            .then(() => {
                // login and get token
                authenticatedUser.post('/users/login')
                .send({email: 'admin@gmail.com', password: '1234567'})
                .end((err, res) => {
                    expect(res.statusCode).to.equal(302)
                    expect('Location', '/')
                    done()
                })
            })
            .catch(err => console.log(err))
        })
        .catch((err) => console.log(err));
    })

    // disconnect from db
    after((done) => {
        mongoose.connection.db.collection('news').deleteMany({})
        mongoose.connection.db.collection('users').deleteMany({})
        conn.close()
        .then(() => {
            done()
        })
        .catch((err) => console.log(err));

    })

    // view add sports page
    it('should return status 200 for sports page', (done) => {
        request(app).get('/sports')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                done()
            })
    })

    // post sport news
    it('should return status 302 for posting sport news', (done) => {
        authenticatedUser.post('/sports')
            .send({
                isSports: true,
                img_url: 'pic2.jpg',
                title: 'sportTest',
                description: 'sportDescription',
                pub_date: '2/2/2022',
                url: 'https://www.google.com',
                author: 'testAuthor'
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(302)
                done()
            })
    })

    // post invalid sport news
    it('should return status 400 for posting sport news with missing parameters', (done) => {
        authenticatedUser.post('/sports')
            .send({
                isSports: true,
                img_url: 'pic2.jpg',
                author: 'testAuthor'
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400)
                done()
            })
    })


   
})

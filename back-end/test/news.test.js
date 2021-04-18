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

describe('News', () => {
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

    // view news
    it('should return status 200 for news page', (done) => {
        request(app).get('/news')
            .then((res) => {
                expect(res).to.have.status(200);
                done()
            })
            .catch((err) => {
                done(err)
            });
    });

    // view all news
    it('should return status 200 for view all news page', (done) => {
        request(app).get('/news/all')
            .then((res) => {
                expect(res).to.have.status(200);
                done()
            })
            .catch((err) => {
                done(err)
            });
    });

    // delete invalid news
    it('Should return 401 after deleting non-existing news', (done) => {
        request(app).get('/news/delete/1')
            .then((res) => {
                expect(res).to.have.status(401);
                done()
            })
            .catch((err) => done(err));
    });

    // delete news
    it('Should return 302 after deleting an existing news', () => {
        const newDao = new News({ 
            title: 'ToBeDeleted', 
            description: 'dasdsadsa', 
            isSports: false, 
            img_url: 'test', 
            pub_date: '10/20/2020', 
            url: 'google.com' 
        })
        newDao.save()
        .then(res => {
            authenticatedUser.get('/news/delete/'+ res._id)
            .then(res => {
                expect(res).to.have.status(302);
                done()
            })
            .catch(err => done(err))
        })
        .catch(err => done(err))
    })

    // add news
    it('Should return 302 after adding news', (done) => {
        authenticatedUser.post('/news/add')
            .send({
                title: 'addNew', 
                description: 'dasdsadsa', 
                isSports: false, 
                img_url: 'pic3.jpg', 
                pub_date: '10/20/2020', 
                url: 'https://www.google.com' 
            })
            .then((res) => {
                expect(res).to.have.status(302);
                done()
            })
            .catch((err) => done(err));
    });

    // update news
    it('Should return 302 after update user', (done) => {
        // add news
        authenticatedUser.post('/news/add')
        .send({
            title: 'addNew', 
            description: 'dasdsadsa', 
            isSports: false, 
            img_url: 'pic3.jpg', 
            pub_date: '10/20/2020', 
            url: 'https://www.google.com' 
        })
        .then((res) => {
            expect(res).to.have.status(302);
            News.findOne({title: 'addNew'}, (err, data) =>{
                if(err) { done(err) }
                let id = data._id
                // edit news
                authenticatedUser.post('/news/edit')
                .send({
                    title: 'addNew', 
                    description: 'dasdsadsa', 
                    isSports: false, 
                    img_url: 'pic3.jpg', 
                    pub_date: '10/20/2020', 
                    url: 'https://www.google.com',
                    _id: id
                })
                .then((res) => {
                    expect(res).to.have.status(302);
                    done()
                })
                .catch((err) => done(err));
            })
        })
        .catch((err) => done(err));
    });

})

const chai = require('chai');
const moment = require('moment/moment');
const expect = chai.expect;
const request = require('supertest');
const updatedObject = require('../data/update-object.json');

const createObject = require('../data/create-object.json');

describe('PATCH', () => {
    const baseUrl = 'https://api.restful-api.dev/objects'
    const date = new Date()
    const newObjectId = []
    const createdObject = []
    describe('Patch', function () {
        it('Should get status code 405', function (done) {
            request(baseUrl)
                .patch('/')
                .send('()')
                .set('Accept', 'application/json')

                .expect(function (response) {
                   expect(response.statusCode).to.equal(405)
                })
                .end(function (err) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        })
        it('Should have header in response', function (done) {
            request(baseUrl)
              .patch('/tests')
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(function (response) {
                expect(response.header).to.be.an('object')
                expect(response.header).to.have.property('content-type');
                expect(response.header['content-type']).to.be.equal('application/json')
              })
              .end(function (err) {
                if (err) {
                  throw err;
                }
                done();
              })
      
          });
          it('Should get status code 400', function (done) {
            request(baseUrl)
              .patch('/tests')
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(function (response) {
                expect(response.statusCode).to.equal(400)
              })
              .end(function (err) {
                if (err) {
                  throw err;
                }
                done();
              })
      
          });

    })
})
const chai = require('chai');
const moment = require('moment/moment');
const expect = chai.expect;
const request = require('supertest');
const patchObject = require('../data/patch-object.json');

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
        // 400  incorrect body json
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

          it.skip('Should have header in response', function (done) {
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
          it('Should create an new object with full data', function (done) {
            request(baseUrl)
                .post('/')
                .send(createObject)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(function (response) {
                    expect(response.status).to.equal(200)
                    expect(response.body).to.be.an('object')
                    expect(response.body).to.have.property('id')
                    expect(response.body).to.have.property('name')
                    expect(response.body).to.have.property('createdAt')
                    expect(response.body).to.have.property('data')
                    expect(response.body.id).to.be.an('string')
                    expect(response.body.name).to.be.a('string')
                    expect(response.body.createdAt).to.be.an('string')
                    expect(response.body.data).to.be.an('object')
                    expect(response.body.data).to.have.property('year')
                    newObjectId.push(response.body.id)
                    createdObject.push(response.body.data)
                })
                .end(function (err) {
                    if (err) {
                        throw err;
                    }
                    done();
                });

        });
        it('Should patch an existing object', function (done) {
       
            request(baseUrl)
                .patch(`/${newObjectId[0]}`)
                .set('Content-Type', 'application/json')
                .send(patchObject)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(function (response) {

                    // structure of response
                    expect(response.status).to.equal(200)
                    expect(response.body).to.be.an('object')
                    expect(response.body).to.have.property('id')
                    expect(response.body).to.have.property('name')
                    expect(response.body).to.have.property('updatedAt')
                    expect(response.body).to.have.property('data')
                    expect(response.body.id).to.be.an('string')
                    expect(response.body.name).to.be.a('string')
                    expect(response.body.updatedAt).to.be.an('string')
                    expect(response.body.data).to.be.an('object')

                    // data 
                    const responseCpuModel = response.body.data['CPU model']
                    const responseHardDiskSpace = response.body.data['Hard disk size']
                    expect(response.body.name).to.equal(patchObject.name)
                    expect(response.body.data.year).to.equal(2019)
                    expect(response.body.data.price).to.equal(1849.99)
                    expect(responseCpuModel).to.eql('Intel Core i9')
                    expect(responseHardDiskSpace).to.eql('1 TB')
                    const createdDate = moment(response.body.createdAt).format('YYYY_MM_DD')

                    expect(moment(date).format('YYYY_MM_DD')).to.eql(createdDate)

                })
                .end(function (err) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
        it('Should have header in response', function (done) {
            request(baseUrl)
                .patch(`/${newObjectId[0]}`)
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


    })
})
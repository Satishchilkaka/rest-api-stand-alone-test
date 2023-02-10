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
                .put('/')
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
        // 415 payload format is not supported
        it('Should not update a object and get status code 415', function (done) {
            request(baseUrl)
                .put('/dfg')
                .send('')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(function (response) {
                    expect(response.statusCode).to.equal(415)
                })
                .end(function (err) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        })
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
        it('Should update an existing object', function (done) {
            const cpuModel = updatedObject.data['CPU model']
            const hardDiskSpace = updatedObject.data['Hard disk size']
            request(baseUrl)
                .put(`/${newObjectId[0]}`)
                .set('Content-Type', 'application/json')
                .send(updatedObject)
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
                    expect(response.body.name).to.equal(updatedObject.name)
                    expect(response.body.data.year).to.equal(updatedObject.data.year)
                    expect(response.body.data.price).to.equal(updatedObject.data.price)
                    expect(response.body.data.color).to.equal(updatedObject.data.color)
                    expect(responseCpuModel).to.eql(cpuModel)
                    expect(responseHardDiskSpace).to.eql(hardDiskSpace)
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
                .put(`/${newObjectId[0]}`)
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
const chai = require('chai')
const expect = chai.expect;
const request = require('supertest');
const assert = require('assert');
const totalObjects = require('../data/total-objects.json')
const id3id5id10 = require('../data/id3id5id10.json')
const id7 = require('../data/single-Id.json')
describe('GET', () => {
  const baseUrl = 'https://api.restful-api.dev/objects'
  const id3 = '3'
  const id5 = '5'
  const id10 = '10'
  describe('Get all objects', function () {
    it('Should have status code 404 ', function (done) {
      // not found
      request(baseUrl)
        .get('123er/test')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)

        .expect(function (response) {
          expect(response.status).to.equal(404)
        })
        .end(function (err) {
          if (err) {
            throw err;
          }
          done();
        })
    });
    it('Should have content type json ', function (done) {
      // not found
      request(baseUrl)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, done)

    });
    it('Should have JSON response', function (done) {
      request(baseUrl)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function (response) {
          expect(response.body).to.be.an('array')

        })
        .end(function (err) {
          if (err) {
            throw err;
          }
          done();
        })

    });
    it('Should have header in response', function (done) {
      request(baseUrl)
        .get('/')
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
    it('Should have 200 status code', function (done) {
      request(baseUrl)
        .get('/')
        .set('Accept', 'application/json')
        .expect(function (response) {
          expect(response.status).deep.equal(200)
        })
        .end(function (err) {
          if (err) {
            throw err;
          }
          done();
        });
    });
    it('Should have 13 objects', function (done) {
      request(baseUrl)
        .get('/')
        .set('Accept', 'application/json')
        .expect(function (response) {
          expect(response.body.length).to.eql(13)
          // assert.strictEqual(response.body.length, 13)
        })
        .end(function (err) {
          if (err) {
            throw err;
          }
          done();
        });
    })
    it('Should have expected response', function (done) {
      request(baseUrl)
        .get('/')
        .set('Accept', 'application/json')

        .expect(function (response) {
          // Can be used anyone
          expect(totalObjects).to.eql(response.body)
          expect(totalObjects).deep.equal(response.body)
          assert.deepStrictEqual(totalObjects, response.body)
        })
        .end(function (err) {
          if (err) {
            throw err;
          }
          done();
        });

    })

  });
  describe('Get objects by ID', function () {
    it('Should have JSON response', function (done) {
      request(baseUrl)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('Should have header in response', function (done) {
      request(baseUrl)
        .get('/')
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
    it('Should have 3 objects', function (done) {
      request(baseUrl)
        .get(`?id=${id3id5id10[0].id}&id=${id3id5id10[1].id}&id=${id3id5id10[2].id}`)
        .set('Accept', 'application/json')
        .expect(function (response) {
          expect(response.body).to.eql(id3id5id10)
          // assert.strictEqual(response.body.length, 13)
        })
        .end(function (err) {
          if (err) {
            throw err;
          }
          done();
        });
    });
    it('Should have 3 objects with keys', function (done) {
      request(baseUrl)
        .get(`?id=${id3}&id=${id5}&id=${id10}`)
        .set('Accept', 'application/json')
        .expect(function (response) {
          expect(response.body).to.eql(id3id5id10)
          response.body.forEach(object => {
            expect(object).to.have.all.keys('id', 'name', 'data')
          })
        })
        .end(function (err) {
          if (err) {
            throw err;
          }
          done();
        });
    });
    it('Should have nested objects', function (done) {
      request(baseUrl)
        .get(`?id=${id3}&id=${id5}&id=${id10}`)
        .set('Accept', 'application/json')
        .expect(function (response) {
          expect(response.body).to.eql(id3id5id10)
          for (let i = 0; i < response.body.length; i++) {
            expect(response.body[i].data)
              .to.be.an("object")
          }
        })
        .end(function (err) {
          if (err) {
            throw err;
          }
          done();
        });
    });
    // Asserting every value 
    it('Should have a data for nested objects', function (done) {
      const objectId = []
      const objectName = []
      const objectData = []
      request(baseUrl)
        .get(`?id=${id3}&id=${id5}&id=${id10}`)
        .set('Accept', 'application/json')
        .expect(function (response) {
          expect(response.status).to.equal(200)

          expect(response.body).to.eql(id3id5id10)

          response.body.forEach(object => {
            objectId.push(object.id)
            objectName.push(object.name)
            objectData.push(object.data)

          })
          expect(objectId).to.eql([id3, id5, id10])
          expect(objectName).to.eql([id3id5id10[0].name, id3id5id10[1].name, id3id5id10[2].name])
          expect(objectData).to.eql([id3id5id10[0].data, id3id5id10[1].data, id3id5id10[2].data])
          // expect(objectData).to.eql([id3, id5, id10])

        })
        .end(function (err) {
          if (err) {
            throw err;
          }
          done();
        });
    });
  });
  describe('Get single object', function () {
    it('Should have JSON response and 200 status code', function (done) {
      request(baseUrl)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, done())
        .expect(function (response) {
          expect(response.status).to.equal(200)
        })
    });
    it('Should have header in response', function (done) {
      request(baseUrl)
        .get('/')
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
    it('Should have 1 object with keys', function (done) {
      request(baseUrl)
        .get(`/${id7.id}`)
        .set('Accept', 'application/json')
        .expect(function (response) {
          expect(response.body).to.eql(id7)
          expect(response.body).to.have.all.keys('id', 'name', 'data')
        })
        .end(function (err) {
          if (err) {
            throw err;
          }
          done();
        });
    });

    it('Should have 1 object', function (done) {
      request(baseUrl)
        .get(`/${id7.id}`)
        .set('Accept', 'application/json')
        .expect(function (response) {
          expect(id7).to.eql(response.body)
        })
        .end(function (err) {
          if (err) {
            throw err;
          }
          done();
        });
    })

    it('Should have JSON response', function (done) {
      const cpuModel = id7.data['CPU model']
      const hardDiskSpace = id7.data['Hard disk size']

      request(baseUrl)
        .get(`/${id7.id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function (response) {
          const responseCpuModel = response.body.data['CPU model']
          const responseHardDiskSpace = response.body.data['Hard disk size']
          expect(response.body.id).to.eql(id7.id)
          expect(response.body.name).to.eql(id7.name)
          expect(response.body.data).to.eql(id7.data)
          expect(response.body.data.year).to.eql(id7.data.year)
          expect(response.body.data.price).to.eql(id7.data.price)
          expect(responseCpuModel).to.eql(cpuModel)
          expect(responseHardDiskSpace).to.eql(hardDiskSpace)
          // console.log(responseHardDiskSpace)
        })
        .end(function (err) {
          if (err) {
            throw err;
          }
          done();
        });
    });
  })
})

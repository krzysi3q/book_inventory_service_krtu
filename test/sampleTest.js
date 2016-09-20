var suma = require('./sum');
var assert = require('assert');
var request = require('supertest');
var stockRepository = require('../middleware/stockRepositoryInMemory');

describe('POST /stock', function() {
    it('respond with same object', function(done) {
        var app = require('../app')(stockRepository());
        var obj = {
            "isbn" : "aaaaaa"
        }
        request(app)
        .post('/stock')
        .set('Accept', 'application/json')
        .send(obj)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res){
            assert(obj.isbn, res.body.isbn);
        })
        .end(done);
    });
});


describe('GET /stock/:isbn', function() {
    it('allow to check book avaliability', function(done) {
        stock = stockRepository();
        var app = require('../app')(stock);

        stock._items([
            {
                isbn: '1',
                count: 2
            }
        ]);
        
        request(app)
        .get('/stock/1')
        .expect('Content-Type', /json/)
        .expect(200, {count: 2}, done);
    });
});
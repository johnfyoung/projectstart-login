import request from 'supertest';
import app from '../server';

test('GET /api/install/isinstalled', done => {
    request(app)
        .post('/api/install/isinstalled')
        .expect(404)
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
})

test('GET /api/install/install', done => {
    request(app)
        .post('/api/install/install')
        .expect(200)
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
})
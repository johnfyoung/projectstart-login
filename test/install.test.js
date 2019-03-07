import request from 'supertest';
import app from '../server';

describe('GET /api/install/isinstalled', () => {
    test('It should return a 404 when there is no install', done => {
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
    });
});

describe('POST /api/install/install', () => {
    test('It should return a 400 when there is no data submitted', done => {
        request(app)
            .post('/api/install/install')
            .expect(400, {
                appName: 'App name field is required',
                userFullName: 'Name field is required',
                userEmail: 'Email field is required',
                userPassword: 'Password field is required',
                userPassword2: 'Confirm password field is required'
            }, done);
    });

    test('It should return a 400 and a list of errors when bad data submitted', done => {
        request(app)
            .post('/api/install/install')
            .send({
                appName: "Cool app"
            })
            .expect(400, {
                userFullName: 'Name field is required',
                userEmail: 'Email field is required',
                userPassword: 'Password field is required',
                userPassword2: 'Confirm password field is required'
            }, done);
    });

    test('It should return a 200 and return a success object', done => {
        request(app)
            .post('/api/install/install')
            .send({
                appName: "My App",
                userFullName: "Jim Bond",
                userEmail: "jim@jim.com",
                userPassword: "123456",
                userPassword2: "123456"
            })
            .expect((res) => {
                if (res.status !== 200) throw new Error("Expected Status 200");
                console.log('type', typeof res.body);
                console.log('body keys', Object.keys(res.body));

                if (typeof res.body !== 'object' || !Object.keys(res.body).includes('user') || res.body.isInstalled !== true) throw new Error("Unexpected result");
            })
            .end(done);
    });

    test('It should return a 400 and return an object with isInstalled === true', done => {
        request(app)
            .post('/api/install/install')
            .send({
                appName: "My App",
                userFullName: "Jim Bond",
                userEmail: "jim@jim.com",
                userPassword: "123456",
                userPassword2: "123456"
            })
            .expect((res) => {
                if (res.status !== 400) throw new Error("Expected Status 400");
                if (typeof res.body !== 'object' || res.body.isInstalled !== true) throw new Error("Unexpected result");
            })
            .end(done);
    });

    test('It should return a 204 and return an object with isInstalled === false', done => {
        request(app)
            .delete('/api/install/install')
            .expect((res) => {
                if (res.status !== 204) throw new Error("Expected Status 204");
            })
            .end(done);
    });
})

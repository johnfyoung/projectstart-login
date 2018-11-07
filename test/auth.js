const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../dist/server.js');

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('POST api/auth/login', () => {
	it('no payload it should get a 400', (done) => {
		chai.request(server)
			.post('/api/auth/login')
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('it should get a 404, get error User not found ', (done) => {
		chai.request(server)
			.post('/api/auth/login')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({
				email: 'test@fred.com',
				password: '123456'
			})
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(404);
				expect(res).to.be.json;
				expect(res.body).to.have.property('email');
				expect(res.body).property('email').to.equal('User not found');
				done();
			});
	});

	it('it should get a 400, get error Email field is required ', (done) => {
		chai.request(server)
			.post('/api/auth/login')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({
				email: '',
				password: '123456'
			})
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(400);
				expect(res).to.be.json;
				expect(res.body).to.have.property('email');
				expect(res.body).property('email').to.equal('Email field is required');
				done();
			});
	});

	it('it should get a 400, get error Password field is required ', (done) => {
		chai.request(server)
			.post('/api/auth/login')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({
				email: 'test@test.com',
				password: ''
			})
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(400);
				expect(res).to.be.json;
				expect(res.body).to.have.property('password');
				expect(res.body).property('password').to.equal('Password field is required');
				done();
			});
	});

	it('it should get a 400, get error Email is invalid', (done) => {
		chai.request(server)
			.post('/api/auth/login')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({
				email: 'test@fred',
				password: '123456'
			})
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(400);
				expect(res).to.be.json;
				expect(res.body).to.have.property('email');
				expect(res.body).property('email').to.equal('Email is invalid');
				done();
			});
	});

	it('it should get a 400, get error Password incorrect', (done) => {
		chai.request(server)
			.post('/api/auth/login')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({
				email: 'john@codeandcreative.com',
				password: '12345'
			})
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(400);
				expect(res).to.be.json;
				expect(res.body).to.have.property('password');
				expect(res.body).property('password').to.equal('Password incorrect');
				done();
			});
	});


	it('it should get a 200, return a token', (done) => {
		chai.request(server)
			.post('/api/auth/login')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({
				email: 'john@codeandcreative.com',
				password: 'p&55Word'
			})
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.have.property('success');
				expect(res.body).property('success').to.equal(true);
				expect(res.body).to.have.property('token');
				done();
			});
	});
});
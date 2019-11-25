/* eslint-disable no-undef */
import chai from 'chai';
import http from 'chai-http';
import app from '../app';

chai.use(http);
chai.should();

const Karambizi = {
  id: 1199680121878040,
  firstName: 'Emanuel',
  lastName: 'Karambizi',
  email: 'karemano@gmail.com',
  phoneNumber: '0788654543',
  username: 'Emanuel23',
  password: 'magogo',
  passwordConfirmation: 'magogo',
};


const KarambiziSameId = {
  id: 1199680121878040,
  firstName: 'Joseph',
  lastName: 'Karambizi',
  email: 'karem@gmail.com',
  phoneNumber: '0782674543',
  username: 'Emanuel',
  password: 'password',
  passwordConfirmation: 'password',
};

const karambiziSameEmail = {
  id: 1199680121478030,
  firstName: 'JClaude',
  lastName: 'Minani',
  email: 'karemano@gmail.com',
  phoneNumber: '0788774543',
  username: 'MMinani',
  password: 'password123',
  passwordConfirmation: 'password123',
};

const KarambiziminaniSameIdEmail = {
  id: 1199680121878040,
  firstName: 'JClaude',
  lastName: 'Minani',
  email: 'karemano@gmail.com',
  phoneNumber: '0788654543',
  username: 'MMinani',
  password: 'Minani123',
  passwordConfirmation: 'Minani123',
};

const InvalidSignup = {
  id: 11996801578040,
  firstName: '',
  lastName: '',
  email: 'min     ani@gmail.com',
  phoneNumber: 'invalid phone',
  username: 'MMina$ni',
  password: 'Minani123',
  passwordConfirmation: 'Minani123',
};

const InvalidSignupPasswordConfirmation = {
  id: 11996801578040,
  firstName: '',
  lastName: '',
  email: 'min     ani@gmail.com',
  phoneNumber: 'invalid phone',
  username: 'MMina$ni',
  password: 'Minani321',
  passwordConfirmation: 'Minani123',
};

const KarambiziSignin = {
	email: "karemano@gmail.com",
	password: "magogo"
};

const InvalidSignin = {
	email: "karema no@gmail.com",
	password: ""
};

const KarambiziSigninWrongEmail = {
	email: "karemano09@gmail.com",
	password: "magogo"
};

const KarambiziSigninWrongPassword = {
	email: "karemano@gmail.com",
	password: "password"
};

describe('user authentication tests', () => {

  it('user should be able to signup', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send(Karambizi).end((err, result) => {
      result.should.have.status(201);
      result.body.should.have.property('message', 'User created successfully');
      result.body.should.have.property('data');
      done();
    });
  });

  it('should not allow user with already registered id to signup', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send(KarambiziSameId).end((err, result) => {
      result.should.have.status(409);
      result.body.should.have.property('error', 'account with the same id already exists');
      done();
    });
  });

  it('should not allow user with already registered email to signup', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send(karambiziSameEmail).end((err, result) => {
      result.should.have.status(409);
      result.body.should.have.property('error', 'account with the same email already exists');
      done();
    });
  });

  it('should not allow user with already registered email or id to signup', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send(KarambiziminaniSameIdEmail).end((err, result) => {
      result.should.have.status(409);
      result.body.should.have.property('error', 'account with the same id and email already exists');
      done();
    });
  });

  it('should not allow signup with invalid fields', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send(InvalidSignup).end((err, result) => {
      result.should.have.status(422);
      result.body.should.have.property('error');
      done();
    });
  });

  it('should not allow signup with incorrect password confirmation', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send(InvalidSignupPasswordConfirmation).end((err, result) => {
      result.should.have.status(422);
      result.body.should.have.property('error');
      done();
    });
  });

  it('should be able to access home route', (done) => {
    chai.request(app).get('/').send(InvalidSignupPasswordConfirmation).end((err, result) => {
      result.should.have.status(200);
      done();
    });
  });

  it('a user should be able to signin', (done) => {
    chai.request(app).post('/api/v1/auth/signin').send(KarambiziSignin).end((err, result) => {
      result.should.have.status(200);
      result.body.should.have.property('message', 'successfully logged in');
      result.body.should.have.property('data');
      done();
    });
  });

  it('should not allow signin with wrong inputs', (done) => {
    chai.request(app).post('/api/v1/auth/signin').send(InvalidSignin).end((err, result) => {
      result.should.have.status(422);
      result.body.should.have.property('error');
      done();
    });
  });

  it('signin with wrong email', (done) => {
    chai.request(app).post('/api/v1/auth/signin').send(KarambiziSigninWrongEmail).end((err, result) => {
      result.should.have.status(401);
      result.body.should.have.property('error', 'username or password incorrect');
      done();
    });
  });

  it('signin with wrong password', (done) => {
    chai.request(app).post('/api/v1/auth/signin').send(KarambiziSigninWrongPassword).end((err, result) => {
      result.should.have.status(401);
      result.body.should.have.property('error', 'username or password incorrect');
      done();
    });
  });

});

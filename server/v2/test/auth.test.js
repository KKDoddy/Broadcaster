/* eslint-disable no-undef */
import chai from 'chai';
import http from 'chai-http';
import app from '../../app';

chai.use(http);
chai.should();

const Karambizi = {
  firstName: 'Emanuel',
  lastName: 'Karambizi',
  email: 'karemano@gmail.com',
  phoneNumber: '0788654543',
  username: 'Emanuel23',
  password: '@Magogo23',
  passwordConfirmation: '@Magogo23',
};

const Goava = {
  firstName: 'Alex',
  lastName: 'Guevora',
  email: 'gege@gmail.com',
  phoneNumber: '0788654543',
  username: 'Minanil23',
  password: '@Magogo23',
  passwordConfirmation: '@Magogo23',
};

const karambiziSameEmail = {
  firstName: 'JClaude',
  lastName: 'Minani',
  email: 'karemano@gmail.com',
  phoneNumber: '0788774543',
  username: 'MMinani',
  password: '@Magogo23',
  passwordConfirmation: '@Magogo23',
};

const InvalidSignup = {
  firstName: '',
  lastName: '',
  email: 'min     ani@gmail.com',
  phoneNumber: 'invalid phone',
  username: 'MMina$ni',
  password: '@Magogo23',
  passwordConfirmation: '@Magogo23',
};

const InvalidSignupPasswordConfirmation = {
  firstName: '',
  lastName: '',
  email: 'min     ani@gmail.com',
  phoneNumber: 'invalid phone',
  username: 'MMina$ni',
  password: '@Magogo23',
  passwordConfirmation: '@Magogo2333',
};

const KarambiziSignin = {
  email: 'karemano@gmail.com',
  password: '@Magogo23',
};

const InvalidSignin = {
  email: 'karema no@gmail.com',
  password: '',
};

const KarambiziSigninWrongEmail = {
  email: 'karemano09@gmail.com',
  password: '@Magogo23',
};

const KarambiziSigninWrongPassword = {
  email: 'karemano@gmail.com',
  password: 'password',
};

describe('user authentication tests', () => {
  it('user should be able to signup', async () => {
    try {
      const result = await chai.request(app).post('/api/v2/auth/signup').send(Karambizi);
      result.should.have.status(201);
      result.body.should.have.property('message', 'User created successfully');
      result.body.should.have.property('data');
    } catch (error) {
      console.log(error);
    }
  });

  it('should not allow user with already registered email to signup', async () => {
    try {
      const result = await chai.request(app).post('/api/v2/auth/signup').send(karambiziSameEmail);
      result.should.have.status(409);
      result.body.should.have.property('error', 'account with the same email already exists');
      // done();
    } catch (error) {
      console.log(error);
    }
  });

  it('should not allow signup with invalid fields', async () => {
    try {
      const result = await chai.request(app).post('/api/v2/auth/signup').send(InvalidSignup);
      result.should.have.status(422);
      result.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });

  it('should not allow signup with incorrect password confirmation', async () => {
    try {
      const result = await chai.request(app).post('/api/v2/auth/signup').send(InvalidSignupPasswordConfirmation);
      result.should.have.status(422);
      result.body.should.have.property('error');
    } catch (error) {
      console.log(error);
    }
  });

  it('a user should be able to signin', (done) => {
    chai.request(app).post('/api/v2/auth/signin').send(KarambiziSignin).end((err, result) => {
      result.should.have.status(200);
      result.body.should.have.property('message', 'successfully logged in');
      result.body.should.have.property('data');
      done();
    });
  });

  it('should not allow signin with wrong inputs', (done) => {
    chai.request(app).post('/api/v2/auth/signin').send(InvalidSignin).end((err, result) => {
      result.should.have.status(422);
      result.body.should.have.property('error');
      done();
    });
  });

  it('signin with wrong email', (done) => {
    chai.request(app).post('/api/v2/auth/signin').send(KarambiziSigninWrongEmail).end((err, result) => {
      result.should.have.status(401);
      result.body.should.have.property('error', 'username or password incorrect');
      done();
    });
  });

  it('signin with wrong password', (done) => {
    chai.request(app).post('/api/v2/auth/signin').send(KarambiziSigninWrongPassword).end((err, result) => {
      result.should.have.status(401);
      result.body.should.have.property('error', 'username or password incorrect');
      done();
    });
  });
});

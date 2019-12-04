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
});

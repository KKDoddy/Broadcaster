import chai from 'chai';
import http from 'chai-http';
import app from '../app';

chai.use(http);
chai.should();

const KarambiziToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthcmVtYW5vQGdtYWlsLmNvbSIsImlhdCI6MTU3NDIwMjQ5MH0.XZTEDZjtGyz7QTEK1Qwb_mNkzkE6lqai9_LhkM1TP1o';
const minaniToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbmFuaUBnbWFpbC5jb20iLCJpYXQiOjE1NzQyMDI3OTZ9.zLVSFsUM06LgwsIvPoWvtlAPpEuUugXQ3iNYHsQdIlM';

const redFlag = {
  title: 'bribery',
  type: 'red-flag',
  comment: 'I saw a bribed police officer',
  location: '-20.025869,29.823188',
  status: 'Pending',
};

const redFlagInvalid = {
  title: '',
  type: '',
  comment: '',
  location: '-20000.025869,29.823188',
  status: '',
};

describe('running red-flag routes tests', () => {
  let ksId;
  it('creating a red flag', (done) => {
    chai
      .request(app)
      .post('/api/v1/red-flags')
      .set(redFlag)
      .attach('images', `${__dirname}/redPicture.jpg`)
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', KarambiziToken)
      .end((err, result) => {
        ksId = result.body.data[0].id;
        result.should.have.status(201);
        result.body.should.have.property('data');
        done();
      });
  });

  it('a user should be able to create a red-flag record with or without images', (done) => {
    chai
      .request(app)
      .post('/api/v1/red-flags')
      .set(redFlag)
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', KarambiziToken)
      .end((err, result) => {
        result.should.have.status(201);
        result.body.should.have.property('data');
        done();
      });
  });

  it('a user should be able to create a red-flag record with or without videos', (done) => {
    chai
      .request(app)
      .post('/api/v1/red-flags')
      .set(redFlag)
      .attach('images', `${__dirname}/redPicture.jpg`)
      .set('token', KarambiziToken)
      .end((err, result) => {
        result.should.have.status(201);
        result.body.should.have.property('data');
        done();
      });
  });

  it('should allow users to create records without media files', (done) => {
    chai
      .request(app)
      .post('/api/v1/red-flags')
      .set(redFlag)
      .set('token', KarambiziToken)
      .end((err, result) => {
        result.should.have.status(201);
        result.body.should.have.property('data');
        done();
      });
  });

  it('should create records and ignore invalid media files', (done) => {
    chai
      .request(app)
      .post('/api/v1/red-flags')
      .set(redFlag)
      .attach('images', `${__dirname}/hello.txt`)
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', KarambiziToken)
      .end((err, result) => {
        result.should.have.status(201);
        result.body.should.have.property('data');
        done();
      });
  });

  it('should not create a red flag with invalid fields', (done) => {
    chai
      .request(app)
      .post('/api/v1/red-flags')
      .set(redFlagInvalid)
      .attach('images', `${__dirname}/redPicture.jpg`)
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', KarambiziToken)
      .end((err, result) => {
        result.should.have.status(422);
        done();
      });
  });

  it("should get all red-flags owned", done => {
    chai.request(app).get("/api/v1/red-flags").send().set("token", KarambiziToken)
    .end((err, result)=>{
      result.should.have.status(200);
      result.body.should.have.property("data");
      done();
    });
  });

  it("should get a specific red-flag", done => {
    chai.request(app).get(`/api/v1/red-flags/${ksId}`).send().set("token", KarambiziToken)
    .end((err, result)=>{
      result.should.have.status(200);
      result.body.should.have.property("data");
      done();
    });
  });

  it('should not allow access with invalid token', (done) => {
    chai
      .request(app)
      .post('/api/v1/red-flags')
      .set(redFlag)
      .attach('images', `${__dirname}/redPicture.jpg`)
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', '12345')
      .end((err, result) => {
        result.should.have.status(403);
        done();
      });
  });

  it('should only allow access to registered users', (done) => {
    chai
      .request(app)
      .post('/api/v1/red-flags')
      .set(redFlag)
      .attach('images', `${__dirname}/redPicture.jpg`)
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', minaniToken)
      .end((err, result) => {
        result.should.have.status(401);
        done();
      });
  });
});

import chai from 'chai';
import http from 'chai-http';
import app from '../../app';

chai.use(http);
chai.should();

const KarambiziToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthcmVtYW5vQGdtYWlsLmNvbSIsImlhdCI6MTU3NDIwMjQ5MH0.XZTEDZjtGyz7QTEK1Qwb_mNkzkE6lqai9_LhkM1TP1o';
const minaniToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbmFuaUBnbWFpbC5jb20iLCJpYXQiOjE1NzQyMDI3OTZ9.zLVSFsUM06LgwsIvPoWvtlAPpEuUugXQ3iNYHsQdIlM';
const GoavaToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdlZ2VAZ21haWwuY29tIiwiaWF0IjoxNTc0OTE5NzI1fQ.WMdgGAa7QzUcw6Fp_s15GqkGWWF4X9BjPfjXSAcBwLc';


describe('running red-flag routes tests', () => {
  let ksId;
  it('creating a red flag', async () => {
    const result = await chai.request(app).post('/api/v2/red-flags')
      .field('title', 'title').field('type', 'redflag')
      .field('comment', 'comment')
      .field('location', '-20.025869,29.823188')
      .field('status', 'pending')
      .attach('images', `${__dirname}/redPicture.jpg`)
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', KarambiziToken);
      ksId = result.body.data[0].record.id;
    result.should.have.status(201);
    result.body.should.have.property('data');
  });

  it('a user should be able to create a red-flag record with or without images', async () => {
    const result = await chai
      .request(app)
      .post('/api/v2/red-flags')
      .field('title', 'title').field('type', 'redflag')
      .field('comment', 'comment')
      .field('location', '-20.025869,29.823188')
      .field('status', 'pending')
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', KarambiziToken);
    result.should.have.status(201);
    result.body.should.have.property('data');
  });

  it('a user should be able to create a red-flag record with or without videos', async () => {
    const result = await chai.request(app)
      .post('/api/v2/red-flags')
      .field('title', 'title')
      .field('type', 'redflag')
      .field('comment', 'comment')
      .field('location', '-20.025869,29.823188')
      .field('status', 'pending')
      .attach('images', `${__dirname}/redPicture.jpg`)
      .set('token', KarambiziToken);
    result.should.have.status(201);
    result.body.should.have.property('data');
  });

  it('should allow users to create records without media files', async () => {
    const result = await chai
      .request(app)
      .post('/api/v2/red-flags')
      .field('title', 'title')
      .field('type', 'redflag')
      .field('comment', 'comment')
      .field('location', '-20.025869,29.823188')
      .field('status', 'pending')
      .set('token', KarambiziToken);
    result.should.have.status(201);
    result.body.should.have.property('data');
  });

  it('should create records and ignore invalid media files', async () => {
    const result = await chai
      .request(app)
      .post('/api/v2/red-flags')
      .field('title', 'title')
      .field('type', 'redflag')
      .field('comment', 'comment')
      .field('location', '-20.025869,29.823188')
      .field('status', 'pending')
      .attach('images', `${__dirname}/hello.txt`)
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', KarambiziToken);
    result.should.have.status(201);
    result.body.should.have.property('data');
  });

  it('should not create a red flag with invalid fields', async () => {
    const result = await chai
      .request(app)
      .post('/api/v2/red-flags')
      .field('title', '')
      .field('type', '')
      .field('location','-20000.025869,29.823188')
      .field('status','')
      .attach('images', `${__dirname}/redPicture.jpg`)
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', KarambiziToken);
    result.should.have.status(422);
  });

  it('should get all red-flags owned', async () => {
    const result = await chai
      .request(app)
      .get('/api/v2/red-flags')
      .send()
      .set('token', KarambiziToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('should get a specific red-flag', async () => {
    const result = await chai
      .request(app)
      .get(`/api/v2/red-flags/${ksId}`)
      .send()
      .set('token', KarambiziToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('should not get a specific red-flag if it doesnt exist', async () => {
    const result = await chai
      .request(app)
      .get('/api/v2/red-flags/2435')
      .send()
      .set('token', KarambiziToken);
    result.should.have.status(404);
    result.body.should.have.property('error');
  });

  it('should be able to modify the comment of a specific red-flag', async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/red-flags/${ksId}/comment`)
      .send({ comment: 'modified comment' })
      .set('token', KarambiziToken);
    result.should.have.status(201);
    result.body.should.have.property('data');
  });

  it("shouldn't be able to modify the comment of a not owned red-flag", async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/red-flags/${ksId}/comment`)
      .send({ comment: 'modified comment' })
      .set('token', GoavaToken);
    result.should.have.status(401);
    result.body.should.have.property('error');
  });

  it('should not be able to modify the comment of a red-flag with an empty comment', async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/red-flags/${ksId}/comment`)
      .send({ comment: '' })
      .set('token', KarambiziToken);
    result.should.have.status(422);
    result.body.should.have.property('error');
  });

  it('should not be able to modify the comment of a non existing red-flag record', async () => {
    const result = await chai
      .request(app)
      .patch('/api/v2/red-flags/12345678/comment')
      .send({ comment: 'some comment' })
      .set('token', KarambiziToken);
    result.should.have.status(404);
    result.body.should.have.property('error');
  });

  it('should be able to modify the location of a specific red-flag', async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/red-flags/${ksId}/location`)
      .send({ location: '-30.025869,29.823188' })
      .set('token', KarambiziToken);
    result.should.have.status(201);
    result.body.should.have.property('data');
  });

  it("shouldn't be able to modify the location of a not owned red-flag", async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/red-flags/${ksId}/location`)
      .send({ location: '-30.025869,29.823188' })
      .set('token', GoavaToken);
    result.should.have.status(401);
    result.body.should.have.property('error');
  });

  it('should not be able to modify the location of a red-flag with a non valid location', async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/red-flags/${ksId}/location`)
      .send({ location: '' })
      .set('token', KarambiziToken);
    result.should.have.status(422);
    result.body.should.have.property('error');
  });

  it('should not be able to modify the location of a non existing red-flag record', async () => {
    const result = await chai
      .request(app)
      .patch('/api/v2/red-flags/12345678/location')
      .send({ location: '-30.025869,29.823188' })
      .set('token', KarambiziToken);
    result.should.have.status(404);
    result.body.should.have.property('error');
  });

  it('should not be able to delete a not_owned red-flag record', async () => {
    const result = await chai
      .request(app)
      .delete(`/api/v2/red-flags/${ksId}`)
      .send()
      .set('token', GoavaToken);
    result.should.have.status(401);
    result.body.should.have.property('error');
  });

  it('should be able to delete a red-flag record', async () => {
    const result = await chai
      .request(app)
      .delete(`/api/v2/red-flags/${ksId}`)
      .send()
      .set('token', KarambiziToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('cannot delete a non existing red-flag record', async () => {
    const result = await chai
      .request(app)
      .delete(`/api/v2/red-flags/${ksId}`)
      .send()
      .set('token', KarambiziToken);
    result.should.have.status(404);
    result.body.should.have.property('error');
  });

  it('should not allow access with invalid token', async () => {
    const result = await chai
      .request(app)
      .post('/api/v2/red-flags')
      .field('title', 'title')
      .field('type', 'redflag')
      .field('comment', 'comment')
      .field('location', '-20.025869,29.823188')
      .field('status', 'pending')
      .attach('images', `${__dirname}/redPicture.jpg`)
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', 'asdfasdf');
    result.should.have.status(403);
  });

  it('should only allow access to registered users', async () => {
    const result = await chai
      .request(app)
      .post('/api/v2/red-flags')
      .field('title', 'title')
      .field('type', 'redflag')
      .field('comment', 'comment')
      .field('location', '-20.025869,29.823188')
      .field('status', 'pending')
      .attach('images', `${__dirname}/redPicture.jpg`)
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', minaniToken);
    result.should.have.status(401);
  });
});

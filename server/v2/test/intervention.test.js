import chai from 'chai';
import http from 'chai-http';
import app from '../../app';

chai.use(http);
chai.should();

const KarambiziToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthcmVtYW5vQGdtYWlsLmNvbSIsImlhdCI6MTU3NDIwMjQ5MH0.XZTEDZjtGyz7QTEK1Qwb_mNkzkE6lqai9_LhkM1TP1o';
const minaniToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbmFuaUBnbWFpbC5jb20iLCJpYXQiOjE1NzQyMDI3OTZ9.zLVSFsUM06LgwsIvPoWvtlAPpEuUugXQ3iNYHsQdIlM';
const GoavaToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdlZ2VAZ21haWwuY29tIiwiaWF0IjoxNTc0OTE5NzI1fQ.WMdgGAa7QzUcw6Fp_s15GqkGWWF4X9BjPfjXSAcBwLc';
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtkZHlAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTc1NjAyNDMwfQ.EugjmWMLe0mxh1DpaJdG8cV-WuiK1f1Uv6eMjQE5sRg';

describe('running v2 Intervention routes tests', () => {
  let ksId;
  it('creating a intervention', async () => {
    const result = await chai.request(app).post('/api/v2/interventions')
      .field('title', 'robbery').field('type', 'intervention')
      .field('comment', 'some comments')
      .field('location', '-20.025869,29.823188')
      .field('status', 'pending')
      .attach('images', `${__dirname}/redPicture.jpg`)
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', KarambiziToken);
      ksId = result.body.data[0].record.id;
    result.should.have.status(201);
    result.body.should.have.property('data');
  });

  it('a user should be able to create an intervention record with or without images', async () => {
    const result = await chai
      .request(app)
      .post('/api/v2/interventions')
      .field('title', 'title').field('type', 'intervention')
      .field('comment', 'comment')
      .field('location', '-20.025869,29.823188')
      .field('status', 'pending')
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', KarambiziToken);
    result.should.have.status(201);
    result.body.should.have.property('data');
  });

  it('a user should be able to create an intervention record with or without videos', async () => {
    const result = await chai.request(app)
      .post('/api/v2/interventions')
      .field('title', 'title')
      .field('type', 'intervention')
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
      .post('/api/v2/interventions')
      .field('title', 'title')
      .field('type', 'intervention')
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
      .post('/api/v2/interventions')
      .field('title', 'title')
      .field('type', 'intervention')
      .field('comment', 'comment')
      .field('location', '-20.025869,29.823188')
      .field('status', 'pending')
      .attach('images', `${__dirname}/hello.txt`)
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', KarambiziToken);
    result.should.have.status(201);
    result.body.should.have.property('data');
  });

  it('should not create an intervention with invalid fields', async () => {
    const result = await chai
      .request(app)
      .post('/api/v2/interventions')
      .field('title', '')
      .field('type', '')
      .field('location','-20000.025869,29.823188')
      .field('status','')
      .attach('images', `${__dirname}/redPicture.jpg`)
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', KarambiziToken);
    result.should.have.status(422);
  });

  it('should get all interventions owned', async () => {
    const result = await chai
      .request(app)
      .get('/api/v2/interventions')
      .send()
      .set('token', KarambiziToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('should get a specific intervention', async () => {
    const result = await chai
      .request(app)
      .get(`/api/v2/interventions/${ksId}`)
      .send()
      .set('token', KarambiziToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('should not get a specific intervention if it doesnt exist', async () => {
    const result = await chai
      .request(app)
      .get('/api/v2/interventions/2435')
      .send()
      .set('token', KarambiziToken);
    result.should.have.status(404);
    result.body.should.have.property('error');
  });

  it('should be able to modify the comment of a specific intervention', async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/interventions/${ksId}/comment`)
      .send({ comment: 'modified comment' })
      .set('token', KarambiziToken);
    result.should.have.status(201);
    result.body.should.have.property('data');
  });

  it("shouldn't be able to modify the comment of a not owned intervention", async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/interventions/${ksId}/comment`)
      .send({ comment: 'modified comment' })
      .set('token', GoavaToken);
    result.should.have.status(401);
    result.body.should.have.property('error');
  });

  it('should not be able to modify the comment of a intervention with an empty comment', async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/interventions/${ksId}/comment`)
      .send({ comment: '' })
      .set('token', KarambiziToken);
    result.should.have.status(422);
    result.body.should.have.property('error');
  });

  it('should not be able to modify the comment of a non existing intervention record', async () => {
    const result = await chai
      .request(app)
      .patch('/api/v2/interventions/12345678/comment')
      .send({ comment: 'some comment' })
      .set('token', KarambiziToken);
    result.should.have.status(404);
    result.body.should.have.property('error');
  });

  it('should be able to modify the location of a specific intervention', async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/interventions/${ksId}/location`)
      .send({ location: '-30.025869,29.823188' })
      .set('token', KarambiziToken);
    result.should.have.status(201);
    result.body.should.have.property('data');
  });

  it("shouldn't be able to modify the location of a not owned intervention", async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/interventions/${ksId}/location`)
      .send({ location: '-30.025869,29.823188' })
      .set('token', GoavaToken);
    result.should.have.status(401);
    result.body.should.have.property('error');
  });

  it('should not be able to modify the location of an intervention with a non valid location', async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/interventions/${ksId}/location`)
      .send({ location: '' })
      .set('token', KarambiziToken);
    result.should.have.status(422);
    result.body.should.have.property('error');
  });

  it('should not be able to modify the location of a non existing intervention record', async () => {
    const result = await chai
      .request(app)
      .patch('/api/v2/interventions/12345678/location')
      .send({ location: '-30.025869,29.823188' })
      .set('token', KarambiziToken);
    result.should.have.status(404);
    result.body.should.have.property('error');
  });

  it('admin should be able to modify the status of an existing intervention record', async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/interventions/${ksId}/status`)
      .send({ status: 'resolved' })
      .set('token', adminToken);
    result.should.have.status(201);
    result.body.should.have.property('data');
  });

  it('admin should not be able to modify the status of a non existing intervention record', async () => {
    const result = await chai
      .request(app)
      .patch('/api/v2/interventions/1234/status')
      .send({ status: 'resolved' })
      .set('token', adminToken);
    result.should.have.status(404);
    result.body.should.have.property('error');
  });

  it('should not allow a not admin account holder to modify the status of a intervention record', async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/interventions/${ksId}/status`)
      .send({ status: 'resolved' })
      .set('token', KarambiziToken);
    result.should.have.status(401);
    result.body.should.have.property('error');
  });

  it('should not allow a not existing admin account holder to modify the status of a intervention record', async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/interventions/${ksId}/status`)
      .send({ status: 'resolved' })
      .set('token', minaniToken);
    result.should.have.status(401);
    result.body.should.have.property('error');
  });

  it('should not allow admin to modify the status of an intervention record with invalid status', async () => {
    const result = await chai
      .request(app)
      .patch(`/api/v2/interventions/${ksId}/status`)
      .send({ status: '' })
      .set('token', adminToken);
    result.should.have.status(422);
    result.body.should.have.property('error');
  });

  it('should not be able to delete a not_owned intervention record', async () => {
    const result = await chai
      .request(app)
      .delete(`/api/v2/interventions/${ksId}`)
      .send()
      .set('token', GoavaToken);
    result.should.have.status(401);
    result.body.should.have.property('error');
  });

  it('should be able to delete an intervention record', async () => {
    const result = await chai
      .request(app)
      .delete(`/api/v2/interventions/${ksId}`)
      .send()
      .set('token', KarambiziToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('cannot delete a non existing intervention record', async () => {
    const result = await chai
      .request(app)
      .delete(`/api/v2/interventions/${ksId}`)
      .send()
      .set('token', KarambiziToken);
    result.should.have.status(404);
    result.body.should.have.property('error');
  });

  it('should not allow access with invalid token', async () => {
    const result = await chai
      .request(app)
      .post('/api/v2/interventions')
      .field('title', 'title')
      .field('type', 'intervention')
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
      .post('/api/v2/interventions')
      .field('title', 'title')
      .field('type', 'intervention')
      .field('comment', 'comment')
      .field('location', '-20.025869,29.823188')
      .field('status', 'pending')
      .attach('images', `${__dirname}/redPicture.jpg`)
      .attach('videos', `${__dirname}/redVideo.mp4`)
      .set('token', minaniToken);
    result.should.have.status(401);
  });
});

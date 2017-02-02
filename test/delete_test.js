const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let yoyo;

  beforeEach((done) => {
    yoyo = new User({ name: 'Yoyo' });
    yoyo.save()
      .then(() => done());
  });

  it('model instance romove', (done) => {
    yoyo.remove()
      .then(() => User.findOne({ name: 'Yoyo' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', (done) => {
    // remove a branch of records with some given criteria
    User.remove({ name: 'Yoyo' })
      .then(() => User.findOne({ name: 'Yoyo' }))
      .then((user) => {
        assert(user === null);
        done();
    });
  });

  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Yoyo' })
      .then(() => User.findOne({ name: 'Yoyo' }))
      .then((user) => {
        assert(user === null);
        done();
    });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(yoyo._id)
      .then(() => User.findOne({ name: 'Yoyo' }))
      .then((user) => {
        assert(user === null);
        done();
    });
  });

});

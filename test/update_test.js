const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let yoyo;

  beforeEach((done) => {
    yoyo = new User({ name: 'Yoyo'});
    yoyo.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Qiqi');
        done();
      });

  }

  it('instance type using set & save', (done) => {
    // set just done in the memory, not to the database
    yoyo.set('name', 'Qiqi');
    assertName(yoyo.save(), done);
  });

  it('A model instance can update', (done) => {
    assertName(yoyo.update({ name: 'Qiqi'}), done);
  });

  it('A model class can update', (done) => {
    assertName(
      User.update({ name: 'Yoyo' }, { name: 'Qiqi' }),
      done
    );
  });

  it('A model calss can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Yoyo' }, { name: 'Qiqi' }),
      done
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(yoyo._id, { name: 'Qiqi' }),
      done
    );
  });

});
// function maybeUpdateName(user) {
//
// }
//
// function maybeUpdateEmail(user) {
//
// }
//
// maybeUpdateName(user);
// maybeUpdateEmail(user);
// user.save();
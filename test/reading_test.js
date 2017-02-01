const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let yoyo;

  beforeEach((done) => {
    yoyo = new User({ name: 'Yoyo' });
    yoyo.save()
      .then(() => done());
  });

  it('Finds all users with a name of yoyo', (done) => {
    User.find({ name: 'Yoyo' })
      .then((users) => {
        console.log(users[0]._id);
        console.log(yoyo._id);
        //plus toString because the _id is an object in the mongodb database
        assert(users[0]._id.toString() === yoyo._id.toString());
        done();
      });
  });

  it('Find a user with a particular id', (done) => {
    User.findOne({ _id: yoyo._id })
      .then((user) => {
        assert(user.name === 'Yoyo');
        done();
      });
  });

});

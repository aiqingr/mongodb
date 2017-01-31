const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let yoyo;

  beforeEach((done) => {
    yoyo = new User({name: 'Yoyo'});
    yoyo.save()
      .then(() => done());
  });

  it('Finds all users with a name of yoyo', (done) => {
    User.find({ name: 'Yoyo' })
      .then((users) => {
        console.log(users);
        done();
      });
  });

});

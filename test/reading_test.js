const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let yoyo, qiqi, tian, chen;

  beforeEach((done) => {
    qiqi = new User({ name: 'Qiqi' });
    tian = new User({ name: 'Tian' });
    yoyo = new User({ name: 'Yoyo' });
    chen = new User({ name: 'Chen' });

    Promise.all([chen.save(), tian.save(), yoyo.save(), qiqi.save()])
      .then(() => done());
  });

  it('Finds all users with a name of yoyo', (done) => {
    User.find({ name: 'Yoyo' })
      .then((users) => {
        //console.log(users[0]._id);
        //console.log(yoyo._id);
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

  it('can skip and limit the result set', (done) => {
    User.find({})
    //sort({name: 1}) means A-Z
    //sort({name: -1}) means Z-A
      .sort({ name: -1 })
      .skip(1).limit(2)
      .then((users) => {
      console.log(users);
      assert(users.length === 2);
      assert(users[1].name === 'Qiqi');
      assert(users[0].name === 'Tian');
      done();
    });
  });

});

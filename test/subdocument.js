const assert = require('assert');
const User = require('../src/user');

describe('Subdocument', () => {
  it('can create a subdocument', (done) => {
    const yoyo = new User({
      name: 'Yoyo',
      posts: [{ title: 'PostTitle'} ]
    });

    yoyo.save()
      .then(() => User.findOne({ name: 'Yoyo' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  it('Can add subdocuments to an existing record', (done) => {
    const yoyo = new User({
      name: 'Yoyo',
      posts: []
    });

    yoyo.save()
      .then(() => User.findOne({ name: 'Yoyo' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Yoyo'}))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

});

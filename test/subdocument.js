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
      })
  });
});

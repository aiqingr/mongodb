const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
  it('postCourt returns number of posts', (done) => {
    const yoyo = new User({
      name: 'Yoyo',
      posts: [{ title: 'PostTitle' }]
    });

    yoyo.save()
      .then(() => User.findOne({ name: 'Yoyo' }))
      .then((user) => {
        assert(yoyo.postCount === 1);
        done();
      });
  });
});

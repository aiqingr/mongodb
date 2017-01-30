const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', () => {
    const yoyo = new User({name: 'Yoyo'});

    yoyo.save();
  });
});

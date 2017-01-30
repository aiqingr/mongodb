const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', (done) => {
    const yoyo = new User({name: 'Yoyo'});

    yoyo.save()
      .then(() => {
        //Has yoyo been saved successfully?
        assert(!yoyo.isNew);
        done();
      });
  });
});

const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('require a user\'s name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required.');
  });

  it('requires a user\'s name longer than 2 characters', () => {
    const user = new User({ name: 'Yo' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer than 2 characters.');
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Yo' });
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters.');
        done();
      });
  });

});

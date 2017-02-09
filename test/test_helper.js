const mongoose = require('mongoose');
// global.Promise is reference to ES6 Promise inside the nodejs environment
mongoose.Promise = global.Promise;
//mongodb can consist of multiple databases.
before((done) => {
  mongoose.connect('mongodb://localhost/user_test');
  mongoose.connection
    .once('open', () => { done();})
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

beforeEach((done) => {
  const {users, comments, blogposts} = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});

//tear down the database

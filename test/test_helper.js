const mongoose = require('mongoose');
//mongodb can consist of multiple databases.
mongoose.connect('mongodb://localhost/user_test');
mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });

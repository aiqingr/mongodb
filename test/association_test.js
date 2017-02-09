const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('associations', () => {
  let yoyo, blogPost, comment;
  beforeEach((done) => {
    yoyo = new User({ name: 'Yoyo' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    comment = new Comment({ content: 'Congrats on great post' });
    //mongoose can automatically push just ObjectId of blogPost instead of the whole blogPost because of the Schema
    //so does comment
    yoyo.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = yoyo;

    // yoyo.save();
    // blogPost.save();
    // comment.save();
    //we can use ES6 Promise.all([]);
    Promise.all([yoyo.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it.only('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Yoyo' })
      .then((user) => {
        console.log(user);
        done();
      });
  });
});

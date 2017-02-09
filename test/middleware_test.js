const mongoose = require('mongoose');
const assert = require('assert');
const User =require('../src/user');
const BlogPost = require('../src/blogPost');

describe('middleware', () => {
  let yoyo, blogPost;
  beforeEach((done) => {
    yoyo = new User({ name: 'Yoyo' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    //mongoose can automatically push just ObjectId of blogPost instead of the whole blogPost because of the Schema
    //so does comment
    yoyo.blogPosts.push(blogPost);
    // yoyo.save();
    // blogPost.save();
    //we can use ES6 Promise.all([]);
    Promise.all([yoyo.save(), blogPost.save()])
      .then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    yoyo.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});

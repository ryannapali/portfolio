import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Blogposts = new Mongo.Collection('blogposts');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('blogposts', function blogpostsPublication() {
    return Blogposts.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'blogposts.insert'(text,title) {
    check(text, String);
    check(title,String);
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Blogposts.insert({
      text,
      title,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'blogposts.remove'(blogpostId) {
    check(blogpostId, String);

    const blogpost = Blogposts.findOne(blogpostId);
    if (blogpost.private && blogpost.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Blogposts.remove(blogpostId);
  },
  'blogposts.setChecked'(blogpostId, setChecked) {
    check(blogpostId, String);
    check(setChecked, Boolean);

    const blogpost = Blogposts.findOne(blogpostId);
    if (blogpost.private && blogpost.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Blogposts.update(blogpostId, { $set: { checked: setChecked } });
  },
  'blogposts.setPrivate'(blogpostId, setToPrivate) {
    check(blogpostId, String);
    check(setToPrivate, Boolean);

    const blogpost = Blogposts.findOne(blogpostId);

    // Make sure only the task owner can make a task private
    if (blogpost.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Blogposts.update(blogpostId, { $set: { private: setToPrivate } });
  },
});

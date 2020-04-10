import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Blogposts } from '../api/blogposts.js';

// Blogpost component - represents a single todo item
export default class Blogpost extends Component {
  deleteThisTask() {
    Meteor.call('blogposts.remove', this.props.blogpost._id);
  }

  togglePrivate() {
    Meteor.call('blogposts.setPrivate', this.props.blogpost._id, ! this.props.blogpost.private);
  }

  render() {
    // so that we can style them nicely in CSS
    const blogpostClassName = classnames({
      private: this.props.blogpost.private,
    });

    return (
      <li className={blogpostClassName}>
        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.blogpost.private ? 'Private' : 'Public' }
          </button>
        ) : ''}

          {this.props.showPrivateButton ? (
              <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                  &times;
              </button>
          ) : ''}
          <h1 className="title"><strong>{this.props.blogpost.title}</strong></h1>
        <span className="text">
            <strong>{this.props.blogpost.createdAt.toDateString()}</strong>{this.props.blogpost.text}
          {/*<strong>{this.props.blogpost.username}</strong>: {this.props.blogpost.text}*/}
        </span>
      </li>
    );
  }
}

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Blogposts } from '../api/blogposts.js';

// Blogpost component - represents a single todo item
export default class Blogpost extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('blogposts.setChecked', this.props.blogpost._id, !this.props.blogpost.checked);
  }

  deleteThisTask() {
    Meteor.call('blogposts.remove', this.props.blogpost._id);
  }

  togglePrivate() {
    Meteor.call('blogposts.setPrivate', this.props.blogpost._id, ! this.props.blogpost.private);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const blogpostClassName = classnames({
      checked: this.props.blogpost.checked,
      private: this.props.blogpost.private,
    });

    return (
      <li className={blogpostClassName}>
          {this.props.blogpost.private ? (
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>
              ) : ''}
        <input
          type="checkbox"
          readOnly
          checked={!!this.props.blogpost.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.blogpost.private ? 'Private' : 'Public' }
          </button>
        ) : ''}

        <span className="text">
            <strong>{this.props.blogpost.title}</strong>{this.props.blogpost.text}
          {/*<strong>{this.props.blogpost.username}</strong>: {this.props.blogpost.text}*/}
        </span>
      </li>
    );
  }
}

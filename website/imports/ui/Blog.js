import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import SunEditor, {buttonList} from "suneditor-react";
import ReactDOM from "react-dom";
import {Meteor} from "meteor/meteor";
import Editor from "./Editor";
import {Blogposts} from "../api/blogposts";
import Blogpost from "./Blogpost";

class Blog extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            hideCompleted: false,
            contentToUpload: '',
        };
    }

    renderTasks() {
        let filteredTasks = this.props.blogposts;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(blogpost => !blogpost.checked);
        }
        return filteredTasks.map((blogpost) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            const showPrivateButton = blogpost.owner === currentUserId;

            return (
                <Blogpost
                    key={blogpost._id}
                    blogpost={blogpost}
                    showPrivateButton={showPrivateButton}
                />
            );
        });
    }

    handleSubmit(title,text) {
        console.log(text)
        Meteor.call('blogposts.insert',text,title);
        //
        // ReactDOM.findDOMNode(this.refs.titleInput).value = '';
}

    render() {
        return(
            <div className="container">
                <header>
                    <h1> Welcome to the Blog Page</h1>
                    { (this.props.currentUser) ?
                        <Editor submit={(title,text)=>this.handleSubmit(title,text)}/>
                        : '' }
                </header>

                <ul>
                    {this.renderTasks()}
                    This is a test of render tasks
                </ul>
            </div>
        )
    }

}

export default withTracker(()=>{
    Meteor.subscribe('blogposts');
    return {
        blogposts: Blogposts.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Blogposts.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
})(Blog);

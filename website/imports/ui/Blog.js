import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import SunEditor, {buttonList} from "suneditor-react";
import ReactDOM from "react-dom";
import {Meteor} from "meteor/meteor";
import Editor from "./Editor";
import {Blogposts} from "../api/blogposts";
import Blogpost from "./Blogpost";
import {Card, Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";

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
        Meteor.call('blogposts.insert',text,title);
}

    render() {
        return(
            <Container className="frame">
                <header>
                    <Editor submit={(title,text)=>this.handleSubmit(title,text)}/>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </Container>
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

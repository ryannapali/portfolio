import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import SunEditor, {buttonList} from "suneditor-react";
import ReactDOM from "react-dom";
import {Meteor} from "meteor/meteor";

import {Blogposts} from "../api/blogposts";
import Blogpost from "./Blogpost";

class Blog extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            hideCompleted: false,
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

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();

        Meteor.call('blogposts.insert',text,title);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    handleWrongSubmit(event){
        event.preventDefault();
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    handleChange(contents){
        console.log(contents);
    }

    render() {
        return(
            <div className="container">
                <header>
                    <h1>Blogposts ({this.props.incompleteCount})</h1>
                    <h1>Testing</h1>
                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.props.hideCompleted}
                            onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>

                    { (this.props.currentUser) ?
                        <div>
                            {/*<form className="new-blogpost" onSubmit={this.handleWrongSubmit}>*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        ref="titleInput"*/}
                            {/*        placeholder="Please Enter Your Title"*/}
                            {/*    />*/}
                            {/*</form>*/}
                            {/*<form className="new-blogpost" onSubmit={this.handleWrongSubmit}>*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        ref="textInput"*/}
                            {/*        placeholder="Body of the Blog Post"*/}
                            {/*    />*/}
                            {/*</form>*/}
                            {/*<button className="toggle-private" onClick={this.handleSubmit.bind(this)}>*/}
                            {/*    Submit*/}
                            {/*</button>*/}
                            <SunEditor onChange={(contents)=>this.handleChange(contents)}/>
                        </div> : ''
                    }
                </header>
                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        )
    }

}

export default withTracker(() => {
    Meteor.subscribe('blogposts');

    return {
        blogposts: Blogposts.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Blogposts.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
})(Blog);

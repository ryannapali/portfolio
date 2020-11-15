import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import SunEditor, {buttonList} from "suneditor-react";
import ReactDOM from "react-dom";
import {Meteor} from "meteor/meteor";
import Editor from "./Editor";
import {PotteryPieces} from "../api/potteryPieces";
import PotteryPiece from "./PotteryPiece";
import {Card, Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class Pottery extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            hideCompleted: false,
            contentToUpload: '',
        };
    }

    renderTasks() {
        let filteredTasks = this.props.potteryPieces;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(potteryPiece => !potteryPiece.checked);
        }
        return filteredTasks.map((potteryPiece) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            const showPrivateButton = potteryPiece.owner === currentUserId;
            return (
                <PotteryPiece
                    key={potteryPiece._id}
                    potteryPiece={potteryPiece}
                    showPrivateButton={showPrivateButton}
                />
            );
        });
    }

    handleSubmit(title,text) {
        alert("submitting");
        Meteor.call('potteryPieces.insert',text,title);
    }

    render() {
        return(
            <Container className="frame">
                <header>
                    {this.props.currentUser?
                    <Editor submit={(title,text)=>this.handleSubmit(title,text)}/>
                    : ""}
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </Container>
        )
    }

}

export default withTracker(()=>{
    Meteor.subscribe('potteryPieces');
    return {
        potteryPieces: PotteryPieces.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: PotteryPieces.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
})(Pottery);

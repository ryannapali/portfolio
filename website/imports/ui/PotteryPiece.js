import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { PotteryPieces } from '../api/potteryPieces.js';
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

// PotteryPiece component - represents a single todo item
export default class PotteryPiece extends Component {
    deleteThisTask() {
        Meteor.call('potteryPieces.remove', this.props.potteryPiece._id);
    }

    togglePrivate() {
        Meteor.call('potteryPieces.setPrivate', this.props.potteryPiece._id, ! this.props.potteryPiece.private);
    }

    render() {
        // so that we can style them nicely in CSS
        const potteryPieceClassName = classnames({
            private: this.props.potteryPiece.private,
        });

        return (
            <Container>

                <Card>
                    <Card.Header>{this.props.potteryPiece.title}</Card.Header>
                    <Card.Body>
                        <Card.Text dangerouslySetInnerHTML={{__html:this.props.potteryPiece.text}} />
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
                {/*        <li className={potteryPieceClassName}>*/}
                {/*            { this.props.showPrivateButton ? (*/}
                {/*                <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>*/}
                {/*                    { this.props.potteryPiece.private ? 'Private' : 'Public' }*/}
                {/*                </button>*/}
                {/*            ) : ''}*/}

                {/*            {this.props.showPrivateButton ? (*/}
                {/*                <button className="delete" onClick={this.deleteThisTask.bind(this)}>*/}
                {/*                    &times;*/}
                {/*                </button>*/}
                {/*            ) : ''}*/}
                {/*            <h1 className="title"><strong>{this.props.potteryPiece.title}</strong></h1>*/}
                {/*            <span className="text">*/}
                {/*    <strong>{this.props.potteryPiece.createdAt.toDateString()}</strong>*/}
                {/*    <div dangerouslySetInnerHTML={{__html:this.props.potteryPiece.text}}/>*/}
                {/*                /!*<strong>{this.props.potteryPiece.username}</strong>: {this.props.potteryPiece.text}*!/*/}
                {/*</span>*/}
                {/*        </li>*/}
            </Container>
        );
    }
}

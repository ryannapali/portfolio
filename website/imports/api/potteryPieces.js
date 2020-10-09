import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const PotteryPieces = new Mongo.Collection('potterPieces');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('potterPieces', function potterPiecesPublication() {
        return PotteryPieces.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({
    'potterPieces.insert'(text,title) {
        check(text, String);
        check(title,String);
        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        PotteryPieces.insert({
            text,
            title,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'potterPieces.remove'(potteryPieceId) {
        check(potteryPieceId, String);

        const potteryPiece = PotteryPieces.findOne(potteryPieceId);
        if (potteryPiece.private && potteryPiece.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        PotteryPieces.remove(potteryPieceId);
    },
    'potterPieces.setChecked'(potteryPieceId, setChecked) {
        check(potteryPieceId, String);
        check(setChecked, Boolean);

        const potteryPiece = PotteryPieces.findOne(potteryPieceId);
        if (potteryPiece.private && potteryPiece.owner !== this.userId) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }

        PotteryPieces.update(potteryPieceId, { $set: { checked: setChecked } });
    },
    'potterPieces.setPrivate'(potteryPieceId, setToPrivate) {
        check(potteryPieceId, String);
        check(setToPrivate, Boolean);

        const potteryPiece = PotteryPieces.findOne(potteryPieceId);

        // Make sure only the task owner can make a task private
        if (potteryPiece.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        PotteryPieces.update(potteryPieceId, { $set: { private: setToPrivate } });
    },
});

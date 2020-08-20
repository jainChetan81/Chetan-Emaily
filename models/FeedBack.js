const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//TODO: create a model for feedback form which takes questions and return answers
let feedbackSchema = new Schema({
    question1: {
        type: String,
        required: true,
    },
    question2: {
        type: String,
        required: false,
        answer: {
            type: Boolean,
            default: null,
        },
    },
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    dateSent: Date,
    lastResponded: Date,
});

module.exports = mongoose.model("Feedback", feedbackSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;
//TODO: create a model for feedback form which takes questions and return answers
const feedbackSchema = new Schema({
    question1: {
        type: String,
        required: true,
        answer: {
            type: Boolean,
            default: null,
        },
    },
    question2: {
        type: String,
        required: false,
        answer: {
            type: Boolean,
            default: null,
        },
    },
    question3: {
        type: String,
        required: false,
        answer: {
            type: Boolean,
            default: null,
        },
    },
    question4: {
        type: String,
        required: false,
        answer: {
            type: Boolean,
            default: null,
        },
    },
    question5: {
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

mongoose.model("Feedback", feedbackSchema);

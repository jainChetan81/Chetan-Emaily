const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuestionSchema = require("./Questions");
let feedbackSchema = new Schema({
    question1: {
        type: String,
        required: true,
        answer: {
            type: String,
            default: null,
        },
    },
    Questions: [QuestionSchema],
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    dateSent: Date,
    lastResponded: Date,
});

module.exports = mongoose.model("Feedback", feedbackSchema);

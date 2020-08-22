const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuestionSchema = require("./Questions");
let feedbackSchema = new Schema({
    question1: {
        question: { type: String, required: true },
        Yes: { type: Number, default: 0 },
        No: { type: Number, default: 0 },
    },
    Questions: [QuestionSchema],
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    _survey: { type: Schema.Types.ObjectId, ref: "Survey" },
    dateSent: { type: Date, default: Date.now() },
    lastResponded: Date,
});

module.exports = mongoose.model("Feedback", feedbackSchema);

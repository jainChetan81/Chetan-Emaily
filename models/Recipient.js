const mongoose = require("mongoose");
const { Schema } = mongoose;
const AnswerSchema = require("./AnswerSchema");

const RecipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false },
    answer1: {
        required: false,
        question: { type: String, required: true },
        answer: { type: Boolean, default: null },
    },
    Answers: [AnswerSchema],
});

module.exports = RecipientSchema;

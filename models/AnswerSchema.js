
const mongoose = require("mongoose");
const { Schema } = mongoose;

const AnswerSchema = new Schema({
    question: String,
    answer: { type: Boolean, default: null },
});

module.exports = AnswerSchema;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    question: String,
    answer: {
        type: String,
        default: null,
    },
});

module.exports = QuestionSchema;

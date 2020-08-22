const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    question: String,
    Yes: { type: Number, default: 0 },
    No: { type: Number, default: 0 },
});

module.exports = QuestionSchema;

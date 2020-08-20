const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    link: { type: String },
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    dateSent: Date,
    lastResponded: Date,
});

mongoose.model("Survey", surveySchema);

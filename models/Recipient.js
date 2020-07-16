const mongoose = require("mongoose"),
    { Schema } = mongoose,
    RecipientSchema = new Schema({
        email: String,
        responded: { type: Boolean, default: "False" },
    });
module.exports = RecipientSchema;

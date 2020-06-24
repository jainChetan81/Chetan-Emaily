const mongoose = require("mongoose"),
    { Schema } = mongoose, /// or Schema = mongoose.Schema
    UserSchema = new Schema({
        googleId: String,
        name: String,
        credits: { type: Number, default: 0 },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    });
mongoose.model("User", UserSchema);

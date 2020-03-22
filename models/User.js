const mongoose = require("mongoose"),
    { Schema } = mongoose, /// or Schema = mongoose.Schema
    UserSchema = new Schema({
        googleId: String,
        name: String,
        createdAt: {
            type: Date,
            default: Date.now()
        }
    });
mongoose.model("User", UserSchema);

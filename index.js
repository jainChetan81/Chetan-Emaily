const express = require("express"),
    passport = require("passport"),
    googleStrategy = require("passport-google-oauth20").Strategy,
    PORT = process.env.PORT || 5000,
    app = express();
app.get("/", (req, res) => {
    res.send({ hi: "there" });
});

passport.use(new googleStrategy());
app.listen(PORT, () => {
    console.log("app is listening on port 5000");
});


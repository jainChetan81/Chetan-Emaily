const express = require("express"),
    PORT = process.env.PORT || 5000,
    cookieSession = require("cookie-session"),
    passport = require("passport"),
    mongoose = require("mongoose"),
    keys = require("./config/keys"),
    app = express(),
    authRoutes = require("./routes/authRoutes"),
    billingRoutes = require("./routes/billingRoutes"),
    bodyParser = require("body-parser");
require("./models/User");
require("./services/passport");
mongoose.connect(keys.mongoURI);
app.use(bodyParser.json());
app.use(
    cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.cookie] })
);
app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);
billingRoutes(app); //or  authRouts = require("./routes/authRoutes")(app)
app.listen(PORT, () => {
    console.log("app is listening on port 5000");
});

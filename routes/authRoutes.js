const passport = require("passport");
module.exports = (app) => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"],
        })
    );
    app.get(
        "/auth/google/callback",
        passport.authenticate("google", {
            failureRedirect: "/auth/google",
        }),
        (req, res) => {
            if (process.env.NODE_ENV === "production")
                res.redirect("http://chetan-emaily.herokuapp.com/surveys");
            res.redirect("http://localhost:3000/surveys");
        }
    );
    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });
    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
};

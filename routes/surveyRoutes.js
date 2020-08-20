const mongoose = require("mongoose"),
    requireLogin = require("../middlewares/requireLogin"),
    requireCredits = require("../middlewares/requireCredits"),
    Mailer = require("../services/Mailer"),
    surveyTemplate = require("../routes/emailTemplates/surveyTemplate");
//Load all your models
require("../models/Survey");

//Now, this call won't fail because Survey has been added as a schema.
const Survey = mongoose.model("Survey");

module.exports = (app) => {
    app.post("/api/surveys/thanx", (req, res) => {
        res.send("Thanks for Voting");
    });
    app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        const r = recipients
            .split(",")
            .map((email) => ({ email: email.trim() }));
        console.log("r is : ", r);

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: r,
            _user: req.user.id,
            dateSent: Date.now(),
        });
        console.log("suvey in surverRoutes : ", survey);

        // Great place to send an email!
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};

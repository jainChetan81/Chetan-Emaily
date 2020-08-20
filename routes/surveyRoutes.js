const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose"),
    requireLogin = require("../middlewares/requireLogin"),
    requireCredits = require("../middlewares/requireCredits"),
    Mailer = require("../services/Mailer"),
    surveyTemplate = require("../routes/emailTemplates/surveyTemplate");
//Load all your models
const FeedBack = require("../models/FeedBack");
require("../models/Survey");

//Now, this call won't fail because Survey has been added as a schema.
const Survey = mongoose.model("Survey");
// const FeedBack = mongoose.model("feedBack");

module.exports = (app) => {
    app.get("/api/surveys", requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id }).select({
            recipients: false,
        });
        res.send(surveys);
    });

    app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients
                .split(",")
                .map((email) => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now(),
        });
        const feedback = new FeedBack();
        feedback.question1 = "Is Your Name Chetan? ";
        console.log("survey is : ", survey);
        // Great place to send an email!
        const mailer = new Mailer(survey, surveyTemplate(survey, feedback));
        //TODO: filter out recipient's email/id and send it to surveyTemplates
        try {
            await mailer.send();
            // await survey.save();
            await feedback.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};

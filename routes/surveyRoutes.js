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
        const { questions, surveys } = req.body;
        const { title, subject, body, recipients } = surveys;
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
        feedback._user = req.user.id;
        feedback._survey = survey._id;
        for (i in questions) {
            //? saving questions in feedback form and recipient part of survey form
            if (i === "question1") {
                feedback.question1.question = questions.question1;
                survey.recipients.map((j) => {
                    j.answer1.question = questions.question1;
                });
            } else {
                feedback.Questions.push({ question: questions[i] });
                survey.recipients.map((j) => {
                    j.Answers.push({ question: questions[i] });
                });
            }
        }
        // console.log("feedback is :", feedback);
        // console.log("survey is :", survey.recipients[0]);
        const mailer = new Mailer(survey, surveyTemplate(survey, feedback));
        //TODO: filter out recipient's email/id and send it to surveyTemplates
        try {
            await mailer.send();
            await survey.save();
            await feedback.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};

const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose"),
    requireLogin = require("../middlewares/requireLogin"),
    requireCredits = require("../middlewares/requireCredits"),
    Mailer = require("../services/Mailer"),
    surveyTemplate = require("../routes/emailTemplates/surveyTemplate");
//Load all your models
require("../models/FeedBack");
require("../models/Survey");

//Now, this call won't fail because Survey has been added as a schema.
const Survey = mongoose.model("Survey");
// const FeedBack = mongoose.model("FeedBack");

module.exports = (app) => {
    app.get("/api/surveys", requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id }).select({
            recipients: false,
        });
        res.send(surveys);
    });

    app.get("/api/feedback/:surveyId/:mail", (req, res) => {
        res.send("Your FeedBack Form will be available!");
        const myUrl = process.argv[2];
        console.log("url is : ", myUrl, process.argv);
        if (myUrl) {
            const { surveyId, choice } = new URL(myUrl);
            console.log("feedback for page:", surveyId, choice);
        }
    });

    app.post("/api/surveys/webhooks", (req, res) => {
        const p = new Path("/api/surveys/:surveyId/:choice");

        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return {
                        email,
                        surveyId: match.surveyId,
                        choice: match.choice,
                    };
                }
            })
            .compact()
            .uniqBy("email", "surveyId")
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne(
                    {
                        _id: surveyId,
                        recipients: {
                            $elemMatch: { email: email, responded: false },
                        },
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: { "recipients.$.responded": true },
                        lastResponded: new Date(),
                    }
                ).exec();
            })
            .value();

        res.send({});
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
        // Great place to send an email!
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            // await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};

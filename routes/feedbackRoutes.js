const mongoose = require("mongoose");
require("../models/Survey");
//Now, this call won't fail because Survey has been added as a schema.
const Survey = mongoose.model("Survey");
const FeedBack = require("../models/FeedBack");
// const FeedBack = mongoose.model("feedBack");
module.exports = (app) => {
    app.post("/api/feedbackForm", async (req, res) => {
        //no parantheses so that function is only called internal not everytime we load
        const { feedback_id } = req.body;
        FeedBack.find(
            {
                _id: feedback_id,
            },
            (err, feedbackForm) => {
                if (feedbackForm) {
                    res.send(feedbackForm);
                }
                if (err) {
                    console.log("error in feedbackRoute iS :", err);
                    res.redirect("/");
                }
            }
        );
    });
    app.post("/api/feedback", async (req, res) => {
        //no parantheses so that function is only called internal not everytime we load
        const { feedback, surveyId, feedBackId } = req.body;
        Survey.findById(surveyId)
            .then((survey) => {
                if (survey) {
                    survey.recipients.find((ele) => {
                        if (ele.email === feedback.email) {
                            ele.responded = true;
                        }
                    });
                    survey
                        .save()
                        .then(() => {
                            console.log("Survey is Changed");
                        })
                        .catch((err) =>
                            res.status(400).send({
                                error: err,
                                message: "error with saving Your Data",
                            })
                        );
                }
            })
            .catch((err) =>
                res.status(400).send({
                    error: err,
                    message: "Please use Vaild Email",
                })
            );
        FeedBack.findById(feedBackId)
            .then((fdbk) => {
                if (fdbk) {
                    const { email, group, group0, group1 } = feedback;
                    //email:'dangerxkills@gmail.com',
                    //   group: 'No',
                    //   group0: 'No',
                    //   group1: 'Yes'
                    fdbk.question1[group]++;
                    console.log("lets see :", fdbk.question1[group]);
                    let answers = [];
                    for (let i in feedback) {
                        if (i === "email" || i === "group") {
                            console.log(i === "email", i, "email");
                        } else {
                            answers.push(feedback[i]);
                        }
                    }
                    console.log("answers : ", answers);
                    fdbk.Questions.forEach((ele, index) => {
                        const i = index;
                        ele[answers[i]]++;
                    });
                    console.log("feedback fdbk : ", fdbk);
                    fdbk.save()
                        .then(() => {
                            console.log("FeedBack is Added");
                            res.status(201).send({
                                message: "FeedBack Added",
                            });
                        })
                        .catch((err) =>
                            res.status(400).send({
                                error: err,
                                message: "error with saving Your Response",
                            })
                        );
                }
            })
            .catch((err) =>
                res.status(400).send({
                    error: err,
                    message:
                        "Server Error, Please Click on Link Provided in You Mail again",
                })
            );
    });
};

//TODO: search through User using userId and return

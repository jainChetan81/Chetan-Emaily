const mongoose = require("mongoose");
require("../models/Survey");
const Survey = mongoose.model("Survey");
const FeedBack = require("../models/FeedBack");
module.exports = (app) => {
    app.post("/api/feedbackForm", async (req, res) => {
        const { feedback_id } = req.body;
        FeedBack.find(
            {
                _id: feedback_id,
            },
            (err, feedbackForm) => {
                if (feedbackForm) {
                    return res.status(200).send(feedbackForm);
                }
                if (err) {
                    return res.send({
                        error: err,
                        errorMessage:
                            "Cannot Find Form, Please Click on Given Link on Mail Again",
                    });
                }
            }
        );
    });
    app.post("/api/feedback", async (req, res) => {
        const { feedback, surveyId, feedBackId } = req.body;
        let emailExist = false;
        let errorMessage = [];
        let error = false;
        await Survey.findById(surveyId)
            .then((survey) => {
                if (survey) {
                    survey.recipients.find((ele) => {
                        if (ele.email === feedback.email) {
                            if (ele.responded) {
                                console.log("you have already responded");
                                errorMessage.push(
                                    "You have already submitted your review"
                                );
                                error = true;
                                return res.send({
                                    error: true,
                                    errorMessage,
                                });
                            }
                            if (!ele.responded) {
                                error = false;
                                ele.responded = true;
                            }
                            emailExist = true;
                        }
                    });
                    if (emailExist && !error) {
                        console.log("saving your response");
                        survey.save().catch((err) => {
                            console.log("Server Error, Please try again");
                            error = true;
                            errorMessage.push("Server Error, Please try again");
                            return res.send({
                                error: true,
                                errorMessage,
                            });
                        });
                    } else {
                        error = true;
                        console.log(
                            "You Are Not Eligible for participating on this Survey"
                        );
                        errorMessage.push(
                            "You Are Not Eligible for participating on this Survey"
                        );
                        return res.send({
                            error: true,
                            errorMessage,
                        });
                    }
                }
            })
            .catch((err) => {
                error = true;
                console.log(err);
                errorMessage.push(
                    "Please Reclick on Feedback Link Provided on Your Mail ID"
                );
            });
        if (emailExist && !error) {
            FeedBack.findById(feedBackId)
                .then((fdbk) => {
                    if (fdbk) {
                        const { email, group, group0, group1 } = feedback;
                        fdbk.question1[group]++;
                        let answers = [];
                        for (let i in feedback) {
                            if (i === "email" || i === "group") {
                                console.log(i === "email", i, "email");
                            } else {
                                answers.push(feedback[i]);
                            }
                        }
                        fdbk.Questions.forEach((ele, index) => {
                            const i = index;
                            ele[answers[i]]++;
                        });
                        console.log("feedback fdbk : ", fdbk);
                        fdbk.save()
                            .then(() => {
                                error = false;
                                console.log("FeedBack is Added");
                                return res.send({
                                    error: false,
                                    successMessage: "FeedBack Added",
                                });
                            })
                            .catch((err) => {
                                error = true;
                                errorMessage.push(
                                    "error with saving Your Response"
                                );
                                return res.send({
                                    error: err,
                                    errorMessage,
                                });
                            });
                    }
                })
                .catch((err) => {
                    error = true;
                    errorMessage.push(
                        "Server Error, Please Click on Link Provided in You Mail again"
                    );
                    return res.send({
                        error: err,
                        errorMessage,
                    });
                });
        }
    });
};

//TODO: search through User using userId and return

const FeedBack = require("../models/FeedBack");
require("../models/Survey");

//Now, this call won't fail because Survey has been added as a schema.
const Survey = mongoose.model("Survey");
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
        const { feedback } = req.body;
        console.log(feedback);
    });
};

//TODO: search through User using userId and return

const FeedBack = require("../models/FeedBack");
module.exports = (app) => {
    app.post("/api/feedbackForm", async (req, res) => {
        //no parantheses so that function is only called internal not everytime we load
        const { feedback_id } = req.body;
        console.log("values in feedbackForm :", feedback_id);
        FeedBack.find(
            {
                _id: feedback_id,
            },
            (err, feedbackForm) => {
                if (feedbackForm) {
                    console.log("the required form is :", feedbackForm);
                    res.send(feedbackForm);
                }
                if (err) {
                    console.log("error in feedbackRoute iS :", err);
                    res.redirect("/");
                }
            }
        );
    });
};
//TODO: search through User using userId and return

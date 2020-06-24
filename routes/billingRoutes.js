const keys = require("../config/keys"),
    stripe = require("stripe")(keys.stripeSecretKey),
    requireLogin = require("../middlewares/requireLogin");
module.exports = (app) => {
    app.post("/api/stripe", requireLogin, (req, res) => {
        //no parantheses so that function is only called internall not everytime we load
        stripe.charges
            .create({
                amount: 500,
                currency: "INR",
                description: "₹5 for 5 email credits",
                source: req.body.id,
            })
            .then((charge) => {
                req.user.credits += 5;
                req.user.save().then((user) => {
                    res.send(user);
                });
            });
    });
};

const express = require("express"),
    PORT = process.env.PORT || 5000,
    app = express();
app.get("/", (req, res) => {
    res.send({ hi: "there" });
});
app.listen(PORT, () => {
    console.log("app is listening on port 5000");
});

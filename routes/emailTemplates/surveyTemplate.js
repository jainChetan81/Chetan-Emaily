const keys = require("../../config/keys");
module.exports = (survey) => {
    return ` <html>
            <body>
                <div style={{ textAlign: "center" }}>
                    <h3>I'd Like your Input</h3>
                    <p>Please answer the following question</p>
                    <p>${survey.body}</p>
                    <div className="">
                        <a href="${keys.redirectDomain}/api/surveys/thanx">Yes</a>
                    </div>
                    <div className="">
                        <a href="${keys.redirectDomain}/api/surveys/thanx">No</a>
                    </div>
                </div>
            </body>
        </html>`;
};

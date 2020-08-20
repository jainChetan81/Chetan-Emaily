const keys = require("../../config/keys");
module.exports = (survey, feedback) => {
    return ` <html>
            <body>
                <div style={{ textAlign: "center" }}>
                    <h3>${survey.title}</h3>
                    <p>Please answer the following question</p>
                    <p>${survey.body}</p>
                    <div>Fill Form
                        <a href="${keys.redirectDomain}/feedback?feedBackId=${feedback.id}">Now</a> 
                    </div>
                </div>
            </body>
        </html>`;
};
// TODO:include user's email/id in URL

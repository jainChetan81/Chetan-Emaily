const keys = require("../../config/keys");
module.exports = (survey) => {
    return ` <html>
            <body>
                <div style={{ textAlign: "center" }}>
                    <h3>${survey.title}</h3>
                    <p>Please answer the following question</p>
                    <p>${survey.body}</p>
                    <div >
                        <a href="${keys.redirectDomain}/feedback/?surveyId=${survey.id}&mail=dangerxkills@gmail.com">Yes</a>
                        //TODO:URL must which have FeedBackForm Id and user's email address
                    </div>
                </div>
            </body>
        </html>`;
};

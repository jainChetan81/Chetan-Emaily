const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        console.log("subject", subject);
        super();
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email("jain.cj.chetan@gmail.com");
        this.subject = subject;
        this.body = new helper.Content("text/html", content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }
    addRecipients() {
        const personalize = new helper.Personalization();

        this.recipients.forEach((recipient) => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: "POST",
            path: "/v3/mail/send",
            body: this.toJSON(),
        });

        this.sgApi
            .API(request)
            .then((response) => {
                console.log("01");
                console.log(response.statusCode);
                console.log("02");
                console.log(response.body);
                console.log("03");
                console.log(response.headers);
                return response;
            })
            .catch((error) => {
                // error is an instance of SendGridError
                // The full response is attached to error.response
                console.log("05");
                console.log(error.response.statusCode);
            });
    }
}

module.exports = Mailer;

const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
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
                console.log("final response is :", response.statusCode);
                return response;
            })
            .catch((err) => console.log("error in response is :", err));
    }
}

module.exports = Mailer;

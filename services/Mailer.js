const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();
        console.log("Mailer.js : ", recipients);
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email("jain.cj.chetan@gmail.com");
        this.subject = subject;
        this.body = new helper.Content("text/html", content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
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
        console.log("the request is : ", request);

        this.sgApi
            .API(request)
            .then((response) => {
                console.log("final response is :", response);
                return response;
            })
            .catch((err) => console.log("error in response is :", err));
    }
}

module.exports = Mailer;

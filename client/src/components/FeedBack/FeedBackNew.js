import React, { Component } from "react";
import { reduxForm } from "redux-form";
import FeedBackForm from "./FeedBackForm";
import FeedBackFormReview from "./FeedBackFormReview";

class FeedBackNew extends Component {
    state = { show: false };

    renderContent() {
        if (!this.state.show) {
            return (
                <FeedBackForm
                    feedbackQuestions={this.props.feedbackQuestions}
                    onFeedBackSubmit={() => this.setState({ show: true })}
                />
            );
        }
        if (this.state.show) {
            return (
                <FeedBackFormReview
                    feedbackQuestions={this.props.feedbackQuestions}
                    onCancel={() => this.setState({ show: false })}
                />
            );
        }
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

export default reduxForm({
    form: "feedbackForm",
})(FeedBackNew);

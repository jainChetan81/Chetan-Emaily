import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import QuestionForm from "../Questions/QuestionForm";
import QuestionFormReview from "../Questions/QuestionFormReview";

class SurveyNew extends Component {
    state = { show: "surveyForm" };

    renderContent() {
        if (this.state.show === "surveyForm") {
            return (
                <SurveyForm
                    onSurveySubmit={() =>
                        this.setState({ show: "surveyFormReview" })
                    }
                />
            );
        }
        if (this.state.show === "surveyFormReview") {
            return (
                <SurveyFormReview
                    onCancel={() => this.setState({ show: "surveyForm" })}
                    onSurveySubmit={() =>
                        this.setState({ show: "showQuestions" })
                    }
                />
            );
        }
        if (this.state.show === "showQuestions") {
            return (
                <QuestionForm
                    onCancel={() => this.setState({ show: "surveyFormReview" })}
                    onSurveySubmit={() =>
                        this.setState({ show: "showQuestionsReview" })
                    }
                />
            );
        }
        if (this.state.show === "showQuestionsReview") {
            return (
                <QuestionFormReview
                    onCancel={() => this.setState({ show: "showQuestions" })}
                />
            );
        }
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

export default reduxForm({
    form: "surveyForm",
})(SurveyNew);

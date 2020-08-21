import React from "react";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
import { connect } from "react-redux";

const QuestionFormReview = ({
    questionFormValues,
    onCancel,
    submitSurvey,
    history,
    surveyFormValue,
}) => {
    const reviewFields = () => {
        console.log("formValues :", questionFormValues);
        let j = 1;
        let fields = [];
        for (let i in questionFormValues) {
            const label = "Question " + j + " : ";
            const title = "question" + j;
            j++;
            fields.push(
                <div key={i}>
                    <label>{label}</label>
                    <div>{questionFormValues[title]}</div>
                </div>
            );
        }
        return fields;
    }
    return (
        <div>
            {/* // TODO:showcase the questions for review */}
            <h5>Please confirm your entries</h5>
            {reviewFields()}
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}>
                Back
            </button>
            <button
                onClick={() =>
                    submitSurvey(questionFormValues, surveyFormValue, history)
                }
                className="green btn-flat right white-text">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};
function mapStateToProps(state) {
    return {
        questionFormValues: state.form.questionForm.values,
        surveyFormValue: state.form.surveyForm.values,
    };
}

export default connect(
    mapStateToProps,
    actions
)(withRouter(QuestionFormReview));

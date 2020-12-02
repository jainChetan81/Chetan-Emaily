import React from "react";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const FeedBackFormReview = ({
    feedbackQuestions,
    onCancel,
    submitFeedback,
    history,
    feedbackFormValues,
    feedBackId,
    feedbackError,
}) => {
    const feedbackFields = () => {
        return feedbackQuestions[0].Questions.map((form, index) => {
            const group = "group" + index;
            return (
                <div className="row" key={index}>
                    <div className="col s6">
                        <h5>
                            Q{index + 2} : {form.question}
                        </h5>
                    </div>
                    <div
                        className="col s6 right-align"
                        style={{ marginTop: "10px", fontSize: 20 }}>
                        <label>{feedbackFormValues[group]}</label>
                    </div>
                </div>
            );
        });
    };

    const sendFeedback = () => {
        submitFeedback(
            feedbackFormValues,
            history,
            feedbackQuestions[0]._survey,
            feedBackId
        );
    };

    return (
        <div>
            {/* // TODO:showcase the questions for review */}
            <h5>Please confirm your FeedBack</h5>
            <div>
                <label>Email ID:</label>
                <div>{feedbackFormValues.email}</div>
            </div>
            <div className="row">
                <div className="col s6">
                    <h5>Q1 : {feedbackQuestions[0].question1.question}</h5>
                </div>
                <div
                    className="col s6 right-align"
                    style={{ marginTop: "10px", fontSize: 20 }}>
                    <label>{feedbackFormValues.group}</label>
                </div>
            </div>

            {feedbackFields()}
            <div className="red-text" style={{ marginBottom: "20px" }}>
                {/* {feedbackError.errorMessage.map((i) => i)} */}
                {feedbackError.errorMessage}
            </div>
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}>
                Back
            </button>
            <button
                onClick={() => sendFeedback()}
                className="green btn-flat right white-text">
                Send FeedBack
                <i className="material-icons right">email</i>
            </button>
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
            />
        </div>
    );
};
function mapStateToProps(state) {
    return {
        feedbackFormValues: state.form.feedbackForm.values,
        feedbackError: state.feedbackError,
    };
}

export default connect(
    mapStateToProps,
    actions
)(withRouter(FeedBackFormReview));

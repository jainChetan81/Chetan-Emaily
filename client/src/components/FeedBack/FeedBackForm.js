//TODO: send post api which will save the questions answered

import { reduxForm, Field } from "redux-form";
import React, { Component } from "react";

class FeedBackForm extends Component {
    renderQuestions() {
        return this.props.feedbackQuestions[0].Questions.map((form, index) => {
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
                        style={{ marginTop: "10px" }}>
                        <label>
                            <Field
                                name={group}
                                component="input"
                                type="radio"
                                value="Yes"
                            />
                            <span>Yes</span>
                        </label>

                        <label style={{ marginLeft: 15 }}>
                            <Field
                                name={group}
                                component="input"
                                type="radio"
                                value="No"
                            />
                            <span>No</span>
                        </label>
                    </div>
                </div>
            );
        });
    }
    render() {
        return (
            <div className="row">
                <h5>Questions</h5>
                <form
                    className="col s12"
                    onSubmit={this.props.handleSubmit(
                        this.props.onFeedBackSubmit
                    )}>
                    <div className="row">
                        <div className="input-field col s12">
                            <Field
                                component="input"
                                type="email"
                                name="email"
                            />
                            <span>Email Id:</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <h5>
                                Q1 :{" "}
                                {
                                    this.props.feedbackQuestions[0].question1
                                        .question
                                }
                            </h5>
                        </div>
                        <div
                            className="col s6 right-align"
                            style={{ marginTop: "10px" }}>
                            <label>
                                <Field
                                    label="question1"
                                    name="group"
                                    component="input"
                                    type="radio"
                                    value="Yes"
                                />
                                <span>Yes</span>
                            </label>

                            <label style={{ marginLeft: 15 }}>
                                <Field
                                    name="group"
                                    component="input"
                                    type="radio"
                                    value="No"
                                />
                                <span>No</span>
                            </label>
                        </div>
                    </div>
                    {this.renderQuestions()}
                    <input
                        type="submit"
                        className="blue btn-flat right white-text"
                        value="Survey Feedback"
                    />
                </form>
            </div>
        );
    }
}
function validate(values) {
    const errors = {};

    // _.each(formFields, ({ name }) => {
    //     if (!values[name]) {
    //         errors[name] = "You must provide a value";
    //     }
    // });

    return errors;
}
export default reduxForm({
    validate,
    form: "feedbackForm",
    destroyOnUnmount: false,
})(FeedBackForm);

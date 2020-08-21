import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import QuestionField from "./QuestionField";

class QuestionForm extends Component {
    state = { field: 0 };
    componentDidMount() {
        //TODO:SHow case already filled out form
    }

    renderFields() {
        let fields = [];
        for (let i = 0; i < this.state.field; i++) {
            let y = i + 2;
            const label = "Question " + y + " : ";
            const name = "question" + y;
            fields.push(
                <div key={i} className="row">
                    <div className="col s11">
                        <Field
                            component={QuestionField}
                            type="text"
                            label={label}
                            name={name}
                        />
                    </div>
                </div>
            );
        }
        return fields;
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(
                        this.props.onSurveySubmit
                    )}>
                    <div className="row">
                        <div className="col s11">
                            <Field
                                component={QuestionField}
                                type="text"
                                label="Question 1 :"
                                name="question1"
                            />
                        </div>
                        <div className="col s1">
                            <button
                                type="button"
                                onClick={() =>
                                    this.setState((prev) => {
                                        return {
                                            ...prev,
                                            field: prev.field + 1,
                                        };
                                    })
                                }
                                className="btn-floating btn-medium waves-effect waves-light red"
                                style={{ marginTop: "15px" }}>
                                <i className="material-icons">add</i>
                            </button>
                        </div>
                    </div>
                    {this.renderFields()}

                    <button
                        className="yellow darken-3 white-text btn-flat"
                        onClick={this.props.onCancel}>
                        Back
                    </button>
                    <button
                        type="submit"
                        className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
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
    form: "questionForm",
    destroyOnUnmount: false,
})(QuestionForm);

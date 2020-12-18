import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys, fetchFeedbacks } from "../../actions";

class SurveyList extends Component {
    async componentDidMount() {
        await this.props.fetchSurveys();
        await this.props.fetchFeedbacks();
    }

    renderSurveys() {
        const { feedbacks } = this.props;
        return this.props.surveys.reverse().map((survey, index) => {
            return (
                <div className="card darken-1" key={survey._id}>
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">
                            Sent On:
                            {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-tabs">
                        <ul className="collection">
                            <li className="collection-item ">
                                <div className="row">
                                    <div className="col s10">
                                        Q1:{" "}
                                        {feedbacks[index]?.question1.question}
                                    </div>
                                    <div className="col s1">
                                        Y: {feedbacks[index]?.question1.Yes}
                                    </div>
                                    <div className="col s1">
                                        N: {feedbacks[index]?.question1.No}
                                    </div>
                                </div>
                            </li>
                            {feedbacks[index]?.Questions.map((ques, index) => {
                                return (
                                    <li
                                        className="collection-item"
                                        key={ques._id}>
                                        <div className="row">
                                            <div className="col s10">
                                                Q{index + 1}: {ques.question}
                                            </div>
                                            <div className="col s1">
                                                N: {ques.Yes}
                                            </div>
                                            <div className="col s1">
                                                Y: {ques.No}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            );
        });
    }

    render() {
        return <div>{this.renderSurveys()}</div>;
    }
}

function mapStateToProps({ surveys, feedbacks }) {
    return { surveys, feedbacks };
}

export default connect(mapStateToProps, { fetchSurveys, fetchFeedbacks })(
    SurveyList
);

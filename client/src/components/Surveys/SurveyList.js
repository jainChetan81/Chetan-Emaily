import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys, fetchFeedbacks } from "../../actions";

class SurveyList extends Component {
    async componentDidMount() {
        await this.props.fetchSurveys();
        await this.props.fetchFeedbacks();
        console.log(this.props.feedbacks.length);
    }

    renderSurveys() {
        // const { feedbacks } = this.props;
        console.log(this.props.surveys);
        return this.props.surveys.reverse().map((survey) => {
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
                    <div class="card-tabs">
                        <ul class="tabs tabs-fixed-width">
                            <li class="tab">
                                <a href="#test10">Q1 :</a>
                            </li>
                            <li class="tab">
                                <a class="active" href="#test5">
                                    Test 2
                                </a>
                            </li>
                            <li class="tab">
                                <a href="#test6">Test 3</a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-content grey lighten-4">
                        {/* <div id="test10">
                            {feedbacks[1].question1.question} Yes:{" "}
                            {feedbacks[1].question1.Yes} No:{" "}
                            {feedbacks[1].question1.No}
                        </div> */}
                        <div id="test5">Test 2</div>
                        <div id="test6">Test 3</div>
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

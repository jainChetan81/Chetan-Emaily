import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import FeedBackNew from "./FeedBackNew";

const Form = ({ location }) => {
    //TODO: Show errors from the servers
    const [feedbackQuestions, setFeedbackQuestions] = useState(null);
    const [feedbackId, setFeedbackId] = useState(null);
    useEffect(() => {
        const { feedBackId } = queryString.parse(location.search);
        setFeedbackId(feedBackId);
        axios
            .post("/api/feedbackForm", { feedback_id: feedBackId })
            .then((res) => {
                if (!res.data.errorMessage) setFeedbackQuestions(res.data);
                else console.log(res.data.errorMessage);
            })
            .catch((err) => console.log("error in feedback Form.js: ", err));
        return () => {};
    }, [location.search]);
    return (
        <div>
            {feedbackQuestions ? (
                <FeedBackNew
                    feedBackId={feedbackId}
                    feedbackQuestions={feedbackQuestions}
                />
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
    //TODO: find person using UserId
};

export default Form;

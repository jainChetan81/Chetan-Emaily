import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import FeedBackNew from "./FeedBackNew";

const Form = ({ location }) => {
    const [feedbackQuestions, setFeedbackQuestions] = useState(null);
    useEffect(() => {
        const { feedBackId } = queryString.parse(location.search);
        axios
            .post("/api/feedbackForm", { feedback_id: feedBackId })
            .then((res) => {
                setFeedbackQuestions(res.data);
            })
            .catch((err) => console.log("error in feedback Form.js: ", err));
        return () => {
            console.log("");
        };
    }, [location.search]);
    return (
        <div>
            {feedbackQuestions ? (
                <FeedBackNew feedbackQuestions={feedbackQuestions} />
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
    //TODO: find person using UserId
};

export default Form;

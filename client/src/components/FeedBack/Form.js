import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import FeedBackNew from "./FeedBackNew";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const Form = (props) => {
    //TODO: Show errors from the servers
    const [feedbackQuestions, setFeedbackQuestions] = useState(null);
    const [feedbackId, setFeedbackId] = useState(null);
    useEffect(() => {
        const { feedBackId } = queryString.parse(props.location.search);
        console.log("feedBackId", feedBackId);
        if (feedBackId === undefined) {
            toast("Incomplete Link, Contact Your Provider");
            setTimeout(() => {
                props.history.push("/");
            }, 1000);
        }
        setFeedbackId(feedBackId);
        axios
            .post("/api/feedbackForm", { feedback_id: feedBackId })
            .then((res) => {
                if (!res.data.errorMessage) setFeedbackQuestions(res.data);
                if (res.data.err) console.log(res.data.errorMessage);
            })
            .catch((err) => console.log("error in feedback Form.js: ", err));
        return () => {};
    }, [props.location.search]);
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
    //TODO: find person using UserId
};

export default Form;

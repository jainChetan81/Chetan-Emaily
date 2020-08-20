import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";

const Form = ({ location }) => {
    const [feedbackForm, setFeedbackForm] = useState(null);
    useEffect(() => {
        const { feedBackId } = queryString.parse(location.search);
        console.log("parsed info by queryString: ", feedBackId);
        axios
            .post("/api/feedbackForm", { feedback_id: feedBackId })
            .then((res) => {
                console.log("respond of :", res.data);
                setFeedbackForm(feedBackId);
            })
            .catch((err) => console.log("error in feedback Form.js: ", err));
        return () => {
            console.log("return useeffect");
        };
    }, [location.search]);
    return (
        <div>
            {feedbackForm ? (
                <h1>Hi this is where your form will be</h1>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
    //TODO: find person using UserId
};

export default Form;

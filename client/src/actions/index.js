import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => (dispatch) => {
    axios.get("/api/current_user").then((res) => {
        dispatch({ type: FETCH_USER, payload: res.data });
    });
};
export const handleToken = (token) => async (dispatch) => {
    await axios.post("/api/stripe", token).then((res) => {
        dispatch({ type: FETCH_USER, payload: res.data });
    });
};
export const submitSurvey = (questionFormValues, surveyFormValue, history) => (
    dispatch
) => {
    axios
        .post("/api/surveys", {
            questions: questionFormValues,
            surveys: surveyFormValue,
        })
        .then((res) => {
            // history.push("/surveys");
            dispatch({ type: FETCH_USER, payload: res.data });
        });
};
export const submitFeedback = (feedbackFormValues, history) => (dispatch) => {
    axios
        .post("/api/feedback", {
            feedback: feedbackFormValues,
        })
        .then((res) => {
            console.log(res.data);
            // history.push("/");
            // dispatch({ type: FETCH_USER, payload: res.data });
        });
};

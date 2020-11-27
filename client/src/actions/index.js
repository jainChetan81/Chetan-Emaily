import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS, FETCH_FEEDBACKS } from "./types";

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
            dispatch({ type: FETCH_USER, payload: res.data });
            console.log("res", res);
            history.push("/surveys");
        })
        .catch((err) => console.log(err));
};
export const fetchSurveys = () => (dispatch) => {
    axios
        .get("/api/surveys")
        .then((res) => {
            console.log(res.data);
            dispatch({ type: FETCH_SURVEYS, payload: res.data });
        })
        .catch((err) => console.log(err));
};
export const fetchFeedbacks = () => (dispatch) => {
    axios
        .get("/api/feedbacks")
        .then((res) => {
            console.log(res.data);
            dispatch({ type: FETCH_FEEDBACKS, payload: res.data });
        })
        .catch((err) => console.log(err));
};
export const submitFeedback = (
    feedbackFormValues,
    history,
    surveyId,
    feedBackId
) => (dispatch) => {
    axios
        .post("/api/feedback", {
            feedback: feedbackFormValues,
            surveyId: surveyId,
            feedBackId: feedBackId,
        })
        .then((res) => {
            if (res.data.error) {
                console.log("error messages : ", res.data.errorMessage);
                //TODO: Create a Error State
                //TODO: Let USers see all the errors
            }
            if (!res.data.error) {
                console.log(res.data.successMessage);
                history.push("/");
            }
            // dispatch({ type: FETCH_USER, payload: res.data });
        })
        .catch((err) => console.log(err));
};

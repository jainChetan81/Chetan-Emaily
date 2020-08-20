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
export const submitSurvey = (values, history) => (dispatch) => {
    axios.post("/api/surveys", values).then((res) => {
        // history.push("/surveys");
        dispatch({ type: FETCH_USER, payload: res.data });
    });
};

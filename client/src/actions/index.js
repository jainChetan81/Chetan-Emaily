import axios from "axios";

import { FETCH_USER } from "./types";

export const fetchUser = () => (dispatch) => {
    axios.get("/api/current_user").then((res) => {
        // console.log("res is : ", res.data);
        dispatch({ type: FETCH_USER, payload: res.data });
    });
};

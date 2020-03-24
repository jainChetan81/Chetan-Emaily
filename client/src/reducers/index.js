import { combineReducers } from "redux";
import authReducer from "./authReducer";
import React from "react";

export default combineReducers({
    auth: authReducer
});

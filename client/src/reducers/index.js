import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import surveyReducer from "./surveyReducer";
import feedbackReducer from "./feedbackReducer";
import feedbackErrorReducer from "./feedbackErrorReducer";

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveyReducer,
    feedbacks: feedbackReducer,
    feedbackError: feedbackErrorReducer,
});

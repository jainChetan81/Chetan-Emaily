import { FETCH_FEEDBACKS } from "../actions/types";

const feedbackReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_FEEDBACKS:
            return action.payload;
        default:
            return state;
    }
};
export default feedbackReducer;

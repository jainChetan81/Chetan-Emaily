import { ERROR_FEEDBACK } from "../actions/types";

export default function (state = [], action) {
    switch (action.type) {
        case ERROR_FEEDBACK:
            return action.payload;
        default:
            return state;
    }
}

import { FETCH_USER } from "../actions/types";

export default function authReducer(state = null, action) {
    console.log(action);
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false; //false means user isn't logged in, otherwise data
        default:
            return state;
    }
}

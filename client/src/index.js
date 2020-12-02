import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
serviceWorker.unregister();
//TODO: remove surveys link from landing page
//TODO: add error fields in question form
//TODO: react toastify for feedback submitting and feedback sent page
//TODO: timer for redirecting to show react toastify working
//TODO: visuals for data collected but don't show personal data for all feedbacks

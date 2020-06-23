import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import { connect } from "react-redux";
import * as actions from "../actions";
import Landing from "./Landing";
import "materialize-css/dist/css/materialize.min.css";

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <Router>
                    <Header />
                    <Route path="/">{Landing}</Route>
                    <Route exact path="/surveys">
                        Survey
                    </Route>
                </Router>
            </div>
        );
    }
}

export default connect(null, actions)(App);

import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Header from "./Header";
import { connect } from "react-redux";
import * as actions from "../actions";
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
                    <Route path="/">
                        <a href="/auth/google" rel="noopener noreferrer">
                            Learn React
                        </a>
                    </Route>
                </Router>
            </div>
        );
    }
}

export default connect(null, actions)(App);

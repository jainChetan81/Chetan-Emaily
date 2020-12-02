import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header";
import { connect } from "react-redux";
import * as actions from "../actions";
import Landing from "./Landing";
import "materialize-css/dist/css/materialize.min.css";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Dashboard";
import SurveyNew from "./Surveys/SurveyNew";
import Form from "./FeedBack/Form";

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route exact path="/feedback" component={Form} />
                        {!this.props.auth && (
                            <Route exact path="/" component={Landing} />
                        )}
                        {this.props.auth && (
                            <>
                                <Route
                                    exact
                                    path="/surveys"
                                    component={Dashboard}
                                />
                                <Route
                                    exact
                                    path="/surveys/new"
                                    component={SurveyNew}
                                />
                                <Redirect to="/surveys" />
                            </>
                        )}
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}
export default connect(mapStateToProps, actions)(App);

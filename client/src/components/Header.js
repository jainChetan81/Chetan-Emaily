import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return "Still deciding";
            case false:
                return (
                    <li>
                        <a href="/auth/google">Log In</a>
                    </li>
                );
            default:
                return [
                    <li key="1">
                        <Payments />
                    </li>,
                    <li style={{ margin: "0 10px" }} key="3">
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="2">
                        <a href="/api/logout">Log Out</a>
                    </li>,
                ];
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <NavLink
                        className="left brand-logo"
                        to={this.props.auth ? "/surveys" : "/"}>
                        Emaily
                    </NavLink>
                    <ul className="right">{this.renderContent()}</ul>
                </div>
            </nav>
        );
    }
}
function mapStateToProps({ auth }) {
    return { auth: auth };
}
export default connect(mapStateToProps)(Header);

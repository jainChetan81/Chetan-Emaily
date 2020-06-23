import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
    renderContent() {
        console.log("auth is : ", this.props.auth);
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
                    <li>
                        <Payments />
                    </li>,
                    <li>
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
                    <ul className="right">
                        <li>
                            <a href="sass.html">{this.renderContent()}</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Header);

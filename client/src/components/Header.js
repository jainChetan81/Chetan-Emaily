import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
    renderContent() {
        console.log("auth is : ", this.props.auth);
        switch (this.props.auth) {
            case null:
                return "Still deciding";
            case false:
                return "I am logged out";
            default:
                return "i am logged in";
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <p className="left-brand-logo">Emaily</p>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <a href="sass.html">{this.renderContent()}</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
// function mapStateToProps({ auth }) {
//     return { auth };
// }
export default connect()(Header);

import React, { Component } from "react";

export default class header extends Component {
    render() {
        return (
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="left-brand-logo">
                        Emaily
                    </a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li>
                            <a href="sass.html">Login With Google</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Header from "./Header";
import "materialize-css/dist/css/materialize.min.css";

function App() {
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

export default App;

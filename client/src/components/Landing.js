import React from "react";
import { NavLink } from "react-router-dom";

const Landing = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Emaily</h1>
            <NavLink to="/surveys">Surveys</NavLink>
        </div>
    );
};

export default Landing;

import React, { useEffect } from "react";
import queryString from "query-string";
//TODO: extract value of s=which survey and which person from URL
// Todo: take the values and send survey finished_state

const Form = ({ location }) => {
    useEffect(() => {
        const parse = queryString.parse(location.search);
        console.log("parsed info by queryString: ", parse);
        console.log(location.search);
        return () => {
            console.log("return useeffect");
        };
    }, [location.search]);
    return <div>Hi this is where your form will be</div>;
    //  TODO: Create A Survey Form with availabe email Id</div>;
};

// import React, { Component } from "react";

// class Form extends Component {
//     componentDidMount() {
//         console.log("window: ", window.location.href);
//         const parse = queryString.parse(window.location.search);
//         console.log("parsed info by queryString: ", parse);
//     }

//     render() {
//         return <div>Hi this is where your form will be</div>;
//     }
// }

export default Form;

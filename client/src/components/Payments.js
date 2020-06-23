import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

export default class Payments extends Component {
    render() {
        return (
            <div>
                <StripeCheckout
                    amount={500}
                    token={(token) => console.log(token)} //a callback function from stripe
                    stripeKey="pk_test_51Gwo8zFD9wPnB6pJMw3iYc6kieNRduQeUWWb8DGW46o8XtqmW4xZMny1bFy98UQKwsJHjnvY7oSPJ2CVia5zj2rH002BhEzmY"
                />
            </div>
        );
    }
}

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import baseURL from "./constants/constants";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51LzNWXKIBfi23JtJ4v9sU7DpP5343HolXzTq8eXI36M95JWa5kK5bbcWqUfOL2O4aUqxHr7uCCFBSF88yvQCHrnp00U4mVBneD"
);
function StripeApp() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(`${baseURL}/venuebooking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default StripeApp;

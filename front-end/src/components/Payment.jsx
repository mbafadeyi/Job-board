import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { API } from "../api";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { CheckoutForm } from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51NhN5VJqXa4N3HjAjYPRbY7eB7luu8ICkZxwisR7MN3JQjdkav3eIF1p4YQo2Q1KhmlyBnA7DdkalAYi34PFeE0f00sjZJPcQj"
//   "STRIPE_PUBLIC_KEY"
);

export function Payment() {
  const {
    user: { token },
  } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  console.log(clientSecret);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios
      .post(
        API.payment.createPayment,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [token]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

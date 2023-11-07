import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { API } from "../api";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { CheckoutForm } from "./CheckoutForm";
import { useNavigate, useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51NhN5VJqXa4N3HjAjYPRbY7eB7luu8ICkZxwisR7MN3JQjdkav3eIF1p4YQo2Q1KhmlyBnA7DdkalAYi34PFeE0f00sjZJPcQj"
);

export function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const [canSponsor, setCanSponsor] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const {
    user: { token },
  } = useContext(AuthContext);

  useEffect(() => {
    if (job && !job.is_owner) {
      navigate("/");
    }
    return () => null;
  });

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await axios.get(API.jobs.retrieve(id), {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setJob(res.data);
      } catch (e) {
        console.log(e);
      }
    }

    // Create PaymentIntent as soon as the page loads
    async function createPayment() {
      try {
        const res = await axios.post(
          API.payment.createPayment,
          { job_id: id },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setClientSecret(res.data.clientSecret);
      } catch (e) {
        console.log(e);
      }
    }

    async function fetchSponsoredJobCount() {
      try {
        const res = await axios.get(API.jobs.sponsoredJobCount, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setCanSponsor(res.data.job_count < 3);
      } catch (e) {
        console.log(e);
      }
    }

    fetchJob();
    createPayment();
    fetchSponsoredJobCount();

    return () => null;
  }, [token, id]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div>
      {!canSponsor && (
        <div className="text-gray-600">
          <p>
            We already have 3 sponsored posts. Please check back in a few days
            for an open slot.
          </p>
        </div>
      )}
      {clientSecret && canSponsor && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

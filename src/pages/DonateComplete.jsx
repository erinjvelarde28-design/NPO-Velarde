import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { stripePromise } from "../lib/stripe.js";

// Stripe sends the donor back here after paying (the return_url in Donate.jsx).
// We ask Stripe what happened instead of trusting the URL.
export default function DonateComplete() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const secret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    if (!secret || !stripePromise) {
      setStatus("unknown");
      return;
    }
    stripePromise
      .then((stripe) => stripe.retrievePaymentIntent(secret))
      .then(({ paymentIntent }) => setStatus(paymentIntent?.status ?? "unknown"))
      .catch(() => setStatus("unknown"));
  }, []);

  const messages = {
    loading: ["Checking your payment…", ""],
    succeeded: ["Thank you for your donation! 💛", "Your gift is on its way to families who need it. A receipt is sent if you gave an email."],
    processing: ["Your payment is processing.", "We'll let you know as soon as it goes through."],
    requires_payment_method: ["Payment failed.", "Your card wasn't charged. Please try again."],
    unknown: ["We couldn't confirm your payment.", "If you were charged, please contact us and we'll sort it out."],
  };
  const [title, text] = messages[status] ?? messages.unknown;

  return (
    <section className="section">
      <div className="container donate donate--center">
        <h1 className="section__title">{title}</h1>
        <p className="section__lead">{text}</p>
        <Link
          to={status === "requires_payment_method" ? "/donate" : "/"}
          className="btn btn--primary"
        >
          {status === "requires_payment_method" ? "Try again" : "Back to home"}
        </Link>
      </div>
    </section>
  );
}

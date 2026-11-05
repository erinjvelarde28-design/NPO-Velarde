import { useState } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { stripePromise, hasStripeKey } from "../lib/stripe.js";
import { siteInfo } from "../data/siteInfo.js";

const { currencySymbol, presetAmounts, minAmount } = siteInfo.donate;

// Make Stripe's form match the website theme (see src/styles/theme.css)
const appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#c62828",
    colorText: "#1f2933",
    borderRadius: "10px",
    fontFamily: '"Segoe UI", system-ui, sans-serif',
  },
};

/* ---------- Step 2: the card form (must live INSIDE <Elements>) ---------- */
function CheckoutForm({ amount, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return; // Stripe.js hasn't loaded yet

    setBusy(true);
    setMessage("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/donate/complete` },
    });

    // confirmPayment only returns if something went wrong (otherwise the browser redirects)
    setMessage(error?.message || "Something went wrong. Please try again.");
    setBusy(false);
  }

  return (
    <form className="donate__form" onSubmit={handleSubmit}>
      <p className="donate__summary">
        You are donating <strong>{currencySymbol}{amount.toLocaleString()}</strong>
      </p>
      <PaymentElement />
      {message && <p className="donate__error" role="alert">{message}</p>}
      <button className="btn btn--primary donate__submit" disabled={!stripe || busy}>
        {busy ? "Processing…" : `Donate ${currencySymbol}${amount.toLocaleString()}`}
      </button>
      <button type="button" className="donate__back" onClick={onBack} disabled={busy}>
        ← Change amount
      </button>
    </form>
  );
}

/* ---------- Step 1: choose an amount, then ask the server for a clientSecret ---------- */
export default function Donate() {
  const [amount, setAmount] = useState(presetAmounts[1]);
  const [custom, setCustom] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const chosen = custom !== "" ? Number(custom) : amount;

  async function startPayment(e) {
    e.preventDefault();
    if (!Number.isFinite(chosen) || chosen < minAmount) {
      setError(`The minimum donation is ${currencySymbol}${minAmount}.`);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: chosen }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not start the payment.");
      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Can't reach the donation server. Is it running? (npm run dev)"
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="container donate">
        <h1 className="section__title">Make a donation</h1>
        <p className="section__lead">
          Every peso funds medicine, relief packs, and transport for families in need.
        </p>

        {!hasStripeKey && (
          <p className="donate__error" role="alert">
            Stripe isn't set up yet. Add VITE_STRIPE_PUBLISHABLE_KEY to your .env file and restart.
          </p>
        )}

        <div className="donate__card">
          {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
              <CheckoutForm amount={chosen} onBack={() => setClientSecret("")} />
            </Elements>
          ) : (
            <form onSubmit={startPayment}>
              <h2 className="donate__heading">Choose an amount</h2>
              <div className="donate__amounts">
                {presetAmounts.map((a) => (
                  <button
                    type="button"
                    key={a}
                    className={"donate__amount" + (custom === "" && amount === a ? " is-selected" : "")}
                    onClick={() => { setAmount(a); setCustom(""); }}
                  >
                    {currencySymbol}{a.toLocaleString()}
                  </button>
                ))}
              </div>

              <label className="donate__label" htmlFor="custom">Or enter another amount</label>
              <div className="donate__custom">
                <span>{currencySymbol}</span>
                <input
                  id="custom"
                  type="number"
                  min={minAmount}
                  step="1"
                  inputMode="numeric"
                  placeholder="Other amount"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                />
              </div>

              {error && <p className="donate__error" role="alert">{error}</p>}
              <button className="btn btn--primary donate__submit" disabled={loading || !hasStripeKey}>
                {loading ? "Please wait…" : "Continue to payment"}
              </button>
              <p className="donate__note">Secure payments powered by Stripe.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

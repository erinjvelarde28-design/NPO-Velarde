import { loadStripe } from "@stripe/stripe-js";

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Call loadStripe ONCE, outside any component, so Stripe.js isn't re-created on every render.
export const stripePromise = publishableKey ? loadStripe(publishableKey) : null;
export const hasStripeKey = Boolean(publishableKey);

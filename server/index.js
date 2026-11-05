// ------------------------------------------------------------
//  CareReach donation server
//  Creates Stripe PaymentIntents. The SECRET key lives only here
//  (never in the React code, which anyone can read in the browser).
// ------------------------------------------------------------
import "dotenv/config";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import express from "express";
import Stripe from "stripe";

const { STRIPE_SECRET_KEY, PORT = 4242 } = process.env;

if (!STRIPE_SECRET_KEY) {
  console.error(
    "\n[server] Missing STRIPE_SECRET_KEY.\n" +
      "         Copy .env.example to .env and paste your Stripe TEST keys.\n"
  );
  process.exit(1);
}

const stripe = new Stripe(STRIPE_SECRET_KEY);
const app = express();
app.use(express.json());

// Donation rules are decided HERE, not in the browser, so they can't be tampered with.
const CURRENCY = "php"; // Philippine peso
const MIN_DONATION = 100; // pesos
const MAX_DONATION = 500000; // pesos

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/create-payment-intent", async (req, res) => {
  const amount = Number(req.body?.amount); // in pesos, e.g. 500

  if (!Number.isFinite(amount) || amount < MIN_DONATION || amount > MAX_DONATION) {
    return res.status(400).json({
      error: `Please enter an amount between ${MIN_DONATION} and ${MAX_DONATION} pesos.`,
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe wants the smallest unit (centavos)
      currency: CURRENCY,
      automatic_payment_methods: { enabled: true },
      description: "Donation to CareReach Foundation",
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("[stripe]", err.message);
    res.status(500).json({ error: "We couldn't start the payment. Please try again." });
  }
});

// After "npm run build", this same server also serves the finished website from /dist.
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.listen(PORT, () => console.log(`[server] Donation API running on http://localhost:${PORT}`));

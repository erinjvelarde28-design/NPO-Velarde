# CareReach + Stripe: How to run this project

## What was added
| File | What it does |
|---|---|
| `src/pages/Donate.jsx` | Donate page. Pick an amount, then Stripe's `<Elements>` + `<PaymentElement>` card form (`@stripe/react-stripe-js`). |
| `src/pages/DonateComplete.jsx` | Page Stripe sends the donor back to; checks and shows the payment result. |
| `src/lib/stripe.js` | Calls `loadStripe()` once with your publishable key. |
| `server/index.js` | Tiny Express server that creates the PaymentIntent using your SECRET key. |
| `.env.example` | Template for your Stripe keys. |
| `vite.config.js` | Forwards `/api/...` calls from the site to the server. |
| `App.jsx`, `Navbar.jsx`, `Footer.jsx`, `Home.jsx`, `siteInfo.js`, `app.css` | New routes, "Donate" links, donate settings and styles. |

## Step by step

1. **Install Node.js** (v18 or newer, v20+ recommended) from https://nodejs.org. Check with `node -v`.
2. **Unzip** `carereach.zip` and open the `carereach` folder in VS Code.
3. **Open a terminal in that folder** (VS Code: Terminal > New Terminal). `ls` / `dir` should show `package.json`.
4. **Install packages:** `npm install`  (downloads React, Stripe, Express... takes a minute)
5. **Create a free Stripe account** at https://dashboard.stripe.com/register. You do NOT need to activate/verify the business to use test mode.
6. **Turn on Test mode** (toggle at the top of the Stripe Dashboard) and open https://dashboard.stripe.com/test/apikeys. Copy:
   - Publishable key (`pk_test_...`)
   - Secret key (`sk_test_...`, click "Reveal")
7. **Create your `.env` file:** copy `.env.example` and name the copy `.env`
   - Mac/Linux: `cp .env.example .env`
   - Windows (PowerShell): `copy .env.example .env`

   Open `.env` and paste the two keys in place of the `replace_me` values. No quotes, no spaces.
8. **Start everything:** `npm run dev`
   You will see two labelled processes: `site` (Vite, http://localhost:5173) and `api` (donation server, port 4242).
9. **Open http://localhost:5173/donate**, choose an amount, click *Continue to payment*.
10. **Pay with a Stripe TEST card:**
    - Card number `4242 4242 4242 4242`
    - Any future expiry (e.g. `12/34`), any 3-digit CVC, any ZIP/postal code
    - Click *Donate*. You should land on "Thank you for your donation!"
    - Other test cards: `4000 0000 0000 9995` (declined), `4000 0025 0000 3155` (asks for 3D Secure).
11. **See the payment in Stripe:** Dashboard (Test mode) > Payments.

Stop the project with `Ctrl + C`.

## Troubleshooting
- **"Missing STRIPE_SECRET_KEY"** in the terminal: `.env` isn't named exactly `.env`, or it's in the wrong folder (it must sit next to `package.json`). Restart `npm run dev` after editing it.
- **"Stripe isn't set up yet" on the page:** `VITE_STRIPE_PUBLISHABLE_KEY` is missing or empty in `.env`. Restart `npm run dev` (Vite only reads `.env` at startup).
- **"Can't reach the donation server":** the `api` process crashed (see its error in the terminal) or port 4242 is busy. Change `PORT=4243` in `.env` AND the proxy target in `vite.config.js`.
- **Card form doesn't appear:** make sure both keys are from the same Stripe account and both are Test keys.
- **`npm install` errors:** delete the `node_modules` folder and `package-lock.json`, then run `npm install` again.

## Notes for submission
- Never share or commit `.env` (it's in `.gitignore`). Only `.env.example` is safe to share.
- Use test keys only. Going live later needs an activated Stripe account and `pk_live_` / `sk_live_` keys.
- The amount rules (min/max, currency) are enforced on the server in `server/index.js`, so the browser can't change them.
- Production-style run: `npm run build` then `npm start` serves the finished site and API together on port 4242.

# CareReach Foundation: React Website Template

A 2-page non-profit website (Home + About) about **Medical Assistance & Disaster Response**, built with React, Vite and React Router.

---

## 1) Run it

You need [Node.js](https://nodejs.org) (version 18 or newer) installed.

```bash
cd carereach
npm install
npm run dev
```

Open the link shown in the terminal (usually http://localhost:5173).

To make a production build: `npm run build` (output goes to the `dist/` folder).

---

## 2) Project structure

```
carereach/
├── index.html                  <- page title, description, favicon
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                <- starts React + loads the CSS (rarely edited)
    ├── App.jsx                 <- the list of pages (routes)
    ├── data/
    │   └── siteInfo.js         <- ALL your text and numbers  (EDIT FIRST)
    ├── components/
    │   ├── Navbar.jsx          <- top navigation menu
    │   └── Footer.jsx          <- bottom of every page
    ├── pages/
    │   ├── Home.jsx            <- Page 1: Home
    │   └── About.jsx           <- Page 2: About
    ├── styles/
    │   ├── theme.css           <- colors, fonts, spacing  (THEME)
    │   └── app.css             <- layout and component styles
    └── assets/
        └── images/             <- logo, hero, program images, profile photo
```

---

## 3) Step by step: which files to edit

### Step 1: Put in your own information: `src/data/siteInfo.js`
This is the most important file. Change:
- `name`, `tagline`, `mission`, `email`, `phone`, `address`
- `stats` (the 4 numbers on the Home page)
- `programs` (Medical Assistance, Disaster Response, Community Preparedness)
- `waysToHelp` (Donate, Volunteer, Partner)
- `about` (your name, role, story, vision, values, timeline) for the About page

Save the file and the browser updates by itself.

### Step 2: Change the colors and fonts: `src/styles/theme.css`
Edit the values at the top of the file under `:root`:
- `--color-primary` (main red), `--color-secondary` (blue), `--color-accent` (amber)
- `--font-body` and `--font-heading` for fonts
- `--radius` for how round the cards and buttons look

### Step 3: Replace the images: `src/assets/images/`
- `logo.svg`: your logo (shown in the navbar and browser tab)
- `hero.svg`: big picture on the Home page
- `medical.svg`, `disaster.svg`, `community.svg`: the 3 program pictures
- `profile.svg`: **your photo** on the About page

Using your own photo (JPG/PNG):
1. Copy your file into `src/assets/images/`, e.g. `profile.jpg`
2. Open `src/pages/About.jsx` and change the import line:
   `import profile from "../assets/images/profile.jpg";`

The same trick works for the other images in `src/pages/Home.jsx` and for the logo in `src/components/Navbar.jsx`.

### Step 4: Edit the menu: `src/components/Navbar.jsx`
The `links` array at the top controls the menu items:
```js
const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
];
```

### Step 5: Change the page layout (optional)
- Home page sections: `src/pages/Home.jsx`
- About page sections: `src/pages/About.jsx`
- Spacing, sizes, mobile layout: `src/styles/app.css`

### Step 6: Edit the footer: `src/components/Footer.jsx`
It already reads your contact info from `siteInfo.js`.

### Step 7: Change the browser tab title: `index.html`
Edit the `<title>` and the `description` meta tag.

---

## 4) Adding a new page later (e.g. Donate)
1. Create `src/pages/Donate.jsx` (copy `About.jsx` as a starting point).
2. In `src/App.jsx`: `import Donate from "./pages/Donate.jsx";` and add
   `<Route path="/donate" element={<Donate />} />`
3. In `src/components/Navbar.jsx`, add `{ to: "/donate", label: "Donate" }` to `links`.

---

## 5) Publishing the website
Run `npm run build`, then upload the `dist/` folder to a free host such as Netlify, Vercel or GitHub Pages.
(For single-page-app hosting, make sure unknown URLs redirect to `index.html` so `/about` works on refresh.)

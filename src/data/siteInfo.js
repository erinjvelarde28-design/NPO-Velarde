//  This is where I'll edit
//  All the text stuff iz in

import about from "./about.json";

export const siteInfo = {
  // ---------- Organization ----------
  name: "CareReach Foundation",
  tagline: "Medical help and disaster relief, when and where it's needed most.",
  mission:
    "We bring free medical assistance and fast, organized disaster response to communities that have nowhere else to turn.",
  email: "hello@carereach.org",
  phone: "+63 900 000 0000",
  address: "San Fernando City, Pampanga, Philippines",

  // ---------- Home page: numbers (replace with your real ones) ----------
  stats: [
    { value: "12,000+", label: "Patients assisted" },
    { value: "45", label: "Disaster responses" },
    { value: "300+", label: "Active volunteers" },
    { value: "60", label: "Communities served" },
  ],

  // ---------- Home page: what you do ----------
  programs: [
    {
      title: "Medical Assistance",
      text: "Free medical missions, medicine support, and referrals for families who cannot afford care.",
      imageKey: "medical",
    },
    {
      title: "Disaster Response",
      text: "Rapid deployment of food, water, shelter kits, and first aid after typhoons, floods, and earthquakes.",
      imageKey: "disaster",
    },
    {
      title: "Community Preparedness",
      text: "First-aid training and disaster drills so communities can protect themselves before help arrives.",
      imageKey: "community",
    },
  ],

  // ---------- Home page: ways to help ----------
  waysToHelp: [
    { title: "Donate", text: "Every contribution funds medicine, relief packs, and transport.", to: "/donate" },
    { title: "Volunteer", text: "Join a medical mission or relief operation near you." },
    { title: "Partner", text: "Schools, clinics, and businesses can team up with us." },
  ],

  // ---------- Donate page (Stripe) ----------
  // The server (server/index.js) enforces its own min/max, so keep minAmount in sync with it.
  donate: {
    currencySymbol: "₱",
    presetAmounts: [500, 1000, 2500, 5000],
    minAmount: 100,
  },

  // ---------- About page: edit src/data/about.json ----------
  about,
};

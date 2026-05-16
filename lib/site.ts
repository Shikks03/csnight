/**
 * CS Night 2026 — Central Site Configuration
 *
 * Single source of truth for public URL and event facts used by metadata,
 * JSON-LD schema, and other site-wide configurations.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cs-night.vercel.app";

// Event Information
export const EVENT_NAME = "CS Night 2026";
export const EVENT_TAGLINE = "A Masquerade Grand Ball";
export const EVENT_START_DATE = "2026-06-27T17:00:00+08:00";
export const EVENT_END_DATE = "2026-06-27T23:00:00+08:00";

// Venue Information
export const EVENT_VENUE_NAME = "FEU Tech 17th Floor Gymnasium";
export const EVENT_VENUE_ADDRESS = {
  streetAddress: "Far Eastern University Institute of Technology, Nicanor Reyes St",
  addressLocality: "Manila",
  addressRegion: "Metro Manila",
  postalCode: "1008",
  addressCountry: "PH",
};

// Organizer Information
export const ORGANIZER_NAME = "FEU Tech ACM Student Chapter";
export const ORGANIZER_EMAIL = "acm.feu.it@gmail.com";
export const ORGANIZER_SOCIALS = [
  "https://www.facebook.com/feutechACM",
  "https://www.instagram.com/feutechacm/",
  "https://www.linkedin.com/company/feutechacm/posts/?feedView=all",
];

// Ticket Information
export const TICKET_TIERS = [
  { name: "ACM Member", price: 899 },
  { name: "Non-ACM CS Student", price: 999 },
  { name: "External", price: 1099 },
];

// Reservation URL (placeholder — user will replace with real Google Form URL after deploy)
export const RESERVATION_URL = "https://forms.gle/YOUR_LINK";

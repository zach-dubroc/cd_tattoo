const venmoHandle =
  process.env.NEXT_PUBLIC_VENMO_HANDLE?.trim() || "@cd-tattoos";
const cashAppHandle =
  process.env.NEXT_PUBLIC_CASHAPP_HANDLE?.trim() || "$cdtattoos";

export const site = {
  name: "CD Tattoos",
  tagline: "Custom tattooing on the MS Gulf Coast",
  artist: "CD",
  description: "description here",
  location: "tattoo ass bitch",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@cdtattoos.com",
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ||
    "https://www.instagram.com/",
  bookingEmbedUrl:
    process.env.NEXT_PUBLIC_GOOGLE_BOOKING_EMBED_URL?.trim() || "",
  bookingUrl: process.env.NEXT_PUBLIC_GOOGLE_BOOKING_URL?.trim() || "",
  // Placeholder accounts until the real payment accounts are set up.
  payments: {
    venmo: {
      handle: venmoHandle,
      url:
        process.env.NEXT_PUBLIC_VENMO_URL?.trim() ||
        `https://venmo.com/u/${venmoHandle.replace(/^@/, "")}`,
    },
    cashapp: {
      handle: cashAppHandle,
      url:
        process.env.NEXT_PUBLIC_CASHAPP_URL?.trim() ||
        `https://cash.app/$${cashAppHandle.replace(/^\$/, "")}`,
    },
    applePay: {
      handle:
        process.env.NEXT_PUBLIC_APPLE_PAY_HANDLE?.trim() ||
        "cdtattoos@example.com",
    },
  },
  booking: {
    formEndpoint: process.env.NEXT_PUBLIC_BOOKING_FORM_ENDPOINT?.trim() || "",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/book", label: "Book" },
] as const;

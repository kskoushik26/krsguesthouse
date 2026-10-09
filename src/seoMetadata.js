const SITE = "https://krsguesthouse.com";
const DEFAULT_IMAGE = `${SITE}/bridge.jpeg`;

// Keep titles under ~60 characters and descriptions under ~155.
// "keywords" is removed on purpose: Google ignores it.
export const pageMetadata = {
  "/": {
    title: "Rooms Near Sigandur Chowdeshwari Temple | KRS Guest House",
    description:
      "Clean rooms with hot water and free parking, a short walk from Sigandur Chowdeshwari Temple. Check rates and availability or call +91 94487 34152.",
  },
  "/rooms": {
    title: "Rooms & Tariff | KRS Guest House, Sigandur",
    description:
      "Room types, tariff and amenities at KRS Guest House, Sigandur. Family rooms, hot water, free parking. Call or enquire for your dates.",
  },
  "/location": {
    title: "Location & Directions | KRS Guest House, Sigandur",
    description:
      "How to reach KRS Guest House from Sigandur Chowdeshwari Temple, with map, directions and nearby landmarks in Sigandur, Karnataka.",
  },
  "/gallery": {
    title: "Photos | KRS Guest House, Sigandur",
    description:
      "See photos of rooms, parking and surroundings at KRS Guest House near Sigandur Chowdeshwari Temple before you book your stay.",
  },
  "/how-to-reach-sigandur": {
    title: "How to Reach Sigandur from Bengaluru, Shivamogga, Sagar",
    description:
      "Route, distance and travel time to Sigandur Chowdeshwari Temple from Bengaluru, Shivamogga and Sagar, plus where to stay nearby.",
  },
  "/attraction": {
    title: "Places to Visit Near Sigandur, Karnataka",
    description:
      "Sigandur Chowdeshwari Temple, the Sharavathi backwaters, viewpoints and other places to visit near Sigandur, from KRS Guest House.",
  },
  "/contact": {
    title: "Contact KRS Guest House | Sigandur",
    description:
      "Call +91 94487 34152 or message KRS Guest House to check room availability near Sigandur Chowdeshwari Temple, Karnataka.",
  },
  "/enquiry": {
    title: "Room Enquiry | KRS Guest House, Sigandur",
    description:
      "Send a room enquiry to KRS Guest House for your visit to Sigandur Chowdeshwari Temple. We reply with availability and current rates.",
  },
  "/policies": {
    title: "Guest Policies | KRS Guest House, Sigandur",
    description:
      "Check-in and check-out times, ID requirements, cancellation and house rules at KRS Guest House, Sigandur, Karnataka.",
  },
};

export function getRouteMetadata(pathname) {
  const clean =
    !pathname || pathname === "/"
      ? "/"
      : pathname.replace(/\/+$/, "").toLowerCase();

  const page = pageMetadata[clean] || pageMetadata["/"];

  return {
    ...page,
    image: page.image || DEFAULT_IMAGE,
    canonical: `${SITE}${clean === "/" || !pageMetadata[clean] ? "/" : clean}`,
  };
}
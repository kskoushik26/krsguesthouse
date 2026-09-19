export const pageMetadata = {
  "/": {
    title: "KRS Guest House near Siganduru Chowdeshwari Temple",
    description:
      "KRS Guest House offers a comfortable budget stay near Siganduru Chowdeshwari Temple in Siganduru, Karnataka, with clean rooms, hot water, free parking, and family-friendly hospitality.",
    keywords:
      "KRS Guest House, guest house near Siganduru Temple, rooms near Siganduru, stay near Siganduru, budget stay in Karnataka, family-friendly stay near temple",
    image: "https://krsguesthouse.com/bridge.jpeg",
  },
  "/attraction": {
    title: "Places to Visit Near Siganduru | KRS Guest House",
    description:
      "Explore temples, viewpoints, waterfalls, and local attractions near Siganduru from KRS Guest House in Karnataka.",
    keywords:
      "places to visit near Siganduru, attractions near Siganduru, temple near Siganduru, sightseeing in Karnataka",
    image: "https://krsguesthouse.com/bridge.jpeg",
  },
  "/location": {
    title: "KRS Guest House Location | Near Siganduru Temple, Siganduru",
    description:
      "Find KRS Guest House near Siganduru Chowdeshwari Temple in Siganduru, Karnataka, with directions, map details, and nearby landmarks.",
    keywords:
      "KRS Guest House location, Siganduru map, guest house near temple, stay near Siganduru temple, Karnataka accommodation",
    image: "https://krsguesthouse.com/bridge.jpeg",
  },
  "/contact": {
    title: "Contact KRS Guest House | Book a Room in Siganduru",
    description:
      "Contact KRS Guest House to check room availability and book a comfortable stay near Siganduru Chowdeshwari Temple in Karnataka.",
    keywords:
      "contact KRS Guest House, book room in Siganduru, guest house booking near temple, hotel contact Siganduru",
    image: "https://krsguesthouse.com/bridge.jpeg",
  },
  "/details": {
    title: "Rooms and Amenities | KRS Guest House Siganduru",
    description:
      "See room details and amenities at KRS Guest House, including clean rooms, hot water, free parking, and family-friendly accommodation near Siganduru Temple.",
    keywords:
      "rooms at KRS Guest House, guest house amenities, family rooms near Siganduru, hot water parking accommodation",
    image: "https://krsguesthouse.com/bridge.jpeg",
  },
  "/enquiry": {
    title: "Room Enquiry | KRS Guest House Near Siganduru",
    description:
      "Send a room enquiry to KRS Guest House for your visit to Siganduru Chowdeshwari Temple in Siganduru, Karnataka.",
    keywords:
      "room enquiry Siganduru, book guest house, KRS Guest House enquiry, Siganduru accommodation enquiry",
    image: "https://krsguesthouse.com/bridge.jpeg",
  },
};

export function getRouteMetadata(pathname) {
  if (!pathname) {
    return pageMetadata["/"];
  }

  return pageMetadata[pathname] || pageMetadata["/"];
}

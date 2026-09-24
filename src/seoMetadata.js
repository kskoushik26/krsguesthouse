export const pageMetadata = {
  "/": {
    title: "KRS Guest House | Rooms Near Siganduru Temple, Karnataka",
    description:
      "Looking for rooms or a budget hotel stay near Siganduru Temple? KRS Guest House in Siganduru, Karnataka offers clean rooms, hot water, free parking, and family-friendly accommodation.",
    keywords:
      "KRS Guest House, Sigandooru, Siganduru Karnataka, rooms near Siganduru, hotels in Siganduru, hotel near Siganduru Temple, guest house near Siganduru Temple, budget stay in Karnataka",
    image: "https://krsguesthouse.com/bridge.jpeg",
  },
  "/attraction": {
    title: "Places to Visit Near Siganduru, Karnataka | KRS Guest House",
    description:
      "Explore temples, viewpoints, waterfalls, and local attractions near Siganduru from KRS Guest House in Karnataka.",
    keywords:
      "places to visit near Siganduru, attractions near Siganduru, temple near Siganduru, sightseeing in Karnataka",
    image: "https://krsguesthouse.com/bridge.jpeg",
  },
  "/location": {
    title: "KRS Guest House Location | Rooms Near Siganduru Temple",
    description:
      "Find KRS Guest House near Siganduru Chowdeshwari Temple in Siganduru, Karnataka, with directions, map details, and nearby landmarks.",
    keywords:
      "KRS Guest House location, Siganduru map, guest house near temple, stay near Siganduru temple, Karnataka accommodation",
    image: "https://krsguesthouse.com/bridge.jpeg",
  },
  "/contact": {
    title: "Contact KRS Guest House | Book Rooms in Siganduru",
    description:
      "Contact KRS Guest House to check room availability and book a comfortable stay near Siganduru Chowdeshwari Temple in Karnataka.",
    keywords:
      "contact KRS Guest House, book room in Siganduru, guest house booking near temple, hotel contact Siganduru",
    image: "https://krsguesthouse.com/bridge.jpeg",
  },
  "/details": {
    title: "Rooms and Amenities | KRS Guest House, Siganduru Karnataka",
    description:
      "See room details and amenities at KRS Guest House, including clean rooms, hot water, free parking, and family-friendly accommodation near Siganduru Temple.",
    keywords:
      "rooms at KRS Guest House, guest house amenities, family rooms near Siganduru, hot water parking accommodation",
    image: "https://krsguesthouse.com/bridge.jpeg",
  },
  "/enquiry": {
    title: "Room Enquiry | KRS Guest House Near Siganduru Temple",
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

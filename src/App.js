import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

import Header from "./components/Header";
import Enquiry from "./components/Enquiry";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Location from "./components/Location";
import AttractionsList from "./components/attraction";
import Details from "./components/Details";
import FloatingButtons from "./components/FloatingButtons";
import ContactBar from "./components/ContactBar";
import Home from "./components/Home";

import "./App.css";

const pageMetadata = {
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

function PageMetadata() {
  const location = useLocation();

  React.useEffect(() => {
    const metadata = pageMetadata[location.pathname] || pageMetadata["/"];
    const canonicalUrl = `https://krsguesthouse.com${location.pathname}`;

    document.title = metadata.title;

    const setMeta = (selector, attribute, content) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attribute, content);
      } else {
        const newElement = document.createElement("meta");
        if (selector.startsWith("meta[property=\"") || selector.startsWith("meta[name=\"")) {
          const attr = selector.match(/meta\[(?:property|name)=\"([^\"]+)\"\]/i);
          if (attr) {
            newElement.setAttribute(attr[1].includes(":") ? "property" : "name", attr[1]);
          }
        }
        newElement.setAttribute(attribute, content);
        document.head.appendChild(newElement);
      }
    };

    setMeta('meta[name="description"]', "content", metadata.description);
    setMeta('meta[name="keywords"]', "content", metadata.keywords);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:title"]', "content", metadata.title);
    setMeta('meta[property="og:description"]', "content", metadata.description);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:image"]', "content", metadata.image);
    setMeta('meta[name="twitter:title"]', "content", metadata.title);
    setMeta('meta[name="twitter:description"]', "content", metadata.description);
    setMeta('meta[name="twitter:url"]', "content", canonicalUrl);
    setMeta('meta[name="twitter:image"]', "content", metadata.image);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", canonicalUrl);
  }, [location.pathname]);

  return null;
}

function App() {
  React.useEffect(() => {
    var _mtm = (window._mtm = window._mtm || []);

    _mtm.push({
      "mtm.startTime": new Date().getTime(),
      event: "mtm.Start",
    });

    var d = document;
    var g = d.createElement("script");
    var s = d.getElementsByTagName("script")[0];

    g.async = true;
    g.src =
      "https://cdn.matomo.cloud/krsguesthouse.matomo.cloud/container_P9mRBXJT.js";

    s.parentNode.insertBefore(g, s);
  }, []);

  return (
    <div className="App">
      <Router>
        <PageMetadata />
        {/* Scroll to top whenever the route changes */}
        <ScrollToTop />

        {/* Common layout */}
        <ContactBar />
        <Header />

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attraction" element={<AttractionsList />} />
          <Route path="/location" element={<Location />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/details" element={<Details />} />
          <Route path="/enquiry" element={<Enquiry />} />
        </Routes>

        <Footer />
      </Router>

      {/* Floating buttons available on every page */}
      <FloatingButtons />
    </div>
  );
}

export default App;

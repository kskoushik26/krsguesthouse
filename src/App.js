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
      "KRS Guest House offers a comfortable budget stay near Siganduru Chowdeshwari Temple in Siganduru, Karnataka, with clean rooms, hot water, and family-friendly hospitality.",
  },
  "/attraction": {
    title: "Places to Visit Near Siganduru | KRS Guest House",
    description:
      "Explore temples, viewpoints, waterfalls, and attractions near Siganduru from KRS Guest House in Siganduru, Karnataka.",
  },
  "/location": {
    title: "KRS Guest House Location | Near Siganduru Temple, Siganduru",
    description:
      "Find KRS Guest House near Siganduru Chowdeshwari Temple in Siganduru, Karnataka, with directions, map details, and nearby landmarks.",
  },
  "/contact": {
    title: "Contact KRS Guest House | Book a Room in Siganduru",
    description:
      "Contact KRS Guest House to check room availability and plan a comfortable stay near Siganduru Chowdeshwari Temple in Siganduru, Karnataka.",
  },
  "/details": {
    title: "Rooms and Amenities | KRS Guest House Siganduru",
    description:
      "See room details and amenities at KRS Guest House, including clean rooms, hot water, free parking, and family-friendly accommodation near Siganduru Temple.",
  },
  "/enquiry": {
    title: "Room Enquiry | KRS Guest House Near Siganduru",
    description:
      "Send a room enquiry to KRS Guest House for your visit to Siganduru Chowdeshwari Temple in Siganduru, Karnataka.",
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
      if (element) element.setAttribute(attribute, content);
    };

    setMeta('meta[name="description"]', "content", metadata.description);
    setMeta('meta[property="og:title"]', "content", metadata.title);
    setMeta('meta[property="og:description"]', "content", metadata.description);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[name="twitter:title"]', "content", metadata.title);
    setMeta('meta[name="twitter:description"]', "content", metadata.description);
    setMeta('meta[name="twitter:url"]', "content", canonicalUrl);

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

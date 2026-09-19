import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import ContactBar from "./components/ContactBar";
import Home from "./components/Home";
import { getRouteMetadata } from "./seoMetadata";

import "./App.css";

const Enquiry = React.lazy(() => import("./components/Enquiry"));
const Contact = React.lazy(() => import("./components/Contact"));
const Location = React.lazy(() => import("./components/Location"));
const AttractionsList = React.lazy(() => import("./components/attraction"));
const Details = React.lazy(() => import("./components/Details"));

function PageMetadata() {
  const location = useLocation();

  React.useEffect(() => {
    const metadata = getRouteMetadata(location.pathname);
    const canonicalUrl = `https://krsguesthouse.com${location.pathname}`;

    document.title = metadata.title;

    const setMeta = (selector, attribute, content) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attribute, content);
      } else {
        const newElement = document.createElement("meta");
        if (selector.startsWith("meta[property=\"") || selector.startsWith("meta[name=\"")) {
          const attr = selector.match(/meta\[(?:property|name)="([^"]+)"\]/i);
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
        <React.Suspense fallback={<div className="route-loading">Loading page...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/attraction" element={<AttractionsList />} />
            <Route path="/location" element={<Location />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/details" element={<Details />} />
            <Route path="/enquiry" element={<Enquiry />} />
          </Routes>
        </React.Suspense>

        <Footer />
      </Router>

      {/* Floating buttons available on every page */}
      <FloatingButtons />
    </div>
  );
}

export default App;

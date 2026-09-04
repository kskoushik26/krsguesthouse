import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

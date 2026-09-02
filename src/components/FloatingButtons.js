import React, { useState } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronUp,
  FaTimes,
} from "react-icons/fa";
import "./FloatingButtons.css";

const FloatingButtons = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      {/* =========================================
          FLOATING BUTTONS
          ========================================= */}
      <div className="floating-buttons">

        {/* WhatsApp */}
        <a
          href="https://wa.me/919448734152"
          className="fab whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <span className="fab-icon">
            <FaWhatsapp />
          </span>

          <span className="fab-label">
            WhatsApp
          </span>
        </a>


        {/* Email */}
        <a
          href="mailto:krsguesthouse26@gmail.com"
          className="fab email"
          aria-label="Send us an email"
        >
          <span className="fab-icon">
            <FaEnvelope />
          </span>

          <span className="fab-label">
            Email Us
          </span>
        </a>


        {/* Call */}
        <a
          href="tel:+919448734152"
          className="fab call"
          aria-label="Call us"
        >
          <span className="fab-icon">
            <FaPhoneAlt />
          </span>

          <span className="fab-label">
            Call Us
          </span>
        </a>


        {/* Location */}
        <button
          type="button"
          className="fab location"
          onClick={() => setShowMap(true)}
          aria-label="View our location"
        >
          <span className="fab-icon">
            <FaMapMarkerAlt />
          </span>

          <span className="fab-label">
            Location
          </span>
        </button>


        {/* Scroll Indicator */}
        <div
          className="scroll-indicator"
          aria-hidden="true"
        >
          <FaChevronUp />
        </div>

      </div>


      {/* =========================================
          MAP MODAL
          ========================================= */}
      {showMap && (
        <div
          className="map-overlay"
          onClick={() => setShowMap(false)}
        >

          <div
            className="map-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Map Header */}
            <div className="map-header">

              <div className="map-title">
                <FaMapMarkerAlt />
                <span>K.R.S Guest House</span>
              </div>

              <button
                type="button"
                className="map-close"
                onClick={() => setShowMap(false)}
                aria-label="Close map"
              >
                <FaTimes />
              </button>

            </div>


            {/* Google Maps Embed */}
            <div className="map-container">

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31019.448193263533!2d74.85408!3d14.071459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbc71f9a9acffc1%3A0x37552ae20c8ab25b!2sK.R.S%20Guest%20House!5e0!3m2!1sen!2sin!4v1699189485749!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="K.R.S Guest House Location"
              />

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default FloatingButtons;

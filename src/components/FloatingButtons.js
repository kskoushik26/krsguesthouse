import React, { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronUp,
} from "react-icons/fa";
import "./FloatingButtons.css";

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`floating-buttons ${
        isVisible ? "visible" : "hidden"
      }`}
    >
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
        <span className="fab-label">WhatsApp</span>
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
        <span className="fab-label">Email Us</span>
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
        <span className="fab-label">Call Us</span>
      </a>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <FaChevronUp />
      </div>
    </div>
  );
};

export default FloatingButtons;

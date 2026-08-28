import React from "react";
import { FaWhatsapp, FaStar, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import "./Footer.css";

const Footer = React.memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Decorative background */}
      <div className="footer-glow footer-glow-one" />
      <div className="footer-glow footer-glow-two" />

      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="brand-mark">
            <span>KRS</span>
          </div>

          <div className="brand-info">
            <h2>KRS Guest House</h2>
            <p>
              A comfortable stay, warm hospitality, and a place that feels
              like home.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Contact / Action Cards */}
        <div className="footer-actions">
          <a
            href="https://wa.me/919448734152"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-action whatsapp-action"
            aria-label="Chat with KRS Guest House on WhatsApp"
          >
            <div className="action-icon">
              <FaWhatsapp />
            </div>

            <div className="action-content">
              <span className="action-label">Quick Contact</span>
              <strong>Chat on WhatsApp</strong>
              <small>We'd love to hear from you</small>
            </div>

            <span className="action-arrow">→</span>
          </a>

          <a
            href="https://g.page/r/CVuyigziKlU3EBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-action review-action"
            aria-label="Leave a Google review for KRS Guest House"
          >
            <div className="action-icon">
              <FaStar />
            </div>

            <div className="action-content">
              <span className="action-label">Your Experience Matters</span>
              <strong>Leave a Google Review</strong>
              <small>Share your stay with others</small>
            </div>

            <span className="action-arrow">→</span>
          </a>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>
            © {currentYear} <span>KRS Guest House</span>. All rights reserved.
          </p>

          <div className="footer-meta">
            <span>
              <FaMapMarkerAlt />
              Hospitality with heart
            </span>

            <span className="meta-separator">•</span>

            <span>
              <FaPhoneAlt />
              Always happy to help
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;

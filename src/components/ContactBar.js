// src/components/ContactBar.js
import React from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import './ContactBar.css';

const ContactBar = () => {
  return (
    <div className="contact-bar">
      <div className="contact-item">
        <a href="tel:9448734152" className="contact-link">
          <FaPhoneAlt className="contact-icon" />
          <span className="contact-text">9448734152</span>
        </a>
      </div>
      <div className="contact-item">
        <a href="https://wa.me/9448734152" className="contact-link" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="contact-icon" />
          <span className="contact-text">9448734152</span>
        </a>
      </div>
    </div>
  );
};

export default ContactBar;
import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import './ContactBar.css';

const ContactBar = () => {
  return (
    <div className="contact-bar">
      <div className="contact-item">
        <a href="tel:9448734152" className="contact-link">
          <FaPhoneAlt className="contact-icon" />
          <span className="contact-text">
            Booking number (10am to 8pm): 9448734152
          </span>
        </a>
      </div>

      <div className="contact-item">
        <a href="tel:8431813492" className="contact-link">
          <FaPhoneAlt className="contact-icon" />
          <span className="contact-text">
            Night Contact (10pm to 8am): 8431813492
          </span>
        </a>
      </div>
    </div>
  );
};

export default ContactBar;

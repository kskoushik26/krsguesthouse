import React from "react";
import { Link } from "react-router-dom";
import {
  FaDirections,
  FaStar,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { googleMapsDirectionsUrl, googleReviewUrl } from "../business";
import { trackEvent } from "../analytics";
import "./Contact.css";

const whatsappBookingUrl =
  "https://wa.me/919448734152?text=" +
  encodeURIComponent(
    "Hello KRS Guest House, I would like to check availability and book a room. My preferred check-in and check-out dates are __ / __. Guests: __."
  );

const Contact = () => {
  const bookingSteps = [
    {
      number: "01",
      title: "Check Availability",
      text: (
        <>
          Call us at <a href="tel:+919448734152">+91 94487 34152</a> to check
          room availability for your preferred dates.
        </>
      ),
    },
    {
      number: "02",
      title: "Make Payment",
      text: (
        <>
          Once your room is available, proceed with the payment through
          <strong> Google Pay</strong> or <strong>PhonePe</strong>.
        </>
      ),
    },
    {
      number: "03",
      title: "Send Your Details",
      text: (
        <>
          Send the payment screenshot along with your Aadhaar card, member
          details, and date of stay through WhatsApp.
        </>
      ),
    },
    {
      number: "04",
      title: "Confirm Your Booking",
      text: (
        <>
          Complete the booking by confirming your reservation with us over the
          phone.
        </>
      ),
    },
    {
      number: "05",
      title: "Check In",
      text: (
        <>
          On the day of your arrival, give us a call and we will provide you
          with your room number.
        </>
      ),
    },
  ];

  return (
    <section className="contact-page">
      <div className="contact-shell">
        {/* ============ Left: identity + contact ============ */}
        <aside className="contact-panel">
          <div className="panel-ripples" aria-hidden="true"></div>

          <div className="panel-top">
            <p className="panel-name">KRS Guest House</p>
            <h1>Plan your stay with us</h1>
            <p className="panel-lead">
              Booking your stay is simple. Follow these quick steps and get
              ready for a comfortable stay in Sigandur.
            </p>

            <div className="panel-actions">
              <Link
                className="btn btn-primary"
                to="/enquiry"
                onClick={() =>
                  trackEvent("booking", "click", "check_availability")
                }
              >
                Check availability <span aria-hidden="true">→</span>
              </Link>

              <a
                className="btn btn-whatsapp"
                href={whatsappBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("booking", "click", "whatsapp_booking")
                }
              >
                <FaWhatsapp aria-hidden="true" />
                <span>
                  <small>WhatsApp</small>
                  Message us directly
                </span>
              </a>
            </div>
          </div>

          <ul className="contact-list">
            <li>
              <a
                href="tel:+919448734152"
                onClick={() =>
                  trackEvent("contact", "click", "phone_contact_page")
                }
              >
                <span className="ci-icon">
                  <FaPhoneAlt aria-hidden="true" />
                </span>
                <span className="ci-text">
                  <small>Phone</small>
                  <strong>+91 94487 34152</strong>
                </span>
              </a>
            </li>

            <li>
              <a
                href="mailto:krsguesthouse26@gmail.com"
                onClick={() =>
                  trackEvent("contact", "click", "email_contact_page")
                }
              >
                <span className="ci-icon">
                  <FaEnvelope aria-hidden="true" />
                </span>
                <span className="ci-text">
                  <small>Email</small>
                  <strong>krsguesthouse26@gmail.com</strong>
                </span>
              </a>
            </li>

            <li>
              <div className="ci-static">
                <span className="ci-icon">
                  <FaMapMarkerAlt aria-hidden="true" />
                </span>
                <span className="ci-text">
                  <small>Location</small>
                  <strong>
                    KRS Guest House, Sigandur,
                    <br />
                    Sagar, Shivamogga
                  </strong>
                </span>
              </div>
            </li>
          </ul>

          <div className="panel-links">
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("location", "click", "directions_contact_page")
              }
            >
              <FaDirections aria-hidden="true" /> Get directions
            </a>
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("review", "click", "google_reviews_contact_page")
              }
            >
              <FaStar aria-hidden="true" /> Read guest reviews
            </a>
          </div>
        </aside>

        {/* ============ Right: booking steps ============ */}
        <main className="booking-panel">
          <header className="booking-head">
            <p className="booking-kicker">Simple &amp; easy</p>
            <h2>How to book a room</h2>
          </header>

          <ol className="steps">
            {bookingSteps.map((step) => (
              <li className="step" key={step.number}>
                <span className="step-number">{step.number}</span>
                <div className="step-body">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="booking-note">
            We look forward to welcoming you to KRS Guest House.
          </p>
        </main>
      </div>
    </section>
  );
};

export default Contact;
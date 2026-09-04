import React from "react";
import { Link } from "react-router-dom";
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
          Call us at{" "}
          <a href="tel:+919448734152">+91 94487 34152</a> to check room
          availability for your preferred dates.
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
      <div className="contact-card">

        {/* Decorative background */}
        <div className="contact-glow contact-glow-one"></div>
        <div className="contact-glow contact-glow-two"></div>

        {/* Header */}
        <div className="contact-header">
          <span className="contact-eyebrow">KRS Guest House</span>

          <h1>Plan Your Stay With Us</h1>

          <p>
            Booking your stay is simple. Follow these quick steps and get ready
            for a comfortable stay in Siganduru.
          </p>
        </div>

        <div className="booking-trust" aria-label="Booking assurances">
          <span><b>✓</b><strong>Verified stay</strong></span>
          <span><b>♥</b><strong>Family-friendly</strong></span>
          <span><b>◷</b><strong>24x7 support</strong></span>
        </div>

        {/* Booking Section */}
        <div className="booking-section">
          <div className="section-heading">
            <span className="section-icon">✦</span>

            <div>
              <span className="section-label">Simple & Easy</span>
              <h2>How to Book a Room</h2>
            </div>
          </div>

          <div className="booking-steps">
            {bookingSteps.map((step) => (
              <div className="booking-step" key={step.number}>
                <div className="step-number">{step.number}</div>

                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="booking-cta">
          <div>
            <span>Ready to book?</span>
            <h3>Check room availability today.</h3>
          </div>

          <div className="booking-actions">
            <Link className="availability-button" to="/enquiry">
              Check availability <span aria-hidden="true">→</span>
            </Link>
            <a className="whatsapp-button" href={whatsappBookingUrl} target="_blank" rel="noopener noreferrer">
              <span className="call-icon">◔</span>
              <span><small>WhatsApp</small>Message us directly</span>
            </a>
          </div>
        </div>

        {/* Contact Details */}
        <div className="contact-details">
          <div className="section-heading">
            <span className="section-icon">✦</span>

            <div>
              <span className="section-label">Get In Touch</span>
              <h2>Contact Us</h2>
            </div>
          </div>

          <div className="contact-grid">

            <a
              className="contact-item"
              href="mailto:krsguesthouse26@gmail.com"
            >
              <div className="contact-item-icon">✉</div>

              <div>
                <span>Email</span>
                <strong>krsguesthouse26@gmail.com</strong>
              </div>
            </a>

            <a
              className="contact-item"
              href="tel:+919448734152"
            >
              <div className="contact-item-icon">☎</div>

              <div>
                <span>Phone</span>
                <strong>+91 94487 34152</strong>
              </div>
            </a>

            <div className="contact-item address-item">
              <div className="contact-item-icon">⌖</div>

              <div>
                <span>Location</span>
                <strong>
                  KRS Guest House, Siganduru,
                  <br />
                  Sagar, Shivamogga
                </strong>
              </div>
            </div>

          </div>
        </div>

        {/* Footer note */}
        <div className="contact-footer">
          <span>◆</span>
          We look forward to welcoming you to KRS Guest House.
          <span>◆</span>
        </div>

      </div>
    </section>
  );
};

export default Contact;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Location.css";

const Location = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const rooms = [
    {
      icon: "🛏️",
      title: "2-Occupancy Room",
      description: "Perfect for couples or solo travelers looking for a comfortable stay.",
      guests: "Up to 2 Guests",
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "4-Occupancy Family Room",
      description: "A spacious choice for families and small groups traveling together.",
      guests: "Up to 4 Guests",
    },
    {
      icon: "🏡",
      title: "6-Occupancy Room",
      description: "Ideal for larger families or groups who want to stay together.",
      guests: "Up to 6 Guests",
    },
  ];

  return (
    <section className="location">
      <div className="location-bg-circle location-bg-circle-one" />
      <div className="location-bg-circle location-bg-circle-two" />

      <div className="location-container">
        {/* Header */}
        <div className="location-header">
          <span className="location-eyebrow">STAY WITH US</span>

          <h1>
            Comfortable Rooms,
            <span> Convenient Location</span>
          </h1>

          <p>
            Choose the room that suits your group and find us easily with the
            map below.
          </p>
        </div>

        <div className="location-content">
          {/* Room Types */}
          <div className="room-types-section">
            <div className="section-heading">
              <div className="heading-icon">🛎️</div>

              <div>
                <span>ACCOMMODATION</span>
                <h2>Room Types & Tariff</h2>
              </div>
            </div>

            <div className="room-list">
              {rooms.map((room, index) => (
                <div className="room-card" key={index}>
                  <div className="room-icon">{room.icon}</div>

                  <div className="room-info">
                    <div className="room-title-row">
                      <h3>{room.title}</h3>
                      <span className="guest-badge">{room.guests}</span>
                    </div>

                    <p>{room.description}</p>

                    <div className="room-footer">
                      <span className="tariff-text">
                        Seasonal tariff
                      </span>

                      <span className="arrow">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pricing-note">
              <div className="note-icon">ℹ️</div>

              <div>
                <strong>Planning your stay?</strong>
                <p>
                  Room rates vary depending on the season. Contact us with
                  your preferred dates for the latest pricing and availability.
                </p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="location-section">
            <div className="section-heading">
              <div className="heading-icon location-icon">📍</div>

              <div>
                <span>FIND US</span>
                <h2>Our Location</h2>
              </div>
            </div>

            <div className="map-wrapper">
              <div className="map-container">
                {mapLoaded ? (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31019.448193263533!2d74.85408!3d14.071459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbc71f9a9acffc1%3A0x37552ae20c8ab25b!2sK.R.S%20Guest%20House!5e0!3m2!1sen!2sin!4v1699189485749!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="K.R.S Guest House Location"
                  />
                ) : (
                  <div className="map-loading">
                    <div className="loading-spinner" />
                    <span>Loading location...</span>
                  </div>
                )}

                <div className="map-label">
                  <span className="map-pin">📍</span>
                  <div>
                    <strong>K.R.S Guest House</strong>
                    <small>View on Google Maps</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="location-info">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div>
                  <span>LOCATION</span>
                  <strong>K.R.S Guest House</strong>
                </div>
              </div>

              <div className="info-divider" />

              <div className="info-item">
                <div className="info-icon">🧭</div>
                <div>
                  <span>DIRECTIONS</span>
                  <strong>Easy to find</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="location-cta">
  <div className="cta-content">
    <span className="cta-icon">✨</span>

    <div>
      <h3>Ready to plan your stay?</h3>
      <p>
        Get in touch with us for room availability and seasonal rates.
      </p>
    </div>
  </div>

  <Link to="/contact" className="cta-button">
    Book with Us
    <span>→</span>
  </Link>
</div>

      </div>
    </section>
  );
};

export default Location;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Location.css";

const rooms = [
  {
    icon: "🛏️",
    title: "2-Occupancy Room",
    description:
      "Perfect for couples looking for a comfortable stay.",
    guests: "Up to 2 Guests",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "4-Occupancy Family Room",
    description:
      "A spacious choice for families and small groups traveling together.",
    guests: "Up to 4 Guests",
  },
  {
    icon: "🏡",
    title: "6-Occupancy Room",
    description:
      "Ideal for larger families or groups who want to stay together.",
    guests: "Up to 6 Guests",
  },
];

const images = [
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752135436/image1_a8nu2z.jpg",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042709/image5_j4v2ry.jpg",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042710/image7_l9m8tg.jpg",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042704/image3_wkn9am.jpg",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042716/image9_e7fsub.jpg",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042705/image2_ab94xp.jpg",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042708/image6_mp6ajj.jpg",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752135435/image7_1_q4pgpx.jpg",
];

const Location = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Navigate to contact and make sure the page starts from the top
  const handleBookNow = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="location">
      {/* Decorative Background */}
      <div className="location-bg-circle location-bg-circle-one" />
      <div className="location-bg-circle location-bg-circle-two" />

      <div className="location-container">

        {/* =========================
            HEADER
        ========================== */}
        <div className="location-header">
          <span className="location-eyebrow">
            STAY WITH US
          </span>

          <h1>
            Comfortable Rooms,
            <span> Beautiful Memories</span>
          </h1>

          <p>
            Choose the room that suits your group and explore some of the
            beautiful moments and spaces at K.R.S Guest House.
          </p>
        </div>

        {/* =========================
            MAIN CONTENT
        ========================== */}
        <div className="location-content">

          {/* =========================
              ROOM TYPES
          ========================== */}
          <div className="room-types-section">

            <div className="section-heading">
              <div className="heading-icon">
                🛎️
              </div>

              <div>
                <span>
                  ACCOMMODATION
                </span>

                <h2>
                  Room Types & Tariff
                </h2>
              </div>
            </div>

            <div className="room-list">
              {rooms.map((room, index) => (
                <div
                  className="room-card"
                  key={index}
                >
                  <div className="room-icon">
                    {room.icon}
                  </div>

                  <div className="room-info">

                    <div className="room-title-row">
                      <h3>
                        {room.title}
                      </h3>

                      <span className="guest-badge">
                        {room.guests}
                      </span>
                    </div>

                    <p>
                      {room.description}
                    </p>

                    <div className="room-footer">
                      <span className="tariff-text">
                        Seasonal tariff
                      </span>

                      <span className="arrow">
                        →
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Note */}
            <div className="pricing-note">

              <div className="note-icon">
                ℹ️
              </div>

              <div>
                <strong>
                  Planning your stay?
                </strong>

                <p>
                  Room rates vary depending on the season.
                  Contact us with your preferred dates for the
                  latest pricing and availability.
                </p>
              </div>

            </div>

          </div>

          {/* =========================
              GALLERY
          ========================== */}
          <div className="gallery-section">

            <div className="section-heading">

              <div className="heading-icon">
                📸
              </div>

              <div>
                <span>
                  OUR GALLERY
                </span>

                <h2>
                  Explore Our Stay
                </h2>
              </div>

            </div>

            <div className="gallery-grid">

              {images.map((image, index) => (

                <div
                  className={`gallery-card gallery-card-${index + 1}`}
                  key={image}
                  onClick={() =>
                    setSelectedImage(image)
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" ||
                      e.key === " "
                    ) {
                      setSelectedImage(image);
                    }
                  }}
                  aria-label={`View gallery image ${
                    index + 1
                  }`}
                >

                  <img
                    src={image}
                    alt={`K.R.S Guest House gallery ${
                      index + 1
                    }`}
                    className="gallery-image"
                    loading="lazy"
                  />

                  <div className="image-overlay">

                    <div className="view-icon">
                      ↗
                    </div>

                    <span>
                      View Image
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* =========================
            BOTTOM CTA
        ========================== */}
        <div className="location-cta">

          <div className="cta-content">

            <span className="cta-icon">
              ✨
            </span>

            <div>

              <h3>
                Ready to plan your stay?
              </h3>

              <p>
                Get in touch with us for room
                availability and seasonal rates.
              </p>

            </div>

          </div>

          <Link
            to="/contact"
            className="cta-button"
            onClick={handleBookNow}
          >
            Book with Us
            <span>
              →
            </span>
          </Link>

        </div>

      </div>

      {/* =========================
          IMAGE LIGHTBOX
      ========================== */}
      {selectedImage && (

        <div
          className="lightbox"
          onClick={() =>
            setSelectedImage(null)
          }
        >

          <button
            className="close-button"
            onClick={() =>
              setSelectedImage(null)
            }
            aria-label="Close image"
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Selected gallery"
            className="lightbox-image"
            onClick={(e) =>
              e.stopPropagation()
            }
          />

        </div>

      )}

    </section>
  );
};

export default Location;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const homeImages = [
    "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752135436/image1_a8nu2z.jpg",
    "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752135435/image7_1_q4pgpx.jpg",
  ];

  const homeFacilities = [
    {
      icon: "🛕",
      title: "Close to Temple",
      description:
        "Located just 400 meters from Sigandur Chowdeshwari Temple.",
    },
    {
      icon: "🛏️",
      title: "Comfortable Rooms",
      description:
        "Well-maintained rooms suitable for couples, families and groups.",
    },
    {
      icon: "🚿",
      title: "Bathroom Facility",
      description:
        "Separate clean bathrooms are available for guests to freshen up.",
    },
    {
      icon: "♨️",
      title: "Hot Water",
      description: "Hot water facility is available for guests.",
    },
    {
      icon: "🚗",
      title: "Free Parking",
      description: "Convenient parking facility is available for guests.",
    },
    {
      icon: "📹",
      title: "CCTV Security",
      description:
        "CCTV cameras are installed in common areas for added security.",
    },
    {
      icon: "✨",
      title: "Clean & Hygienic",
      description:
        "Rooms and common areas are maintained with care.",
    },
    {
      icon: "🕐",
      title: "Guest Support",
      description:
        "We are available to assist guests whenever needed.",
    },
  ];

  const homeRoomTypes = [
    {
      icon: "🛏️",
      title: "2-Occupancy Room",
      description:
        "Perfect for couples or solo travelers looking for a comfortable stay.",
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

  const homeFaqs = [
    {
      question: "Is a bathroom facility available for guests?",
      answer:
        "Yes. Separate clean bathrooms are available for guests to freshen up and use comfortably.",
    },
    {
      question: "Are the bathrooms attached to the rooms?",
      answer:
        "Yes, the bathrooms are attached to the rooms and come with hot water facilities and western-style toilets.",
    },
    {
      question: "Is hot water available?",
      answer:
        "Yes. Hot water facility is available for guests.",
    },
    {
      question: "Is CCTV camera security available?",
      answer:
        "Yes. CCTV cameras are installed in common areas of the guest house to provide additional security for guests and the property.",
    },
    {
      question: "Is free parking available?",
      answer:
        "Yes. Parking facility is available for guests at the guest house.",
    },
    {
      question:
        "How far is the guest house from Sigandur Chowdeshwari Temple?",
      answer:
        "The guest house is conveniently located approximately 400 meters from the temple, making it easy for guests to visit.",
    },
    {
      question: "What room types are available?",
      answer:
        "We currently offer 2-occupancy rooms, 4-occupancy family rooms, and 6-occupancy rooms.",
    },
    {
      question: "How many guests can stay in the rooms?",
      answer:
        "Our rooms are available for up to 2, 4, or 6 guests depending on the room selected.",
    },
    {
      question: "Is the guest house suitable for families?",
      answer:
        "Yes. We have family-friendly room options including 4-occupancy and 6-occupancy rooms.",
    },
    {
      question: "Are the rooms clean and hygienic?",
      answer:
        "Yes. We take care to maintain clean and hygienic rooms and common areas for a comfortable guest experience.",
    },
    {
      question: "Is the guest house in a peaceful location?",
      answer:
        "Yes. The guest house offers a calm and peaceful environment while remaining conveniently close to the temple.",
    },
    {
      question: "Can I check room availability before visiting?",
      answer:
        "Yes. We recommend contacting us before your visit to confirm room availability and the latest seasonal tariff.",
    },
    {
      question: "Do room rates change depending on the season?",
      answer:
        "Yes. Room rates may vary depending on the season and availability. Please contact us for the latest pricing.",
    },
    {
      question: "How can I contact the guest house for booking?",
      answer:
        "You can contact us directly through our Contact page to enquire about room availability, pricing and booking.",
    },
  ];

  const [homeSelectedImage, setHomeSelectedImage] = useState(0);
  const [homeOpenFaq, setHomeOpenFaq] = useState(null);

  const handleHomeFaqToggle = (index) => {
    setHomeOpenFaq(homeOpenFaq === index ? null : index);
  };

  return (
    <main className="home-page">

      {/* ================= HERO ================= */}

      <section className="home-page-hero">
        <div className="home-page-hero-image-wrapper">
          <img
            src={homeImages[homeSelectedImage]}
            alt="K.R.S Guest House"
            className="home-page-hero-image"
          />

          <div className="home-page-hero-overlay">
            <div className="home-page-hero-content">

              <span className="home-page-hero-small-text">
                WELCOME TO K.R.S GUEST HOUSE
              </span>

              <h1>
                A Comfortable Stay,
                <br />
                Close to the Sigandur Chowdeshwari Temple
              </h1>

              <p>
                Clean rooms, peaceful surroundings, comfortable facilities,
                and just 400 meters from Sigandur Chowdeshwari Temple.
              </p>

              <Link
                to="/location"
                className="home-page-hero-button"
              >
                View Rooms
              </Link>


            </div>
          </div>
        </div>

        {/* Image thumbnails */}

        <div className="home-page-image-thumbnails">
          {homeImages.map((image, index) => (
            <button
              key={index}
              type="button"
              className={`home-page-thumbnail ${homeSelectedImage === index
                  ? "home-page-thumbnail-active"
                  : ""
                }`}
              onClick={() => setHomeSelectedImage(index)}
              aria-label={`View guest house image ${index + 1}`}
            >
              <img
                src={image}
                alt={`Guest house ${index + 1}`}
              />
            </button>
          ))}
        </div>
      </section>

      {/* ================= INTRO ================= */}

      <section className="home-page-intro">
        <div className="home-page-intro-content">

          <span className="home-page-section-label">
            YOUR HOME AWAY FROM HOME
          </span>

          <h2>
            Stay Comfortable.
            <br />
            Feel at Home.
          </h2>

          <p>
            Whether you are visiting the temple, travelling with family,
            or looking for a peaceful place to stay, K.R.S Guest House
            offers comfortable rooms and essential facilities for a
            pleasant stay.
          </p>

          <div className="home-page-intro-highlights">

            <div>
              <span className="home-page-highlight-icon">🛕</span>
              <strong>400m</strong>
              <small>From Temple</small>
            </div>

            <div>
              <span className="home-page-highlight-icon">🛏️</span>
              <strong>3</strong>
              <small>Room Options</small>
            </div>

            <div>
              <span className="home-page-highlight-icon">🚗</span>
              <strong>Free</strong>
              <small>Parking</small>
            </div>

            <div>
              <span className="home-page-highlight-icon">📹</span>
              <strong>CCTV</strong>
              <small>Common Areas</small>
            </div>

          </div>

        </div>
      </section>

      {/* ================= ROOMS ================= */}

      <section
        className="home-page-rooms"
        id="home-page-rooms"
      >

        <div className="home-page-section-heading">

          <span className="home-page-section-label">
            OUR ROOMS
          </span>

          <h2>Choose Your Room</h2>

          <p>
            Comfortable room options designed for individuals,
            couples, families and groups.
          </p>

        </div>

        <div className="home-page-rooms-grid">

          {homeRoomTypes.map((room, index) => (
            <article
              className="home-page-room-card"
              key={index}
            >

              <div className="home-page-room-card-top">

                <div className="home-page-room-icon">
                  {room.icon}
                </div>

                <span className="home-page-room-guests">
                  {room.guests}
                </span>

              </div>

              <div className="home-page-room-content">

                <h3>{room.title}</h3>

                <p>{room.description}</p>

                <div className="home-page-room-features">

                  <span>✓ Attached Bathroom</span>
                  <span>✓ Hot Water</span>
                  <span>✓ Clean & Hygienic</span>
                  <span>✓ Peaceful Environment</span>

                </div>

              </div>

            </article>
          ))}

        </div>

        <div className="home-page-room-note">

          <span>ℹ️</span>

          <p>
            Room rates may vary depending on the season and availability.
            Contact us for the latest tariff and room availability.
          </p>

        </div>

      </section>

      {/* ================= FACILITIES ================= */}

      <section className="home-page-facilities">

        <div className="home-page-section-heading">

          <span className="home-page-section-label">
            OUR FACILITIES
          </span>

          <h2>Everything You Need</h2>

          <p>
            Essential facilities to make your stay comfortable,
            convenient and peaceful.
          </p>

        </div>

        <div className="home-page-facilities-grid">

          {homeFacilities.map((facility, index) => (
            <article
              className="home-page-facility-card"
              key={index}
            >

              <div className="home-page-facility-icon">
                {facility.icon}
              </div>

              <h3>{facility.title}</h3>

              <p>{facility.description}</p>

            </article>
          ))}

        </div>

      </section>

      {/* ================= LOCATION ================= */}

      <section className="home-page-location">

        <div className="home-page-location-bg home-page-location-bg-one" />
        <div className="home-page-location-bg home-page-location-bg-two" />

        <div className="home-page-location-container">

          <div className="home-page-location-header">

            <span className="home-page-section-label">
              FIND US
            </span>

            <h2>
              Comfortable Rooms,
              <span> Convenient Location</span>
            </h2>

            <p>
              Stay close to Sigandur Chowdeshwari Temple with
              convenient access to the guest house.
            </p>

          </div>

          <div className="home-page-location-content">

            {/* Location information */}

            <div className="home-page-location-details">

              <div className="home-page-location-heading">

                <div className="home-page-location-heading-icon">
                  📍
                </div>

                <div>
                  <span>OUR LOCATION</span>
                  <h3>K.R.S Guest House</h3>
                </div>

              </div>

              <div className="home-page-location-card">

                <div className="home-page-location-info-icon">
                  🛕
                </div>

                <div>
                  <span>NEARBY TEMPLE</span>

                  <strong>
                    Sigandur Chowdeshwari Temple
                  </strong>

                  <p>
                    Approximately 400 meters from the guest house.
                  </p>
                </div>

              </div>

              <div className="home-page-location-card">

                <div className="home-page-location-info-icon">
                  📍
                </div>

                <div>
                  <span>LOCATION</span>

                  <strong>
                    K.R.S Guest House
                  </strong>

                  <p>
                    Conveniently located for temple visitors,
                    families and travelers.
                  </p>
                </div>

              </div>

              <div className="home-page-location-card">

                <div className="home-page-location-info-icon">
                  🧭
                </div>

                <div>
                  <span>DIRECTIONS</span>

                  <strong>
                    Easy to Find
                  </strong>

                  <p>
                    Use the map to find the guest house and
                    plan your route before travelling.
                  </p>
                </div>

              </div>

              <div className="home-page-location-features">

                <span>
                  <b>✓</b> 400m from Temple
                </span>

                <span>
                  <b>✓</b> Peaceful Location
                </span>

                <span>
                  <b>✓</b> Free Parking
                </span>

                <span>
                  <b>✓</b> Guest Support
                </span>

              </div>

            </div>

            {/* Map */}

            <div className="home-page-map-section">

              <div className="home-page-map-header">

                <div>
                  <span>MAP & DIRECTIONS</span>
                  <h3>Find Us Easily</h3>
                </div>

                <div className="home-page-map-pin">
                  📍
                </div>

              </div>

              <div className="home-page-map-wrapper">

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

                <div className="home-page-map-label">

                  <span>📍</span>

                  <div>
                    <strong>K.R.S Guest House</strong>
                    <small>
                      Sigandur, Karnataka
                    </small>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Location CTA */}

          <div className="home-page-location-cta">

            <div className="home-page-location-cta-content">

              <span>✨</span>

              <div>
                <h3>Planning a visit to Sigandur?</h3>

                <p>
                  Stay close to the temple in a comfortable
                  and peaceful guest house.
                </p>
              </div>

            </div>

            {/* BOOK NOW BUTTON */}

            <Link
              to="/contact"
              className="home-page-location-cta-button"
            >
              Book Now
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>

      {/* ================= FAQ — KEEP AT END ================= */}

      <section className="home-page-faq">

        <div className="home-page-section-heading">

          <span className="home-page-section-label">
            FAQ
          </span>

          <h2>
            Frequently Asked Questions
          </h2>

          <p>
            Everything you may want to know before your stay.
          </p>

        </div>

        <div className="home-page-faq-container">

          {homeFaqs.map((faq, index) => (

            <div
              className={`home-page-faq-item ${homeOpenFaq === index
                  ? "home-page-faq-open"
                  : ""
                }`}
              key={index}
            >

              <button
                type="button"
                className="home-page-faq-question"
                onClick={() => handleHomeFaqToggle(index)}
                aria-expanded={homeOpenFaq === index}
              >

                <span>
                  {faq.question}
                </span>

                <span className="home-page-faq-icon">
                  {homeOpenFaq === index ? "−" : "+"}
                </span>

              </button>

              <div
                className={`home-page-faq-answer ${homeOpenFaq === index
                    ? "home-page-faq-answer-show"
                    : ""
                  }`}
              >

                <p>
                  {faq.answer}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../analytics";
import "./Home.css";

// Static data lives outside the component so it isn't rebuilt on every render.
const IMAGES = [
  "/krs.png",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/f_auto,q_auto,w_1600/v1752135436/image1_a8nu2z.jpg",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/f_auto,q_auto,w_1600/v1752135435/image7_1_q4pgpx.jpg",
];

const PHONE = "+919448734152";
const DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=K.R.S+Guest+House+Sigandur";

const FACILITIES = [
  { icon: "🛕", title: "The temple is 350 meters away.", text: "A short walk to Sigandur Chowdeshwari Temple." },
  { icon: "🛏️", title: "Rooms for 2, 4 or 6", text: "Comfortable rooms for families and groups." },
  { icon: "🚿", title: "Bathroom with hot water", text: "Clean bathrooms with hot water and western toilets." },
  { icon: "🚗", title: "Free parking", text: "Park at the guest house at no extra cost." },
  { icon: "📹", title: "CCTV in common areas", text: "Added security for guests and the property." },
  { icon: "🤝", title: "Help when you need it", text: "Our local team is on hand throughout your stay." },
];

// Merged from 14 down to 8: removed repeats (bathroom x3, hot water, cleanliness, peaceful).
const FAQS = [
  { q: "How far is the guest house from the temple?", a: "About 350 meters, an easy walk to Sigandur Chowdeshwari Temple." },
  { q: "What room types do you have?", a: "2-occupancy rooms, 4-occupancy family rooms and 6-occupancy rooms." },
  { q: "Is it suitable for families?", a: "Yes. The 4- and 6-occupancy rooms are designed for families and small groups." },
  { q: "Do the rooms have bathrooms and hot water?", a: "Yes. Bathrooms have hot water and western-style toilets." },
  { q: "Is parking available?", a: "Yes, free parking is available for guests." },
  { q: "Is there security?", a: "CCTV cameras cover the common areas of the guest house." },
  { q: "What is the room price at KRS Guest House?", a: "Rates vary by room, season and availability. Call +91 94487 34152 or send an enquiry for the current tariff for your dates." },
  { q: "Are there lodges near Sigandur Chowdeshwari Temple?", a: "KRS Guest House offers rooms about 350 metres from Sigandur Chowdeshwari Temple. Call +91 94487 34152 or send an online enquiry to check availability and current rates." },
  { q: "How do I book a room at KRS Guest House?", a: "Send an online room enquiry or call +91 94487 34152 to check availability and confirm your booking directly." },
];

const Home = () => {
  const [selected, setSelected] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    // Respect users who prefer reduced motion: no auto-rotation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setSelected((i) => (i + 1) % IMAGES.length),
      6000
    );
    return () => clearInterval(timer);
  }, [selected]); // resets the timer when a thumbnail is clicked

  return (
    <main className="home-page">
      {/* HERO */}
      <section className="home-page-hero">
        <div className="home-page-hero-media">
          <img
            src={IMAGES[selected]}
            alt="K.R.S Guest House"
            className="home-page-hero-image"
            width="1600"
            height="900"
            loading={selected === 0 ? "eager" : "lazy"}
            fetchPriority={selected === 0 ? "high" : "auto"}
            decoding="async"
          />
          <div className="home-page-hero-overlay">
            <div className="home-page-hero-content">
              <p className="home-page-hero-kicker">K.R.S Guest House, Sigandur</p>
              <h1>Sigandur Rooms Near Chowdeshwari Temple</h1>
              <p className="home-page-hero-text">
                KRS Guest House offers clean, family-friendly rooms with free parking,
                350 meters from the temple. Enquire online for availability and current rates.
              </p>
              <div className="home-page-hero-actions">
                <a
                  href={`tel:${PHONE}`}
                  className="home-page-btn home-page-btn-gold"
                  onClick={() => trackEvent("contact", "click", "booking_phone_hero")}
                >
                  Call to book
                </a>
                <Link
                  to="/enquiry"
                  className="home-page-btn home-page-btn-glass"
                  onClick={() => trackEvent("booking", "click", "hero_check_availability")}
                >
                  Check availability
                </Link>
                <Link
                  to="/rooms"
                  className="home-page-btn home-page-btn-link"
                  onClick={() => trackEvent("booking", "click", "hero_view_rooms")}
                >
                  See room options
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="home-page-thumbs">
          {IMAGES.map((image, index) => (
            <button
              key={image}
              type="button"
              className={`home-page-thumb ${selected === index ? "is-active" : ""}`}
              onClick={() => setSelected(index)}
              aria-label={`View guest house image ${index + 1}`}
              aria-current={selected === index}
            >
              <img src={image} alt="" width="90" height="62" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </section>

      {/* TRUST + REVIEWS in one band */}
      <section className="home-page-band" aria-label="Why guests choose us">
        <ul className="home-page-trust">
          <li><strong>Book direct</strong><span>Talk to our local team</span></li>
          <li><strong>Family-friendly</strong><span>Rooms for every group size</span></li>
          <li><strong>350 m to the temple</strong><span>Easy to walk</span></li>
        </ul>
        <a
         href={DIRECTIONS_URL}
          className="home-page-review-link home-page-directions-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("navigation", "click", "get_directions_reviews_band")}
        >
          <span className="home-page-stars" aria-hidden="true">★★★★★</span>
          <span>Read guest reviews on Google</span>
        </a>
      </section>

      {/* FACILITIES */}
      <section className="home-page-section home-page-facilities">
        <div className="home-page-heading">
          <h2>Everything you need for a temple visit</h2>
          <p>
            Looking for a clean, affordable stay near Sigandur? We keep things
            simple, comfortable and close to the temple.
          </p>
        </div>
        <div className="home-page-facilities-grid">
          {FACILITIES.map((f) => (
            <article className="home-page-facility" key={f.title}>
              <span className="home-page-facility-icon" aria-hidden="true">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* LOCATION */}
      <section className="home-page-section home-page-location">
        <div className="home-page-heading">
          <h2>Find us in Sigandur</h2>
          <p>Use the map to plan your route before you travel.</p>
        </div>
        <div className="home-page-location-grid">
          <div className="home-page-location-card">
            <h3>K.R.S Guest House</h3>
            <dl>
              <div>
                <dt>Nearest landmark</dt>
                <dd>Sigandur Chowdeshwari Temple, about 350 meters away</dd>
              </div>
              <div>
                <dt>Good to know</dt>
                <dd>Free parking and guest support on site</dd>
              </div>
            </dl>
            <a
              href={DIRECTIONS_URL}
              className="home-page-btn home-page-btn-green"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("navigation", "click", "get_directions_home")}
            >
              Get directions
            </a>
          </div>

          <div className="home-page-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31019.448193263533!2d74.85408!3d14.071459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbc71f9a9acffc1%3A0x37552ae20c8ab25b!2sK.R.S%20Guest%20House!5e0!3m2!1sen!2sin!4v1699189485749!5m2!1sen!2sin"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="K.R.S Guest House location map"
            />
          </div>
        </div>
      </section>

      {/* BOOKING CTA (now visible on mobile too) */}
      <section className="home-page-cta" aria-label="Book your stay">
        <div>
          <h2>Planning a temple visit?</h2>
          <p>Ask about rooms and today's tariff. We reply directly.</p>
        </div>
        <div className="home-page-cta-actions">
          <Link
            to="/enquiry"
            className="home-page-btn home-page-btn-gold"
            onClick={() => trackEvent("booking", "click", "footer_check_availability")}
          >
            Check availability
          </Link>
          <a
            href={`tel:${PHONE}`}
            className="home-page-btn home-page-btn-glass"
            onClick={() => trackEvent("contact", "click", "footer_call")}
          >
            Call now
          </a>
        </div>
      </section>

      {/* FAQ (now visible on mobile too) */}
      <section className="home-page-section home-page-faq">
        <div className="home-page-heading">
          <h2>Questions before you stay</h2>
        </div>
        <div className="home-page-faq-list">
          {FAQS.map((faq, index) => {
            const open = openFaq === index;
            return (
              <div className={`home-page-faq-item ${open ? "is-open" : ""}`} key={faq.q}>
                <button
                  type="button"
                  className="home-page-faq-question"
                  id={`faq-q-${index}`}
                  aria-expanded={open}
                  aria-controls={`faq-a-${index}`}
                  onClick={() => setOpenFaq(open ? null : index)}
                >
                  <span>{faq.q}</span>
                  <span className="home-page-faq-icon" aria-hidden="true" />
                </button>
                <div
                  id={`faq-a-${index}`}
                  className="home-page-faq-answer"
                  role="region"
                  aria-labelledby={`faq-q-${index}`}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;
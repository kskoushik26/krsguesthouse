import React, { useEffect, useState } from "react";
import "./Location.css";

const Location = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading delay
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="location">
      <div className="location-container">
        {/* Room Types Section */}
        <div className="room-types-section">
          <h2>Room Types & Tariff</h2>
          <ul>
            <li>
              <strong>2-Occupancy Room:</strong> Rates vary depending on the
              season.
            </li>
            <li>
              <strong>4-Occupancy Family Room:</strong> Rates vary depending on
              the season.
            </li>
            <li>
              <strong>6-Occupancy Room:</strong> Rates vary depending on the
              season.
            </li>
          </ul>
          <p>
            For detailed pricing and availability, please contact us with your
            preferred dates.
          </p>
        </div>

        {/* Location Section */}
        <div className="location-section">
          <h2>Location</h2>
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
              <p className="loading-text">Loading map...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
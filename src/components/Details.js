import React from "react";
import "./Details.css";

const Details = () => {
  const policies = [
    {
      icon: "🐾",
      text: "Pets are not allowed inside the room.",
      important: true,
    },
    {
      icon: "🍳",
      text: "Cooking is not permitted inside the rooms or near the guest house.",
      important: true,
    },
    {
      icon: "💑",
      text: "Not available for unmarried couples.",
    },
    {
      icon: "👤",
      text: "Single occupancy (only one person) room bookings are not accepted.",
    },
    {
      icon: "🚭",
      text: "Smoking is strictly prohibited inside the rooms.",
    },
    {
      icon: "🍷",
      text: "Alcohol consumption is not allowed on the premises.",
    },
    {
      icon: "🪪",
      text: "Guests must carry a valid ID proof at the time of check-in.",
    },
  ];

  return (
    <main className="details-page">
      <div className="details-container">

        {/* Header */}
        <header className="details-header">
          <span className="header-badge">PROPERTY INFORMATION</span>

          <h1>Guest House Policies</h1>

          <p>
            Please review the following check-in details and house rules
            before making your reservation.
          </p>
        </header>

        {/* Check-in / Check-out */}
        <section className="details-card">
          <div className="section-heading">
            <div className="section-icon">🕐</div>

            <div>
              <h2>Check-in & Check-out</h2>
              <p>Plan your arrival and departure accordingly.</p>
            </div>
          </div>

          <div className="timing-grid">
            <div className="timing-card">
              <div className="timing-icon">→</div>

              <div className="timing-content">
                <span>Check-in</span>
                <strong>After 4:00 PM</strong>
              </div>
            </div>

            <div className="timing-card">
              <div className="timing-icon checkout">←</div>

              <div className="timing-content">
                <span>Check-out</span>
                <strong>Before 10:00 AM</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Rules */}
        <section className="details-card rules-card">
          <div className="section-heading">
            <div className="section-icon">📋</div>

            <div>
              <h2>Rules & Regulations</h2>
              <p>Important information for all guests.</p>
            </div>
          </div>

          <div className="rules-list">
            {policies.map((policy, index) => (
              <div
                className={`rule-item ${
                  policy.important ? "important-rule" : ""
                }`}
                key={index}
              >
                <div className="rule-icon">{policy.icon}</div>

                <p>{policy.text}</p>

                {policy.important && (
                  <span className="important-badge">Important</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer note */}
        <div className="policy-note">
          <span>ℹ️</span>
          <p>
            By making a reservation, guests agree to follow all property
            rules and regulations during their stay.
          </p>
        </div>

      </div>
    </main>
  );
};

export default Details;

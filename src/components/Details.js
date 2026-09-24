import React from "react";
import {
  FaClock,
  FaArrowRight,
  FaArrowLeft,
  FaPaw,
  FaUtensils,
  FaUserFriends,
  FaUser,
  FaSmokingBan,
  FaWineBottle,
  FaIdCard,
  FaInfoCircle,
  FaCalendarCheck,
} from "react-icons/fa";
import "./Details.css";

const Details = () => {
  const policies = [
    {
      icon: <FaPaw />,
      text: "Pets are not allowed inside the rooms.",
      important: true,
    },
    {
      icon: <FaUtensils />,
      text: "Cooking is not permitted inside the rooms or near the guest house.",
      important: true,
    },
    {
      icon: <FaUserFriends />,
      text: "Accommodation is not available for unmarried couples.",
    },
    {
      icon: <FaUser />,
      text: "Single occupancy bookings are not accepted.",
    },
    {
      icon: <FaSmokingBan />,
      text: "Smoking is strictly prohibited inside the rooms.",
    },
    {
      icon: <FaWineBottle />,
      text: "Alcohol consumption is not allowed on the premises.",
    },
    {
      icon: <FaIdCard />,
      text: "Guests must carry a valid government-issued ID proof at check-in.",
    },
  ];

  return (
    <main className="details-page">
      <div className="details-container">

        {/* Header */}
        <header className="details-header">
          <div className="header-badge">
            <span className="badge-line" />
            PROPERTY INFORMATION
            <span className="badge-line" />
          </div>

          <h1>
            Guest House <span>Policies</span>
          </h1>

          <p>
            Everything you need to know before your stay at
            <strong> KRS Guest House</strong>.
          </p>
        </header>

        {/* Stay Timings */}
        <section className="details-card timing-section">
          <div className="section-heading">
            <div className="section-icon">
              <FaClock />
            </div>

            <div>
              <span className="section-label">YOUR STAY</span>
              <h2>Check-in & Check-out</h2>
              <p>Plan your arrival and departure comfortably.</p>
            </div>
          </div>

          <div className="timing-grid">
            <div className="timing-card">
              <div className="timing-icon">
                <FaArrowRight />
              </div>

              <div className="timing-content">
                <span>CHECK-IN</span>
                <strong>After 4:00 PM</strong>
                <small>Arrival time</small>
              </div>
            </div>

            <div className="timing-card checkout">
              <div className="timing-icon">
                <FaArrowLeft />
              </div>

              <div className="timing-content">
                <span>CHECK-OUT</span>
                <strong>Before 10:00 AM</strong>
                <small>Departure time</small>
              </div>
            </div>
          </div>

          {/* Extension */}
          <div className="info-panel extension-panel">
            <div className="info-panel-icon">
              <FaClock />
            </div>

            <div className="info-panel-content">
              <span className="info-label">EXTENSION</span>

              <p>
                Early check-in is subject to availability. Guests may call on
                the arrival date to confirm availability and receive the
                updated check-in timing.
              </p>

              <p>
                Late check-out requests will be confirmed at the time of
                check-in, depending on room availability and the situation.
              </p>
            </div>
          </div>

          {/* Cancellation */}
          <div className="info-panel cancellation-panel">
            <div className="info-panel-icon">
              <FaCalendarCheck />
            </div>

            <div className="info-panel-content">
              <span className="info-label">CANCELLATION</span>

              <p>
                Cancellations are allowed up to <strong>48 hours</strong>{" "}
                before the check-in date, subject to nominal charges.
              </p>
            </div>
          </div>
        </section>

        {/* Rules */}
        <section className="details-card rules-card">
          <div className="section-heading">
            <div className="section-icon">
              <FaInfoCircle />
            </div>

            <div>
              <span className="section-label">PLEASE NOTE</span>
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

                <div className="rule-content">
                  <p>{policy.text}</p>

                  {policy.important && (
                    <span className="important-badge">
                      Important
                    </span>
                  )}
                </div>

                <span className="rule-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Note */}
        <div className="policy-note">
          <div className="policy-note-icon">
            <FaInfoCircle />
          </div>

          <div>
            <strong>Guest acknowledgement</strong>
            <p>
              By making a reservation, guests agree to follow all property
              rules and regulations during their stay.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Details;
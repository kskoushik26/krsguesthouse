import React from "react";
import "./Details.css"; 
const Details = () => {
  return (
    <div className="instruction-container">
      <h2>Guest House Policies</h2>

      <div className="instruction-section">
        <h3>Check-in & Check-out</h3>
        <p className="timing-text"><strong>Check-in:</strong>After 4:00 PM</p>
        <p className="timing-text"><strong>Check-out:</strong> Before 10:00 AM</p>
      </div>

      <div className="instruction-section">
        <h3>Rules & Regulation</h3>
        <ul>
    <li><b className="instruction-text">Pets are not allowed inside the room.</b></li>
    <li><b className="instruction-text">Cooking is not permitted inside the rooms or near the guest house.</b></li>
    <li>Not available for unmarried couples.</li>
    <li>Single occupancy (only one person) room bookings are not accepted.</li>
    <li>Smoking is strictly prohibited inside the rooms.</li>
    <li>Alcohol consumption is not allowed on the premises.</li>
    <li>Guests must carry a valid ID proof at the time of check-in.</li>
     </ul>
      </div>
    </div>
  );
};

export default Details;

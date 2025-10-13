import React, { useState } from "react";
import "./About.css";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    question: "",
    checkin: "",
    checkout: "",
    members: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.email.trim()) newErrors.email = "Email address is required.";

    // ✅ Check-in validation
    if (!formData.checkin.trim()) {
      newErrors.checkin = "Check-in date is required.";
    } else if (formData.checkin < today) {
      newErrors.checkin = "Check-in date cannot be in the past.";
    }

    // ✅ Check-out validation
    if (!formData.checkout.trim()) {
      newErrors.checkout = "Check-out date is required.";
    } else if (formData.checkout < formData.checkin) {
      newErrors.checkout = "Check-out date cannot be before check-in.";
    }

    // ✅ Members validation
    if (!formData.members.trim() || isNaN(formData.members) || formData.members <= 0) {
      newErrors.members = "Number of members must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await fetch("https://formspree.io/f/xldjvgdp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        question: "",
        checkin: "",
        checkout: "",
        members: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };


  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <section className="hero">
      <div className="overlay">
        <div className="content">
          <h1>Welcome to KRS Guest House</h1>
          <p>
            With the divine blessings of Sigandur Chowdeshwari Matha, we have
            built a serene retreat just 400 meters from the temple, offering a
            peaceful haven on the tranquil banks of the Sharavathi River for
            spiritual seekers and nature lovers alike.
          </p>

          <form onSubmit={handleSubmit} className="enquiry-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}



            {/* ✅ Check-in Date Field */}
            <input
              type="text"
              name="checkin"
              placeholder="Please select Check-in Date"
              value={formData.checkin}
              onFocus={(e) => {
                e.target.type = "date";
                e.target.showPicker?.();
              }}
              onBlur={(e) => {
                if (!formData.checkin) e.target.type = "text";
              }}
              min={todayDate}
              onChange={handleChange}
              required
            />
            {errors.checkin && <p className="error">{errors.checkin}</p>}

            <input
              type="text"
              name="checkout"
              placeholder="Please select Check-out Date"
              value={formData.checkout}
              onFocus={(e) => {
                e.target.type = "date";
                e.target.showPicker?.();
              }}
              onBlur={(e) => {
                if (!formData.checkout) e.target.type = "text";
              }}
              min={formData.checkin || todayDate}
              onChange={handleChange}
              required
            />
            {errors.checkout && <p className="error">{errors.checkout}</p>}

            <input
              type="number"
              name="members"
              placeholder="Number of Members"
              value={formData.members}
              onChange={handleChange}
              required
            />
            {errors.members && <p className="error">{errors.members}</p>}

            <textarea
              name="question"
              placeholder="Additional Question"
              value={formData.question}
              onChange={handleChange}
            />
            {errors.question && <p className="error">{errors.question}</p>}

            <button type="submit">Submit Enquiry</button>
            {submitted && (
              <p className="success">
                Thank you! We will get back to you soon. Please check your email
                for our response. if its urgent please call us to 9448734152
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default About;

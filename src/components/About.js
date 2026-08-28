import React, { useState } from "react";
import "./About.css";

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  question: "",
  checkin: "",
  checkout: "",
  members: "",
};

const About = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const todayDate = new Date().toISOString().split("T")[0];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error while typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (submitted) {
      setSubmitted(false);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    }

    if (!formData.checkin) {
      newErrors.checkin = "Please select a check-in date.";
    } else if (formData.checkin < todayDate) {
      newErrors.checkin = "Check-in date cannot be in the past.";
    }

    if (!formData.checkout) {
      newErrors.checkout = "Please select a check-out date.";
    } else if (
      formData.checkin &&
      formData.checkout <= formData.checkin
    ) {
      newErrors.checkout = "Check-out must be after check-in.";
    }

    if (
      !formData.members ||
      Number(formData.members) <= 0 ||
      !Number.isInteger(Number(formData.members))
    ) {
      newErrors.members = "Please enter a valid number of guests.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitted(false);

    try {
      const response = await fetch(
        "https://formspree.io/f/xldjvgdp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setSubmitted(true);
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);

      setErrors({
        form:
          "Something went wrong. Please try again or call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="hero">

      {/* Decorative Background Glows */}
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />

      <div className="overlay">

        <div className="content">

          {/* =====================================================
              INTRODUCTION
              ===================================================== */}

          <div className="intro">

            <span className="eyebrow">
              ✦ Welcome to KRS Guest House ✦
            </span>

            <h1>
              Stay Close to
              <span> Sigandur Chowdeshwari Temple</span>
            </h1>

            <div className="title-line" />

            <p className="description">
              With the divine blessings of Sigandur Chowdeshwari
              Matha, KRS Guest House offers a peaceful and comfortable
              stay near the sacred temple. Surrounded by the natural
              beauty and spiritual atmosphere of Sigandur, our guest
              house is a welcoming place for devotees, families, and
              travellers seeking a calm and memorable stay.
            </p>

            {/* Highlights */}
            <div className="highlights">

              <span>
                🛕 Near Sigandur Temple
              </span>

              <span>
                🙏 Divine Blessings
              </span>

              <span>
                🌿 Peaceful Surroundings
              </span>

            </div>

          </div>


          {/* =====================================================
              ENQUIRY FORM CARD
              ===================================================== */}

          <div className="form-card">

            <div className="form-heading">

              <span className="form-icon">
                ✦
              </span>

              <div>
                <h2>
                  Plan Your Stay
                </h2>

                <p>
                  Send us your details and we'll get back to you.
                </p>
              </div>

            </div>


            <form
              onSubmit={handleSubmit}
              className="enquiry-form"
              noValidate
            >

              {/* =================================================
                  NAME
                  ================================================= */}

              <div className="field">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />

                {errors.name && (
                  <span className="error">
                    {errors.name}
                  </span>
                )}

              </div>


              {/* =================================================
                  PHONE
                  ================================================= */}

              <div className="field">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  inputMode="tel"
                  required
                />

                {errors.phone && (
                  <span className="error">
                    {errors.phone}
                  </span>
                )}

              </div>


              {/* =================================================
                  EMAIL
                  ================================================= */}

              <div className="field full-width">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />

                {errors.email && (
                  <span className="error">
                    {errors.email}
                  </span>
                )}

              </div>


              {/* =================================================
                  CHECK-IN
                  ================================================= */}

              <div className="field">

                <label htmlFor="checkin">
                  Check-in
                </label>

                <input
                  id="checkin"
                  type="date"
                  name="checkin"
                  value={formData.checkin}
                  min={todayDate}
                  onChange={handleChange}
                  required
                />

                {errors.checkin && (
                  <span className="error">
                    {errors.checkin}
                  </span>
                )}

              </div>


              {/* =================================================
                  CHECK-OUT
                  ================================================= */}

              <div className="field">

                <label htmlFor="checkout">
                  Check-out
                </label>

                <input
                  id="checkout"
                  type="date"
                  name="checkout"
                  value={formData.checkout}
                  min={formData.checkin || todayDate}
                  onChange={handleChange}
                  required
                />

                {errors.checkout && (
                  <span className="error">
                    {errors.checkout}
                  </span>
                )}

              </div>


              {/* =================================================
                  NUMBER OF GUESTS
                  ================================================= */}

              <div className="field">

                <label htmlFor="members">
                  Number of Guests
                </label>

                <input
                  id="members"
                  type="number"
                  name="members"
                  placeholder="e.g. 4"
                  min="1"
                  step="1"
                  value={formData.members}
                  onChange={handleChange}
                  inputMode="numeric"
                  required
                />

                {errors.members && (
                  <span className="error">
                    {errors.members}
                  </span>
                )}

              </div>


              {/* =================================================
                  ADDITIONAL MESSAGE
                  ================================================= */}

              <div className="field full-width">

                <label htmlFor="question">

                  Additional Message

                  <span className="optional">
                    Optional
                  </span>

                </label>

                <textarea
                  id="question"
                  name="question"
                  placeholder="Any questions or special requirements?"
                  value={formData.question}
                  onChange={handleChange}
                  rows="4"
                />

              </div>


              {/* =================================================
                  FORM ERROR
                  ================================================= */}

              {errors.form && (
                <div className="form-error">
                  {errors.form}
                </div>
              )}


              {/* =================================================
                  SUBMIT BUTTON
                  ================================================= */}

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >

                <span>
                  {isSubmitting
                    ? "Sending Enquiry..."
                    : "Send Enquiry"}
                </span>

                {!isSubmitting && (
                  <span className="button-arrow">
                    →
                  </span>
                )}

              </button>


              {/* =================================================
                  PRIVACY NOTE
                  ================================================= */}

              <p className="privacy-note">
                🔒 Your information is only used to respond to
                your enquiry.
              </p>


              {/* =================================================
                  SUCCESS MESSAGE
                  ================================================= */}

              {submitted && (
                <div className="success">

                  <span className="success-icon">
                    ✓
                  </span>

                  <div>

                    <strong>
                      Enquiry sent successfully!
                    </strong>

                    <p>
                      Thank you for contacting KRS Guest House.
                      We will get back to you soon. For urgent
                      enquiries, please call{" "}
                      <strong>9448734152</strong>.
                    </p>

                  </div>

                </div>
              )}

            </form>

          </div>


          {/* =====================================================
              FOOTER TEXT
              ===================================================== */}

          <div className="bottom-note">

            <span />

            Blessed Stay • Peaceful Surroundings • Sigandur

            <span />

          </div>

        </div>

      </div>

    </main>
  );
};

export default About;

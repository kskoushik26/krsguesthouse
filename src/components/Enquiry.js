import React, { useState } from "react";
import "./Enquiry.css";

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  question: "",
  checkin: "",
  checkout: "",
  members: "",
};

const Enquiry = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const todayDate = new Date().toISOString().split("T")[0];

  /* =========================================================
     HANDLE INPUT CHANGES
     ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear individual field error while typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Hide previous success message if user starts editing again
    if (submitted) {
      setSubmitted(false);
    }
  };


  /* =========================================================
     VALIDATE FORM
     ========================================================= */

  const validateForm = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (
      formData.phone.replace(/\D/g, "").length < 10
    ) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Check-in
    if (!formData.checkin) {
      newErrors.checkin = "Please select a check-in date.";
    } else if (formData.checkin < todayDate) {
      newErrors.checkin =
        "Check-in date cannot be in the past.";
    }

    // Check-out
    if (!formData.checkout) {
      newErrors.checkout =
        "Please select a check-out date.";
    } else if (
      formData.checkin &&
      formData.checkout <= formData.checkin
    ) {
      newErrors.checkout =
        "Check-out must be after check-in.";
    }

    // Number of guests
    if (
      !formData.members ||
      Number(formData.members) <= 0 ||
      !Number.isInteger(Number(formData.members))
    ) {
      newErrors.members =
        "Please enter a valid number of guests.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  /* =========================================================
     HANDLE FORM SUBMISSION
     ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Stop submission if validation fails
    if (!validateForm()) {
      return;
    }

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

          body: JSON.stringify({
            ...formData,

            // Helpful subject for Formspree emails
            _subject: `New Stay Enquiry from ${formData.name}`,

            // Human-readable guest details
            enquiry_type: "Guest House Stay Enquiry",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      // Successful submission
      setSubmitted(true);

      setFormData(initialFormData);

      setErrors({});

    } catch (error) {
      console.error(
        "Error submitting enquiry:",
        error
      );

      setErrors({
        form:
          "Something went wrong. Please try again or call us directly.",
      });

    } finally {
      setIsSubmitting(false);
    }
  };


  /* =========================================================
     JSX
     ========================================================= */

  return (
    <main className="hero">

      {/* =====================================================
          BACKGROUND EFFECTS
          ===================================================== */}

      <div
        className="hero-glow hero-glow-one"
        aria-hidden="true"
      />

      <div
        className="hero-glow hero-glow-two"
        aria-hidden="true"
      />


      {/* =====================================================
          MAIN GLASS CONTAINER
          ===================================================== */}

      <div className="overlay">

        <div className="content">


          {/* =================================================
              INTRODUCTION
              ================================================= */}

          <section
            className="intro"
            aria-labelledby="enquiry-title"
          >

            <span className="eyebrow">
              ✦ KRS Guest House ✦
            </span>


            <h1 id="enquiry-title">
              Make an
              <span> Enquiry</span>
            </h1>


            <div
              className="title-line"
              aria-hidden="true"
            />


            <p className="description">
              Planning a peaceful stay near Siganduru
              Chowdeshwari Temple? Send us your stay details
              and our team will get back to you with
              availability and further information.
            </p>


            {/* Highlights */}

            <div
              className="highlights"
              aria-label="Guest house highlights"
            >

              <span>
                🛕 Near Siganduru Temple
              </span>

              <span>
                🏡 Comfortable Stay
              </span>

              <span>
                🌿 Peaceful Surroundings
              </span>

            </div>

          </section>


          {/* =================================================
              ENQUIRY FORM CARD
              ================================================= */}

          <section
            className="form-card"
            aria-labelledby="stay-enquiry-title"
          >


            {/* FORM HEADER */}

            <div className="form-heading">

              <span
                className="form-icon"
                aria-hidden="true"
              >
                ✦
              </span>


              <div>

                <h2 id="stay-enquiry-title">
                  Stay Enquiry
                </h2>

                <p>
                  Tell us about your visit and we'll contact you.
                </p>

              </div>

            </div>


            {/* =================================================
                FORM
                ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="enquiry-form"
              noValidate
            >


              {/* =================================================
                  FULL NAME
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
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name
                      ? "name-error"
                      : undefined
                  }
                />

                {errors.name && (
                  <span
                    id="name-error"
                    className="error"
                  >
                    {errors.name}
                  </span>
                )}

              </div>


              {/* =================================================
                  PHONE NUMBER
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
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={
                    errors.phone
                      ? "phone-error"
                      : undefined
                  }
                />

                {errors.phone && (
                  <span
                    id="phone-error"
                    className="error"
                  >
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
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email
                      ? "email-error"
                      : undefined
                  }
                />

                {errors.email && (
                  <span
                    id="email-error"
                    className="error"
                  >
                    {errors.email}
                  </span>
                )}

              </div>


              {/* =================================================
                  CHECK-IN
                  ================================================= */}

              <div className="field">

                <label htmlFor="checkin">
                  Check-in Date
                </label>

                <input
                  id="checkin"
                  type="date"
                  name="checkin"
                  value={formData.checkin}
                  min={todayDate}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.checkin)}
                  aria-describedby={
                    errors.checkin
                      ? "checkin-error"
                      : undefined
                  }
                />

                {errors.checkin && (
                  <span
                    id="checkin-error"
                    className="error"
                  >
                    {errors.checkin}
                  </span>
                )}

              </div>


              {/* =================================================
                  CHECK-OUT
                  ================================================= */}

              <div className="field">

                <label htmlFor="checkout">
                  Check-out Date
                </label>

                <input
                  id="checkout"
                  type="date"
                  name="checkout"
                  value={formData.checkout}
                  min={
                    formData.checkin ||
                    todayDate
                  }
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.checkout)}
                  aria-describedby={
                    errors.checkout
                      ? "checkout-error"
                      : undefined
                  }
                />

                {errors.checkout && (
                  <span
                    id="checkout-error"
                    className="error"
                  >
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
                  aria-invalid={Boolean(errors.members)}
                  aria-describedby={
                    errors.members
                      ? "members-error"
                      : undefined
                  }
                />

                {errors.members && (
                  <span
                    id="members-error"
                    className="error"
                  >
                    {errors.members}
                  </span>
                )}

              </div>


              {/* =================================================
                  ADDITIONAL MESSAGE
                  ================================================= */}

              <div className="field full-width">

                <label htmlFor="question">

                  Message

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
                <div
                  className="form-error"
                  role="alert"
                >
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
                aria-busy={isSubmitting}
              >

                <span>
                  {isSubmitting
                    ? "Sending Enquiry..."
                    : "Send Enquiry"}
                </span>

                {!isSubmitting && (
                  <span
                    className="button-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}

              </button>


              {/* =================================================
                  PRIVACY NOTE
                  ================================================= */}

              <p className="privacy-note">
                🔒 Your information is only used to respond
                to your enquiry.
              </p>


              {/* =================================================
                  SUCCESS MESSAGE
                  ================================================= */}

              {submitted && (
                <div
                  className="success"
                  role="status"
                  aria-live="polite"
                >

                  <span
                    className="success-icon"
                    aria-hidden="true"
                  >
                    ✓
                  </span>


                  <div>

                    <strong>
                      Enquiry sent successfully!
                    </strong>

                    <p>
                      Thank you for contacting KRS Guest
                      House. We will get back to you soon.
                      For urgent enquiries, please call{" "}
                      <strong>9448734152</strong>.
                    </p>

                  </div>

                </div>
              )}

            </form>

          </section>


          {/* =====================================================
              BOTTOM NOTE
              ===================================================== */}

          <div className="bottom-note">

            <span aria-hidden="true" />

            Your Stay • Your Comfort • Your Peace

            <span aria-hidden="true" />

          </div>

        </div>

      </div>

    </main>
  );
};

export default Enquiry;

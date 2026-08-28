import React from "react";
import "./attraction.css";

const attractions = [
  {
    name: "ಶ್ರೀ ಸಿಗಂದೂರು ಚೌಡೇಶ್ವರಿ ದೇವಾಲಯ",
    description:
      "ಅಪಾರ ಮಹಿಮೆಯುಳ್ಳ ದೈವೀ ಶಕ್ತಿ ಪೀಠಗಳಲ್ಲಿ ಶ್ರೀ ಸಿಗಂದೂರು ಚೌಡೇಶ್ವರಿ ಅಮ್ಮನವರ ಕ್ಷೇತ್ರವೂ ಒಂದು. ಇಲ್ಲಿನ ದೇವಿಯ ದರ್ಶನವನ್ನು ಪಡೆಯಲು ದೇಶ ವಿದೇಶಗಳಿಂದ ಭಕ್ತರು ಭೇಟಿ ನೀಡುತ್ತಾರೆ. ಶ್ರೀ ಸಿಗಂದೂರು ಚೌಡೇಶ್ವರಿ ದೇವಸ್ಥಾನವು ಭಾರತದ ಕರ್ನಾಟಕ ರಾಜ್ಯದ ಶಿವಮೊಗ್ಗದ ಸಿಗಂದೂರು, ಕಳಸವಳ್ಳಿಯಲ್ಲಿದೆ. ಈ ದೈವಿಕ ದೇವಾಲಯವು ಸಿಗಂದೂರು ಗ್ರಾಮದ ಪ್ರಮುಖ ಆಕರ್ಷಣೆಯ ಶಕ್ತಿಯಾಗಿದೆ.",
    distance: "0.4 km",
    image:
      "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752135450/Sigandur_vjoo4p.png",
  },
  {
    name: "ಶರಾವತಿ ನದಿ",
    description:
      "ಶರಾವತಿ ನದಿಯು ತೀರ್ಥಹಳ್ಳಿ ತಾಲೂಕಿನ ಅಂಬುತೀರ್ಥ ಎಂಬ ಸ್ಥಳದಲ್ಲಿ ಹುಟ್ಟುತ್ತದೆ. ಪುರಾತನ ದಂತಕಥೆಯ ಪ್ರಕಾರ, ರಾಮ ದೇವರು ತನ್ನ ಬಾಣದಿಂದ ನೆಲವನ್ನು ಹೊಡೆದಾಗ ನೀರು ಉಕ್ಕಿ ಬಂದು ಸೀತೆಯ ಬಾಯಾರಿಕೆಯನ್ನು ನೀಗಿಸಿತು. ಈ ಘಟನೆಯೊಂದಿಗೆ ನದಿಯ ಉಗಮ ಸಂಬಂಧಿಸಿದೆ ಎಂಬ ನಂಬಿಕೆಯಿದೆ.",
    distance: "4 km",
    image:
      "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042708/Sharavthi_swysvo.png",
  },
  {
    name: "ಸಿಗಂದೂರು ಸೇತುವೆ",
    description:
      "ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆಯಲ್ಲಿರುವ ಸಿಗಂದೂರು ಸೇತುವೆಯು 2.44 ಕಿ.ಮೀ. ಉದ್ದವಿರುವ ಭಾರತದ ಪ್ರಮುಖ ಒಳನಾಡು ಕೇಬಲ್ ತಂಗುವ ಸೇತುವೆಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ಶರಾವತಿ ನದಿಯ ಮೇಲೆ ನಿರ್ಮಿಸಲಾಗಿರುವ ಈ ಸೇತುವೆಯು ಸಾಗರ ಮತ್ತು ಸಿಗಂದೂರು ನಡುವಿನ ಪ್ರಯಾಣವನ್ನು ಸುಗಮಗೊಳಿಸುತ್ತದೆ.",
    distance: "4 km",
    image: "/bridge.jpeg",
  },
  {
    name: "ಜೋಗ ಜಲಪಾತ",
    description:
      "ಜೋಗ ಜಲಪಾತವು ಕರ್ನಾಟಕದ ಅತ್ಯಂತ ಪ್ರಸಿದ್ಧ ಪ್ರವಾಸಿ ತಾಣಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ಮಳೆ ಮತ್ತು ಋತುವಿನ ಆಧಾರದ ಮೇಲೆ ಇದರ ನೀರಿನ ಹರಿವು ಬದಲಾಗುತ್ತದೆ. ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆಯ ಸಾಗರ ತಾಲ್ಲೂಕಿನಲ್ಲಿರುವ ಜೋಗ ಜಲಪಾತವು ಪ್ರಕೃತಿ ಪ್ರಿಯರಿಗೆ ಅದ್ಭುತ ಅನುಭವವನ್ನು ನೀಡುತ್ತದೆ.",
    distance: "70 km",
    image:
      "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042711/jogfalls_sfaqdp.png",
  },
  {
    name: "ಕೊಡಚಾದ್ರಿ",
    description:
      "ಕೊಡಚಾದ್ರಿಯು ದಟ್ಟವಾದ ಕಾಡುಗಳನ್ನು ಹೊಂದಿರುವ ಸುಂದರ ಪರ್ವತ ಶಿಖರವಾಗಿದೆ. ಸಮುದ್ರ ಮಟ್ಟದಿಂದ ಸುಮಾರು 1343 ಮೀಟರ್ ಎತ್ತರದಲ್ಲಿರುವ ಈ ಪ್ರದೇಶವು ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ನೈಸರ್ಗಿಕ ಪ್ರವಾಸಿ ತಾಣಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ.",
    distance: "40 km",
    image:
      "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042705/kodachadri_gqgvgc.avif",
  },
  {
    name: "ಕೊಲ್ಲೂರು ಮೂಕಾಂಬಿಕಾ ದೇವಸ್ಥಾನ",
    description:
      "ಕೊಲ್ಲೂರು ಮೂಕಾಂಬಿಕಾ ದೇವಸ್ಥಾನವು ಕರ್ನಾಟಕದ ಅತ್ಯಂತ ಪ್ರಸಿದ್ಧ ದೇವಾಲಯಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ಪರಶುರಾಮನು ಸೃಷ್ಟಿಸಿದ ಮೋಕ್ಷದ ಏಳು ವಾಸಸ್ಥಾನಗಳಲ್ಲಿ ಇದು ಒಂದು ಎಂದು ನಂಬಲಾಗಿದೆ. ದೇವಿಯನ್ನು ಮಾತು ಮತ್ತು ಅಕ್ಷರಗಳ ದೇವತೆಯಾಗಿ ಭಕ್ತರು ಆರಾಧಿಸುತ್ತಾರೆ.",
    distance: "50 km",
    image:
      "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752135439/kollur_y37ke2.png",
  },
  {
    name: "ಶ್ರೀ ಶ್ರೀಧರ ಸ್ವಾಮಿ ಆಶ್ರಮ, ವರದಹಳ್ಳಿ",
    description:
      "ಕರ್ನಾಟಕದ ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆಯ ವರದಹಳ್ಳಿ ಗ್ರಾಮದಲ್ಲಿರುವ ಶ್ರೀ ಶ್ರೀಧರ ಸ್ವಾಮಿ ಆಶ್ರಮವು ಪ್ರಸಿದ್ಧ ಆಧ್ಯಾತ್ಮಿಕ ತಾಣವಾಗಿದೆ. ಶ್ರೀಧರ ಸ್ವಾಮಿಗಳು ತಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ಸಾಧನೆಯನ್ನು ಮುಂದುವರಿಸಲು ಈ ಆಶ್ರಮವನ್ನು ಸ್ಥಾಪಿಸಿದರು.",
    distance: "38 km",
    image:
      "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752135431/varadhalli_pbvq0i.webp",
  },
  {
    name: "ಕೆಳದಿ ರಾಮೇಶ್ವರ ದೇವಸ್ಥಾನ",
    description:
      "ಕೆಳದಿಯ ರಾಮೇಶ್ವರ ದೇಗುಲವು ತನ್ನ ಐತಿಹಾಸಿಕ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪದ ವೈಶಿಷ್ಟ್ಯಗಳಿಂದ ಪ್ರಸಿದ್ಧವಾಗಿದೆ. ದೇವಾಲಯದ ಆವರಣದಲ್ಲಿ ಹಳಗನ್ನಡದ ಬರಹಗಳು ಹಾಗೂ ಹಲವು ಐತಿಹಾಸಿಕ ಕಲಾಕೃತಿಗಳನ್ನು ಕಾಣಬಹುದು.",
    distance: "46 km",
    image:
      "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042712/keladi_mmqdxm.jpg",
  },
  {
    name: "ಇಕ್ಕೇರಿ-ಅಘೋರೇಶ್ವರ ದೇವಸ್ಥಾನ",
    description:
      "ಅಘೋರೇಶ್ವರ ದೇವಸ್ಥಾನವು ಹೊಯ್ಸಳ-ಕದಂಬ ಶೈಲಿಯ ವಾಸ್ತುಶಿಲ್ಪಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ. ಗರ್ಭಗೃಹ, ಅರ್ಧಮಂಟಪ, ಮುಖಮಂಟಪ ಮತ್ತು ನಂದಿಗೆ ಪ್ರತ್ಯೇಕ ಮಂಟಪವನ್ನು ಹೊಂದಿರುವ ಈ ದೇವಾಲಯವು ಅದ್ಭುತ ಕಲ್ಲಿನ ಕೆತ್ತನೆಗಳಿಂದ ಕೂಡಿದೆ.",
    distance: "36 km",
    image:
      "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042709/ikkeri_zm4b95.jpg",
  },
];

const AttractionsList = () => {
  return (
    <main className="attractions-page">

      {/* Hero Section */}
      <section className="attractions-hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-small-title">
            ✦ ಸಿಗಂದೂರು ಮತ್ತು ಸುತ್ತಮುತ್ತ
          </span>

          <h1>ಪ್ರವಾಸಿ ತಾಣಗಳು</h1>

          <p>
            ಪ್ರಕೃತಿ, ಆಧ್ಯಾತ್ಮ, ಇತಿಹಾಸ ಮತ್ತು ಸಂಸ್ಕೃತಿಯ
            ಅದ್ಭುತ ಅನುಭವವನ್ನು ನೀಡುವ ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ
          </p>

          <div className="hero-line"></div>
        </div>
      </section>

      {/* Introduction */}
      <section className="attractions-intro">
        <span className="section-label">EXPLORE</span>

        <h2>
          ನಿಮ್ಮ ಮುಂದಿನ <span>ಪ್ರಯಾಣದ ತಾಣ</span>
        </h2>

        <p>
          KRS Guest House ಸುತ್ತಮುತ್ತಲಿನ ಪ್ರಸಿದ್ಧ ದೇವಾಲಯಗಳು,
          ಜಲಪಾತಗಳು, ನದಿಗಳು, ಪರ್ವತಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ಸ್ಥಳಗಳನ್ನು
          ಅನ್ವೇಷಿಸಿ.
        </p>
      </section>

      {/* Attractions */}
      <section className="attractions-grid">
        {attractions.map((attraction, index) => (
          <article
            className="attraction-card"
            key={index}
          >
            <div className="image-wrapper">
              <img
                src={attraction.image}
                alt={attraction.name}
                className="attraction-image"
                loading="lazy"
              />

              <div className="image-gradient"></div>

              <span className="attraction-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="distance-badge">
                📍 {attraction.distance}
              </span>
            </div>

            <div className="attraction-info">
              <h3>{attraction.name}</h3>

              <div className="title-line"></div>

              <p>{attraction.description}</p>

              <div className="card-footer">
                <span>✦ KRS Guest House</span>
                <span className="explore-arrow">→</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="attractions-bottom">
        <div>
          <span>ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ</span>
          <h2>ಪ್ರಕೃತಿಯ ಸೌಂದರ್ಯವನ್ನು ಅನುಭವಿಸಿ</h2>
        </div>

        <div className="bottom-decoration">
          ✦
        </div>
      </section>

    </main>
  );
};

export default AttractionsList;

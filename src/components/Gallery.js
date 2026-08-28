import React, { useState } from "react";
import "./Gallery.css";

const images = [
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752135436/image1_a8nu2z.jpg",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042709/image5_j4v2ry.jpg",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042710/image7_l9m8tg.jpg",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042704/image3_wkn9am.jpg",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042716/image9_e7fsub.jpg",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042705/image2_ab94xp.jpg",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042708/image6_mp6ajj.jpg",
  "https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752135435/image7_1_q4pgpx.jpg",
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="gallery">
      <div className="gallery-header">
        <span className="gallery-subtitle">OUR COLLECTION</span>

        <h2>
          Beautiful <span>Moments</span>
        </h2>

        <p>
          A collection of memories, moments and experiences captured forever.
        </p>
      </div>

      <div className="image-container">
        {images.map((image, index) => (
          <div
            className={`gallery-card card-${index + 1}`}
            key={image}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt={`Gallery item ${index + 1}`}
              className="gallery-image"
              loading="lazy"
            />

            <div className="image-overlay">
              <div className="view-icon">↗</div>
              <span>View Image</span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="close-button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Selected gallery"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;

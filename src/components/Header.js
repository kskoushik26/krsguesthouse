import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { path: "/", label: "Home", id: "home", icon: "⌂" },
      { path: "/location", label: "Rooms", id: "location", icon: "▣" },
      { path: "/contact", label: "Book Now", id: "contact", icon: "✦" },
      { path: "/attraction", label: "Attraction", id: "attraction", icon: "♧" },
      { path: "/gallery", label: "Gallery", id: "gallery", icon: "▧" },
      { path: "/details", label: "Guest Policies", id: "details", icon: "✓" },
    ],
    []
  );

  const activeLink = useMemo(() => {
    const current = navItems.find(
      (item) => item.path === location.pathname
    );

    return current?.id || "home";
  }, [location.pathname, navItems]);

  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close menu when browser width changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 850) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">

          {/* Logo + Hotel Information */}
          <Link to="/" className="brand" onClick={handleLinkClick}>
            <div className="logo-wrapper">
              <img
                src="https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042707/krs_gelrwv.webp"
                alt="KRS Guest House Logo"
                className="krs-logo"
              />
            </div>

            <div className="brand-text">
              <h1>K R S <span>GUEST HOUSE</span></h1>
              <div className="brand-location">
                <span className="location-dot">●</span>
                Near Siganduru Chowdeshwari Temple
              </div>
            </div>
          </Link>

          {/* Desktop Quick Info */}
          <div className="header-info">
            <div className="info-item">
              <span className="info-icon">✦</span>
              <div>
                <small>WELCOME</small>
                <strong>Feel at Home</strong>
              </div>
            </div>

            <Link
              to="/contact"
              className="header-book-btn"
              onClick={handleLinkClick}
            >
              <span>Book Your Stay</span>
              <span className="arrow">→</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Navigation */}
        <nav className={`nav-bar ${isMenuOpen ? "open" : ""}`}>
          <div className="nav-inner">
            <ul>
              {navItems.map(({ path, label, id, icon }) => (
                <li key={id}>
                  <Link
                    to={path}
                    onClick={handleLinkClick}
                    className={activeLink === id ? "active" : ""}
                  >
                    <span className="nav-icon">{icon}</span>
                    <span>{label}</span>

                    {activeLink === id && (
                      <span className="active-line"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile booking button */}
            <Link
              to="/contact"
              className="mobile-book-btn"
              onClick={handleLinkClick}
            >
              <span>Reserve Your Room</span>
              <span>→</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;

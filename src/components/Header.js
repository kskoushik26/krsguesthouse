import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = useCallback((link) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Close the menu after clicking a link
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Memoize navItems to prevent re-creation on every render
  const navItems = useMemo(
    () => [
      { path: "/", label: "Home", id: "home" },
      { path: "/location", label: "Map", id: "location" },
      { path: "/contact", label: "Reservation", id: "contact" },
      { path: "/attraction", label: "Attraction", id: "attraction" },
      { path: "/gallery", label: "Gallery", id: "gallery" },
      { path: "/details", label: "Guest Policies", id: "details" },
    ],
    []
  );

  // Sync activeLink with the current URL on page load or URL change
  useEffect(() => {
    const currentNavItem = navItems.find((item) => item.path === location.pathname);
    if (currentNavItem) {
      setActiveLink(currentNavItem.id);
    }
  }, [location.pathname, navItems]);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-title">
          <img
            src="https://res.cloudinary.com/dm0l1t1vk/image/upload/v1752042707/krs_gelrwv.webp"
            alt="KRS Logo"
            className="krs-logo"
          />
          <div className="title-container">
            <h1 className="header-title">K R S GUEST HOUSE</h1>
            <p className="header-subtitle">Near Siganduru Chowdeshwari Temple</p>
          </div>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <nav className={`nav-bar ${isMenuOpen ? "open" : ""}`}>
        <ul>
          {navItems.map(({ path, label, id }) => (
            <li key={id}>
              <Link
                to={path}
                onClick={() => handleLinkClick(id)}
                className={activeLink === id ? "active" : ""}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
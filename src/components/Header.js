import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

/* Small inline SVG icons (crisper than text glyphs, inherit currentColor) */
const Icon = ({ name }) => {
  const p = {
    width: 18, height: 18, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.8,
    strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true,
  };
  switch (name) {
    case "home":
      return <svg {...p}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></svg>;
    case "location":
      return <svg {...p}><path d="M3 18V8" /><path d="M3 14h18v4" /><path d="M21 18v-5a3 3 0 0 0-3-3h-8v4" /><circle cx="6.5" cy="11" r="1.5" /></svg>;
    case "contact":
      return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>;
    case "attraction":
      return <svg {...p}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "enquiry":
      return <svg {...p}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /><path d="M9.5 10a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5" /><path d="M12 16.5h.01" /></svg>;
    case "details":
      return <svg {...p}><path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>;
    default:
      return null;
  }
};

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = useMemo(
    () => [
      { path: "/", label: "Home", id: "home" },
      { path: "/rooms", label: "Rooms", id: "location" },
      { path: "/contact", label: "Book Now", id: "contact" },
      { path: "/attraction", label: "Attractions", id: "attraction" },
      { path: "/enquiry", label: "Enquiry", id: "enquiry" },
      { path: "/policies", label: "Know Before You Stay", id: "details" },
    ],
    []
  );

  const activeLink = useMemo(
    () => navItems.find((i) => i.path === location.pathname)?.id || "home",
    [location.pathname, navItems]
  );

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Lock background scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // Close drawer on desktop resize or Escape
  useEffect(() => {
    const onResize = () => window.innerWidth > 900 && setIsMenuOpen(false);
    const onKey = (e) => e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Compact the header once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <Link to="/" className="brand" onClick={handleLinkClick} aria-label="KRS Guest House home">
            <span className="logo-wrapper">
              <img src="/krs.png" alt="" className="krs-logo" />
            </span>
            <span className="brand-text">
              <span className="brand-name">
                KRS <em>Guest House</em>
              </span>
              <span className="brand-location">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                </svg>
                Near Sigandur Chowdeshwari Temple
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="desktop-nav" aria-label="Main">
            <ul>
              {navItems.map(({ path, label, id }) => (
                <li key={id}>
                  <Link
                    to={path}
                    onClick={handleLinkClick}
                    className={activeLink === id ? "active" : ""}
                    aria-current={activeLink === id ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <Link to="/contact" className="header-book-btn" onClick={handleLinkClick}>
              Reserve a room
            </Link>

            <button
              className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
              onClick={() => setIsMenuOpen((p) => !p)}
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-drawer"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`menu-overlay ${isMenuOpen ? "open" : ""}`} onClick={closeMenu} />
      <aside
        id="mobile-drawer"
        className={`mobile-drawer ${isMenuOpen ? "open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="drawer-head">
          <strong>Welcome</strong>
          <span>Feel at home with us</span>
        </div>

        <ul>
          {navItems.map(({ path, label, id }) => (
            <li key={id}>
              <Link
                to={path}
                onClick={handleLinkClick}
                className={activeLink === id ? "active" : ""}
                tabIndex={isMenuOpen ? 0 : -1}
              >
                <span className="drawer-icon"><Icon name={id} /></span>
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="mobile-book-btn"
          onClick={handleLinkClick}
          tabIndex={isMenuOpen ? 0 : -1}
        >
          Reserve your room
        </Link>
      </aside>
    </>
  );
};

export default Header;
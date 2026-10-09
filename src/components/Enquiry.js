import React, { useState, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router-dom";
import "./Enquiry.css";

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  room: "",
  question: "",
  checkin: "",
  checkout: "",
  members: "2",
};

const SIZES = {
  2: "2-Occupancy Room",
  4: "4-Occupancy Family Room",
  6: "6-Occupancy Room",
};
const SINGLE_KEY = { "2-Occupancy Room": "1-0-0", "4-Occupancy Family Room": "0-1-0", "6-Occupancy Room": "0-0-1" };
const MAX_GUESTS = 10;

const keyParts = (key) => {
  const [a, b, c] = key.split("-").map(Number);
  return [[a, 2], [b, 4], [c, 6]].filter(([count]) => count > 0);
};
const roomLabel = (key) =>
  keyParts(key).map(([count, size]) => `${count} × ${SIZES[size]}`).join(" + ");

/* Card title: just the room count, e.g. "1 Room" / "2 Rooms" */
const roomCount = (key) => keyParts(key).reduce((t, [c]) => t + c, 0);
const roomTitle = (key) => {
  const n = roomCount(key);
  return `${n} ${n === 1 ? "Room" : "Rooms"}`;
};
/* Small text under the title, e.g. "1 room can accommodate 6 people" */
const roomNote = (key) =>
  keyParts(key)
    .map(([count, size]) =>
      count === 1
        ? `1 room can accommodate ${size} people`
        : `${count} rooms, each accommodates ${size} people`
    )
    .join(" + ");

/* Simple room layouts. Change beds/labels here to match the real rooms. */
const PLAN = {
  2: { beds: 1, w: 44, label: "1 King bed", bedName: "King" },
  4: { beds: 2, w: 40, label: "2 Double beds", bedName: "Double" },
  6: { beds: 3, w: 27, label: "3 Double beds", bedName: "Double" },
};

const RoomPlan = ({ size }) => {
  const { beds, w, label, bedName } = PLAN[size];
  const h = beds === 3 ? 46 : beds === 2 ? 50 : 54;
  return (
    <figure className="room-plan">
      <svg viewBox="0 0 140 80" role="img" aria-label={`${SIZES[size]} layout: ${label} and attached bathroom`}>
        {/* room walls */}
        <rect x="2" y="2" width="136" height="76" rx="3" className="plan-wall" />
        {/* door gap */}
        <rect x="52" y="76" width="20" height="4" className="plan-door" />
        {/* bathroom */}
        <rect x="106" y="2" width="32" height="32" className="plan-bath" />
        <circle cx="122" cy="12" r="4" className="plan-fixture" />
        <rect x="116" y="22" width="12" height="6" rx="2" className="plan-fixture" />
        <text x="122" y="42" textAnchor="middle" className="plan-text">Bath</text>
        {/* beds */}
        {Array.from({ length: beds }).map((_, i) => {
          const x = 8 + i * (w + 6);
          return (
            <g key={i}>
              <rect x={x} y="8" width={w} height={h} rx="3" className="plan-bed" />
              <rect x={x + 3} y="11" width={(w - 9) / 2} height="8" rx="2" className="plan-pillow" />
              <rect x={x + 6 + (w - 9) / 2} y="11" width={(w - 9) / 2} height="8" rx="2" className="plan-pillow" />
              <text x={x + w / 2} y={8 + h / 2 + 8} textAnchor="middle" className="plan-text">{bedName}</text>
            </g>
          );
        })}
      </svg>
      <figcaption>{label} · Attached bathroom</figcaption>
    </figure>
  );
};

/* Suggest room combinations for a party size: fewest rooms, least empty beds,
   and no room that isn't needed. */
const buildOptions = (n) => {
  const all = [];
  for (let a = 0; a <= 4; a++)
    for (let b = 0; b <= 3; b++)
      for (let c = 0; c <= 1; c++) {
        const rooms = a + b + c;
        const cap = 2 * a + 4 * b + 6 * c;
        if (rooms < 1 || rooms > 4 || cap < n) continue;
        const smallest = a ? 2 : b ? 4 : 6;
        if (cap - smallest >= n) continue; // a room would be unnecessary
        all.push({ key: `${a}-${b}-${c}`, rooms, cap, waste: cap - n });
      }
  const tight = all.filter((o) => o.waste <= 2);
  return (tight.length ? tight : all)
    .sort((x, y) => x.rooms - y.rooms || x.waste - y.waste)
    .slice(0, 3)
    .map((o, i, arr) => ({
      ...o,
      tag: i === 0 ? "Best fit" : o.rooms > arr[0].rooms ? "Separate rooms" : "More space",
    }));
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const pad = (n) => String(n).padStart(2, "0");
const toKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const localToday = () => {
  const t = new Date();
  return toKey(t.getFullYear(), t.getMonth(), t.getDate());
};
const parseKey = (k) => {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const prettyDate = (k) =>
  k
    ? parseKey(k).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      })
    : "Select date";
const nightsBetween = (a, b) =>
  Math.round((parseKey(b) - parseKey(a)) / 86400000);

/* Guests can only enquire for dates from today up to 30 days ahead */
const MAX_DAYS_AHEAD = 30;
const addDays = (k, n) => {
  const d = parseKey(k);
  d.setDate(d.getDate() + n);
  return toKey(d.getFullYear(), d.getMonth(), d.getDate());
};

/* =========================================================
   CALENDAR (check-in / check-out range) - one month at a time
   ========================================================= */

const Month = ({ year, month, today, maxDate, checkin, checkout, hover, onPick, onHover }) => {
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);

  const end = checkout || (checkin && hover > checkin ? hover : "");

  return (
    <div className="cal-month">
      <div className="cal-month-title">
        {MONTHS[month]} {year}
      </div>
      <div className="cal-grid" role="grid">
        {WEEKDAYS.map((w) => (
          <span key={w} className="cal-dow">{w}</span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} />;
          const key = toKey(year, month, d);
          const past = key < today || key > maxDate;
          const isStart = key === checkin;
          const isEnd = key === checkout;
          const inRange = checkin && end && key > checkin && key < end;
          const cls = [
            "cal-day",
            past && "is-past",
            key === today && "is-today",
            isStart && "is-start",
            isEnd && "is-end",
            inRange && "is-range",
            isStart && end && "has-range",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              type="button"
              key={key}
              className={cls}
              disabled={past}
              onClick={() => onPick(key)}
              onMouseEnter={() => onHover(key)}
              aria-label={prettyDate(key)}
              aria-pressed={isStart || isEnd}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const RangeCalendar = ({ today, maxDate, checkin, checkout, onChange }) => {
  const t = parseKey(today);
  const [view, setView] = useState({ y: t.getFullYear(), m: t.getMonth() });
  const [hover, setHover] = useState("");

  const shift = (delta) =>
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  const atMin = view.y === t.getFullYear() && view.m === t.getMonth();
  const mx = parseKey(maxDate);
  const atMax = view.y > mx.getFullYear() || (view.y === mx.getFullYear() && view.m >= mx.getMonth());

  const pick = (key) => {
    if (!checkin || (checkin && checkout) || key <= checkin) {
      onChange(key, "");
    } else {
      onChange(checkin, key);
    }
  };

  return (
    <div className="calendar" onMouseLeave={() => setHover("")}>
      <div className="cal-nav">
        <button type="button" onClick={() => shift(-1)} disabled={atMin} aria-label="Previous month">‹</button>
        <button type="button" onClick={() => shift(1)} disabled={atMax} aria-label="Next month">›</button>
      </div>
      <div className="cal-months">
        <Month
          year={view.y} month={view.m} today={today} maxDate={maxDate}
          checkin={checkin} checkout={checkout} hover={hover}
          onPick={pick} onHover={setHover}
        />
      </div>
    </div>
  );
};

/* =========================================================
   ENQUIRY
   ========================================================= */

const Enquiry = () => {
  const [searchParams] = useSearchParams();
  const requestedRoom = searchParams.get("room") || "";
  const requestedKey = SINGLE_KEY[requestedRoom];
  const startGuests = requestedKey ? keyParts(requestedKey)[0][1] : 2;

  const [formData, setFormData] = useState({
    ...initialFormData,
    members: String(startGuests),
    room: requestedKey || buildOptions(startGuests)[0].key,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const triggerRef = useRef(null);
  const doneRef = useRef(null);
  const touched = useRef({});

  const todayDate = useMemo(localToday, []);
  const maxDate = useMemo(() => addDays(todayDate, MAX_DAYS_AHEAD), [todayDate]);
  const guests = Number(formData.members) || 1;
  const options = useMemo(() => buildOptions(guests), [guests]);
  const nights =
    formData.checkin && formData.checkout && formData.checkout > formData.checkin
      ? nightsBetween(formData.checkin, formData.checkout)
      : 0;

  /* When arriving from the Rooms page (?room=...), select that exact room
     and set the guest count to its size. Runs whenever the param changes. */
  useEffect(() => {
    const key = SINGLE_KEY[requestedRoom];
    if (!key) return;
    const size = keyParts(key)[0][1];
    setFormData((prev) => ({ ...prev, room: key, members: String(size) }));
    setErrors((prev) => ({ ...prev, room: "", members: "" }));
  }, [requestedRoom]);

  /* Calendar sheet: Esc to close, lock page scroll, return focus */
  useEffect(() => {
    if (!calOpen) return undefined;
    const trigger = triggerRef.current;
    const onKey = (e) => e.key === "Escape" && setCalOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      if (trigger) trigger.focus();
    };
  }, [calOpen]);

  /* Success popup: Esc to close, lock page scroll, focus the button */
  useEffect(() => {
    if (!popupOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setPopupOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    if (doneRef.current) doneRef.current.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [popupOpen]);

  const clearError = (...names) => {
    setErrors((prev) => {
      const next = { ...prev };
      names.forEach((n) => (next[n] = ""));
      return next;
    });
  };

  // Keep only digits, drop a pasted +91 / 91 / 0 prefix, and allow max 10 digits
  const cleanPhone = (raw) => {
    let digits = raw.replace(/\D/g, "");
    if (raw.trim().startsWith("+91") || (digits.length === 12 && digits.startsWith("91"))) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith("0")) {
      digits = digits.slice(1);
    }
    return digits.slice(0, 10);
  };

  const handleChange = (e) => {
    const { name } = e.target;
    const value = name === "phone" ? cleanPhone(e.target.value) : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Once a field has been checked, keep checking it while the guest edits
    if (touched.current[name] || errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: fieldError(name, value) }));
    } else {
      clearError(name);
    }
  };

  const setGuests = (delta) => {
    const next = Math.min(Math.max(guests + delta, 2), MAX_GUESTS);
    const opts = buildOptions(next);
    setFormData((prev) => ({
      ...prev,
      members: String(next),
      // keep the chosen rooms if they still suit the party, else use best fit
      room: opts.some((o) => o.key === prev.room) ? prev.room : opts[0].key,
    }));
    clearError("members", "room");
  };

  const selectRoom = (key) => {
    setFormData((prev) => ({ ...prev, room: key }));
    clearError("room");
  };

  const setDates = (checkin, checkout) => {
    setFormData((prev) => ({ ...prev, checkin, checkout }));
    clearError("checkin", "checkout");
  };

  /* ---------- VALIDATION ---------- */

  const fieldError = (name, raw) => {
    const value = raw.trim();
    if (name === "name") {
      return value ? "" : "Please enter your name.";
    }
    if (name === "phone") {
      if (!value) return "Please enter your phone number.";
      if (!/^\d+$/.test(value))
        return "Enter digits only, without +91, spaces or dashes.";
      if (value.length < 10)
        return `Mobile number is too short: ${value.length} of 10 digits entered (don't add +91).`;
      if (value.length > 10)
        return "Mobile number must be exactly 10 digits (don't add +91).";
      return "";
    }
    if (name === "email") {
      if (!value) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.com$/i.test(value))
        return "Email must include @ and .com (e.g. name@gmail.com).";
      return "";
    }
    return "";
  };

  // Check these fields as soon as the guest leaves them
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value) return; // don't nag on an untouched field
    touched.current[name] = true;
    setErrors((prev) => ({ ...prev, [name]: fieldError(name, value) }));
  };

  const validateForm = () => {
    const newErrors = {};

    ["name", "phone", "email"].forEach((f) => {
      touched.current[f] = true;
      const msg = fieldError(f, formData[f]);
      if (msg) newErrors[f] = msg;
    });

    if (!formData.room) {
      newErrors.room = "Please select a room type.";
    }

    if (!formData.checkin) {
      newErrors.checkin = "Please select a check-in date.";
    } else if (formData.checkin < todayDate) {
      newErrors.checkin = "Check-in date cannot be in the past.";
    } else if (formData.checkin > maxDate) {
      newErrors.checkin = `Check-in must be within the next ${MAX_DAYS_AHEAD} days.`;
    }

    if (!formData.checkout) {
      newErrors.checkout = "Please select a check-out date.";
    } else if (formData.checkin && formData.checkout <= formData.checkin) {
      newErrors.checkout = "Check-out must be after check-in.";
    } else if (formData.checkout > maxDate) {
      newErrors.checkout = `Check-out must be within the next ${MAX_DAYS_AHEAD} days.`;
    }

    if (
      !formData.members ||
      Number(formData.members) < 2 ||
      !Number.isInteger(Number(formData.members))
    ) {
      newErrors.members = "Please enter a valid number of guests.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- SUBMIT ---------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xldjvgdp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          room: roomLabel(formData.room), // e.g. "2 × 2-Occupancy Room"
          rooms_count: keyParts(formData.room).reduce((t, [c]) => t + c, 0),
          nights,
          _subject: `New Stay Enquiry from ${formData.name}`,
          enquiry_type: "Guest House Stay Enquiry",
        }),
      });

      if (!response.ok) throw new Error("Form submission failed");

      // Remember the email for the popup before the form resets
      setSentEmail(formData.email);
      setPopupOpen(true);

      touched.current = {};
      setFormData({
        ...initialFormData,
        members: "2",
        room: buildOptions(2)[0].key,
      });
      setErrors({});
      setShowMessage(false);
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      setErrors({
        form: "Something went wrong. Please try again or call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const dateError = errors.checkin || errors.checkout;

  return (
    <main className="hero">
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />

      <div className="overlay">
        <div className="content">
          <section className="intro" aria-labelledby="enquiry-title">
            <span className="eyebrow">✦ KRS Guest House ✦</span>
            <h1 id="enquiry-title">
              Check availability
            </h1>
            <div className="title-line" aria-hidden="true" />
            <p className="description">
              Pick your dates and room. We'll reply with availability shortly.
            </p>
            <div className="highlights" aria-label="Guest house highlights">
              <span>🛕 Near Sigandur Temple</span>
              <span>🏡 Comfortable Stay</span>
              <span>🌿 Peaceful Surroundings</span>
            </div>
          </section>

          <section className="form-card" aria-labelledby="stay-enquiry-title">
            <h2 id="stay-enquiry-title" className="sr-only">Stay Enquiry</h2>

            <form onSubmit={handleSubmit} className="enquiry-form" noValidate>
              {/* 1. DATES (opens a calendar sheet) */}
              <fieldset className="block full-width">
                <legend><span className="step-num">1</span> When are you staying?</legend>

                <button
                  type="button"
                  ref={triggerRef}
                  className={`date-trigger ${dateError ? "has-error" : ""}`}
                  onClick={() => setCalOpen(true)}
                  aria-haspopup="dialog"
                >
                  <span className="cal-icon" aria-hidden="true">📅</span>
                  <span className="date-box">
                    <small>Check-in</small>
                    <strong className={formData.checkin ? "" : "placeholder"}>{prettyDate(formData.checkin)}</strong>
                  </span>
                  <span className="nights-pill" aria-live="polite">
                    {nights ? `${nights} night${nights > 1 ? "s" : ""}` : "→"}
                  </span>
                  <span className="date-box">
                    <small>Check-out</small>
                    <strong className={formData.checkout ? "" : "placeholder"}>{prettyDate(formData.checkout)}</strong>
                  </span>
                </button>

                {dateError && <span className="error" role="alert">{dateError}</span>}
              </fieldset>

              {/* 2. GUESTS */}
              <div className="field full-width">
                <span className="label-text" id="guests-label">
                  <span className="step-num">2</span> How many guests?
                </span>
                <div className="stepper" role="group" aria-labelledby="guests-label">
                  <button type="button" onClick={() => setGuests(-1)} disabled={guests <= 2} aria-label="Fewer guests">−</button>
                  <output aria-live="polite">
                    {guests} {guests === 1 ? "guest" : "guests"}
                  </output>
                  <button type="button" onClick={() => setGuests(1)} disabled={guests >= MAX_GUESTS} aria-label="More guests">+</button>
                </div>
                {guests >= MAX_GUESTS && (
                  <small className="hint">
                    For more than 10 guests, call <a href="tel:+919448734152">+91 94487 34152</a> and we'll arrange it.
                  </small>
                )}
                {errors.members && <span className="error">{errors.members}</span>}
              </div>

              {/* 3. ROOMS, suggested from guest count */}
              <fieldset className="block full-width">
                <legend><span className="step-num">3</span> Pick your rooms</legend>
                <div className="room-options" role="radiogroup">
                  {options.map((o) => (
                    <label
                      key={o.key}
                      className={`room-option ${formData.room === o.key ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="room"
                        value={o.key}
                        checked={formData.room === o.key}
                        onChange={() => selectRoom(o.key)}
                      />
                      <span className="radio-dot" aria-hidden="true" />
                      <span className="room-text">
                        <strong>{roomTitle(o.key)}</strong>
                        <small>{roomNote(o.key)}</small>
                      </span>
                      <span className={`room-tag ${o.tag === "Best fit" ? "best" : ""}`}>{o.tag}</span>

                      {formData.room === o.key && (
                        <div className="room-plans">
                          {keyParts(o.key).flatMap(([count, size]) =>
                            Array.from({ length: count }, (_, i) => (
                              <RoomPlan key={`${size}-${i}`} size={size} />
                            ))
                          )}
                        </div>
                      )}
                    </label>
                  ))}
                </div>
                {errors.room && <span className="error">{errors.room}</span>}
              </fieldset>

              {/* 4. CONTACT */}
              <p className="step-title full-width"><span className="step-num">4</span> Your details</p>
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <span id="name-error" className="error">{errors.name}</span>}
              </div>

              <div className="field">
                <label htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="10-digit number, no +91"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="tel"
                  inputMode="numeric"
                  required
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone ? <span id="phone-error" className="error">{errors.phone}</span> : <small className="hint">10 digits only. Please don't add +91.</small>}
              </div>

              <div className="field full-width">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <span id="email-error" className="error">{errors.email}</span>}
              </div>

              {/* OPTIONAL MESSAGE */}
              <div className="field full-width">
                {!showMessage && !formData.question ? (
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => setShowMessage(true)}
                  >
                    + Add a message (optional)
                  </button>
                ) : (
                  <>
                    <label htmlFor="question">
                      Message <span className="optional">Optional</span>
                    </label>
                    <textarea
                      id="question"
                      name="question"
                      placeholder="Any questions or special requirements?"
                      value={formData.question}
                      onChange={handleChange}
                      rows="3"
                    />
                  </>
                )}
              </div>

              {errors.form && (
                <div className="form-error" role="alert">{errors.form}</div>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                <span>{isSubmitting ? "Sending enquiry..." : "Send enquiry"}</span>
              </button>

              <p className="privacy-note">
                🔒 We use your details only to check availability and reply.
                Fastest: <a href="tel:+919448734152">+91 94487 34152</a>
              </p>
            </form>
          </section>

          <div className="bottom-note">
            <span aria-hidden="true" />
            Your Stay • Your Comfort • Your Peace
            <span aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* CALENDAR SHEET */}
      {calOpen &&
        createPortal(
          <div
            className="sheet-backdrop"
            onMouseDown={(e) => e.target === e.currentTarget && setCalOpen(false)}
          >
            <div className="sheet" role="dialog" aria-modal="true" aria-label="Select your dates">
              <div className="sheet-head">
                <strong>Select your dates</strong>
                <button type="button" className="sheet-close" onClick={() => setCalOpen(false)} aria-label="Close calendar">✕</button>
              </div>
              <div className="sheet-body">
                <p className="sheet-hint" aria-live="polite">
                  {!formData.checkin
                    ? "Tap your check-in date"
                    : !formData.checkout
                    ? "Now tap your check-out date"
                    : `${prettyDate(formData.checkin)} → ${prettyDate(formData.checkout)} · ${nights} night${nights > 1 ? "s" : ""}`}
                </p>
                <RangeCalendar
                  today={todayDate}
                  maxDate={maxDate}
                  checkin={formData.checkin}
                  checkout={formData.checkout}
                  onChange={setDates}
                />
              </div>
              <div className="sheet-foot">
                <button type="button" className="link-button" onClick={() => setDates("", "")}>Clear dates</button>
                <button type="button" className="sheet-done" disabled={!nights} onClick={() => setCalOpen(false)}>
                  Apply dates
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* SUCCESS POPUP */}
      {popupOpen &&
        createPortal(
          <div
            className="sheet-backdrop"
            onMouseDown={(e) => e.target === e.currentTarget && setPopupOpen(false)}
          >
            <div
              className="sheet popup"
              role="dialog"
              aria-modal="true"
              aria-labelledby="popup-title"
            >
              <button
                type="button"
                className="sheet-close popup-x"
                onClick={() => setPopupOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>

              <div className="popup-icon" aria-hidden="true">✓</div>
              <h3 id="popup-title" className="popup-title">Enquiry sent!</h3>
              <p className="popup-lead">
                Please <strong>check your email</strong>
                {sentEmail && <> at <span className="popup-email">{sentEmail}</span></>}
                {" "}for all the details.
              </p>

              <ul className="popup-list">
                <li><span aria-hidden="true">💰</span> Room prices</li>
                <li><span aria-hidden="true">🛏️</span> Availability for your dates</li>
                <li><span aria-hidden="true">📝</span> How to book</li>
              </ul>
              <p className="popup-spam">Can't see it? Check your spam or promotions folder.</p>

              <div className="popup-urgent">
                <span>Urgent? Call us directly</span>
                <a href="tel:+919448734152">📞 9448734152</a>
              </div>

              <button
                type="button"
                ref={doneRef}
                className="sheet-done popup-done"
                onClick={() => setPopupOpen(false)}
              >
                Got it
              </button>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
};

export default Enquiry;
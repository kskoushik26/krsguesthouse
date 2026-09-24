export function trackEvent(category, action, name) {
  const event = {
    event: "conversion",
    category,
    action,
    name,
  };

  window._mtm = window._mtm || [];
  window._mtm.push(event);

  window._paq = window._paq || [];
  window._paq.push(["trackEvent", category, action, name]);
}

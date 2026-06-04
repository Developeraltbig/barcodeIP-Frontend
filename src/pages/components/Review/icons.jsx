import React from "react";

function Icon({ name }) {
  if (name === "download") {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3v11" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 19h14" />
      </svg>
    );
  }

  if (name === "comment") {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M7 8h10M7 12h7M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8l-5 3v-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      </svg>
    );
  }

  if (name === "feature") {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M7 7h10v10H7z" />
        <path d="M4 4h16v16H4z" />
      </svg>
    );
  }

  if (name === "eye") {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  if (name === "mapping") {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 7h4v4H6zM14 13h4v4h-4z" />
        <path d="M10 9h2a2 2 0 0 1 2 2v2" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 4-4 3 3 5-7" />
      </svg>
    );
  }

  return null;
}

export default Icon;

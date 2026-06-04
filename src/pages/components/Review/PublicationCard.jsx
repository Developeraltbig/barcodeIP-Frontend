import React, { memo } from "react";

function PublicationCard({ item, onViewMore }) {
  return (
    <article className="rr-publication-card">
      <div className="rr-publication-top">
        <span>{item.relevance}</span>
        <em>{item.type}</em>
      </div>

      <h3>{item.title}</h3>

      <p>{item.summary}</p>

      <div className="rr-publication-meta">
        <span>ⓘ {item.source}</span>
        <span>▧ {item.meta}</span>
      </div>

      <button type="button" onClick={onViewMore}>
        View More
      </button>
    </article>
  );
}

export default memo(PublicationCard);

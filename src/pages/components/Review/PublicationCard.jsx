import React, { memo } from "react";
import DateTimeIcon from "../../../assets/icons/date-time.svg";
import LightFileIcon from "../../../assets/icons/light_file.svg";


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
        <span><img src={LightFileIcon} alt="" className="LightFile-icon" /> {item.source}</span>
        <span><img src={DateTimeIcon} alt="" className="DateTime-icon" /> {item.meta}</span>
      </div>

      <button type="button" onClick={onViewMore}>
        View More
      </button>
    </article>
  );
}

export default memo(PublicationCard);

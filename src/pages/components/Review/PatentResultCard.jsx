import React, { memo } from "react";
import Icon from "./icons";

import overlapSummaryIcon from "../../../assets/icons/overlapSummary.svg";
import viewMappingIcon from "../../../assets/icons/viewMapping.svg";
import carbonViewIcon from "../../../assets/icons/carbon_view.svg";

function PatentResultCard({ result, onViewMapping, onViewDetails, onViewOverlap }) {
  return (
    <article className="rr-patent-card">
      <div className="rr-result-left">
        <div className="rr-result-meta">
          <strong>#{result.id}</strong>
          <span>{result.publication}</span>
          <em>{result.date}</em>
          <b>Mapping Ready</b>
        </div>

        <h3>{result.title}</h3>

        <div className="rr-result-submeta">
          <span><b>Assignee</b> {result.assignee}</span>
          <span><b>Priority</b> {result.priority}</span>
        </div>

        <p>{result.description}</p>

        <div className="rr-result-tags">
          {result.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="rr-result-actions">
        <div className="rr-score-row">
          <span>{result.risk}</span>
          <em>{result.overall} overall</em>
        </div>

        <button type="button" className="rr-view-mapping-btn" onClick={onViewMapping}>
          <img src={viewMappingIcon} alt="" className="viewMapping-icon" />
          View Mapping
        </button>

        <button type="button" className="rr-light-result-btn" onClick={onViewOverlap}>
          <img src={overlapSummaryIcon} alt="" className="overlapSummary-icon" />
          Overlap Summary
        </button>

        <button type="button" className="rr-light-result-btn" onClick={onViewDetails}>
          <img src={carbonViewIcon} alt="" className="carbon_view-icon" /> Details
        </button>
      </div>
    </article>
  );
}

export default memo(PatentResultCard);

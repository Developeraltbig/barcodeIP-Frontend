import React, { memo } from "react";
import Icon from "./icons";

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
          <span>Assignee {result.assignee}</span>
          <span>Priority {result.priority}</span>
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
          <Icon name="mapping" />
          View Mapping
        </button>

        <button type="button" className="rr-light-result-btn" onClick={onViewOverlap}>
          <Icon name="chart" />
          Overlap Summary
        </button>

        <button type="button" className="rr-light-result-btn" onClick={onViewDetails}>
          ⓘ Details
        </button>
      </div>
    </article>
  );
}

export default memo(PatentResultCard);

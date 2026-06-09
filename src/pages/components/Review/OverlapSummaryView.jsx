import React, { memo } from "react";
import ActionButton from "./ActionButton";
import { OVERLAP_BREAKDOWN } from "../../data/reviewResultsData";
import viewMappingIcon from "../../../assets/icons/carbon_view1.svg";
import DownloadIcon from "../../../assets/icons/DownloadIcon1.svg";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";

function OverlapSummaryView({
  patent,
  strictMode,
  onStrictModeChange,
  onBack,
  onViewMapping,
  onDownloadMapping
}) {
  return (
    <>
      <button className="rr-back-btn rr-large-back" type="button" onClick={onBack}>
        <img src={LeftArrowIcon} alt="" className="leftArrow-icon" /> Back
      </button>

      <div className="rr-overlap-top-card">
        <div>
          <h1>High Overlap</h1>
          <p>
            <span>{patent.publication}</span> · {patent.title}
          </p>
          <em>Overlap Summary</em>
        </div>

        <div className="rr-subpage-actions">
          <button
            type="button"
            className="rr-strict-toggle"
            onClick={() => onStrictModeChange((prev) => !prev)}
          >
            <span className={strictMode ? "is-on" : ""}>
              <i />
            </span>
            Strict Mode
          </button>

          <ActionButton variant="outline" onClick={onViewMapping}>
            <img src={viewMappingIcon} alt="" className="viewMapping-icon" />
            View Mapping
          </ActionButton>

          <ActionButton onClick={onDownloadMapping}>
            <img src={DownloadIcon} alt="" className="download-icon" />
            Download Mapping
          </ActionButton>
        </div>
      </div>

      <section className="rr-overlap-summary-card">
        <div>
          <h2>Full-document comparison</h2>
          <p>This summary checks claims, description, extracted evidence, and drawing support.</p>
          <em>High Overlap</em>
        </div>

        <div className="rr-support-score">
          <strong>86%</strong>
          <span>support score</span>
        </div>
      </section>

      <section className="rr-coverage-card">
        <h2>Coverage Breakdown</h2>

        <div className="rr-breakdown-list">
          {OVERLAP_BREAKDOWN.map((item) => (
            <div className="rr-breakdown-item" key={item.label}>
              <div className="rr-breakdown-label">
                <span>{item.label}</span>
                <em>{item.note}</em>
              </div>

              <div className="rr-progress-track">
                <span style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default memo(OverlapSummaryView);

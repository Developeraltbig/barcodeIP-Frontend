import React, { memo } from "react";
import ActionButton from "./ActionButton";
import {
  FEATURE_MAPPING_ROWS
} from "../../data/reviewResultsData";

import overlapSummaryIcon from "../../../assets/icons/overlapSummary1.svg";
import DownloadIcon from "../../../assets/icons/DownloadIcon1.svg";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";



function FeatureMappingView({ patent, onBack, onOpenOverlap, onDownload }) {
  return (
    <>
      <button className="rr-back-btn" type="button" onClick={onBack}>
        <img src={LeftArrowIcon} alt="" className="leftArrow-icon" /> Back
      </button>

      <div className="rr-subpage-header">
        <div>
          <h1>Feature Mapping</h1>
          <p>
            <span>{patent.publication}</span> · {patent.title}
          </p>
        </div>

        <div className="rr-subpage-actions">
          <button type="button" className="rr-strict-toggle">
            <span>
              <i />
            </span>
            Strict Mode
          </button>

          <ActionButton variant="outline" onClick={onOpenOverlap}>
            <img src={overlapSummaryIcon} alt="" className="overlapSummary-icon" />
            Overlap Summary
          </ActionButton>

          <ActionButton onClick={onDownload}>
            <img src={DownloadIcon} alt="" className="download-icon" />
            Download Mapping
          </ActionButton>
        </div>
      </div>

      <section className="rr-mapping-table-card">
        <table className="rr-mapping-table">
          <thead>
            <tr>
              <th>Your Feature</th>
              <th>Patent Evidence</th>
              <th>Where Found</th>
              <th>Level</th>
            </tr>
          </thead>

          <tbody>
            {FEATURE_MAPPING_ROWS.map((row) => (
              <tr key={row.id}>
                <td>
                  <span className="rr-feature-type">{row.featureType}</span>
                  <strong>{row.feature}</strong>
                </td>
                <td>{row.evidence}</td>
                <td>
                  <span className={`rr-where-pill ${row.whereFound === "Not found" ? "not-found" : ""}`}>
                    {row.whereFound}
                  </span>
                </td>
                <td>
                  <span className={`rr-level-pill ${row.level.toLowerCase().replaceAll(" ", "-")}`}>
                    {row.level}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default memo(FeatureMappingView);

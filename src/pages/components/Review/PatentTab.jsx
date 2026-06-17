import React, { memo } from "react";
import ActionButton from "./ActionButton";
import PatentResultCard from "./PatentResultCard";
import DownloadIcon from "../../../assets/icons/DownloadIcon1.svg";

function ProcessingSteps({ steps }) {
  if (!steps?.length) return null;

  return (
    <div className="rr-processing-steps">
      {steps.map((step) => (
        <span key={step.id} className={step.status}>
          {step.label}
        </span>
      ))}
    </div>
  );
}

function PatentProcessingCard({ runtime }) {
  return (
    <div className="rr-processing-card">
      <h3>{runtime.message}</h3>
      <p>{runtime.subMessage}</p>
      <ProcessingSteps steps={runtime.steps} />
    </div>
  );
}

function PatentTab({
  runtime,
  results,
  strictMode,
  onStrictModeChange,
  onViewMapping,
  onViewDetails,
  onViewOverlap,
  onDownloadPatentReport
}) {

  if (!results) {
    return null;
  }
  return (
    <>
      <section className="rr-results-summary">
        <div className="rr-results-summary-head">
          <div>
            <h2>Patent Search Results</h2>
            <p>Top 100 results are shown. The first 10 have mapping and overlap summary ready.</p>
          </div>

          <div className="rr-results-actions">
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

            <ActionButton onClick={onDownloadPatentReport}>
              <img src={DownloadIcon} alt="" className="Download-icon" /> Patent Report
            </ActionButton>
          </div>
        </div>

        <PatentProcessingCard runtime={runtime} />
      </section>

      <section className="rr-results-list-panel">
        {results[0]?.novelty_analysis?.selectedPatentIds?.map((result, index) => (
          <PatentResultCard
            key={index}
            result={result}
            onViewMapping={() => onViewMapping(result)}
            onViewDetails={() => onViewDetails(result)}
            onViewOverlap={() => onViewOverlap(result)}
          />
        ))}
      </section>
    </>
  );
}

export default memo(PatentTab);

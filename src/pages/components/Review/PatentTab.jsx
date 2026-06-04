import React, { memo } from "react";
import ActionButton from "./ActionButton";
import PatentResultCard from "./PatentResultCard";

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

            <ActionButton icon="download" onClick={onDownloadPatentReport}>
              Patent Report
            </ActionButton>
          </div>
        </div>

        <PatentProcessingCard runtime={runtime} />
      </section>

      <section className="rr-results-list-panel">
        {results.map((result) => (
          <PatentResultCard
            key={result.id}
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

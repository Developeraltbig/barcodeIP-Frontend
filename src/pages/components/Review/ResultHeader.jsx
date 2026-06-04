import React, { memo } from "react";
import ActionButton from "./ActionButton";

function ResultHeader({
  project,
  onBack,
  onViewKeyFeatures,
  onRequestComments,
  onDownloadReport
}) {
  return (
    <>
      <button className="rr-back-btn" type="button" onClick={onBack}>
        ← Back
      </button>

      <div className="rr-project-card">
        <div>
          <h1>{project.title}</h1>
          <p>CASE ID : {project.caseId}</p>
        </div>

        <div className="rr-project-actions">
          <ActionButton variant="light" icon="feature" onClick={onViewKeyFeatures}>
            View Key Features
          </ActionButton>

          <ActionButton variant="outline" icon="comment" onClick={onRequestComments}>
            Request Oolto Comments
          </ActionButton>

          <ActionButton icon="download" onClick={onDownloadReport}>
            Download Report
          </ActionButton>
        </div>
      </div>
    </>
  );
}

export default memo(ResultHeader);

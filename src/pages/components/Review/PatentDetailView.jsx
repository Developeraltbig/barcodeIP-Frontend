import React, { memo } from "react";
import ActionButton from "./ActionButton";
import {
  BIBLIOGRAPHIC_DATA,
  CLASSIFICATIONS,
  PATENT_CITATIONS
} from "../../data/reviewResultsData";

function DataTable({ rows }) {
  return (
    <div className="rr-data-table">
      {rows.map(([label, value]) => (
        <div key={label} className="rr-data-row">
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function PatentDetailView({ patent, onBack, onViewMapping, onDownloadMapping }) {
  return (
    <>
      <button className="rr-back-btn" type="button" onClick={onBack}>
        ← Back
      </button>

      <div className="rr-detail-title-card">
        <div>
          <h1>{patent.title}</h1>
          <p>
            <span>{patent.publication}</span> · {patent.assignee}
          </p>
          <em>Patent Details</em>
        </div>

        <div className="rr-subpage-actions">
          <ActionButton variant="outline" icon="eye" onClick={onViewMapping}>
            View Mapping
          </ActionButton>

          <ActionButton icon="download" onClick={onDownloadMapping}>
            Download Mapping
          </ActionButton>
        </div>
      </div>

      <div className="rr-figure-tabs">
        {Array.from({ length: 7 }).map((_, index) => (
          <button key={index} type="button">
            Patent Figure {index + 1}
          </button>
        ))}
      </div>

      <div className="rr-detail-grid">
        <section className="rr-detail-card">
          <h2>Bibliographic Data</h2>
          <DataTable rows={BIBLIOGRAPHIC_DATA} />
        </section>

        <section className="rr-detail-card">
          <h2>Classifications</h2>
          <DataTable rows={CLASSIFICATIONS} />
        </section>
      </div>

      <section className="rr-detail-card">
        <h2>Description</h2>
        <p className="rr-description-text">
          Discloses a high-voltage drainage wire clamp and live installation tool with
          clamping base, pressing block, tightening shaft, spring, support rod, and wrench
          operating rod. The disclosed tool includes a hot stick body, torque connector,
          drive shaft, and clamp engagement interface. The apparatus allows a lineworker
          to position and operate a clamp at an overhead conductor from a safer distance.
          The description includes examples of jaws, rotatable members, and threaded
          actuation for clamp operation.
        </p>
      </section>

      <section className="rr-detail-card">
        <h2>Patent Citations</h2>

        <table className="rr-citation-table">
          <thead>
            <tr>
              <th>Publication</th>
              <th>Priority</th>
              <th>Assignee</th>
              <th>Title</th>
            </tr>
          </thead>

          <tbody>
            {PATENT_CITATIONS.map(([publication, priority, assignee, title]) => (
              <tr key={publication}>
                <td>{publication}</td>
                <td>{priority}</td>
                <td>{assignee}</td>
                <td>{title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default memo(PatentDetailView);

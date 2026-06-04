import React, { memo, useState } from "react";
import Icon from "./icons";

const MODULE_OPTIONS = [
  "Patent Search",
  "Publication Search",
  "Private Search",
  "Provisional Draft",
  "Non-Provisional Draft"
];

function RequestOoltoCommentsModal({ project, onClose }) {
  const [selectedModules, setSelectedModules] = useState([]);
  const [note, setNote] = useState("");

  const toggleModule = (moduleName) => {
    setSelectedModules((prev) =>
      prev.includes(moduleName)
        ? prev.filter((item) => item !== moduleName)
        : [...prev, moduleName]
    );
  };

  const submitRequest = () => {
    const payload = {
      projectId: project.id,
      caseId: project.caseId,
      modules: selectedModules,
      note
    };

    console.log("Oolto comments request:", payload);
    onClose();
  };

  return (
    <div className="rr-modal-backdrop" onMouseDown={onClose}>
      <div className="rr-comment-modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="rr-comment-modal-head">
          <div className="rr-comment-title">
            <span>
              <Icon name="comment" />
            </span>
            <div>
              <h2>Request Oolto Comments</h2>
              <p>Send selected generated outputs for review comments.</p>
            </div>
          </div>

          <button className="rr-modal-close" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="rr-comment-case-box">
          <h3>{project.title}</h3>
          <p>CASE ID : {project.caseId}</p>
        </div>

        <div className="rr-comment-field">
          <h4>Select modules to include</h4>

          <div className="rr-module-check-grid">
            {MODULE_OPTIONS.map((moduleName) => {
              const checked = selectedModules.includes(moduleName);

              return (
                <label
                  key={moduleName}
                  className={`rr-module-check ${checked ? "checked" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleModule(moduleName)}
                  />
                  <span />
                  {moduleName}
                </label>
              );
            })}
          </div>
        </div>

        <div className="rr-comment-field">
          <h4>Optional note</h4>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Example. Please focus on novelty and claim overlap for the top patent references."
          />
        </div>

        <div className="rr-comment-footer">
          <button type="button" className="rr-submit-comment" onClick={submitRequest}>
            <Icon name="comment" />
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(RequestOoltoCommentsModal);

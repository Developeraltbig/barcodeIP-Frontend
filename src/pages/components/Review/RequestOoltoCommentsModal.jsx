import React, { memo, useState } from "react";
import Icon from "./icons";
import CloseIcon from "../../../assets/icons/closeIcon.svg";
import RequestOoltoComment1Icon from "../../../assets/icons/requestOoltoComment1.svg";
import RequestOoltoCommentIcon from "../../../assets/icons/requestOoltoComment.svg";


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
              <img src={RequestOoltoComment1Icon} alt="" className="requestOolto-icon" />
            </span>
            <div>
              <h2>Request Oolto Comments</h2>
              <p>Send selected generated outputs for review comments.</p>
            </div>
          </div>

          <img src={CloseIcon} alt="" className="close-icon" onClick={onClose} />
          {/* <button className="rr-modal-close" onClick={onClose}>
          </button> */}
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
            <img src={RequestOoltoCommentIcon} alt="" className="requestOolto-icon" />
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(RequestOoltoCommentsModal);

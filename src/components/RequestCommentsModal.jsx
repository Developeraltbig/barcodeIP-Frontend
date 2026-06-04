import React, { memo, useMemo, useState } from "react";
import { projects } from "../views/Home/data";

const MODULE_OPTIONS = [
    "Patent Search",
    "Publication Search",
    "Product Search",
    "Provisional Draft",
    "Non-Provisional Draft"
];

function RequestCommentsModal({ onClose }) {
    const [selectedProjectId, setSelectedProjectId] = useState(projects?.[0]?.id || "");
    const [selectedModules, setSelectedModules] = useState([]);
    const [note, setNote] = useState("");

    const selectedProject = useMemo(() => {
        return projects.find((project) => project.id === selectedProjectId) || projects[0];
    }, [selectedProjectId]);

    const toggleModule = (moduleName) => {
        setSelectedModules((prev) =>
            prev.includes(moduleName)
                ? prev.filter((item) => item !== moduleName)
                : [...prev, moduleName]
        );
    };

    const handleSubmit = () => {
        const payload = {
            projectId: selectedProject?.id,
            projectTitle: selectedProject?.title,
            modules: selectedModules,
            note
        };

        console.log("Oolto comments request payload:", payload);
        onClose();
    };

    return (
        <div className="oc-modal-backdrop" onMouseDown={onClose}>
            <div className="oc-request-modal" onMouseDown={(e) => e.stopPropagation()}>
                <div className="oc-request-modal-header">
                    <div className="oc-modal-title-row">
                        <span className="oc-modal-title-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M7 8h10M7 12h7M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8l-5 3v-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
                            </svg>
                        </span>

                        <div>
                            <h2>Request Oolto Comments</h2>
                            <p>Send selected generated outputs for review comments.</p>
                        </div>
                    </div>

                    <button className="oc-modal-close-btn" type="button" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="oc-request-modal-body">
                    <div className="oc-project-select-block">
                        <label htmlFor="ocProjectSelect">Project</label>
                        <select
                            id="ocProjectSelect"
                            value={selectedProjectId}
                            onChange={(e) => setSelectedProjectId(e.target.value)}
                        >
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="oc-selected-project-card">
                        <h3>{selectedProject?.title || "Bimetallic Clamp and Tool for Live Tapping of Overhead Power Lines"}</h3>
                        <p>CASE ID : {selectedProject?.caseId || "016"}</p>
                    </div>

                    <div className="oc-field-group">
                        <h4>Select modules to include</h4>

                        <div className="oc-module-grid">
                            {MODULE_OPTIONS.map((moduleName) => {
                                const checked = selectedModules.includes(moduleName);

                                return (
                                    <label
                                        key={moduleName}
                                        className={`oc-module-option ${checked ? "is-checked" : ""}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => toggleModule(moduleName)}
                                        />
                                        <span className="oc-checkbox-ui" />
                                        <strong>{moduleName}</strong>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <div className="oc-field-group">
                        <h4>Optional note</h4>

                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Example. Please focus on novelty and claim overlap for the top patent references."
                        />
                    </div>
                </div>

                <div className="oc-request-modal-footer">
                    <button className="oc-submit-request-btn" type="button" onClick={handleSubmit}>
                        <span className="oc-btn-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M7 8h10M7 12h7M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8l-5 3v-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
                            </svg>
                        </span>
                        Submit Request
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(RequestCommentsModal);

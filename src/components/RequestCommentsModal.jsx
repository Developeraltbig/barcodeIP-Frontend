import React, { memo } from "react";
import { projects } from "../views/Home/data";

function RequestCommentsModal({ onClose }) {
    return (
        <div className="modal-backdrop" onMouseDown={onClose}>
            <div className="request-modal" onMouseDown={(e) => e.stopPropagation()}>
                <div className="request-modal-header">
                    <div>
                        <h2>Request Barcode Comments</h2>
                        <p>Select a case and comment type to request review comments.</p>
                    </div>

                    <button type="button" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="request-modal-body">
                    <label>Project</label>
                    <select>
                        {projects.map((project) => (
                            <option key={project.id}>{project.title}</option>
                        ))}
                    </select>

                    <label>Comment Type</label>
                    <select>
                        <option>Patent Search</option>
                        <option>Publication Search</option>
                        <option>Product Comparison</option>
                        <option>Provisional Draft</option>
                        <option>Non-Provisional Draft</option>
                    </select>
                </div>

                <div className="request-modal-footer">
                    <button className="cancel-btn" type="button" onClick={onClose}>
                        Cancel
                    </button>

                    <button className="submit-btn" type="button" onClick={onClose}>
                        Request
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(RequestCommentsModal);
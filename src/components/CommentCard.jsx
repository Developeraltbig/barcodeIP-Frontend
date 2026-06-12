import React, { memo, useState } from "react";
import { Eye, X } from "lucide-react";

function CommentCard({ item = {} }) {
    const [showMessageModal, setShowMessageModal] = useState(false);

    const status = item.analystStatus || item.status || "pending";
    const statusClass = String(status).toLowerCase().replace(/\s+/g, "-");

    const title = item.project_title || "Untitled Project";

    const moduleList = Array.isArray(item.module)
        ? item.module
        : item.module
            ? [item.module]
            : [];

    const analystMessages = Array.isArray(item.analyst) ? item.analyst : [];

    const createdDate = item.createdAt
        ? new Date(item.createdAt).toLocaleDateString()
        : "N/A";

    const openModal = () => setShowMessageModal(true);
    const closeModal = () => setShowMessageModal(false);

    return (
        <>
            <article className="oc-comment-card">
                <div className="oc-comment-main">
                    <span className="oc-comment-case">
                        <strong>Case ID:</strong> {item.case_id || "N/A"}
                    </span>

                    <h3>{title}</h3>

                    <p className="oc-requested-text">
                        Requested: {createdDate}
                    </p>
                </div>

                <div className="oc-comment-status-wrap">
                    <span className={`oc-comment-pill ${statusClass}`}>
                        {status}
                    </span>
                </div>

                <div className="oc-comment-tags">
                    {moduleList.length > 0 ? (
                        moduleList.map((tag, index) => (
                            <span key={`${tag}-${index}`}>{tag}</span>
                        ))
                    ) : (
                        <span>N/A</span>
                    )}
                </div>

                <div className="oc-comment-view-wrap">
                    <button
                        type="button"
                        className="oc-view-btn"
                        onClick={openModal}
                        title="View analyst message"
                    >
                        <Eye size={18} />
                    </button>
                </div>
            </article>

            {showMessageModal && (
                <div className="oc-modal-overlay">
                    <div className="oc-message-modal">
                        <div className="oc-message-modal-header">
                            <div>
                                <h2>Analyst Message</h2>
                                <p>{title}</p>
                            </div>

                            <button
                                type="button"
                                className="oc-modal-close-btn"
                                onClick={closeModal}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="oc-message-modal-body">
                            {analystMessages.length > 0 ? (
                                analystMessages.map((analystItem, index) => (
                                    <div
                                        className="oc-analyst-message-box"
                                        key={analystItem._id || index}
                                    >
                                        <div className="oc-analyst-meta">
                                            <span>
                                                <strong>Email:</strong>{" "}
                                                {analystItem.email || "N/A"}
                                            </span>

                                            <span>
                                                <strong>Status:</strong>{" "}
                                                {analystItem.status || "pending"}
                                            </span>
                                        </div>

                                        <p className="oc-analyst-message">
                                            {analystItem.message || "No message available."}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="oc-no-message">
                                    No analyst message available.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default memo(CommentCard);
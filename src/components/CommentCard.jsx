import React, { memo, useMemo } from "react";

function CommentCard({ item }) {
    const statusClass = useMemo(() => {
        return item.status.toLowerCase().includes("ready") ? "ready" : "pending";
    }, [item.status]);

    return (
        <article className="oc-comment-card">
            <div className="oc-comment-main">
                <span className="oc-comment-case">
                    {item.id} · Case {item.caseId}
                </span>

                <h3>{item.title}</h3>

                <p className="oc-requested-text">Requested: {item.requestedAt}</p>
            </div>

            <div className="oc-comment-status-wrap">
                <span className={`oc-comment-pill ${statusClass}`}>{item.status}</span>
            </div>

            <div className="oc-comment-tags">
                {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                ))}
            </div>
        </article>
    );
}

export default memo(CommentCard);

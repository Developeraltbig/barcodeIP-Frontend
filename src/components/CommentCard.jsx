import React, { memo, useMemo } from "react";

function CommentCard({ item }) {
    const statusClass = useMemo(() => {
        return item.status.toLowerCase().includes("ready") ? "ready" : "pending";
    }, [item.status]);

    return (
        <article className="comment-card">
            <div className="comment-main">
                <span className="comment-case">
                    {item.id} · CASE {item.caseId}
                </span>

                <h3>{item.title}</h3>
            </div>

            <div className="comment-meta">
                <span className={`comment-pill ${statusClass}`}>{item.status}</span>
                <span className="requested-text">Requested: {item.requestedAt}</span>

                <div className="comment-tags">
                    {item.tags.map((tag) => (
                        <span
                            key={tag}
                            className={tag === "Patent Search" ? "highlight" : ""}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}

export default memo(CommentCard);
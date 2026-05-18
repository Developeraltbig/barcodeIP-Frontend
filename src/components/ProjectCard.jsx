import React, { memo, useMemo } from "react";

function ProjectCard({ project, onOpen }) {
    const statusClass = useMemo(() => {
        if (project.status === "Completed") return "completed";
        if (project.status === "Processing") return "processing";
        return "pending";
    }, [project.status]);

    return (
        <article className="project-card">
            <div className="project-top">
                <span className="case-id">CASE ID · {project.id}</span>
                <span className={`status-pill ${statusClass}`}>{project.status}</span>
            </div>

            <h3>{project.title}</h3>

            <div className="project-date">◷ {project.date}</div>

            <div className="tag-list">
                {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                ))}
            </div>

            <div className="project-footer">
                <button type="button" onClick={onOpen}>
                    Open ›
                </button>
            </div>
        </article>
    );
}

export default memo(ProjectCard);
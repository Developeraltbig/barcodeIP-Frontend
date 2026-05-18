import React, { memo, useMemo } from "react";

function ProjectTableRow({ project, onOpen }) {
    const commentClass = useMemo(() => {
        const value = project.commentStatus.toLowerCase();

        if (value.includes("ready")) return "ready";
        if (value.includes("review")) return "review";

        return "neutral";
    }, [project.commentStatus]);

    return (
        <tr>
            <td>
                <div className="table-project-title">{project.title}</div>
                <div className="table-case-id">CASE ID : {project.id}</div>
            </td>

            <td>{project.date}</td>

            <td>
                <div className="table-tags">
                    {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
            </td>

            <td>
                <span className={`comment-status ${commentClass}`}>
                    {project.commentStatus}
                </span>
            </td>

            <td>
                <button className="open-btn" type="button" onClick={onOpen}>
                    Open ›
                </button>
            </td>
        </tr>
    );
}

export default memo(ProjectTableRow);
import React from "react";

function ProjectTableRow({ project, onOpen }) {
    const tags = Array.isArray(project.tags) ? project.tags : [];

    return (
        <tr>
            <td>
                <div className="table-project-title">
                    {project.title ||
                        "Manage invention cases, generated modules, reports, and Barcode Comments."}
                </div>

                <div className="table-case-id">
                    CASE ID : {project.id || project._id || "016"}
                </div>
            </td>

            <td className="project-created-cell">
                {project.date || project.createdAt || "13 May 2026"}
            </td>

            <td>
                <div className="table-tags">
                    {(tags.length ? tags : ["Patent", "Publication", "Product", "Provisional", "Non-Provisional"]).map(
                        (tag) => (
                            <span key={tag}>{tag}</span>
                        )
                    )}
                </div>
            </td>

            <td>
                <button className="request-review-btn" type="button">
                    {project.commentStatus || "Request Review"}
                </button>
            </td>

            <td>
                <button className="view-more-btn" type="button" onClick={onOpen}>
                    View More
                </button>
            </td>
        </tr>
    );
}

export default ProjectTableRow;
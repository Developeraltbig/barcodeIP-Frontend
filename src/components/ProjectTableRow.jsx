import React, { memo, useMemo } from "react";

function formatDate(dateValue) {
    if (!dateValue) return "-";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return dateValue;
    }

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function ProjectTableRow({ project, onOpen, openModal }) {
    const tags = useMemo(() => {
        if (Array.isArray(project?.module) && project.module.length > 0) {
            return project.module;
        }

        return ["Patent", "Publication", "Product", "Provisional", "Non-Provisional"];
    }, [project?.module]);

    const isReviewNotRequested = project?.analyst_status === "notRequested";

    const projectTitle =
        project?.project_title ||
        project?.title ||
        project?.project_name ||
        project?.name ||
        "Manage invention cases, generated modules, reports, and Barcode Comments.";

    const caseId = project?.case_id || project?._id || "-";

    const reviewButtonText = isReviewNotRequested
        ? "Request Review"
        : project?.analyst_status === "pending"
            ? "Pending"
            : project?.analyst_status || "Pending";

    return (
        <tr>
            <td>
                <div className="table-project-title">
                    {projectTitle}
                </div>

                <div className="table-case-id">
                    CASE ID: {caseId}
                </div>
            </td>

            <td className="project-created-cell">
                {formatDate(project?.createdAt)}
            </td>

            <td>
                <div className="table-tags">
                    {tags.map((tag) => (
                        <span key={tag}>
                            {tag.charAt(0).toUpperCase() + tag.slice(1)}
                        </span>
                    ))}
                </div>
            </td>

            <td>
                <button
                    className="request-review-btn"
                    type="button"
                    disabled={!isReviewNotRequested}
                    onClick={() => {
                        if (isReviewNotRequested) {
                            openModal(project);
                        }
                    }}
                >
                    {reviewButtonText}
                </button>
            </td>

            <td>
                <button
                    className="view-more-btn"
                    type="button"
                    onClick={() => onOpen(project)}
                >
                    View More
                </button>
            </td>
        </tr>
    );
}

export default memo(ProjectTableRow);
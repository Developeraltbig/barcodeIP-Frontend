import React, { useMemo, useState } from "react";
import { PAGES } from "../views/Home/constants";
import { projects } from "../views/Home/data";
import ProjectTableRow from "../components/ProjectTableRow";

function MyProjectsPage({ onPageChange }) {
    const [search, setSearch] = useState("");

    const filteredProjects = useMemo(() => {
        const value = search.trim().toLowerCase();

        if (!value) return projects;

        return projects.filter((project) => {
            const searchableText = [
                project.id,
                project.title,
                project.date,
                project.status,
                project.commentStatus,
                ...project.tags,
            ]
                .join(" ")
                .toLowerCase();

            return searchableText.includes(value);
        });
    }, [search]);

    return (
        <section className="content-wrap">
            <div className="page-hero">
                <div>
                    <button
                        className="back-btn"
                        type="button"
                        onClick={() => onPageChange(PAGES.NEW_CASE)}
                    >
                        ← Back
                    </button>

                    <h1>My Projects</h1>
                    <p>
                        Manage invention cases, generated modules, reports, and Barcode
                        Comments.
                    </p>
                </div>

                <button
                    className="primary-action-btn"
                    type="button"
                    onClick={() => onPageChange(PAGES.NEW_CASE)}
                >
                    ✦ New Analysis
                </button>
            </div>

            <div className="table-card">
                <div className="table-toolbar">
                    <div className="search-control">
                        <span>⌕</span>

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search projects"
                        />
                    </div>

                    <button className="filter-btn" type="button">
                        ⌯ Filter
                    </button>
                </div>

                <div className="project-table-wrap">
                    <table className="project-table">
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Created</th>
                                <th>Modules</th>
                                <th>Barcode Comments</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredProjects.map((project) => (
                                <ProjectTableRow
                                    key={project.id}
                                    project={project}
                                    onOpen={() => onPageChange(PAGES.REVIEW)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default MyProjectsPage;
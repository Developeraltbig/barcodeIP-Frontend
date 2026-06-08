import React, { useMemo, useState } from "react";
import { PAGES } from "../views/Home/constants";
import { projects } from "../views/Home/data";
import ProjectTableRow from "../components/ProjectTableRow";

import NewAnalysisIcon from "../assets/icons/newAnalysis.svg";
import LeftArrowIcon from "../assets/icons/leftArrow.svg";
import FilterIcon from "../assets/icons/filter.svg";
import SearchIcon from "../assets/icons/searchIcon.svg";



function MyProjectsPage({ onPageChange }) {
    const [search, setSearch] = useState("");

    const filteredProjects = useMemo(() => {
        const value = search.trim().toLowerCase();

        if (!value) return projects;

        return projects.filter((project) => {
            const tags = Array.isArray(project.tags) ? project.tags : [];

            const searchableText = [
                project.id,
                project._id,
                project.title,
                project.date,
                project.status,
                project.commentStatus,
                ...tags,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchableText.includes(value);
        });
    }, [search]);

    return (
        <section className="content-wrap projects-page-wrap">
            <div className="projects-hero">
                <div>
                    <button
                        className="projects-back-btn"
                        type="button"
                        onClick={() => onPageChange(PAGES.NEW_CASE)}
                    >
                        <span><img src={LeftArrowIcon} alt="" className="left-icon" /> Back</span>
                    </button>

                    <h1>My Projects</h1>
                    <p>
                        Manage invention cases, generated modules, reports, and Barcode
                        Comments.
                    </p>
                </div>

                <button
                    className="projects-new-btn"
                    type="button"
                    onClick={() => onPageChange(PAGES.NEW_CASE)}
                >
                    <span><img src={NewAnalysisIcon} alt="" className="new-analysis-icon" /> New Analysis</span>
                </button>
            </div>

            <div className="projects-table-card">
                <div className="projects-table-toolbar">
                    <div className="projects-search-control">
                        <span><img src={SearchIcon} alt="" className="search-icon" /></span>

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                        />
                    </div>

                    <button className="projects-filter-btn" type="button">
                        <span><img src={FilterIcon} alt="" className="filter-icon" /> Filter </span>
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
                                    key={project.id || project._id}
                                    project={project}
                                    onOpen={() => onPageChange(PAGES.REVIEW)}
                                />
                            ))}

                            {filteredProjects.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="project-empty-cell">
                                        No projects found.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default MyProjectsPage;
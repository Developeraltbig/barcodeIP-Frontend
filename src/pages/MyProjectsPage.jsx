import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PAGES } from "../views/Home/constants";
import ProjectTableRow from "../components/ProjectTableRow";

import NewAnalysisIcon from "../assets/icons/newAnalysis.svg";
import LeftArrowIcon from "../assets/icons/leftArrow.svg";
import FilterIcon from "../assets/icons/filter.svg";
import SearchIcon from "../assets/icons/searchIcon.svg";

import { useFetchAllProjectsQuery } from "../features/userApi";
import RequestCommentsModal from "../components/RequestCommentsModal";
import "../pages/OoltoComments.css";
import { setSelectedProject } from '../features/slice/userSlice';
import { useDispatch } from 'react-redux';

const PAGE_SIZE = 10;

function MyProjectsPage({ onPageChange }) {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    const {
        data: projectsData,
        isLoading,
        isFetching,
        isError,
        error,
    } = useFetchAllProjectsQuery({
        page: currentPage,
        limit: PAGE_SIZE,
        search: debouncedSearch,
        status: statusFilter,
    });

    const projectList = useMemo(() => {
        if (!projectsData) return [];

        if (Array.isArray(projectsData)) return projectsData;

        if (Array.isArray(projectsData.data)) return projectsData.data;

        if (Array.isArray(projectsData.projects)) return projectsData.projects;

        if (Array.isArray(projectsData.data?.projects)) {
            return projectsData.data.projects;
        }

        return [];
    }, [projectsData]);

    const pagination = useMemo(() => {
        return {
            total: projectsData?.pagination?.total || 0,
            page: projectsData?.pagination?.page || currentPage,
            pages: projectsData?.pagination?.pages || 1,
        };
    }, [projectsData, currentPage]);

    const handleOpenModal = useCallback((project) => {
        if (!project) return;

        setCurrentProject(project);
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
        setCurrentProject(null);
    }, []);

    const handleProjectDetail = useCallback(
        (project) => {
            const projectId = project?._id;
            onPageChange(PAGES.REVIEW, projectId);
            dispatch(setSelectedProject(project))
        },
        [onPageChange]
    );

    const handleSearchChange = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    const handleStatusFilterChange = useCallback((e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    }, []);

    const handlePrevPage = useCallback(() => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    }, []);

    const handleNextPage = useCallback(() => {
        setCurrentPage((prev) => Math.min(prev + 1, pagination.pages));
    }, [pagination.pages]);

    return (
        <section className="content-wrap projects-page-wrap">
            <div className="projects-hero">
                <div>
                    <button
                        className="projects-back-btn"
                        type="button"
                        onClick={() => onPageChange(PAGES.NEW_CASE)}
                    >
                        <span>
                            <img src={LeftArrowIcon} alt="" className="left-icon" />
                            Back
                        </span>
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
                    <span>
                        <img
                            src={NewAnalysisIcon}
                            alt=""
                            className="new-analysis-icon"
                        />
                        {"  "}New Analysis
                    </span>
                </button>
            </div>

            <div className="projects-table-card">
                <div className="projects-table-toolbar">
                    <div className="projects-search-control">
                        <span>
                            <img src={SearchIcon} alt="" className="search-icon" />
                        </span>

                        <input
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search by project, case ID, module..."
                        />
                    </div>

                    <div className="projects-filter-control">
                        {/* <img src={FilterIcon} alt="" className="filter-icon" /> */}

                        <select
                            value={statusFilter}
                            onChange={handleStatusFilterChange}
                        >
                            <option value="all">All Status</option>
                            <option value="notRequested">Not Requested</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
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
                            {isLoading || isFetching ? (
                                <tr>
                                    <td colSpan="5" className="project-empty-cell">
                                        Loading projects...
                                    </td>
                                </tr>
                            ) : isError ? (
                                <tr>
                                    <td colSpan="5" className="project-empty-cell">
                                        {error?.data?.message ||
                                            error?.message ||
                                            "Failed to load projects."}
                                    </td>
                                </tr>
                            ) : projectList.length > 0 ? (
                                projectList.map((project, index) => (
                                    <ProjectTableRow
                                        key={project?._id || project?.id || index}
                                        project={project}
                                        onOpen={handleProjectDetail}
                                        openModal={handleOpenModal}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="project-empty-cell">
                                        No projects found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {!isLoading && !isFetching && pagination.total > 0 && (
                    <div className="projects-pagination">
                        <div className="projects-pagination-info">
                            Showing{" "}
                            <strong>
                                {(pagination.page - 1) * PAGE_SIZE + 1}
                            </strong>{" "}
                            to{" "}
                            <strong>
                                {Math.min(pagination.page * PAGE_SIZE, pagination.total)}
                            </strong>{" "}
                            of <strong>{pagination.total}</strong> projects
                        </div>

                        <div className="projects-pagination-actions">
                            <button
                                type="button"
                                onClick={handlePrevPage}
                                disabled={currentPage <= 1}
                            >
                                Previous
                            </button>

                            <span>
                                Page {pagination.page} of {pagination.pages}
                            </span>

                            <button
                                type="button"
                                onClick={handleNextPage}
                                disabled={currentPage >= pagination.pages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {showModal && currentProject && (
                <RequestCommentsModal
                    onClose={handleCloseModal}
                    data={currentProject}
                />
            )}
        </section>
    );
}

export default MyProjectsPage;
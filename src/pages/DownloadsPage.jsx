import React, { useMemo, useState, useCallback } from "react";
import "./DownloadPage.css";
import DownloadIcons from "../assets/icons/DownloadIcon1.svg";
import { useFetchAllProjectsQuery } from "../features/userApi";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import axios from "axios";


const PAGE_SIZE = 10;

function DownloadIcon() {
    return (
        <img
            src={DownloadIcons}
            alt=""
            className="download-icon"
        />
    );
}

function DownloadsPage() {
    const { token } = useSelector((state) => state.auth);
    const [downloadingId, setDownloadingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: projectsData,
        isLoading,
        isFetching,
        isError,
        error,
    } = useFetchAllProjectsQuery({
        page: currentPage,
        limit: PAGE_SIZE,
    });

    const downloadFiles = useMemo(() => {
        if (!projectsData) return [];

        if (Array.isArray(projectsData?.data?.projects)) {
            return projectsData.data.projects;
        }

        if (Array.isArray(projectsData?.projects)) {
            return projectsData.projects;
        }

        if (Array.isArray(projectsData?.data)) {
            return projectsData.data;
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

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const handleDownload = useCallback((project) => {
        console.log("Download:", project);

        // Example
        // window.open(`/api/project/download/${project._id}`, "_blank");
    }, []);

    const handlePrevPage = useCallback(() => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    }, []);

    const handleNextPage = useCallback(() => {
        setCurrentPage((prev) =>
            Math.min(prev + 1, pagination.pages)
        );
    }, [pagination.pages]);


    const handleDownloadAllReport = async (project) => {
        try {
            setDownloadingId(project._id);

            const modules = project?.module || [];

            const downloadTasks = [];

            if (modules.includes("patent")) {
                downloadTasks.push(handlePatentDownload(project._id));
            }

            if (modules.includes("publish")) {
                downloadTasks.push(handlePublicationDownload(project._id));
            }

            if (modules.includes("provisional")) {
                downloadTasks.push(handleProvisionalDownload(project._id));
            }

            if (modules.includes("nonProvisional")) {
                downloadTasks.push(handleNonProvisionalDownload(project._id));
            }

            // if (modules.includes("product")) {
            //     downloadTasks.push(handleProductDownload(project._id));
            // }

            await Promise.all(downloadTasks);

            toast.success("All reports downloaded successfully");
        } catch (error) {
            console.error("All PDF download error:", error);
            toast.error("Download failed. Please contact administrator.");
        } finally {
            setDownloadingId(null);
        }
    };

    const handlePublicationDownload = async (projectId) => {
        try {
            if (!projectId) {
                console.error("Project ID missing");
                return;
            }
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/projects/publish/download-pdf/${projectId}`,
                {
                    responseType: "arraybuffer",

                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/pdf",
                    },
                }
            );
            const pdfBlob = new Blob(
                [response.data],
                {
                    type: "application/pdf",
                }
            );
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Publish-Report.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 1000);
        } catch (error) {
            toast.error("PDF download error: Contact administration");
            console.error(
                "PDF download error:",
                error
            );
        }
    };

    const handlePatentDownload = async (projectId) => {
        try {
            if (!projectId) {
                console.error("Project ID missing");
                return;
            }
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/patents/download-pdf/${projectId}`,
                {
                    responseType: "arraybuffer",

                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/pdf",
                    },
                }
            );
            const pdfBlob = new Blob(
                [response.data],
                {
                    type: "application/pdf",
                }
            );
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Patent-Draft.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 1000);
        } catch (error) {
            toast.error("PDF download error: Contact administration");
            console.error(
                "PDF download error:",
                error
            );
        }
    };

    const handleNonProvisionalDownload = async (projectId) => {
        try {
            if (!projectId) {
                toast.error("Project ID missing");
                return;
            }
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/nonProvisionalDraft/download-pdf/${projectId}`,
                {
                    responseType: "arraybuffer",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/pdf",
                    },
                }
            );
            const pdfBlob = new Blob(
                [response.data],
                {
                    type: "application/pdf",
                }
            );
            // console.log("PDF size:", pdfBlob.size);
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Non-Provisional-Draft.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 1000);
        } catch (error) {
            toast.error("PDF download error: Contact administration");
            console.error(
                "PDF download error:",
                error
            );

        }
    };

    const handleProvisionalDownload = async (projectId) => {
        try {
            if (!projectId) {
                console.error("Project ID missing");
                return;
            }
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/provisionalDraft/download-pdf/${projectId}`,
                {
                    responseType: "arraybuffer",

                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/pdf",
                    },
                }
            );
            const pdfBlob = new Blob(
                [response.data],
                {
                    type: "application/pdf",
                }
            );
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Provisional-Draft.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 1000);
        } catch (error) {
            toast.error("PDF download error: Contact administration");
            console.error(
                "PDF download error:",
                error
            );
        }
    };


    return (
        <section className="content-wrap downloads-page">
            <div className="downloads-hero">
                <div>
                    <h1>Downloads</h1>
                    <p>
                        Generated reports and draft exports for the selected
                        invention case.
                    </p>
                </div>
            </div>

            <div className="downloads-panel">

                {isLoading || isFetching ? (
                    <div className="downloads-empty-card">
                        <h2>Loading...</h2>
                    </div>
                ) : isError ? (
                    <div className="downloads-empty-card">
                        <h2>
                            {error?.data?.message ||
                                error?.message ||
                                "Failed to load projects"}
                        </h2>
                    </div>
                ) : downloadFiles.length > 0 ? (
                    <>
                        <div className="downloads-list">
                            {downloadFiles.map((file) => (
                                <article
                                    className="download-card"
                                    key={file._id}
                                >
                                    <div className="download-info">
                                        <h2>
                                            {file.project_title ||
                                                "Untitled Project"}
                                        </h2>

                                        <p>
                                            PDF <span>·</span>{" "}
                                            {formatDate(
                                                file.createdAt
                                            )}
                                        </p>
                                    </div>


                                    <button
                                        className="download-btn"
                                        type="button"
                                        disabled={downloadingId === file._id}
                                        onClick={() => handleDownloadAllReport(file)}
                                    >
                                        {downloadingId === file._id ? (
                                            "Loading..."
                                        ) : (
                                            <>
                                                <DownloadIcon />
                                                Download
                                            </>
                                        )}
                                    </button>


                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.total > 0 && (
                            <div className="projects-pagination">
                                <div className="projects-pagination-info">
                                    Showing{" "}
                                    <strong>
                                        {(pagination.page - 1) *
                                            PAGE_SIZE +
                                            1}
                                    </strong>{" "}
                                    to{" "}
                                    <strong>
                                        {Math.min(
                                            pagination.page *
                                            PAGE_SIZE,
                                            pagination.total
                                        )}
                                    </strong>{" "}
                                    of{" "}
                                    <strong>
                                        {pagination.total}
                                    </strong>{" "}
                                    projects
                                </div>

                                <div className="projects-pagination-actions">
                                    <button
                                        type="button"
                                        onClick={handlePrevPage}
                                        disabled={
                                            currentPage <= 1
                                        }
                                    >
                                        Previous
                                    </button>

                                    <span>
                                        Page {pagination.page} of{" "}
                                        {pagination.pages}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={handleNextPage}
                                        disabled={
                                            currentPage >=
                                            pagination.pages
                                        }
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="downloads-empty-card">
                        <h2>No downloads yet</h2>
                        <p>
                            Open a project or complete an analysis
                            to generate downloadable files.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default DownloadsPage;
import React from "react";
import "./DownloadPage.css";
import DownloadIcons from "../assets/icons/DownloadIcon1.svg";

const downloadFiles = [
    {
        id: "full-case-report",
        title: "Full Case Report",
        type: "PDF",
        date: "13 May 2026",
        url: "#"
    },
    {
        id: "patent-mapping-report",
        title: "Patent Mapping Report",
        type: "DOCX",
        date: "13 May 2026",
        url: "#"
    },
    {
        id: "provisional-draft",
        title: "Provisional Draft",
        type: "DOCX",
        date: "13 May 2026",
        url: "#"
    },
    {
        id: "product-comparison-evidence",
        title: "Product Comparison Evidence",
        type: "PDF",
        date: "13 May 2026",
        url: "#"
    },
    {
        id: "publication-search-references",
        title: "Publication Search References",
        type: "PDF",
        date: "13 May 2026",
        url: "#"
    }
];

function DownloadIcon() {
    return (
        <img src={DownloadIcons} alt="" className="download-icon" />
    );
}

function DownloadsPage() {
    const handleDownload = (file) => {
        /*
          Replace this with your real download logic.
          Example:
          window.open(file.url, "_blank");
        */
        console.log("Download clicked:", file);
    };

    return (
        <section className="content-wrap downloads-page">
            <div className="downloads-hero">
                <div>
                    <h1>Downloads</h1>
                    <p>Generated reports and draft exports for the selected invention case.</p>
                </div>
            </div>

            <div className="downloads-panel">
                {downloadFiles.length > 0 ? (
                    <div className="downloads-list">
                        {downloadFiles.map((file) => (
                            <article className="download-card" key={file.id}>
                                <div className="download-info">
                                    <h2>{file.title}</h2>
                                    <p>
                                        {file.type} <span>·</span> {file.date}
                                    </p>
                                </div>

                                <button
                                    className="download-btn"
                                    type="button"
                                    onClick={() => handleDownload(file)}
                                >
                                    <DownloadIcon />
                                    Download
                                </button>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="downloads-empty-card">
                        <h2>No downloads yet</h2>
                        <p>Open a project or complete an analysis to generate downloadable files.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default DownloadsPage;

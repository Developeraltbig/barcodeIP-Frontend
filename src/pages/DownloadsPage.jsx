import React from "react";

function DownloadsPage() {
    return (
        <section className="content-wrap">
            <div className="page-hero">
                <div>
                    <h1>Downloads</h1>
                    <p>Generated reports, drafts, and export files will appear here.</p>
                </div>
            </div>

            <div className="empty-card">
                <h2>No downloads yet</h2>
                <p>Open a project or complete an analysis to generate downloadable files.</p>
            </div>
        </section>
    );
}

export default DownloadsPage;
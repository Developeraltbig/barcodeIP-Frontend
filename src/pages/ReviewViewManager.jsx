import React, { memo } from "react";
import FeatureMappingView from "./components/Review/FeatureMappingView";
import PatentDetailView from "./components/Review/PatentDetailView";
import OverlapSummaryView from "./components/Review/OverlapSummaryView";
import RequestOoltoCommentsModal from "./components/Review/RequestOoltoCommentsModal";

function ReviewViewManager({
    activeView,
    selectedPatent,
    projectPatent,
    strictMode,
    setStrictMode,
    goBackToResults,
    openMapping,
    openOverlap,
    showCommentsModal,
    setShowCommentsModal,
    projectInfo,
}) {
    if (activeView === "results") return null;

    return (
        <section className="content-wrap rr-page">
            {activeView === "mapping" && (
                <FeatureMappingView
                    patent={selectedPatent}
                    data={projectPatent}
                    onBack={goBackToResults}
                    onOpenOverlap={() => openOverlap(selectedPatent)}
                    onDownload={() => console.log("Download mapping:", selectedPatent)}
                />
            )}

            {activeView === "details" && (
                <PatentDetailView
                    patent={selectedPatent}
                    onBack={goBackToResults}
                    onViewMapping={() => openMapping(selectedPatent)}
                    onDownloadMapping={() => console.log("Download mapping:", selectedPatent)}
                />
            )}

            {activeView === "overlap" && (
                <OverlapSummaryView
                    patent={selectedPatent}
                    data={projectPatent}
                    strictMode={strictMode}
                    onStrictModeChange={setStrictMode}
                    onBack={goBackToResults}
                    onViewMapping={() => openMapping(selectedPatent)}
                    onDownloadMapping={() => console.log("Download mapping:", selectedPatent)}
                />
            )}

            {showCommentsModal && (
                <RequestOoltoCommentsModal
                    project={projectInfo}
                    onClose={() => setShowCommentsModal(false)}
                />
            )}
        </section>
    );
}

export default memo(ReviewViewManager);
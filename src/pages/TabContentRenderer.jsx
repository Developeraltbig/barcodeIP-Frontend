import React, { memo, useState } from "react";
import RealTimeProgressBar from "./RealTimeProgressBar";
import ProcessingPlaceholderTab from "./components/Review/ProcessingPlaceholderTab";
import PatentTab from "./components/Review/PatentTab";
import PublicationTab from "./components/Review/PublicationTab";
import ProductTab from "./components/Review/ProductTab";
import DraftTab from "./components/Review/DraftTab";
import NonProvisionalTab from "./components/Review/NonProvisionalTab";

import FeatureMappingView from "./components/Review/FeatureMappingView";
import PatentDetailView from "./components/Review/PatentDetailView";
import OverlapSummaryView from "./components/Review/OverlapSummaryView";

const MODULE_KEYS = {
    PATENT: "patent",
    PUBLICATIONS: "publications",
    PRODUCTS: "products",
    PROVISIONAL: "provisional",
    NON_PROVISIONAL: "nonProvisional",
};


/* =========================================================
   PATENT REVIEW MODAL
========================================================= */

function PatentReviewModal({
    type,
    patent,
    projectPatent,
    strictMode,
    setStrictMode,
    onClose,
    onOpenMapping,
    onOpenDetails,
    onOpenOverlap,
}) {
    if (!type || !patent) {
        return null;
    }

    const handleOverlayClick = (event) => {
        // Close only when clicking the dark overlay
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const getTitle = () => {
        switch (type) {
            case "mapping":
                return "Feature Mapping";

            case "details":
                return "Patent Details";

            case "overlap":
                return "Overlap Summary";

            default:
                return "Patent Review";
        }
    };

    return (
        <div
            className="rr-patent-modal-overlay"
            onClick={handleOverlayClick}
        >
            <div className="rr-patent-modal">

                {/* =================================================
                    MODAL HEADER
                ================================================= */}

                <div className="rr-patent-modal-header">

                    <div className="rr-patent-modal-title">

                        <h2>{getTitle()}</h2>

                        {patent?.title && (
                            <p>
                                {patent.title}
                            </p>
                        )}

                    </div>

                    <button
                        type="button"
                        className="rr-patent-modal-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>


                {/* =================================================
                    MODAL BODY
                ================================================= */}

                <div className="rr-patent-modal-body">

                    {/* =================================================
                        FEATURE MAPPING
                    ================================================= */}

                    {type === "mapping" && (
                        <FeatureMappingView
                            patent={patent}
                            data={projectPatent[0]}

                            onBack={onClose}

                            onOpenOverlap={() =>
                                onOpenOverlap(patent)
                            }

                            // onViewDetails={() =>
                            //     onOpenDetails(patent)
                            // }

                            onDownload={() =>
                                console.log(
                                    "Download mapping:",
                                    patent
                                )
                            }
                        />
                    )}


                    {/* =================================================
                        PATENT DETAILS
                    ================================================= */}

                    {type === "details" && (
                        <PatentDetailView
                            patent={patent}

                            onBack={onClose}

                            onViewMapping={() =>
                                onOpenMapping(patent)
                            }

                            onViewOverlap={() =>
                                onOpenOverlap(patent)
                            }

                            onDownloadMapping={() =>
                                console.log(
                                    "Download mapping:",
                                    patent
                                )
                            }
                        />
                    )}


                    {/* =================================================
                        OVERLAP
                    ================================================= */}

                    {type === "overlap" && (
                        <OverlapSummaryView
                            patent={patent}
                            data={projectPatent[0]}

                            strictMode={strictMode}

                            onStrictModeChange={
                                setStrictMode
                            }

                            onBack={onClose}

                            onViewMapping={() =>
                                onOpenMapping(patent)
                            }

                            onViewDetails={() =>
                                onOpenDetails(patent)
                            }

                            onDownloadMapping={() =>
                                console.log(
                                    "Download mapping:",
                                    patent
                                )
                            }
                        />
                    )}

                </div>
            </div>
        </div>
    );
}


/* =========================================================
   TAB CONTENT RENDERER
========================================================= */

function TabContentRenderer({
    activeModuleKey,
    activeTabConfig,
    tabProgress,
    isActiveTabLoading,
    tabRuntime,
    data,
    handlers,
}) {

    const {
        progress = 0,
        status = "running",
        message = "",
    } = tabProgress || {};


    /* =========================================================
       MODAL STATE
    ========================================================= */

    const [activeModal, setActiveModal] = useState(null);

    const [selectedPatent, setSelectedPatent] =
        useState(null);


    /* =========================================================
       OPEN MAPPING
    ========================================================= */

    const handleOpenMapping = (patent) => {

        console.log(
            "Opening Mapping:",
            patent
        );

        setSelectedPatent(patent);

        setActiveModal("mapping");
    };


    /* =========================================================
       OPEN DETAILS
    ========================================================= */

    const handleOpenDetails = (patent) => {

        console.log(
            "Opening Details:",
            patent
        );

        setSelectedPatent(patent);

        setActiveModal("details");
    };


    /* =========================================================
       OPEN OVERLAP
    ========================================================= */

    const handleOpenOverlap = (patent) => {

        console.log(
            "Opening Overlap:",
            patent
        );

        setSelectedPatent(patent);

        setActiveModal("overlap");
    };


    /* =========================================================
       CLOSE MODAL
    ========================================================= */

    const handleCloseModal = () => {

        setActiveModal(null);

        setSelectedPatent(null);
    };


    const isFailed = status === "failed";

    const isRunning = status === "running";


    console.log(
        "activeModuleKey:",
        activeModuleKey
    );

    console.log(
        "status:",
        status
    );


    /* =========================================================
       FAILED STATE
    ========================================================= */

    if (isFailed) {

        return (
            <div className="tab-processing-container">

                <RealTimeProgressBar
                    label={
                        activeTabConfig?.label ||
                        "Selected Tab"
                    }
                    progress={progress}
                    status={status}
                    errorMessage={message}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >

                    <button
                        type="button"
                        className="rr-action-btn primary"
                        onClick={() => {
                            handlers?.onRegenerate?.(
                                activeModuleKey
                            );
                        }}
                        disabled={
                            handlers?.isRegenerating
                        }
                    >
                        {handlers?.isRegenerating
                            ? "Regenerating..."
                            : "Regenerate"}
                    </button>

                </div>

            </div>
        );
    }


    /* =========================================================
       RUNNING STATE
    ========================================================= */

    if (isRunning) {

        return (
            <RealTimeProgressBar
                label={
                    activeTabConfig?.label ||
                    "Selected Tab"
                }
                progress={progress}
                status={status}
                errorMessage={message}
            />
        );
    }


    /* =========================================================
       LOADING STATE
    ========================================================= */

    if (isActiveTabLoading) {

        return (
            <ProcessingPlaceholderTab
                label={
                    activeTabConfig?.label ||
                    "Selected"
                }
                runtime={
                    tabRuntime[
                    activeModuleKey
                    ]
                }
            />
        );
    }


    /* =========================================================
       COMPLETED CONTENT
    ========================================================= */

    let content = null;


    switch (activeModuleKey) {

        /* =====================================================
           PATENT
        ===================================================== */

        case MODULE_KEYS.PATENT:

            content = (
                <PatentTab
                    runtime={
                        tabRuntime[
                        MODULE_KEYS.PATENT
                        ]
                    }

                    results={
                        data.patentResults
                    }

                    strictMode={
                        handlers.strictMode
                    }

                    onStrictModeChange={
                        handlers.setStrictMode
                    }

                    /*
                     * IMPORTANT:
                     * Use local modal handlers.
                     */

                    onViewMapping={
                        handleOpenMapping
                    }

                    onViewDetails={
                        handleOpenDetails
                    }

                    onViewOverlap={
                        handleOpenOverlap
                    }

                    onDownloadPatentReport={() =>
                        console.log(
                            "Download patent report"
                        )
                    }
                />
            );

            break;


        /* =====================================================
           PUBLICATIONS
        ===================================================== */

        case MODULE_KEYS.PUBLICATIONS:

            content = (
                <PublicationTab
                    results={
                        data.publicationResults
                    }

                    onDownloadPublications={() =>
                        console.log(
                            "Download publications"
                        )
                    }

                    onViewPublication={
                        (publication) =>
                            console.log(
                                "View publication:",
                                publication
                            )
                    }
                />
            );

            break;


        /* =====================================================
           PRODUCTS
        ===================================================== */

        case MODULE_KEYS.PRODUCTS:

            content = (
                <ProductTab
                    results={
                        data.productResults
                    }

                    onViewProductDetails={
                        (product) => {

                            if (
                                product &&
                                product.link
                            ) {

                                window.open(
                                    product.link,
                                    "_blank",
                                    "noopener,noreferrer"
                                );

                            } else {

                                console.warn(
                                    "No link available for this product:",
                                    product
                                );

                            }
                        }
                    }
                />
            );

            break;


        /* =====================================================
           PROVISIONAL
        ===================================================== */

        case MODULE_KEYS.PROVISIONAL:

            content = (
                <DraftTab
                    title="Provisional Draft"

                    description="Editable provisional specification sections generated from the invention disclosure."

                    sectionsData={
                        data.provisionalSections
                    }

                    downloadLabel="Download Provisional Draft"

                    onDownload={() =>
                        console.log(
                            "Download provisional draft"
                        )
                    }
                />
            );

            break;


        /* =====================================================
           NON PROVISIONAL
        ===================================================== */

        case MODULE_KEYS.NON_PROVISIONAL:

            content = (
                <NonProvisionalTab
                    title="Non-Provisional Draft"

                    description="Draft sections, representative claims, block diagrams, and flow charts."

                    sectionsData={
                        data.nonProvisionalSections
                    }

                    downloadLabel="Download Non-Provisional Draft"

                    onDownload={() =>
                        console.log(
                            "Download non-provisional draft"
                        )
                    }
                />
            );

            break;


        /* =====================================================
           DEFAULT
        ===================================================== */

        default:

            content = (
                <ProcessingPlaceholderTab
                    label={
                        activeTabConfig?.label ||
                        "Selected"
                    }

                    runtime={
                        tabRuntime[
                        activeModuleKey
                        ]
                    }
                />
            );

            break;
    }


    /* =========================================================
       FINAL RETURN
    ========================================================= */

    return (
        <>
            {/* Main tab content */}
            {content}


            {/* =================================================
                PATENT REVIEW MODAL

                This is rendered on top of the current tab.
            ================================================= */}

            {activeModal &&
                selectedPatent && (

                    <PatentReviewModal
                        type={activeModal}

                        patent={
                            selectedPatent
                        }

                        /*
                         * IMPORTANT:
                         * Change this if your actual
                         * project patent data lives
                         * somewhere else.
                         */
                        projectPatent={
                            data.patentResults
                        }

                        strictMode={
                            handlers.strictMode
                        }

                        setStrictMode={
                            handlers.setStrictMode
                        }

                        onClose={
                            handleCloseModal
                        }

                        onOpenMapping={
                            handleOpenMapping
                        }

                        onOpenDetails={
                            handleOpenDetails
                        }

                        onOpenOverlap={
                            handleOpenOverlap
                        }
                    />

                )}
        </>
    );
}


export default memo(TabContentRenderer);
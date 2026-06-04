import React, { memo, useCallback, useMemo, useState } from "react";
import { PAGES } from "../views/Home/constants";

import ResultHeader from "./components/Review/ResultHeader";
import OutputTabs from "./components/Review/OutputTabs";
import KeyFeaturesSection from "./components/Review/KeyFeaturesSection";
import PatentTab from "./components/Review/PatentTab";
import PublicationTab from "./components/Review/PublicationTab";
import ProductTab from "./components/Review/ProductTab";
import DraftTab from "./components/Review/DraftTab";
import ProcessingPlaceholderTab from "./components/Review/ProcessingPlaceholderTab";
import RequestOoltoCommentsModal from "./components/Review/RequestOoltoCommentsModal";
import FeatureMappingView from "./components/Review/FeatureMappingView";
import PatentDetailView from "./components/Review/PatentDetailView";
import OverlapSummaryView from "./components/Review/OverlapSummaryView";

import {
    OUTPUT_TABS,
    TAB_KEYS,
    INITIAL_TAB_RUNTIME,
    PROJECT_INFO,
    PRIMARY_FEATURES,
    SECONDARY_FEATURES,
    PATENT_RESULTS,
    PUBLICATION_RESULTS,
    PRODUCT_RESULTS,
    PROVISIONAL_SECTIONS,
    NON_PROVISIONAL_SECTIONS
} from "./data/reviewResultsData";

import "./ReviewResultsTabs.css";

function ReviewPlaceholder({ onPageChange }) {
    const [activeTab, setActiveTab] = useState(TAB_KEYS.PATENT);
    const [activeView, setActiveView] = useState("results");
    const [selectedPatent, setSelectedPatent] = useState(PATENT_RESULTS[0]);
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [strictMode, setStrictMode] = useState(false);
    const [tabRuntime, setTabRuntime] = useState(INITIAL_TAB_RUNTIME);

    const activeTabConfig = useMemo(
        () => OUTPUT_TABS.find((tab) => tab.key === activeTab),
        [activeTab]
    );

    /*
      Future Socket.IO integration:
      update payload by tab type.
  
      {
        type: "patent" | "publications" | "products" | "provisional" | "nonProvisional",
        status: "queued" | "processing" | "completed" | "error",
        progress: 68,
        message: "Preparing mappings",
        subMessage: "This can take a few minutes",
        steps: []
      }
    */
    const handleRealtimeUpdate = useCallback((payload) => {
        if (!payload?.type) return;

        setTabRuntime((prev) => ({
            ...prev,
            [payload.type]: {
                ...prev[payload.type],
                ...payload
            }
        }));
    }, []);

    const goBackToProjects = () => {
        if (onPageChange) {
            onPageChange(PAGES.PROJECTS || PAGES.NEW_CASE);
        }
    };

    const goBackToResults = () => {
        setActiveView("results");
    };

    const openMapping = (patent) => {
        setSelectedPatent(patent);
        setActiveView("mapping");
    };

    const openDetails = (patent) => {
        setSelectedPatent(patent);
        setActiveView("details");
    };

    const openOverlap = (patent) => {
        setSelectedPatent(patent);
        setActiveView("overlap");
    };

    const renderActiveTab = () => {
        if (activeTab === TAB_KEYS.PATENT) {
            return (
                <PatentTab
                    runtime={tabRuntime.patent}
                    results={PATENT_RESULTS}
                    strictMode={strictMode}
                    onStrictModeChange={setStrictMode}
                    onViewMapping={openMapping}
                    onViewDetails={openDetails}
                    onViewOverlap={openOverlap}
                    onDownloadPatentReport={() => console.log("Download patent report")}
                />
            );
        }

        if (activeTab === TAB_KEYS.PUBLICATIONS) {
            return (
                <PublicationTab
                    results={PUBLICATION_RESULTS}
                    onDownloadPublications={() => console.log("Download publications")}
                    onViewPublication={(publication) => console.log("View publication:", publication)}
                />
            );
        }

        if (activeTab === TAB_KEYS.PRODUCTS) {
            return (
                <ProductTab
                    results={PRODUCT_RESULTS}
                    onViewProductDetails={(product) => console.log("View product details:", product)}
                />
            );
        }

        if (activeTab === TAB_KEYS.PROVISIONAL) {
            return (
                <DraftTab
                    title="Provisional Draft"
                    description="Editable provisional specification sections generated from the invention disclosure."
                    sections={PROVISIONAL_SECTIONS}
                    downloadLabel="Download Publications"
                    onDownload={() => console.log("Download provisional draft")}
                />
            );
        }

        if (activeTab === TAB_KEYS.NON_PROVISIONAL) {
            return (
                <DraftTab
                    title="Non-Provisional Draft"
                    description="Draft sections, representative claims, block diagrams, and flow charts."
                    sections={NON_PROVISIONAL_SECTIONS}
                    downloadLabel="Download Publications"
                    onDownload={() => console.log("Download non-provisional draft")}
                />
            );
        }

        return (
            <ProcessingPlaceholderTab
                label={activeTabConfig?.label || "Selected"}
                runtime={tabRuntime[activeTab]}
            />
        );
    };

    if (activeView === "mapping") {
        return (
            <section className="content-wrap rr-page">
                <FeatureMappingView
                    patent={selectedPatent}
                    onBack={goBackToResults}
                    onOpenOverlap={() => openOverlap(selectedPatent)}
                    onDownload={() => console.log("Download mapping:", selectedPatent)}
                />

                {showCommentsModal && (
                    <RequestOoltoCommentsModal
                        project={PROJECT_INFO}
                        onClose={() => setShowCommentsModal(false)}
                    />
                )}
            </section>
        );
    }

    if (activeView === "details") {
        return (
            <section className="content-wrap rr-page">
                <PatentDetailView
                    patent={selectedPatent}
                    onBack={goBackToResults}
                    onViewMapping={() => openMapping(selectedPatent)}
                    onDownloadMapping={() => console.log("Download mapping:", selectedPatent)}
                />

                {showCommentsModal && (
                    <RequestOoltoCommentsModal
                        project={PROJECT_INFO}
                        onClose={() => setShowCommentsModal(false)}
                    />
                )}
            </section>
        );
    }

    if (activeView === "overlap") {
        return (
            <section className="content-wrap rr-page">
                <OverlapSummaryView
                    patent={selectedPatent}
                    strictMode={strictMode}
                    onStrictModeChange={setStrictMode}
                    onBack={goBackToResults}
                    onViewMapping={() => openMapping(selectedPatent)}
                    onDownloadMapping={() => console.log("Download mapping:", selectedPatent)}
                />

                {showCommentsModal && (
                    <RequestOoltoCommentsModal
                        project={PROJECT_INFO}
                        onClose={() => setShowCommentsModal(false)}
                    />
                )}
            </section>
        );
    }

    return (
        <section className="content-wrap rr-page">
            <ResultHeader
                project={PROJECT_INFO}
                onBack={goBackToProjects}
                onViewKeyFeatures={() => {
                    document.getElementById("rr-key-features")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }}
                onRequestComments={() => setShowCommentsModal(true)}
                onDownloadReport={() => console.log("Download full report")}
            />

            <OutputTabs
                tabs={OUTPUT_TABS}
                activeTab={activeTab}
                onChange={(nextTab) => {
                    setActiveTab(nextTab);
                    setActiveView("results");
                }}
            />

            {activeTab === TAB_KEYS.PATENT && (
                <KeyFeaturesSection
                    primaryFeatures={PRIMARY_FEATURES}
                    secondaryFeatures={SECONDARY_FEATURES}
                />
            )}

            {renderActiveTab()}

            {showCommentsModal && (
                <RequestOoltoCommentsModal
                    project={PROJECT_INFO}
                    onClose={() => setShowCommentsModal(false)}
                />
            )}
        </section>
    );
}

export default memo(ReviewPlaceholder);

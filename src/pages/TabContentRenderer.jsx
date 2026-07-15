import React, { memo } from "react";
import RealTimeProgressBar from "./RealTimeProgressBar";
import ProcessingPlaceholderTab from "./components/Review/ProcessingPlaceholderTab";
import PatentTab from "./components/Review/PatentTab";
import PublicationTab from "./components/Review/PublicationTab";
import ProductTab from "./components/Review/ProductTab";
import DraftTab from "./components/Review/DraftTab";
import NonProvisionalTab from "./components/Review/NonProvisionalTab";

const MODULE_KEYS = {
    PATENT: "patent",
    PUBLICATIONS: "publications",
    PRODUCTS: "products",
    PROVISIONAL: "provisional",
    NON_PROVISIONAL: "nonProvisional",
};

function TabContentRenderer({
    activeModuleKey,
    activeTabConfig,
    tabProgress,
    isActiveTabLoading,
    tabRuntime,
    data,
    handlers,
}) {
    const { progress, status, message } = tabProgress;

    // Show the real-time progress bar if a background job is running or has failed
    if (status === "running" || status === "failed") {
        return (
            <RealTimeProgressBar
                label={activeTabConfig?.label || "Selected Tab"}
                progress={progress}
                status={status}
                errorMessage={message}
            />
        );
    }

    // Show lazy-loading spinner if we are fetching data from the API
    if (isActiveTabLoading) {
        return (
            <ProcessingPlaceholderTab
                label={activeTabConfig?.label || "Selected"}
                runtime={tabRuntime[activeModuleKey]}
            />
        );
    }

    switch (activeModuleKey) {
        case MODULE_KEYS.PATENT:
            return (
                <PatentTab
                    runtime={tabRuntime[MODULE_KEYS.PATENT]}
                    results={data.patentResults}
                    strictMode={handlers.strictMode}
                    onStrictModeChange={handlers.setStrictMode}
                    onViewMapping={handlers.openMapping}
                    onViewDetails={handlers.openDetails}
                    onViewOverlap={handlers.openOverlap}
                    onDownloadPatentReport={() => console.log("Download patent report")}
                />
            );

        case MODULE_KEYS.PUBLICATIONS:
            return (
                <PublicationTab
                    results={data.publicationResults}
                    onDownloadPublications={() => console.log("Download publications")}
                    onViewPublication={(publication) => console.log("View publication:", publication)}
                />
            );

        case MODULE_KEYS.PRODUCTS:
            return (
                <ProductTab
                    results={data.productResults}
                    onViewProductDetails={(product) => console.log("View product details:", product)}
                />
            );

        case MODULE_KEYS.PROVISIONAL:
            return (
                <DraftTab
                    title="Provisional Draft"
                    description="Editable provisional specification sections generated from the invention disclosure."
                    sectionsData={data.provisionalSections}
                    downloadLabel="Download Provisional Draft"
                    onDownload={() => console.log("Download provisional draft")}
                />
            );

        case MODULE_KEYS.NON_PROVISIONAL:
            return (
                <NonProvisionalTab
                    title="Non-Provisional Draft"
                    description="Draft sections, representative claims, block diagrams, and flow charts."
                    sectionsData={data.nonProvisionalSections}
                    downloadLabel="Download Non-Provisional Draft"
                    onDownload={() => console.log("Download non-provisional draft")}
                />
            );

        default:
            return (
                <ProcessingPlaceholderTab
                    label={activeTabConfig?.label || "Selected"}
                    runtime={tabRuntime[activeModuleKey]}
                />
            );
    }
}

export default memo(TabContentRenderer);
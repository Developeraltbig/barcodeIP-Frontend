import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useParams } from 'react-router-dom';

import { PAGES } from "../views/Home/constants";
import { useDispatch, useSelector } from "react-redux";

import ResultHeader from "./components/Review/ResultHeader";
import OutputTabs from "./components/Review/OutputTabs";
import KeyFeaturesSection from "./components/Review/KeyFeaturesSection";
import PatentTab from "./components/Review/PatentTab";
import PublicationTab from "./components/Review/PublicationTab";
import ProductTab from "./components/Review/ProductTab";
import DraftTab from "./components/Review/DraftTab";
import NonProvisionalTab from "./components/Review/NonProvisionalTab";
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
    NON_PROVISIONAL_SECTIONS,
} from "./data/reviewResultsData";

import "./ReviewResultsTabs.css";

import {
    useLazyGetProductByProjectIdQuery,
    useLazyGetPatentByProjectIdQuery,
    useLazyGetPublicationByProjectIdQuery,
    useLazyGetProvisionalByProjectIdQuery,
    useLazyGetNonProvisionalByProjectIdQuery,
} from "../features/userApi";

import {
    setProjectProduct,
    setProjectPatent,
    setProjectPublication,
    setProjectProvisional,
    setProjectNonProvisional,
} from "../features/slice/userSlice";

const MODULE_KEYS = {
    PATENT: "patent",
    PUBLICATIONS: "publications",
    PRODUCTS: "products",
    PROVISIONAL: "provisional",
    NON_PROVISIONAL: "nonProvisional",
};
import { socket } from "../utils/socket";

const normalizeTabToModuleKey = (tab) => {
    const value = String(tab || "").trim();

    const aliases = {
        patent: MODULE_KEYS.PATENT,

        publish: MODULE_KEYS.PUBLICATIONS,
        publication: MODULE_KEYS.PUBLICATIONS,
        publications: MODULE_KEYS.PUBLICATIONS,

        product: MODULE_KEYS.PRODUCTS,
        products: MODULE_KEYS.PRODUCTS,

        provisional: MODULE_KEYS.PROVISIONAL,

        nonProvisional: MODULE_KEYS.NON_PROVISIONAL,
        nonprovisional: MODULE_KEYS.NON_PROVISIONAL,
        "non-provisional": MODULE_KEYS.NON_PROVISIONAL,
        non_provisional: MODULE_KEYS.NON_PROVISIONAL,
    };

    return aliases[value] || aliases[value.toLowerCase()] || value;
};

const getResponsePayload = (response) => {
    return (
        response?.data ||
        response?.result ||
        response?.results ||
        response?.payload ||
        response ||
        null
    );
};

const toArray = (value) => {
    if (Array.isArray(value)) return value;

    if (Array.isArray(value?.data)) return value.data;
    if (Array.isArray(value?.results)) return value.results;
    if (Array.isArray(value?.items)) return value.items;
    if (Array.isArray(value?.sections)) return value.sections;
    if (Array.isArray(value?.patents)) return value.patents;
    if (Array.isArray(value?.products)) return value.products;
    if (Array.isArray(value?.publications)) return value.publications;
    if (Array.isArray(value?.publication)) return value.publication;
    if (Array.isArray(value?.draft)) return value.draft;

    return [];
};

function ReviewPlaceholder({ onPageChange, projectId }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(TAB_KEYS.PATENT);
    const [activeView, setActiveView] = useState("results");
    const [selectedPatent, setSelectedPatent] = useState(PATENT_RESULTS[0]);
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [strictMode, setStrictMode] = useState(false);
    const [tabRuntime, setTabRuntime] = useState(INITIAL_TAB_RUNTIME);
    const [showKeyFeature, setShowKeyFeature] = useState(false)
    const loadedTabsRef = useRef(new Set());
    const runningTabsRef = useRef(new Set());

    const DashboardData = useSelector(
        (state) => state.userDashboard.selectedProject
    );

    const projectPatent = useSelector(
        (state) => state.userDashboard.projectPatent
    );

    const projectProduct = useSelector(
        (state) => state.userDashboard.projectProduct
    );

    const projectPublication = useSelector(
        (state) => state.userDashboard.projectPublication
    );

    const projectProvisional = useSelector(
        (state) => state.userDashboard.projectProvisional
    );

    const projectNonProvisional = useSelector(
        (state) => state.userDashboard.projectNonProvisional
    );
    console.log('projectPatent--', projectPatent)

    const currentProjectId = useMemo(() => {
        return (
            projectId ||
            DashboardData?._id ||
            DashboardData?.project_id ||
            DashboardData?.id ||
            null
        );
    }, [projectId, DashboardData]);

    const activeModuleKey = useMemo(() => {
        return normalizeTabToModuleKey(activeTab);
    }, [activeTab]);

    const activeTabConfig = useMemo(() => {
        return (
            OUTPUT_TABS.find((tab) => tab.key === activeTab) ||
            OUTPUT_TABS.find(
                (tab) => normalizeTabToModuleKey(tab.key) === activeModuleKey
            )
        );
    }, [activeTab, activeModuleKey]);

    const [getPatents, { isLoading: pLoad }] =
        useLazyGetPatentByProjectIdQuery();

    const [getProducts, { isLoading: prodLoad }] =
        useLazyGetProductByProjectIdQuery();

    const [getPubs, { isLoading: pubLoad }] =
        useLazyGetPublicationByProjectIdQuery();

    const [getProv, { isLoading: provLoad }] =
        useLazyGetProvisionalByProjectIdQuery();

    const [getNonProv, { isLoading: nonProvLoad }] =
        useLazyGetNonProvisionalByProjectIdQuery();

    const apiByModuleKey = useMemo(
        () => ({
            [MODULE_KEYS.PATENT]: {
                label: "Patent",
                trigger: getPatents,
                action: setProjectPatent,
            },

            [MODULE_KEYS.PUBLICATIONS]: {
                label: "Publication",
                trigger: getPubs,
                action: setProjectPublication,
            },

            [MODULE_KEYS.PRODUCTS]: {
                label: "Product",
                trigger: getProducts,
                action: setProjectProduct,
            },

            [MODULE_KEYS.PROVISIONAL]: {
                label: "Provisional",
                trigger: getProv,
                action: setProjectProvisional,
            },

            [MODULE_KEYS.NON_PROVISIONAL]: {
                label: "Non-Provisional",
                trigger: getNonProv,
                action: setProjectNonProvisional,
            },
        }),
        [getPatents, getPubs, getProducts, getProv, getNonProv]
    );

    const loadingByModuleKey = useMemo(
        () => ({
            [MODULE_KEYS.PATENT]: pLoad,
            [MODULE_KEYS.PUBLICATIONS]: pubLoad,
            [MODULE_KEYS.PRODUCTS]: prodLoad,
            [MODULE_KEYS.PROVISIONAL]: provLoad,
            [MODULE_KEYS.NON_PROVISIONAL]: nonProvLoad,
        }),
        [pLoad, pubLoad, prodLoad, provLoad, nonProvLoad]
    );

    const isActiveTabLoading = Boolean(loadingByModuleKey[activeModuleKey]);

    const [workerProgress, setWorkerProgress] = useState({
        provisional: 0,
        nonProvisional: 0,
        patent: 0,
        publish: 0,
        product: 0
    })

    useEffect(() => {
        console.log("========== REVIEW TAB DEBUG ==========");
        console.log("Clicked activeTab:", activeTab);
        console.log("Normalized activeModuleKey:", activeModuleKey);
        console.log("currentProjectId:", currentProjectId);
        console.log("DashboardData:", DashboardData);
        console.log("Available API keys:", Object.keys(apiByModuleKey));
        console.log("======================================");

        if (!currentProjectId) {
            console.warn("API not called: currentProjectId missing");
            return;
        }

        const activeApi = apiByModuleKey[activeModuleKey];

        if (!activeApi) {
            console.warn("API not called: activeApi not found", {
                activeTab,
                activeModuleKey,
            });
            return;
        }

        const requestKey = `${currentProjectId}-${activeModuleKey}`;

        if (runningTabsRef.current.has(requestKey)) {
            console.log("API skipped: request already running", requestKey);
            return;
        }

        if (loadedTabsRef.current.has(requestKey)) {
            console.log("API skipped: already loaded", requestKey);
            return;
        }

        runningTabsRef.current.add(requestKey);

        const fetchActiveTabData = async () => {
            try {
                console.log(`API calling: ${activeApi.label}`, {
                    projectId: currentProjectId,
                    activeTab,
                    activeModuleKey,
                    requestKey,
                });

                setTabRuntime((prev) => ({
                    ...prev,
                    [activeModuleKey]: {
                        ...prev[activeModuleKey],
                        status: "processing",
                        message: `${activeApi.label} data loading...`,
                    },
                }));

                const response = await activeApi
                    .trigger(currentProjectId, false)
                    .unwrap();

                console.log(`API success: ${activeApi.label}`, response);

                const payload = getResponsePayload(response);

                console.log(`API normalized payload: ${activeApi.label}`, payload);

                dispatch(activeApi.action(payload));

                loadedTabsRef.current.add(requestKey);

                setTabRuntime((prev) => ({
                    ...prev,
                    [activeModuleKey]: {
                        ...prev[activeModuleKey],
                        status: "completed",
                        message: `${activeApi.label} data loaded successfully.`,
                    },
                }));
            } catch (error) {
                console.error(`API failed: ${activeApi.label}`, error);

                const errorMessage =
                    error?.data?.message ||
                    error?.error ||
                    error?.message ||
                    "Unable to load data. Please try again.";

                setTabRuntime((prev) => ({
                    ...prev,
                    [activeModuleKey]: {
                        ...prev[activeModuleKey],
                        status: "error",
                        message: errorMessage,
                    },
                }));
            } finally {
                runningTabsRef.current.delete(requestKey);

                console.log("API finished:", {
                    requestKey,
                    loadedTabs: Array.from(loadedTabsRef.current),
                    runningTabs: Array.from(runningTabsRef.current),
                });
            }
        };

        fetchActiveTabData();
    }, [
        activeTab,
        activeModuleKey,
        currentProjectId,
        DashboardData,
        apiByModuleKey,
        dispatch,
    ]);

    const goBackToProjects = useCallback(() => {
        if (onPageChange) {
            onPageChange(PAGES.PROJECTS || PAGES.NEW_CASE);
        }
    }, [onPageChange]);

    const goBackToResults = useCallback(() => {
        setActiveView("results");
    }, []);

    const openMapping = useCallback((patent) => {
        setSelectedPatent(patent);
        setActiveView("mapping");
    }, []);

    const openDetails = useCallback((patent) => {
        setSelectedPatent(patent);
        setActiveView("details");
    }, []);

    const openOverlap = useCallback((patent) => {
        setSelectedPatent(patent);
        setActiveView("overlap");
    }, []);

    const handleTabChange = useCallback((nextTab) => {
        console.log("OutputTabs onChange nextTab:", nextTab);
        console.log("Normalized nextTab:", normalizeTabToModuleKey(nextTab));

        setActiveTab(nextTab);
        setActiveView("results");
    }, []);

    const patentResults = useMemo(() => {
        // Check if projectPatent exists and has at least one key
        const hasData = projectPatent && Object.keys(projectPatent).length > 0;

        // If it has data, return it inside an array; otherwise, fallback
        return hasData ? [projectPatent] : null;
    }, [projectPatent]);

    console.log('patentResults11 --', patentResults);


    const publicationResults = useMemo(() => {
        const hasData = projectPublication && Object.keys(projectPublication).length > 0;

        // If it has data, return it inside an array; otherwise, fallback
        return hasData ? [projectPublication] : null;

    }, [projectPublication]);

    const productResults = useMemo(() => {
        const data = toArray(projectProduct);
        return data.length > 0 ? data : PRODUCT_RESULTS;
    }, [projectProduct]);

    const provisionalSections = useMemo(() => {
        const hasData = projectProvisional && Object.keys(projectProvisional).length > 0;

        // If it has data, return it inside an array; otherwise, fallback
        return hasData ? [projectProvisional] : null;
    }, [projectProvisional]);

    const nonProvisionalSections = useMemo(() => {
        const hasData = projectNonProvisional && Object.keys(projectNonProvisional).length > 0;

        // If it has data, return it inside an array; otherwise, fallback
        return hasData ? [projectNonProvisional] : null;
    }, [projectNonProvisional]);


    useEffect(() => {
        if (!id) return;

        console.log("📡 Joining room:", id);

        socket.emit("joinProject", id);

        const handleJobUpdate = (event) => {
            console.log("🔥 Job update received:", event);

            if (event.projectId !== id) return;

            const normalizeType = (type) => {
                switch (type) {
                    case 'nonProvisional':
                    case 'non-provisional':
                        return 'nonProvisional';
                    case 'publish':
                        return 'publish';
                    case 'product':
                        return 'product';
                    case 'patent':
                        return 'patent';
                    case 'provisional':
                        return 'provisional';
                    default:
                        return type;
                }
            };

            const key = normalizeType(event.type);

            // 🚀 STARTED
            if (event.event === "started") {
                setWorkerProgress((prev) => ({
                    ...prev,
                    [key]: 0
                }));
            }

            // 📊 PROGRESS
            if (event.event === "progress") {
                setWorkerProgress((prev) => ({
                    ...prev,
                    [key]: event.progress
                }));
            }

            // ✅ COMPLETED
            if (event.event === "completed") {
                setWorkerProgress((prev) => ({
                    ...prev,
                    [key]: 100
                }));
            }
        };

        socket.off("jobUpdate").on("jobUpdate", handleJobUpdate);

        return () => {
            socket.off("jobUpdate", handleJobUpdate);
        };
    }, [id]);

    const renderActiveTab = useCallback(() => {
        if (isActiveTabLoading) {
            return (
                <ProcessingPlaceholderTab
                    label={activeTabConfig?.label || "Selected"}
                    runtime={tabRuntime[activeModuleKey]}
                />
            );
        }

        if (activeModuleKey === MODULE_KEYS.PATENT) {
            return (
                <PatentTab
                    runtime={tabRuntime[MODULE_KEYS.PATENT]}
                    results={patentResults}
                    strictMode={strictMode}
                    onStrictModeChange={setStrictMode}
                    onViewMapping={openMapping}
                    onViewDetails={openDetails}
                    onViewOverlap={openOverlap}
                    onDownloadPatentReport={() =>
                        console.log("Download patent report")
                    }
                />
            );
        }

        if (activeModuleKey === MODULE_KEYS.PUBLICATIONS) {
            return (
                <PublicationTab
                    results={publicationResults}
                    onDownloadPublications={() =>
                        console.log("Download publications")
                    }
                    onViewPublication={(publication) =>
                        console.log("View publication:", publication)
                    }
                />
            );
        }

        if (activeModuleKey === MODULE_KEYS.PRODUCTS) {
            return (
                <ProductTab
                    results={productResults}
                    onViewProductDetails={(product) =>
                        console.log("View product details:", product)
                    }
                />
            );
        }

        if (activeModuleKey === MODULE_KEYS.PROVISIONAL) {
            return (
                <DraftTab
                    title="Provisional Draft"
                    description="Editable provisional specification sections generated from the invention disclosure."
                    sectionsData={provisionalSections}
                    downloadLabel="Download Provisional Draft"
                    onDownload={() => console.log("Download provisional draft")}
                />
            );
        }

        if (activeModuleKey === MODULE_KEYS.NON_PROVISIONAL) {
            return (
                <NonProvisionalTab
                    title="Non-Provisional Draft"
                    description="Draft sections, representative claims, block diagrams, and flow charts."
                    sectionsData={nonProvisionalSections}
                    downloadLabel="Download Non-Provisional Draft"
                    onDownload={() =>
                        console.log("Download non-provisional draft")
                    }
                />
            );
        }

        return (
            <ProcessingPlaceholderTab
                label={activeTabConfig?.label || "Selected"}
                runtime={tabRuntime[activeModuleKey]}
            />
        );
    }, [
        activeModuleKey,
        activeTabConfig,
        isActiveTabLoading,
        tabRuntime,
        patentResults,
        publicationResults,
        productResults,
        provisionalSections,
        nonProvisionalSections,
        strictMode,
        openMapping,
        openDetails,
        openOverlap,
    ]);

    if (activeView === "mapping") {
        return (
            <section className="content-wrap rr-page">
                <FeatureMappingView
                    patent={selectedPatent}
                    data={projectPatent}
                    onBack={goBackToResults}
                    onOpenOverlap={() => openOverlap(selectedPatent)}
                    onDownload={() =>
                        console.log("Download mapping:", selectedPatent)
                    }
                />

                {showCommentsModal && (
                    <RequestOoltoCommentsModal
                        project={DashboardData || PROJECT_INFO}
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
                    onDownloadMapping={() =>
                        console.log("Download mapping:", selectedPatent)
                    }
                />

                {showCommentsModal && (
                    <RequestOoltoCommentsModal
                        project={DashboardData || PROJECT_INFO}
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
                    data={projectPatent}
                    strictMode={strictMode}
                    onStrictModeChange={setStrictMode}
                    onBack={goBackToResults}
                    onViewMapping={() => openMapping(selectedPatent)}
                    onDownloadMapping={() =>
                        console.log("Download mapping:", selectedPatent)
                    }
                />

                {showCommentsModal && (
                    <RequestOoltoCommentsModal
                        project={DashboardData || PROJECT_INFO}
                        onClose={() => setShowCommentsModal(false)}
                    />
                )}
            </section>
        );
    }

    return (
        <section className="content-wrap rr-page">
            <ResultHeader
                project={DashboardData || PROJECT_INFO}
                onBack={goBackToProjects}
                onViewKeyFeatures={() => {
                    document.getElementById("rr-key-features")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                    setShowKeyFeature(prev => !prev)
                }}
                onRequestComments={() => setShowCommentsModal(true)}
                onDownloadReport={() => console.log("Download full report")}
            />

            <OutputTabs
                tabs={DashboardData}
                activeTab={activeTab}
                onChange={handleTabChange}
            />

            {showKeyFeature && activeModuleKey === MODULE_KEYS.PATENT && (
                <KeyFeaturesSection
                    primaryFeatures={PRIMARY_FEATURES}
                    secondaryFeatures={SECONDARY_FEATURES}
                />
            )}

            {renderActiveTab()}

            {showCommentsModal && (
                <RequestOoltoCommentsModal
                    project={DashboardData || PROJECT_INFO}
                    onClose={() => setShowCommentsModal(false)}
                />
            )}
        </section>
    );
}

export default memo(ReviewPlaceholder);
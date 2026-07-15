import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { PAGES } from "../views/Home/constants";
import ResultHeader from "./components/Review/ResultHeader";
import OutputTabs from "./components/Review/OutputTabs";
import KeyFeaturesSection from "./components/Review/KeyFeaturesSection";
import RequestOoltoCommentsModal from "./components/Review/RequestOoltoCommentsModal";
import TabContentRenderer from "./TabContentRenderer";
import ReviewViewManager from "./ReviewViewManager";

import {
    OUTPUT_TABS,
    TAB_KEYS,
    INITIAL_TAB_RUNTIME,
    PROJECT_INFO,
    PRIMARY_FEATURES,
    SECONDARY_FEATURES,
    PATENT_RESULTS,
    PRODUCT_RESULTS,
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

import { socket } from "../utils/socket";

const MODULE_KEYS = {
    PATENT: "patent",
    PUBLICATIONS: "publications",
    PRODUCTS: "products",
    PROVISIONAL: "provisional",
    NON_PROVISIONAL: "nonProvisional",
};

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

/**
 * Evaluates the response payload to determine if data is complete.
 * If data is null or incomplete, it falls back to the running progress state.
 */
const getProgressFromPayload = (payload) => {
    if (!payload) {
        // If there is no data in the database, initialize with 0% progress and show progress bar
        return { progress: 0, status: "running" };
    }

    // Check progress values (e.g. status_progress or progress)
    const rawProgress = payload.status_progress !== undefined
        ? payload.status_progress
        : (payload.progress !== undefined ? payload.progress : null);

    if (rawProgress !== null) {
        const progressNumber = Number(rawProgress);
        if (progressNumber < 100) {
            return { progress: progressNumber, status: "running" };
        }
        return { progress: 100, status: "completed" };
    }

    // Verify completeness using content arrays/objects
    const hasSubstantialContent =
        (Array.isArray(payload.scholarResults) && payload.scholarResults.length > 0) ||
        (Array.isArray(payload.patents) && payload.patents.length > 0) ||
        (payload.sections && Object.keys(payload.sections).length > 0) ||
        (payload.claims && payload.claims.length > 0) ||
        (Array.isArray(payload) && payload.length > 0);

    if (hasSubstantialContent) {
        return { progress: 100, status: "completed" };
    }

    // Default to running if metadata exists but actual content is not yet complete
    return {
        progress: 0,
        status: "running"
    };
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
    const [showKeyFeature, setShowKeyFeature] = useState(false);

    // Dynamic state mapping to capture real-time updates for each tab
    const [progressState, setProgressState] = useState({
        [MODULE_KEYS.PATENT]: { progress: 0, status: "running", message: "" },
        [MODULE_KEYS.PUBLICATIONS]: { progress: 0, status: "running", message: "" },
        [MODULE_KEYS.PRODUCTS]: { progress: 0, status: "running", message: "" },
        [MODULE_KEYS.PROVISIONAL]: { progress: 0, status: "running", message: "" },
        [MODULE_KEYS.NON_PROVISIONAL]: { progress: 0, status: "running", message: "" },
    });

    const DashboardData = useSelector((state) => state.userDashboard.selectedProject);
    const projectPatent = useSelector((state) => state.userDashboard.projectPatent);
    const projectProduct = useSelector((state) => state.userDashboard.projectProduct);
    const projectPublication = useSelector((state) => state.userDashboard.projectPublication);
    const projectProvisional = useSelector((state) => state.userDashboard.projectProvisional);
    const projectNonProvisional = useSelector((state) => state.userDashboard.projectNonProvisional);

    const currentProjectId = useMemo(() => {
        return projectId || DashboardData?._id || DashboardData?.project_id || DashboardData?.id || id || null;
    }, [projectId, DashboardData, id]);

    const activeModuleKey = useMemo(() => normalizeTabToModuleKey(activeTab), [activeTab]);

    const activeTabConfig = useMemo(() => {
        return (
            OUTPUT_TABS.find((tab) => tab.key === activeTab) ||
            OUTPUT_TABS.find((tab) => normalizeTabToModuleKey(tab.key) === activeModuleKey)
        );
    }, [activeTab, activeModuleKey]);

    const [getPatents, { isLoading: pLoad }] = useLazyGetPatentByProjectIdQuery();
    const [getProducts, { isLoading: prodLoad }] = useLazyGetProductByProjectIdQuery();
    const [getPubs, { isLoading: pubLoad }] = useLazyGetPublicationByProjectIdQuery();
    const [getProv, { isLoading: provLoad }] = useLazyGetProvisionalByProjectIdQuery();
    const [getNonProv, { isLoading: nonProvLoad }] = useLazyGetNonProvisionalByProjectIdQuery();

    const apiByModuleKey = useMemo(() => ({
        [MODULE_KEYS.PATENT]: { trigger: getPatents, action: setProjectPatent },
        [MODULE_KEYS.PUBLICATIONS]: { trigger: getPubs, action: setProjectPublication },
        [MODULE_KEYS.PRODUCTS]: { trigger: getProducts, action: setProjectProduct },
        [MODULE_KEYS.PROVISIONAL]: { trigger: getProv, action: setProjectProvisional },
        [MODULE_KEYS.NON_PROVISIONAL]: { trigger: getNonProv, action: setProjectNonProvisional },
    }), [getPatents, getPubs, getProducts, getProv, getNonProv]);

    const loadingByModuleKey = useMemo(() => ({
        [MODULE_KEYS.PATENT]: pLoad,
        [MODULE_KEYS.PUBLICATIONS]: pubLoad,
        [MODULE_KEYS.PRODUCTS]: prodLoad,
        [MODULE_KEYS.PROVISIONAL]: provLoad,
        [MODULE_KEYS.NON_PROVISIONAL]: nonProvLoad,
    }), [pLoad, pubLoad, prodLoad, provLoad, nonProvLoad]);

    const isActiveTabLoading = Boolean(loadingByModuleKey[activeModuleKey]);

    const patentResults = useMemo(() => {
        const hasData = projectPatent && Object.keys(projectPatent).length > 0;
        return hasData ? [projectPatent] : null;
    }, [projectPatent]);

    const publicationResults = useMemo(() => {
        const hasData = projectPublication && Object.keys(projectPublication).length > 0;
        return hasData ? [projectPublication] : null;
    }, [projectPublication]);

    const productResults = useMemo(() => {
        const data = toArray(projectProduct);
        return data.length > 0 ? data : PRODUCT_RESULTS;
    }, [projectProduct]);

    const provisionalSections = useMemo(() => {
        const hasData = projectProvisional && Object.keys(projectProvisional).length > 0;
        return hasData ? [projectProvisional] : null;
    }, [projectProvisional]);

    const nonProvisionalSections = useMemo(() => {
        const hasData = projectNonProvisional && Object.keys(projectNonProvisional).length > 0;
        return hasData ? [projectNonProvisional] : null;
    }, [projectNonProvisional]);

    // Isolated lazy fetching wrapper
    const loadTabData = useCallback(async (moduleKey) => {
        if (!currentProjectId) return;
        const target = apiByModuleKey[moduleKey];
        if (!target) return;

        try {
            const response = await target.trigger(currentProjectId).unwrap();
            const payload = getResponsePayload(response);

            const { progress, status } = getProgressFromPayload(payload);

            if (payload) {
                dispatch(target.action(payload));
            }

            setProgressState(prev => ({
                ...prev,
                [moduleKey]: { progress, status, message: "" }
            }));
        } catch (error) {
            console.error(`Error loading data for module ${moduleKey}:`, error);
            // Default to running with progress 0 if backend is uncooperative on initial check
            setProgressState(prev => ({
                ...prev,
                [moduleKey]: { progress: 0, status: "running", message: "" }
            }));
        }
    }, [currentProjectId, apiByModuleKey, dispatch]);

    // 🚀 INITIALIZATION: Fetch status for ALL tabs in parallel on mount/project load
    useEffect(() => {
        if (!currentProjectId) return;

        Object.keys(apiByModuleKey).forEach((moduleKey) => {
            loadTabData(moduleKey);
        });
    }, [currentProjectId, loadTabData, apiByModuleKey]);

    // Redux synchronization to update local state hooks when changes occur
    useEffect(() => {
        const syncModule = (dataState, moduleKey) => {
            if (!dataState) return;
            const { progress, status } = getProgressFromPayload(dataState);

            setProgressState(prev => {
                // Avoid overriding active sockets if they are tracking a higher progress value
                if (prev[moduleKey]?.status === "running" && prev[moduleKey]?.progress > progress) {
                    return prev;
                }

                return {
                    ...prev,
                    [moduleKey]: {
                        progress,
                        status,
                        message: ""
                    }
                };
            });
        };

        syncModule(projectPatent, MODULE_KEYS.PATENT);
        syncModule(projectPublication, MODULE_KEYS.PUBLICATIONS);
        syncModule(projectProduct, MODULE_KEYS.PRODUCTS);
        syncModule(projectProvisional, MODULE_KEYS.PROVISIONAL);
        syncModule(projectNonProvisional, MODULE_KEYS.NON_PROVISIONAL);
    }, [projectPatent, projectPublication, projectProduct, projectProvisional, projectNonProvisional]);

    // WebSocket event coordinator
    useEffect(() => {
        if (!id) return;

        console.log("📡 Subscribing to Project Room:", id);
        socket.emit("joinProject", id);

        const handleJobUpdate = (event) => {
            if (event.projectId !== id) return;

            console.log("🔥 Worker Event Received:", event);
            const key = normalizeTabToModuleKey(event.type);

            switch (event.event) {
                case "started":
                    setProgressState((prev) => ({
                        ...prev,
                        [key]: { progress: 0, status: "running", message: "" }
                    }));
                    break;

                case "progress":
                    const incomingProgress = Number(event.progress || 0);
                    if (incomingProgress < 100) {
                        setProgressState((prev) => ({
                            ...prev,
                            [key]: { progress: incomingProgress, status: "running", message: "" }
                        }));
                    } else {
                        setProgressState((prev) => ({
                            ...prev,
                            [key]: { progress: 100, status: "completed", message: "" }
                        }));
                        loadTabData(key);
                    }
                    break;

                case "completed":
                    setProgressState((prev) => ({
                        ...prev,
                        [key]: { progress: 100, status: "completed", message: "" }
                    }));
                    loadTabData(key);
                    break;

                case "failed":
                    setProgressState((prev) => ({
                        ...prev,
                        [key]: { progress: 0, status: "failed", message: event.message || "Execution Failed" }
                    }));
                    break;

                default:
                    break;
            }
        };

        socket.on("jobUpdate", handleJobUpdate);

        return () => {
            socket.off("jobUpdate", handleJobUpdate);
        };
    }, [id, loadTabData]);

    const goBackToProjects = useCallback(() => {
        if (onPageChange) {
            onPageChange(PAGES.PROJECTS || PAGES.NEW_CASE);
        }
    }, [onPageChange]);

    const goBackToResults = useCallback(() => setActiveView("results"), []);
    const openMapping = useCallback((patent) => { setSelectedPatent(patent); setActiveView("mapping"); }, []);
    const openDetails = useCallback((patent) => { setSelectedPatent(patent); setActiveView("details"); }, []);
    const openOverlap = useCallback((patent) => { setSelectedPatent(patent); setActiveView("overlap"); }, []);

    const handleTabChange = useCallback((nextTab) => {
        setActiveTab(nextTab);
        setActiveView("results");
    }, []);

    if (activeView !== "results") {
        return (
            <ReviewViewManager
                activeView={activeView}
                selectedPatent={selectedPatent}
                projectPatent={projectPatent}
                strictMode={strictMode}
                setStrictMode={setStrictMode}
                goBackToResults={goBackToResults}
                openMapping={openMapping}
                openOverlap={openOverlap}
                showCommentsModal={showCommentsModal}
                setShowCommentsModal={setShowCommentsModal}
                projectInfo={DashboardData || PROJECT_INFO}
            />
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
                    setShowKeyFeature(prev => !prev);
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

            <TabContentRenderer
                activeModuleKey={activeModuleKey}
                activeTabConfig={activeTabConfig}
                tabProgress={progressState[activeModuleKey]}
                isActiveTabLoading={isActiveTabLoading}
                tabRuntime={tabRuntime}
                data={{
                    patentResults,
                    publicationResults,
                    productResults,
                    provisionalSections,
                    nonProvisionalSections,
                }}
                handlers={{
                    strictMode,
                    setStrictMode,
                    openMapping,
                    openDetails,
                    openOverlap,
                }}
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

export default memo(ReviewPlaceholder);
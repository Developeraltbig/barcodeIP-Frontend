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
    useStartProcessMutation
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

const getProgressFromPayload = (payload) => {
    if (!payload) {
        return {
            progress: 0,
            status: "running",
            message: "",
        };
    }
    // --------------------------------------------------
    // 1. Check API status FIRST
    // --------------------------------------------------
    const rawStatus = String(
        payload.status ||
        payload.job_status ||
        payload.execution_status ||
        ""
    )
        .trim()
        .toLowerCase();

    const message =
        payload.message ||
        payload.error ||
        payload.error_message ||
        "";

    // FAILED
    if (
        rawStatus === "Failed" ||
        rawStatus === "failure" ||
        rawStatus === "failed" ||
        rawStatus === "error"
    ) {
        return {
            progress: Number(
                payload.status_progress ??
                payload.progress ??
                0
            ),
            status: "failed",
            message: message || "Execution Failed",
        };
    }

    // COMPLETED
    if (
        rawStatus === "completed" ||
        rawStatus === "complete" ||
        rawStatus === "success" ||
        rawStatus === "successful"
    ) {
        return {
            progress: 100,
            status: "completed",
            message: "",
        };
    }

    // RUNNING
    if (
        rawStatus === "running" ||
        rawStatus === "processing" ||
        rawStatus === "in_progress" ||
        rawStatus === "pending"
    ) {
        return {
            progress: Number(
                payload.status_progress ??
                payload.progress ??
                0
            ),
            status: "running",
            message: "",
        };
    }

    // --------------------------------------------------
    // 2. If status doesn't exist, fall back to progress
    // --------------------------------------------------
    const rawProgress =
        payload.status_progress !== undefined
            ? payload.status_progress
            : payload.progress !== undefined
                ? payload.progress
                : null;

    if (rawProgress !== null) {
        const progressNumber = Number(rawProgress);

        if (progressNumber >= 100) {
            return {
                progress: 100,
                status: "completed",
                message: "",
            };
        }

        return {
            progress: progressNumber,
            status: "running",
            message: "",
        };
    }

    // --------------------------------------------------
    // 3. Check whether actual result data exists
    // --------------------------------------------------
    const hasSubstantialContent =
        (Array.isArray(payload.scholarResults) &&
            payload.scholarResults.length > 0) ||
        (Array.isArray(payload.patents) &&
            payload.patents.length > 0) ||
        (payload.sections &&
            Object.keys(payload.sections).length > 0) ||
        (payload.claims &&
            payload.claims.length > 0) ||
        (Array.isArray(payload) &&
            payload.length > 0);

    if (hasSubstantialContent) {
        return {
            progress: 100,
            status: "completed",
            message: "",
        };
    }

    // --------------------------------------------------
    // 4. Default
    // --------------------------------------------------
    return {
        progress: 0,
        status: "running",
        message: "",
    };
};

// Helper to determine the default active tab from the project data properties
const getFirstAvailableTab = (project) => {
    if (!project) return TAB_KEYS.PATENT;
    // console.log('project.module', project.module)
    // console.log('project.module first ', project.module[0])
    // const firstMatchingTab = OUTPUT_TABS.find((tab) => {
    //     const key = normalizeTabToModuleKey(tab.key);
    //     return (
    //         project[key] !== undefined ||
    //         project[tab.key] !== undefined ||
    //         (Array.isArray(project.module) && project.module.includes(key))
    //     );
    // });

    // return firstMatchingTab ? firstMatchingTab.key : (OUTPUT_TABS[0]?.key || TAB_KEYS.PATENT);
    return project.module[0];
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

    const [progressState, setProgressState] = useState({
        [MODULE_KEYS.PATENT]: { progress: 0, status: "running", message: "" },
        [MODULE_KEYS.PUBLICATIONS]: { progress: 0, status: "running", message: "" },
        [MODULE_KEYS.PRODUCTS]: { progress: 0, status: "running", message: "" },
        [MODULE_KEYS.PROVISIONAL]: { progress: 0, status: "running", message: "" },
        [MODULE_KEYS.NON_PROVISIONAL]: { progress: 0, status: "running", message: "" },
    });
    const [startProcess, { isLoading: isRegenerating }] =
        useStartProcessMutation();
    const DashboardData = useSelector((state) => state.userDashboard.selectedProject);
    const projectPatent = useSelector((state) => state.userDashboard.projectPatent);
    const projectProduct = useSelector((state) => state.userDashboard.projectProduct);
    const projectPublication = useSelector((state) => state.userDashboard.projectPublication);
    const projectProvisional = useSelector((state) => state.userDashboard.projectProvisional);
    const projectNonProvisional = useSelector((state) => state.userDashboard.projectNonProvisional);

    console.log('DashboardData', DashboardData);

    const currentProjectId = useMemo(() => {
        return projectId || DashboardData?._id || DashboardData?.project_id || DashboardData?.id || id || null;
    }, [projectId, DashboardData, id]);

    // Handle dynamic selection of the active tab based on project configuration
    useEffect(() => {
        if (DashboardData) {
            const defaultTab = getFirstAvailableTab(DashboardData);
            if (defaultTab && defaultTab !== activeTab) {
                setActiveTab(defaultTab);
            }
            console.log('defaultTab', defaultTab)
        }
    }, [DashboardData]);

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

    const REGENERATE_CHECKED_KEYS = {
        [MODULE_KEYS.PATENT]: "patent",
        [MODULE_KEYS.PUBLICATIONS]: "publication",
        [MODULE_KEYS.PRODUCTS]: "product",
        [MODULE_KEYS.PROVISIONAL]: "provisional",
        [MODULE_KEYS.NON_PROVISIONAL]: "nonProvisional",
    };

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
        return data.length > 0 ? data : null;
    }, [projectProduct]);

    const provisionalSections = useMemo(() => {
        const hasData = projectProvisional && Object.keys(projectProvisional).length > 0;
        return hasData ? [projectProvisional] : null;
    }, [projectProvisional]);

    const nonProvisionalSections = useMemo(() => {
        const hasData = projectNonProvisional && Object.keys(projectNonProvisional).length > 0;
        return hasData ? [projectNonProvisional] : null;
    }, [projectNonProvisional]);

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
            setProgressState(prev => ({
                ...prev,
                [moduleKey]: { progress: 0, status: "running", message: "" }
            }));
        }
    }, [currentProjectId, apiByModuleKey, dispatch]);

    // Fetch API data ONLY for the active module when it transitions
    useEffect(() => {
        if (currentProjectId && activeModuleKey) {
            loadTabData(activeModuleKey);
        }
    }, [currentProjectId, activeModuleKey, loadTabData]);

    useEffect(() => {
        const syncModule = (dataState, moduleKey) => {
            if (!dataState) return;
            const { progress, status } = getProgressFromPayload(dataState);

            setProgressState(prev => {
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
                        [key]: { progress: 0, status: "Failed", message: event.message || "Execution Failed" }
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

    const handleRegenerate = useCallback(
        async (moduleKey) => {
            if (!currentProjectId) {
                toast.error("Project ID is missing.");
                return;
            }

            const checkedKey = REGENERATE_CHECKED_KEYS[moduleKey];

            if (!checkedKey) {
                toast.error("Invalid module selected.");
                return;
            }

            try {
                // Immediately change only this module to running
                setProgressState((prev) => ({
                    ...prev,
                    [moduleKey]: {
                        progress: 0,
                        status: "running",
                        message: "",
                    },
                }));

                const response = await startProcess({
                    project_id: currentProjectId,
                    checked: [checkedKey],
                }).unwrap();

                if (response?.success) {
                    toast.success(
                        `${checkedKey} regeneration started successfully.`
                    );

                    // Optional: reload current module data
                    // so the UI gets the latest backend state.
                    await loadTabData(moduleKey);
                } else {
                    throw new Error(
                        response?.error || "Regeneration failed to start."
                    );
                }
            } catch (err) {
                console.error("Regeneration error:", err);

                // Only mark THIS module as failed
                setProgressState((prev) => ({
                    ...prev,
                    [moduleKey]: {
                        progress: 0,
                        status: "failed",
                        message:
                            err?.data?.error ||
                            err?.message ||
                            "Regeneration failed.",
                    },
                }));

                toast.error(
                    err?.data?.error ||
                    err?.message ||
                    "Failed to regenerate report."
                );
            }
        },
        [currentProjectId, startProcess, loadTabData]
    );

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
                < KeyFeaturesSection
                    primaryFeatures={PRIMARY_FEATURES}
                    secondaryFeatures={SECONDARY_FEATURES}
                    patentResults={patentResults[0]}
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
                    onRegenerate: handleRegenerate,
                    isRegenerating,
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
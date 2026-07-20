import React, { useCallback, useMemo, useState, useRef } from "react";
import { PAGES } from "../views/Home/constants";
import { modules } from "../views/Home/data";
import { useSelector, useDispatch } from "react-redux";

import ModuleCard from "../components/ModuleCard";
import KeyFeaturesReview from "../views/Home/KeyFeaturesReview";
import {
    useCreateProjectMutation,
    useFetchAllProjectsQuery,
    useStartProcessMutation,
    useGetWalletDetailsQuery
} from "../features/userApi";
import SearchIcon from "../assets/icons/searchIcon.svg";
import UploadIcon from "../assets/icons/uploadIcon.svg";
import AiGeneratedKeyIcon from "../assets/icons/ai-generated-key-feature.svg";
import FullPageLoader from "../components/FullPageLoader";
import { setSelectedProject } from '../features/slice/userSlice';


function NewCasePage({ onPageChange }) {
    const dispatch = useDispatch();
    const [inventionText, setInventionText] = useState("");
    const [selectedModules, setSelectedModules] = useState([]);
    const [selectedModulesDisabled, setSelectedModulesDisabled] = useState(false)
    const [showKeyFeatures, setShowKeyFeatures] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const SelectedProject = useSelector((state) => state.userDashboard.selectedProject)
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const { data: projectsData } = useFetchAllProjectsQuery();
    const [createProject, { isLoading: isCreatingProject }] = useCreateProjectMutation();
    const [startProcess, { isLoading: isStartingProcess }] = useStartProcessMutation();
    const { data: walletDetails, refetch } = useGetWalletDetailsQuery();

    const projects = useMemo(() => {
        if (!projectsData) return null;

        return (
            projectsData.projects ||
            projectsData.data ||
            (Array.isArray(projectsData) ? projectsData : null)
        );
    }, [projectsData]);

    console.log("projects", projects);

    const selectedModuleSet = useMemo(
        () => new Set(selectedModules),
        [selectedModules]
    );

    const toggleModule = useCallback((id) => {
        setSelectedModules((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    }, []);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Please upload a PDF or DOCX file.");
            e.target.value = "";
            return;
        }

        setSelectedFile(file);
    };

    const handleGenerate = async () => {

        if (!inventionText.trim() && !selectedFile) {
            alert("Please describe your invention or upload a file.");
            return;
        }

        if (selectedModules.length === 0) {
            alert("Please select at least one output.");
            return;
        }


        const formData = new FormData();

        formData.append("text", inventionText);
        formData.append("checked", JSON.stringify(selectedModules));

        if (selectedFile) {
            formData.append("file", selectedFile);
        }

        try {
            const response = await createProject(formData).unwrap();

            const newProjectData = { ...(response?.data || response) };
            const newProjectId =
                newProjectData?.project_id ||
                newProjectData?.id ||
                newProjectData?._id;

            console.log("Newly Generated Project ID:", newProjectId);
            console.log('all module', selectedModules);
            newProjectData.module = selectedModules;
            const hasPatent = selectedModules.includes("patent");
            dispatch(setSelectedProject(newProjectData))

            if (hasPatent) {
                setSelectedModulesDisabled(true)
                setShowKeyFeatures(true);
            } else {
                onPageChange(PAGES.REVIEW, newProjectId);
                // Fetch wallet details
                await refetch();
            }
        } catch (err) {
            console.error("Create Project is failed", err);

            if (err?.status === 400) {
                alert(err?.data?.error || "Something went wrong.");
            } else {
                alert("Create failed. Please try again.");
            }
        }
    };

    const handleContinueFromKeyFeatures = async (features) => {
        console.log("Final key features:", features);
        // const formData = new FormData();
        let data = {
            project_id: SelectedProject?.project_id,
            query: features,
            checked: selectedModules
        }
        // formData.append("project_id", SelectedProject?.project_id);
        // formData.append("query", features);
        // formData.append("checked", JSON.stringify(selectedModules));
        try {
            const response = await startProcess(data).unwrap();
            console.log("response:", response);
            if (response.success) {
                onPageChange(PAGES.REVIEW, SelectedProject?.project_id);
                // Fetch wallet details
                await refetch();
            }
        } catch (err) {
            console.error("Project Generation Failed:", err);

            if (err?.status === 400) {
                alert(err?.data?.error || "Something went wrong.");
            } else {
                alert("Project generation failed. Please try again.");
            }
        }

    };

    if (showKeyFeatures) {
        return (
            <KeyFeaturesReview
                inventionText={inventionText}
                selectedModules={selectedModules}
                modules={modules}
                onBack={() => setShowKeyFeatures(false)}
                onContinue={handleContinueFromKeyFeatures}
            />
        );
    }

    return (
        <section className="content-wrap new-case-wrap">
            {(isCreatingProject || isStartingProcess) && (
                <FullPageLoader
                    colors={["#D94130", "#D94130", "#D94130"]}
                    label="Loading..."
                />
            )}

            <div className="section-heading">
                <h1>Describe your invention</h1>
                <p>Select the outputs you want BarcodeIP to generate.</p>
            </div>

            <div className="new-case-card">
                <div className="input-box">
                    <div className="input-label">INVENTION TEXT</div>

                    <div className="textarea-wrap">
                        <img src={SearchIcon} alt="" className="search-icon" />

                        <textarea
                            value={inventionText}
                            onChange={(e) => setInventionText(e.target.value)}
                            placeholder="Describe your invention in plain English. Include the problem, main parts, how it works and benefits."
                        />
                    </div>

                    <div className="input-footer">
                        <span>
                            {selectedFile
                                ? `Selected: ${selectedFile.name}`
                                : `${inventionText.length} characters`}
                        </span>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept=".pdf,.docx"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <img
                            src={UploadIcon}
                            alt=""
                            className="upload-icon"
                            onClick={handleUploadClick}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                </div>

                <div className="module-grid">
                    {modules.map((item) => (
                        <ModuleCard
                            key={item.id}
                            item={item}
                            checked={selectedModuleSet.has(item.id)}
                            onToggle={toggleModule}
                            disabled={selectedModulesDisabled}
                        />
                    ))}
                </div>

                <div className="generate-row">
                    <button
                        className="generate-btn"
                        type="button"
                        onClick={handleGenerate}
                        disabled={isCreatingProject}
                    >
                        <img
                            src={AiGeneratedKeyIcon}
                            alt=""
                            className="AiGeneratedKey-icon"
                        />
                        {isCreatingProject ? "Generating..." : "Generate Key Features"}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default NewCasePage;
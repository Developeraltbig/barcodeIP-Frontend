import React, { useCallback, useMemo, useState } from "react";
import { PAGES } from "../views/Home/constants";
import { modules } from "../views/Home/data";

import ModuleCard from "../components/ModuleCard";
import KeyFeaturesReview from "../views/Home/KeyFeaturesReview";
import {
    useCreateProjectMutation,
    useFetchAllProjectsQuery,
} from "../features/userApi";

import SearchIcon from "../assets/icons/searchIcon.svg";
import UploadIcon from "../assets/icons/uploadIcon.svg";
import AiGeneratedKeyIcon from "../assets/icons/ai-generated-key-feature.svg";

function NewCasePage({ onPageChange }) {
    const [inventionText, setInventionText] = useState("");
    const [selectedModules, setSelectedModules] = useState([]);
    const [showKeyFeatures, setShowKeyFeatures] = useState(false);

    const { data: projectsData } = useFetchAllProjectsQuery();
    const [createProject, { isLoading }] = useCreateProjectMutation();

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

    const handleGenerate = async () => {
        setShowKeyFeatures(true);

        // if (!inventionText.trim()) {
        //     alert("Please describe your invention first.");
        //     return;
        // }

        // if (selectedModules.length === 0) {
        //     alert("Please select at least one output.");
        //     return;
        // }

        // const formData = new FormData();
        // formData.append("text", inventionText);
        // formData.append("checked", JSON.stringify(selectedModules));

        // try {
        //     const response = await createProject(formData).unwrap();

        //     const newProjectData = response?.data || response;
        //     const newProjectId =
        //         newProjectData?.project_id ||
        //         newProjectData?.id ||
        //         newProjectData?._id;

        //     console.log("Newly Generated Project ID:", newProjectId);

        // } catch (err) {
        //     console.error("Project Generation Failed:", err);

        //     if (err?.status === 400) {
        //         alert(err?.data?.error || "Something went wrong.");
        //     } else {
        //         alert("Project generation failed. Please try again.");
        //     }
        // }
    };

    const handleContinueFromKeyFeatures = (features) => {
        console.log("Final key features:", features);
        onPageChange(PAGES.REVIEW);
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
                        <span>{inventionText.length} characters</span>

                        <button type="button" className="upload-btn" aria-label="Upload file">
                            <img src={UploadIcon} alt="" className="upload-icon" />
                        </button>
                    </div>
                </div>

                <div className="module-grid">
                    {modules.map((item) => (
                        <ModuleCard
                            key={item.id}
                            item={item}
                            checked={selectedModuleSet.has(item.id)}
                            onToggle={toggleModule}
                        />
                    ))}
                </div>

                <div className="generate-row">
                    <button
                        className="generate-btn"
                        type="button"
                        onClick={handleGenerate}
                        disabled={isLoading}
                    >
                        <img
                            src={AiGeneratedKeyIcon}
                            alt=""
                            className="AiGeneratedKey-icon"
                        />
                        {isLoading ? "Generating..." : "Generate Key Features"}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default NewCasePage;
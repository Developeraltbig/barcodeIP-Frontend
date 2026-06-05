import React, { useCallback, useMemo, useState } from "react";
import { PAGES } from "../views/Home/constants";
import { modules, projects } from "../views/Home/data";

import ModuleCard from "../components/ModuleCard";
import ProjectCard from "../components/ProjectCard";
import KeyFeaturesReview from "../views/Home/KeyFeaturesReview";
import { useCreateProjectMutation } from '../features/userApi';

import { useFetchAllProjectsQuery } from "../features/userApi";

function NewCasePage({ onPageChange }) {
    const [inventionText, setInventionText] = useState("");
    const [selectedModules, setSelectedModules] = useState([]);
    const [showKeyFeatures, setShowKeyFeatures] = useState(false);

    const { data: projectsData } = useFetchAllProjectsQuery();
    const [createProject, { isLoading, isSuccess }] = useCreateProjectMutation();

    const projects = useMemo(() => {
        if (!projectsData) return null;

        return (
            projectsData.projects ||
            projectsData.data ||
            (Array.isArray(projectsData) ? projectsData : null)
        );
    }, [projectsData]);

    console.log('projects', projects);

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
        if (!inventionText.trim()) {
            alert("Please describe your invention first.");
            return;
        }

        if (selectedModules.length === 0) {
            alert("Please select at least one output.");
            return;
        }

        const formData = new FormData();
        formData.append('text', inventionText);

        // ✅ Send selectedModules as JSON array string
        formData.append("checked", JSON.stringify(selectedModules));

        console.log("inventionText", inventionText);
        console.log("selectedModules array", selectedModules);
        console.log("selectedModules length", selectedModules.length);

        try {
            const response = await createProject(formData).unwrap();

            const newProjectData = response?.data || response;
            const newProjectId = newProjectData?.project_id || newProjectData?.id || newProjectData?._id;

            console.log("Newly Generated Project ID (Text):", newProjectId);

            setShowKeyFeatures(true);

            // setEnableButton(true)
            // // SAVE DIRECTLY TO LOCAL STATE TO PREVENT CACHE ISSUES
            // setActiveProject(newProjectData);

            // // If patent is not checked, navigate directly to result page
            // if (!selectedFilters.includes('patent') && newProjectId) {
            //     dispatch(setSelectedProject({
            //         ...newProjectData,
            //         _id: newProjectId,
            //         id: newProjectId
            //     }));
            //     navigate(`/result/${newProjectId}`);
            // } else {
            //     setShowAdvanceOption(true);
            // }
        } catch (err) {
            console.error('Project Generation Failed:', err);
            console.error('Project Generation Failed:11', err.status);
            if (err.status == 400) {
                alert(err.data.error);
            }

        }


    };

    const handleContinueFromKeyFeatures = (features) => {
        console.log("Final key features:", features);

        // Later you can send inventionText, selectedModules, and features to API here.
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
        <section className="content-wrap">
            <div className="new-case-card">
                <div className="section-heading">
                    <h1>Describe your invention</h1>
                    <p>Select the outputs you want BarcodeIP to generate.</p>
                </div>

                <div className="input-box">
                    <div className="input-label">
                        <span>⌕</span>
                        INVENTION TEXT
                    </div>

                    <textarea
                        value={inventionText}
                        onChange={(e) => setInventionText(e.target.value)}
                        placeholder="Describe your invention in plain English. Include the problem, main parts, how it works, and benefits."
                    />

                    <div className="input-footer">
                        <span>{inventionText.length} characters</span>
                        <button type="button">▧ Upload file</button>
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
                    >
                        ✦ Generate Key Features
                    </button>

                    <p>You can review and edit features before reports are created.</p>
                </div>
            </div>
        </section>
    );
}

export default NewCasePage;
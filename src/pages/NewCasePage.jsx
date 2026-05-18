import React, { useCallback, useMemo, useState } from "react";
import { PAGES } from "../views/Home/constants";
import { modules, projects } from "../views/Home/data";

import ModuleCard from "../components/ModuleCard";
import ProjectCard from "../components/ProjectCard";

function NewCasePage({ onPageChange }) {
    const [inventionText, setInventionText] = useState("");
    const [selectedModules, setSelectedModules] = useState([]);

    const selectedModuleSet = useMemo(
        () => new Set(selectedModules),
        [selectedModules]
    );

    const toggleModule = useCallback((id) => {
        setSelectedModules((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    }, []);

    const handleGenerate = useCallback(() => {
        onPageChange(PAGES.REVIEW);
    }, [onPageChange]);

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
                    <button className="generate-btn" type="button" onClick={handleGenerate}>
                        ✦ Generate Key Features
                    </button>

                    <p>You can review and edit features before reports are created.</p>
                </div>
            </div>

            <div className="recent-card">
                <div className="recent-header">
                    <div>
                        <h2>Recent Projects</h2>
                        <p>
                            Latest invention cases. Showing 6 here; use My Projects for the
                            full list.
                        </p>
                    </div>

                    <button
                        className="view-all-btn"
                        type="button"
                        onClick={() => onPageChange(PAGES.PROJECTS)}
                    >
                        <span>▦</span>
                        View All
                    </button>
                </div>

                <div className="project-grid">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onOpen={() => onPageChange(PAGES.REVIEW)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default NewCasePage;
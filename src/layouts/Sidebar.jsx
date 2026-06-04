import React, { memo, useMemo, useState } from "react";
import { ChevronDown, Clock, UserRound } from "lucide-react";
import { PAGES } from "../views/Home/constants";
import { navItems } from "../views/Home/data";

function Sidebar({ activePage, onPageChange }) {
    const [showRecent, setShowRecent] = useState(false);

    const recentProjects = useMemo(
        () => [
            { title: "Bimetallic Clamp and........", caseId: "016" },
            { title: "Bimetallic Clamp and........", caseId: "016" },
            { title: "Bimetallic Clamp and........", caseId: "016" },
            { title: "Bimetallic Clamp and........", caseId: "016" },
            { title: "Bimetallic Clamp and........", caseId: "016" },
            { title: "Bimetallic Clamp and........", caseId: "016" }
        ],
        []
    );

    return (
        <aside className="sidebar">
            <div className="brand">
                <button
                    type="button"
                    className="brand-logo"
                    onClick={() => onPageChange(PAGES.NEW_CASE)}
                    aria-label="Go to new case"
                >
                    <span className="brand-red">barcode</span>
                    <span className="brand-dark">IP</span>
                    <span className="brand-dot">.</span>
                </button>
            </div>

            <nav className="sidebar-nav" aria-label="Main navigation">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        className={`nav-item ${activePage === item.id ? "active" : ""}`}
                        onClick={() => onPageChange(item.id)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>

                        {item.badge ? <strong className="nav-badge">{item.badge}</strong> : null}
                    </button>
                ))}
            </nav>

            <div className="sidebar-bottom">
                <div className="recent-projects-panel">
                    {showRecent ? (
                        <div className="recent-projects-list">
                            {recentProjects.map((project, index) => (
                                <button
                                    key={`${project.caseId}-${index}`}
                                    type="button"
                                    className="recent-project-item"
                                    onClick={() => onPageChange(PAGES.PROJECTS)}
                                >
                                    <span>{project.title}</span>
                                    <small>CASE ID : {project.caseId}</small>
                                </button>
                            ))}
                        </div>
                    ) : null}

                    <button
                        type="button"
                        className="recent-toggle-btn"
                        onClick={() => setShowRecent((prev) => !prev)}
                    >
                        <span>
                            <Clock size={15} />
                            Recent Projects
                        </span>

                        <ChevronDown
                            size={16}
                            className={showRecent ? "recent-chevron open" : "recent-chevron"}
                        />
                    </button>
                </div>

                <div className="sidebar-profile-wrap">
                    <button
                        type="button"
                        className={`sidebar-profile-btn ${activePage === PAGES.PROFILE ? "active" : ""
                            }`}
                        onClick={() => onPageChange(PAGES.PROFILE)}
                    >
                        <span className="sidebar-profile-avatar">
                            <UserRound size={17} />
                        </span>

                        <span className="sidebar-profile-name">Harshit</span>

                        <ChevronDown size={15} />
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default memo(Sidebar);
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Clock, UserRound, LogOut } from "lucide-react";
import { PAGES } from "../views/Home/constants";
import { navItems } from "../views/Home/data";

function Sidebar({ activePage, onPageChange, onLogout }) {
    const [showRecent, setShowRecent] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const profileRef = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleProfileClick = () => {
        setShowProfileMenu(false);
        onPageChange(PAGES.PROFILE);
    };

    const handleLogoutClick = () => {
        setShowProfileMenu(false);

        if (onLogout) {
            onLogout();
            return;
        }

        localStorage.clear();
        window.location.href = "/login";
    };

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

                        {item.badge ? (
                            <strong className="nav-badge">{item.badge}</strong>
                        ) : null}
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

                <div className="sidebar-profile-wrap" ref={profileRef}>
                    {showProfileMenu ? (
                        <div className="sidebar-profile-menu">
                            <button
                                type="button"
                                className="profile-menu-item"
                                onClick={handleProfileClick}
                            >
                                <UserRound size={14} />
                                <span>Profile</span>
                            </button>

                            <button
                                type="button"
                                className="profile-menu-item logout"
                                onClick={handleLogoutClick}
                            >
                                <LogOut size={14} />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : null}

                    <button
                        type="button"
                        className={`sidebar-profile-btn ${activePage === PAGES.PROFILE ? "active" : ""
                            }`}
                        onClick={() => setShowProfileMenu((prev) => !prev)}
                        aria-expanded={showProfileMenu}
                        aria-haspopup="menu"
                    >
                        <span className="sidebar-profile-avatar">
                            <UserRound size={17} />
                        </span>

                        <span className="sidebar-profile-name">Harshit</span>

                        <ChevronDown
                            size={15}
                            className={showProfileMenu ? "profile-chevron open" : "profile-chevron"}
                        />
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default memo(Sidebar);
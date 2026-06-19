import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Clock, UserRound, LogOut, Wallet as WalletIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import { PAGES } from "../views/Home/constants";
import { navItems } from "../views/Home/data";
// import { useGetRecentThreeProjectsQuery, useGetWalletDetailsQuery } from "../features/userApi";
import { useGetRecentThreeProjectsQuery } from "../features/userApi";
import { useLazyLogoutQuery } from '../features/slice/auth/authApi';
import WalletModal from "../components/WalletModal"; // Imported custom modal container

function Sidebar({ activePage, onPageChange, onLogout }) {
    const dispatch = useDispatch();
    const [showRecent, setShowRecent] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isWalletOpen, setIsWalletOpen] = useState(false); // Modal state flag
    const [LogoutTriggered, { isLoading }] = useLazyLogoutQuery();

    const profileRef = useRef(null);

    const dashboard = useSelector((state) => state.auth.user || {});

    // Hook to fetch wallet data
    // const { data: walletData } = useGetWalletDetailsQuery();
    const currentCredits = 20;
    // const currentCredits = walletData?.balance ?? 0;

    const {
        data: getRecentThreeProjects,
        isLoading: loadingProjects,
        isError: recentProjectsError,
    } = useGetRecentThreeProjectsQuery();

    const recentProjects = useMemo(() => {
        const rawData =
            getRecentThreeProjects?.data ||
            getRecentThreeProjects?.projects ||
            getRecentThreeProjects?.recentProjects ||
            getRecentThreeProjects;

        return Array.isArray(rawData) ? rawData : [];
    }, [getRecentThreeProjects]);

    const userName = useMemo(() => {
        if (!dashboard?.email) return "Profile";
        return dashboard.email.split("@")[0];
    }, [dashboard?.email]);

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

    const handleLogoutClick = async () => {
        const dataLogout = await LogoutTriggered().unwrap();
        setShowProfileMenu(false);
        localStorage.clear();
        window.location.href = "/login";
    };

    const getProjectTitle = (project) => {
        return (
            project?.project_title ||
            project?.title ||
            project?.name ||
            "Untitled Project"
        );
    };

    const getProjectCaseId = (project) => {
        return (
            project?.case_id ||
            project?.caseId ||
            project?.project_id ||
            project?._id ||
            "N/A"
        );
    };

    return (
        <>
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
                            <span className="nav-icon">
                                <img src={item.icon} alt="" />
                            </span>
                            <span className="nav-label">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-bottom">
                    <div className="recent-projects-panel">
                        {showRecent && (
                            <div className="recent-projects-list">
                                {loadingProjects && (
                                    <div className="recent-project-empty">
                                        Loading projects...
                                    </div>
                                )}

                                {!loadingProjects && recentProjectsError && (
                                    <div className="recent-project-empty">
                                        Unable to load projects.
                                    </div>
                                )}

                                {!loadingProjects &&
                                    !recentProjectsError &&
                                    recentProjects.length > 0 &&
                                    recentProjects.map((project, index) => (
                                        <button
                                            key={project?._id || project?.project_id || index}
                                            type="button"
                                            className="recent-project-item"
                                            onClick={() => onPageChange(PAGES.PROJECTS)}
                                        >
                                            <span>{getProjectTitle(project)}</span>
                                            <small>CASE ID : {getProjectCaseId(project)}</small>
                                        </button>
                                    ))}

                                {!loadingProjects &&
                                    !recentProjectsError &&
                                    recentProjects.length === 0 && (
                                        <div className="recent-project-empty">
                                            No recent projects found.
                                        </div>
                                    )}
                            </div>
                        )}

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

                    {/* Integrated Wallet Component Placement Section */}
                    <div className="sidebar-wallet-widget">
                        <div className="wallet-meta-labels">
                            <span className="title-text text-uppercase">Available Credits</span>
                            <span className="numeric-balance-pill">{currentCredits}</span>
                        </div>
                        <button
                            type="button"
                            className="sidebar-topup-trigger-btn"
                            onClick={() => setIsWalletOpen(true)}
                        >
                            <WalletIcon size={14} style={{ marginRight: '6px' }} />
                            Top-up Credits
                        </button>
                    </div>

                    <div className="sidebar-profile-wrap" ref={profileRef}>
                        {showProfileMenu && (
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
                        )}

                        <button
                            type="button"
                            className={`sidebar-profile-btn ${activePage === PAGES.PROFILE ? "active" : ""}`}
                            onClick={() => setShowProfileMenu((prev) => !prev)}
                            aria-expanded={showProfileMenu}
                            aria-haspopup="menu"
                        >
                            <span className="sidebar-profile-avatar">
                                <UserRound size={17} />
                            </span>
                            <span className="sidebar-profile-name">{userName}</span>
                            <ChevronDown
                                size={15}
                                className={showProfileMenu ? "profile-chevron open" : "profile-chevron"}
                            />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Wallet Modal Mount Entry Point */}
            <WalletModal
                isOpen={isWalletOpen}
                onClose={() => setIsWalletOpen(false)}
                currentBalance={currentCredits}
            />
        </>
    );
}

export default memo(Sidebar);
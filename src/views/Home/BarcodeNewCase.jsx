import React, { memo, useCallback, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./BarcodeNewCase.css";

import { PAGES } from "./constants";
import { navItems } from "./data";

import Sidebar from "../../layouts/Sidebar";
// import Topbar from "../../layouts/Topbar";

import NewCasePage from "../../pages/NewCasePage";
import MyProjectsPage from "../../pages/MyProjectsPage";
import BarcodeCommentsPage from "../../pages/BarcodeCommentsPage";
import DownloadsPage from "../../pages/DownloadsPage";
import ReviewPlaceholder from "../../pages/ReviewPlaceholder";
import ProfilePage from "../../pages/ProfilePage";

const PAGE_TO_TAB = {
    [PAGES.NEW_CASE]: "new-case",
    [PAGES.PROJECTS]: "my-projects",
    [PAGES.COMMENTS]: "comments",
    [PAGES.DOWNLOADS]: "downloads",
    [PAGES.REVIEW]: "review",
    [PAGES.PROFILE]: "profile"
};

const TAB_TO_PAGE = {
    "new-case": PAGES.NEW_CASE,
    "my-projects": PAGES.PROJECTS,
    comments: PAGES.COMMENTS,
    downloads: PAGES.DOWNLOADS,
    review: PAGES.REVIEW,
    profile: PAGES.PROFILE
};

function BarcodeNewCase() {
    const navigate = useNavigate();
    const { tab } = useParams();

    const activePage = TAB_TO_PAGE[tab];

    if (!activePage) {
        return <Navigate to="/project/new-case" replace />;
    }

    const handlePageChange = useCallback(
        (page) => {
            const tabName = PAGE_TO_TAB[page];

            if (!tabName) return;

            if (tabName === tab) return;

            navigate(`/project/${tabName}`);
        },
        [navigate, tab]
    );

    const handleProfileClick = useCallback(() => {
        navigate("/project/profile");
    }, [navigate]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/", { replace: true });
    }, [navigate]);

    const pageTitle = useMemo(() => {
        if (activePage === PAGES.PROFILE) return "Profile";

        const activeItem = navItems.find((item) => item.id === activePage);
        return activeItem?.label || "New Case";
    }, [activePage]);

    const renderedPage = useMemo(() => {
        switch (activePage) {
            case PAGES.NEW_CASE:
                return <NewCasePage onPageChange={handlePageChange} />;

            case PAGES.PROJECTS:
                return <MyProjectsPage onPageChange={handlePageChange} />;

            case PAGES.COMMENTS:
                return <BarcodeCommentsPage />;

            case PAGES.DOWNLOADS:
                return <DownloadsPage />;

            case PAGES.REVIEW:
                return <ReviewPlaceholder onPageChange={handlePageChange} />;

            case PAGES.PROFILE:
                return <ProfilePage onBack={() => handlePageChange(PAGES.NEW_CASE)} />;

            default:
                return <NewCasePage onPageChange={handlePageChange} />;
        }
    }, [activePage, handlePageChange]);

    return (
        <div className="barcode-page">
            <Sidebar activePage={activePage} onPageChange={handlePageChange} />

            <main className="main-area" aria-label={pageTitle}>
                {/* 
        <Topbar
          userName="Developeraltbig"
          onProfileClick={handleProfileClick}
          onLogoutConfirm={handleLogout}
        /> 
        */}

                {renderedPage}
            </main>
        </div>
    );
}

export default memo(BarcodeNewCase);
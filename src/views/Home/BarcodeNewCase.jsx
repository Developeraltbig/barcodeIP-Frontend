import React, { memo, useCallback, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./BarcodeNewCase.css";

import { PAGES } from "./constants";
import { navItems } from "./data";

import Sidebar from "../../layouts/Sidebar";

import NewCasePage from "../../pages/NewCasePage";
import MyProjectsPage from "../../pages/MyProjectsPage";
import BarcodeCommentsPage from "../../pages/BarcodeCommentsPage";
import DownloadsPage from "../../pages/DownloadsPage";
import ReviewPlaceholder from "../../pages/ReviewPlaceholder";
import ProfilePage from "../../pages/ProfilePage";
import NotFoundPage from "../../pages/NotFoundPage";

const PAGE_TO_TAB = {
    [PAGES.NEW_CASE]: "new-case",
    [PAGES.PROJECTS]: "my-projects",
    [PAGES.COMMENTS]: "comments",
    [PAGES.DOWNLOADS]: "downloads",
    [PAGES.REVIEW]: "review",
    [PAGES.PROFILE]: "profile",
};

const TAB_TO_PAGE = {
    "new-case": PAGES.NEW_CASE,
    "my-projects": PAGES.PROJECTS,
    comments: PAGES.COMMENTS,
    downloads: PAGES.DOWNLOADS,
    review: PAGES.REVIEW,
    profile: PAGES.PROFILE,
};

function BarcodeNewCase() {
    const navigate = useNavigate();
    const { tab, id } = useParams();

    const activePage = TAB_TO_PAGE[tab];

    if (!activePage) {
        return <Navigate to="/project/new-case" replace />;
    }

    const isReviewPage = activePage === PAGES.REVIEW;

    /**
     * Review page requires project id.
     * Example valid URL:
     * /project/review/69fc24be3b92b5925bdd68c9
     */
    if (isReviewPage && !id) {
        return <NotFoundPage />;
    }

    const handlePageChange = useCallback(
        (page, projectId = null) => {
            const tabName = PAGE_TO_TAB[page];

            if (!tabName) return;

            if (page === PAGES.REVIEW) {
                if (!projectId) {
                    navigate("/project/not-found", { replace: true });
                    return;
                }

                navigate(`/project/review/${projectId}`);
                return;
            }

            if (tabName === tab) return;

            navigate(`/project/${tabName}`);
        },
        [navigate, tab]
    );

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
                return (
                    <ReviewPlaceholder
                        projectId={id}
                        onPageChange={handlePageChange}
                    />
                );

            case PAGES.PROFILE:
                return (
                    <ProfilePage
                        onBack={() => handlePageChange(PAGES.NEW_CASE)}
                    />
                );

            default:
                return <NotFoundPage />;
        }
    }, [activePage, handlePageChange, id]);

    return (
        <div className="barcode-page">
            <Sidebar
                activePage={activePage}
                onPageChange={handlePageChange}
                onLogout={handleLogout}
            />

            <main className="main-area" aria-label={pageTitle}>
                {renderedPage}
            </main>
        </div>
    );
}

export default memo(BarcodeNewCase);
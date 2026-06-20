import React, { useCallback, useMemo, useState } from "react";
import { useGetSupportAnalystsQuery } from "../features/userApi";

import CommentCard from "../components/CommentCard";
import RequestCommentsModal from "../components/RequestCommentsModal";
import "./OoltoComments.css";
import RequestOoltoCommentIcon from "../assets/icons/requestOoltoComment.svg";

function BarcodeCommentsPage() {
    const [showModal, setShowModal] = useState(false);

    const openModal = useCallback(() => setShowModal(true), []);
    const closeModal = useCallback(() => setShowModal(false), []);

    const {
        data: supportAnalystsData,
        isLoading: loadingAnalysts,
        error: errorAnalysts,
    } = useGetSupportAnalystsQuery();

    console.log("supportAnalystsData --", supportAnalystsData);

    const analysts = useMemo(() => {
        const rawData =
            supportAnalystsData?.data ||
            supportAnalystsData?.supportAnalysts ||
            supportAnalystsData?.analysts ||
            supportAnalystsData;

        if (!Array.isArray(rawData)) return [];

        return rawData.filter((item) => {
            const status = item?.analystStatus || "";
            return status.toLowerCase() !== "notrequested";
        });
    }, [supportAnalystsData]);

    return (
        <section className="content-wrap oc-page">
            <div className="oc-page-hero">
                <div>
                    <h1>Oolto Comments</h1>
                    <p>Requests sent for product, patent, publication, and draft comments.</p>
                </div>

                {/* <button
                    className="oc-primary-action-btn"
                    type="button"
                    onClick={openModal}
                >
                    <span className="oc-btn-icon">
                        <img
                            src={RequestOoltoCommentIcon}
                            alt=""
                            className="request-oolto-icon"
                        />
                    </span>
                    Request Oolto Comments
                </button> */}
            </div>

            {loadingAnalysts && (
                <div className="oc-empty-state">
                    Loading comment requests...
                </div>
            )}

            {!loadingAnalysts && errorAnalysts && (
                <div className="oc-empty-state">
                    Unable to load comment requests. Please try again.
                </div>
            )}

            {!loadingAnalysts && !errorAnalysts && analysts.length > 0 && (
                <div className="oc-comments-list">
                    {analysts.map((item, index) => (
                        <CommentCard
                            key={item._id || item.id || index}
                            item={item}
                        />
                    ))}
                </div>
            )}

            {!loadingAnalysts && !errorAnalysts && analysts.length === 0 && (
                <div className="oc-empty-state">
                    No comment requests found.
                </div>
            )}

            {showModal && <RequestCommentsModal onClose={closeModal} />}
        </section>
    );
}

export default BarcodeCommentsPage;
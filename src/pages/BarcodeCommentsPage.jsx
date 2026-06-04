import React, { useCallback, useState } from "react";
import { barcodeComments } from "../views/Home/data";

import CommentCard from "../components/CommentCard";
import RequestCommentsModal from "../components/RequestCommentsModal";
import "./OoltoComments.css";

function BarcodeCommentsPage() {
    const [showModal, setShowModal] = useState(false);

    const openModal = useCallback(() => setShowModal(true), []);
    const closeModal = useCallback(() => setShowModal(false), []);

    return (
        <section className="content-wrap oc-page">
            <div className="oc-page-hero">
                <div>
                    <h1>Oolto Comments</h1>
                    <p>Requests sent for product, patent, publication, and draft comments.</p>
                </div>

                <button className="oc-primary-action-btn" type="button" onClick={openModal}>
                    <span className="oc-btn-icon">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M7 8h10M7 12h7M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8l-5 3v-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
                        </svg>
                    </span>
                    Request Oolto Comments
                </button>
            </div>

            <div className="oc-comments-list">
                {barcodeComments.map((item) => (
                    <CommentCard key={item.id} item={item} />
                ))}
            </div>

            {showModal && <RequestCommentsModal onClose={closeModal} />}
        </section>
    );
}

export default BarcodeCommentsPage;

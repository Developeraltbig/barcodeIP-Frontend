import React, { useCallback, useState } from "react";
import { barcodeComments } from "../views/Home/data";

import CommentCard from "../components/CommentCard";
import RequestCommentsModal from "../components/RequestCommentsModal";
import "./OoltoComments.css";
import RequestOoltoCommentIcon from "../assets/icons/requestOoltoComment.svg";

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
                        <img src={RequestOoltoCommentIcon} alt="" className="request-oolto-icon" />
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

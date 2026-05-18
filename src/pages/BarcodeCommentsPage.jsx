import React, { useCallback, useState } from "react";
import { barcodeComments } from "../views/Home/data";

import CommentCard from "../components/CommentCard";
import RequestCommentsModal from "../components/RequestCommentsModal";

function BarcodeCommentsPage() {
    const [showModal, setShowModal] = useState(false);

    const openModal = useCallback(() => setShowModal(true), []);
    const closeModal = useCallback(() => setShowModal(false), []);

    return (
        <section className="content-wrap">
            <div className="page-hero">
                <div>
                    <h1>Barcode Comments</h1>
                    <p>
                        Requests sent for product, patent, publication, and draft comments.
                    </p>
                </div>

                <button className="primary-action-btn" type="button" onClick={openModal}>
                    ▤ Request Barcode Comments
                </button>
            </div>

            <div className="comments-list">
                {barcodeComments.map((item) => (
                    <CommentCard key={item.id} item={item} />
                ))}
            </div>

            {showModal && <RequestCommentsModal onClose={closeModal} />}
        </section>
    );
}

export default BarcodeCommentsPage;
import React from "react";
import { PAGES } from "../views/Home/constants";

function ReviewPlaceholder({ onPageChange }) {
    return (
        <section className="content-wrap">
            <div className="page-hero">
                <div>
                    <button
                        className="back-btn"
                        type="button"
                        onClick={() => onPageChange(PAGES.NEW_CASE)}
                    >
                        ← Back
                    </button>

                    <h1>Review generated key features</h1>
                    <p>Connect your existing review features component here.</p>
                </div>

                <button
                    className="primary-action-btn"
                    type="button"
                    onClick={() => onPageChange(PAGES.PROJECTS)}
                >
                    Proceed
                </button>
            </div>
        </section>
    );
}

export default ReviewPlaceholder;
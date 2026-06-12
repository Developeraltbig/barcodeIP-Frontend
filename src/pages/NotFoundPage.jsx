import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <section className="content-wrap not-found-page">
            <div className="not-found-card">
                <h1>Page Not Found</h1>
                <p>The page or project you are looking for does not exist.</p>

                <button
                    type="button"
                    onClick={() => navigate("/project/new-case")}
                >
                    Back to New Case
                </button>
            </div>
        </section>
    );
}

export default NotFoundPage;
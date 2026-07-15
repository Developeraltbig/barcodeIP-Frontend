import React, { memo } from "react";
import "./RealTimeProgressBar.css"; // Create or add styling as needed

function RealTimeProgressBar({ label, progress, status, errorMessage }) {
    const isFailed = status === "failed";

    return (
        <div className="rr-progress-container">
            <div className="rr-progress-card">
                <div className="rr-progress-header">
                    <h3>Generating {label} Results</h3>
                    <span className={`rr-progress-badge ${status}`}>
                        {isFailed ? "Failed" : `${progress}%`}
                    </span>
                </div>

                <p className="rr-progress-description">
                    {isFailed
                        ? errorMessage || "An error occurred during generation. Please try again."
                        : "AI models are analyzing documents and generating reports. This may take a few minutes."
                    }
                </p>

                <div className="rr-progress-bar-track">
                    <div
                        className={`rr-progress-bar-fill ${isFailed ? "failed" : ""}`}
                        style={{ width: `${isFailed ? 100 : progress}%` }}
                    />
                </div>

                {!isFailed && (
                    <div className="rr-progress-footer">
                        <span className="spinner" />
                        <span>Processing in background. You can safely switch tabs or return later.</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(RealTimeProgressBar);
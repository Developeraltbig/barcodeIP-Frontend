import React, { memo, useCallback } from "react";

function ModuleCard({ item, checked, onToggle }) {
    const handleClick = useCallback(() => {
        onToggle(item.id);
    }, [item.id, onToggle]);

    return (
        <button
            type="button"
            className={`module-card ${checked ? "selected" : ""}`}
            onClick={handleClick}
        >
            <span className={`checkbox ${checked ? "checked" : ""}`}>
                {checked ? "✓" : ""}
            </span>

            <span className="module-icon">{item.icon}</span>

            <span className="module-text">
                <strong>{item.title}</strong>
                <small>{item.desc}</small>
            </span>
        </button>
    );
}

export default memo(ModuleCard);
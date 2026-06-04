import React, { memo, useEffect, useMemo, useState } from "react";
import "./GeneratedKeyFeatures.css";

const INITIAL_PRIMARY_FEATURES = [
    "A clamp configured for tapping power from a bare aluminium overhead power line while connecting to a copper service entry conductor.",
    "A clamp body shaped to hook onto, seat against, and remain positioned on an overhead live conductor before final tightening.",
    "A composition or terminal interface that supports connection between aluminium overhead conductors and copper service entry conductors.",
    "A screw, bolt, pressure plate, or equivalent tightening member fixes the clamp to the live conductor after placement.",
    "A mating interface allows an installation tool to hold, tighten, release, or detach from the clamp after mounting."
];

const INITIAL_SECONDARY_FEATURES = [
    "An elongated electrically insulated tool allows an operator to work safely from ground level or at a distance from live components.",
    "The distal end of the tool includes an adapter that mates with the clamp during lifting, tightening, and installation.",
    "The tool can disengage from the clamp once the clamp is securely fixed on the overhead power line.",
    "The clamp geometry can accommodate multiple conductor or cable diameters through shaped jaws or adjustable pressure areas.",
    "Material selection and surface design reduce galvanic corrosion and outdoor degradation in power distribution environments."
];

const INITIAL_KEY_STRINGS = [
    {
        title: "Broad conductor clamp search",
        tag: "Broad",
        string:
            "(clamp OR connector OR tap OR fitting) AND (screw OR bolt OR fastener OR thread*) AND (tool OR stick OR pole OR rod) AND (insulat* OR insulated) AND (overhead OR aerial) AND (conductor OR line)",
        dateRange: "Priority",
        startDate: "",
        endDate: "",
        inventors: [],
        assignees: [],
        patentOffice: "Patent Office",
        language: "Language",
        status: "Status",
        type: "Type",
        litigation: "Litigation"
    },
    {
        title: "Live-line installation search",
        tag: "Problem-focused",
        string:
            "(install* OR mount* OR attach*) AND (clamp OR connector OR tap) AND (live line OR hot line OR energized OR under load) AND (tool OR stick OR hot stick) AND (remote OR from the ground)",
        dateRange: "Priority",
        startDate: "",
        endDate: "",
        inventors: [],
        assignees: [],
        patentOffice: "Patent Office",
        language: "Language",
        status: "Status",
        type: "Type",
        litigation: "Litigation"
    },
    {
        title: "Bimetal novelty search",
        tag: "Narrow",
        string:
            "(hot tap OR live tap OR hot line clamp) AND (bimetallic OR bi-metal OR dissimilar metal) AND (aluminium OR aluminum) AND (copper) AND (conductor OR cable OR line)",
        dateRange: "Priority",
        startDate: "",
        endDate: "",
        inventors: [],
        assignees: [],
        patentOffice: "Patent Office",
        language: "Language",
        status: "Status",
        type: "Type",
        litigation: "Litigation"
    },
    {
        title: "Tool adapter search",
        tag: "Feature-focused",
        string:
            "(clamp OR connector OR terminal OR tap OR stirrup) AND (bimetal* OR dissimilar metal OR copper-aluminium) AND (overhead line OR power line) AND (tool OR hot stick OR live line tool OR pole OR apparatus)",
        dateRange: "Priority",
        startDate: "",
        endDate: "",
        inventors: [],
        assignees: [],
        patentOffice: "Patent Office",
        language: "Language",
        status: "Status",
        type: "Type",
        litigation: "Litigation"
    },
    {
        title: "Ground-level installation search",
        tag: "Workflow",
        string:
            "(overhead conductor connector) AND (ground level installation OR remote installation OR insulated pole) AND (live line maintenance OR energized distribution)",
        dateRange: "Priority",
        startDate: "",
        endDate: "",
        inventors: [],
        assignees: [],
        patentOffice: "Patent Office",
        language: "Language",
        status: "Status",
        type: "Type",
        litigation: "Litigation"
    },
    {
        title: "Material compatibility search",
        tag: "Material",
        string:
            "(aluminium copper connector OR aluminum copper clamp) AND (galvanic corrosion OR bimetal interface OR service tap) AND (overhead distribution)",
        dateRange: "Priority",
        startDate: "",
        endDate: "",
        inventors: [],
        assignees: [],
        patentOffice: "Patent Office",
        language: "Language",
        status: "Status",
        type: "Type",
        litigation: "Litigation"
    },
    {
        title: "Clamp geometry search",
        tag: "Feature-focused",
        string:
            "(hook shaped clamp OR C shaped clamp OR jaw clamp) AND (overhead conductor) AND (tightening screw OR pressure plate OR threaded fastener)",
        dateRange: "Priority",
        startDate: "",
        endDate: "",
        inventors: [],
        assignees: [],
        patentOffice: "Patent Office",
        language: "Language",
        status: "Status",
        type: "Type",
        litigation: "Litigation"
    },
    {
        title: "Hot-stick compatibility search",
        tag: "Tool-focused",
        string:
            "(hot stick compatible clamp OR shotgun stick clamp OR grip-all clamp) AND (distribution line OR live line OR overhead power)",
        dateRange: "Priority",
        startDate: "",
        endDate: "",
        inventors: [],
        assignees: [],
        patentOffice: "Patent Office",
        language: "Language",
        status: "Status",
        type: "Type",
        litigation: "Litigation"
    },
    {
        title: "Claims-only strict search",
        tag: "Strict",
        string:
            "(claim:clamp AND claim:overhead AND claim:conductor AND claim:tightening AND claim:insulated tool) AND (aluminium OR aluminum OR copper OR bimetallic)",
        dateRange: "Priority",
        startDate: "",
        endDate: "",
        inventors: [],
        assignees: [],
        patentOffice: "Patent Office",
        language: "Language",
        status: "Status",
        type: "Type",
        litigation: "Litigation"
    }
];

function FeatureList({ title, items, variant, isEditing, onChange }) {
    return (
        <div className={`kf-feature-panel ${variant === "primary" ? "is-primary" : ""}`}>
            <h3 className="kf-feature-panel-title">{title}</h3>

            <div className="kf-feature-list-shell">
                <div className="kf-feature-list">
                    {items.map((item, index) => (
                        <div className="kf-feature-item" key={`${variant}-${index}`}>
                            <div className="kf-feature-number">
                                {String(index + 1).padStart(2, "0")}
                            </div>

                            {isEditing ? (
                                <textarea
                                    value={item}
                                    onChange={(e) => onChange(index, e.target.value)}
                                />
                            ) : (
                                <p>{item}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function KeyStringCard({ item, index, onCopy, onEdit }) {
    return (
        <div className="kf-string-card">
            <div className="kf-string-top">
                <span>Key String {String(index + 1).padStart(2, "0")}</span>
                <h4>{item.title}</h4>
            </div>

            <pre>{item.string}</pre>

            <div className="kf-string-actions">
                <em className={item.tag === "Strict" ? "strict" : ""}>{item.tag}</em>

                <div>
                    <button type="button" className="copy" onClick={() => onCopy(item.string)}>
                        ⧉ Copy
                    </button>

                    <button type="button" className="edit" onClick={() => onEdit(index)}>
                        ✎ Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

function KeyStringEditModal({ open, item, index, onClose, onUpdate }) {
    const [form, setForm] = useState(item || {});
    const [inventorInput, setInventorInput] = useState("");
    const [assigneeInput, setAssigneeInput] = useState("");

    useEffect(() => {
        if (item) {
            setForm(item);
            setInventorInput("");
            setAssigneeInput("");
        }
    }, [item]);

    if (!open || !item) return null;

    const updateField = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const addValue = (field, value, clearInput) => {
        const cleanValue = value.trim();
        if (!cleanValue) return;

        setForm((prev) => ({
            ...prev,
            [field]: [...(prev[field] || []), cleanValue]
        }));

        clearInput("");
    };

    const removeValue = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: (prev[field] || []).filter((itemValue) => itemValue !== value)
        }));
    };

    const handleSubmit = () => {
        onUpdate(index, form);
        onClose();
    };

    return (
        <div className="ks-modal-backdrop" onMouseDown={onClose}>
            <div className="ks-modal" onMouseDown={(e) => e.stopPropagation()}>
                <div className="ks-modal-header">
                    <div className="ks-modal-title-wrap">
                        <span className="ks-modal-icon">✎</span>
                        <div>
                            <h3>Edit Key String {String(index + 1).padStart(2, "0")}</h3>
                            <p>Update this search query and optional filters before Patent Search.</p>
                        </div>
                    </div>

                    <button className="ks-modal-close" type="button" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="ks-modal-body">
                    <div className="ks-field">
                        <label>Date Range</label>
                        <select
                            value={form.dateRange || "Priority"}
                            onChange={(e) => updateField("dateRange", e.target.value)}
                        >
                            <option>Priority</option>
                            <option>Publication</option>
                            <option>Filing</option>
                            <option>Grant</option>
                        </select>
                    </div>

                    <div className="ks-grid two">
                        <div className="ks-field">
                            <label>Start Date</label>
                            <input
                                type="date"
                                value={form.startDate || ""}
                                onChange={(e) => updateField("startDate", e.target.value)}
                            />
                        </div>

                        <div className="ks-field">
                            <label>End Date</label>
                            <input
                                type="date"
                                value={form.endDate || ""}
                                onChange={(e) => updateField("endDate", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="ks-field">
                        <label>Key String</label>
                        <textarea
                            value={form.string || ""}
                            onChange={(e) => updateField("string", e.target.value)}
                        />
                    </div>

                    <div className="ks-grid two with-add">
                        <div className="ks-field">
                            <label>Inventor</label>
                            <div className="ks-add-row">
                                <input
                                    type="text"
                                    placeholder="Inventor"
                                    value={inventorInput}
                                    onChange={(e) => setInventorInput(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => addValue("inventors", inventorInput, setInventorInput)}
                                >
                                    +
                                </button>
                            </div>

                            {(form.inventors || []).length > 0 && (
                                <div className="ks-chip-row">
                                    {form.inventors.map((inventor) => (
                                        <span key={inventor}>
                                            {inventor}
                                            <button type="button" onClick={() => removeValue("inventors", inventor)}>
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="ks-field">
                            <label>Assignee</label>
                            <div className="ks-add-row">
                                <input
                                    type="text"
                                    placeholder="Assignee"
                                    value={assigneeInput}
                                    onChange={(e) => setAssigneeInput(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => addValue("assignees", assigneeInput, setAssigneeInput)}
                                >
                                    +
                                </button>
                            </div>

                            {(form.assignees || []).length > 0 && (
                                <div className="ks-chip-row">
                                    {form.assignees.map((assignee) => (
                                        <span key={assignee}>
                                            {assignee}
                                            <button type="button" onClick={() => removeValue("assignees", assignee)}>
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="ks-field">
                        <label>Patent Office</label>
                        <select
                            value={form.patentOffice || "Patent Office"}
                            onChange={(e) => updateField("patentOffice", e.target.value)}
                        >
                            <option>Patent Office</option>
                            <option>US Patent Office</option>
                            <option>European Patent Office</option>
                            <option>WIPO</option>
                            <option>India Patent Office</option>
                        </select>
                    </div>

                    <div className="ks-grid two">
                        <div className="ks-field">
                            <label>Language</label>
                            <select
                                value={form.language || "Language"}
                                onChange={(e) => updateField("language", e.target.value)}
                            >
                                <option>Language</option>
                                <option>English</option>
                                <option>Hindi</option>
                                <option>German</option>
                                <option>French</option>
                                <option>Japanese</option>
                            </select>
                        </div>

                        <div className="ks-field">
                            <label>Status</label>
                            <select
                                value={form.status || "Status"}
                                onChange={(e) => updateField("status", e.target.value)}
                            >
                                <option>Status</option>
                                <option>Active</option>
                                <option>Pending</option>
                                <option>Granted</option>
                                <option>Expired</option>
                                <option>Abandoned</option>
                            </select>
                        </div>
                    </div>

                    <div className="ks-grid two">
                        <div className="ks-field">
                            <label>Type</label>
                            <select value={form.type || "Type"} onChange={(e) => updateField("type", e.target.value)}>
                                <option>Type</option>
                                <option>Patent</option>
                                <option>Application</option>
                                <option>Utility Model</option>
                                <option>Design</option>
                            </select>
                        </div>

                        <div className="ks-field">
                            <label>Litigation</label>
                            <select
                                value={form.litigation || "Litigation"}
                                onChange={(e) => updateField("litigation", e.target.value)}
                            >
                                <option>Litigation</option>
                                <option>Any</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="ks-modal-footer">
                    <button className="ks-cancel-btn" type="button" onClick={onClose}>
                        Cancel
                    </button>

                    <button className="ks-update-btn" type="button" onClick={handleSubmit}>
                        ✓ Update
                    </button>
                </div>
            </div>
        </div>
    );
}

function GeneratedKeyFeatures({ caseId = "016", onStartAnotherCase, onProceed }) {
    const [primaryFeatures, setPrimaryFeatures] = useState(INITIAL_PRIMARY_FEATURES);
    const [secondaryFeatures, setSecondaryFeatures] = useState(INITIAL_SECONDARY_FEATURES);
    const [keyStrings, setKeyStrings] = useState(INITIAL_KEY_STRINGS);
    const [isEditingFeatures, setIsEditingFeatures] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(true);
    const [editingKeyStringIndex, setEditingKeyStringIndex] = useState(null);

    const activeKeyString =
        editingKeyStringIndex !== null ? keyStrings[editingKeyStringIndex] : null;

    const allKeyStringsText = useMemo(
        () =>
            keyStrings
                .map((item, index) => `KEY STRING ${index + 1}: ${item.title}\n${item.string}`)
                .join("\n\n"),
        [keyStrings]
    );

    const updatePrimaryFeature = (index, value) => {
        setPrimaryFeatures((prev) =>
            prev.map((item, itemIndex) => (itemIndex === index ? value : item))
        );
    };

    const updateSecondaryFeature = (index, value) => {
        setSecondaryFeatures((prev) =>
            prev.map((item, itemIndex) => (itemIndex === index ? value : item))
        );
    };

    const updateKeyString = (index, updatedItem) => {
        setKeyStrings((prev) =>
            prev.map((item, itemIndex) =>
                itemIndex === index ? { ...item, ...updatedItem } : item
            )
        );
    };

    const copyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            console.error("Copy failed:", error);
        }
    };

    return (
        <>
            <section className="content-wrap key-feature-page">
                <div className="kf-header-card">
                    <div>
                        <span className="kf-case-badge">CASE {caseId}</span>
                        <h1>Review generated key features</h1>
                        <p>
                            The input step is complete. Review the extracted features, optionally check
                            key strings, then continue to results.
                        </p>
                    </div>

                    <button type="button" className="kf-start-btn" onClick={onStartAnotherCase}>
                        <span>↪</span> Start New Analysis
                    </button>
                </div>

                <div className="kf-section-head">
                    <div>
                        <h2>Key Features</h2>
                        <p>These features will be used for all selected outputs.</p>
                    </div>

                    <button
                        type="button"
                        className="kf-edit-btn"
                        onClick={() => setIsEditingFeatures((prev) => !prev)}
                    >
                        ✎ {isEditingFeatures ? "Save Features" : "Edit Features"}
                    </button>
                </div>

                <div className="kf-feature-grid">
                    <FeatureList
                        title="Primary Features"
                        items={primaryFeatures}
                        variant="primary"
                        isEditing={isEditingFeatures}
                        onChange={updatePrimaryFeature}
                    />

                    <FeatureList
                        title="Secondary Features"
                        items={secondaryFeatures}
                        variant="secondary"
                        isEditing={isEditingFeatures}
                        onChange={updateSecondaryFeature}
                    />
                </div>

                <button
                    type="button"
                    className="kf-advance-toggle"
                    onClick={() => setShowAdvanced((prev) => !prev)}
                >
                    <span className={`kf-switch ${showAdvanced ? "is-on" : ""}`}>
                        <i />
                    </span>
                    <strong>Advance Search</strong>
                </button>

                {showAdvanced && (
                    <div className="kf-strings-area">
                        <div className="kf-section-head compact">
                            <div>
                                <h2>Key Strings</h2>
                                <p>
                                    Optional: review and edit patent search queries before running Patent Search.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="kf-copy-all-btn"
                                onClick={() => copyText(allKeyStringsText)}
                            >
                                ⧉ Copy All
                            </button>
                        </div>

                        <div className="kf-strings-grid">
                            {keyStrings.map((item, index) => (
                                <KeyStringCard
                                    key={`${item.title}-${index}`}
                                    item={item}
                                    index={index}
                                    onCopy={copyText}
                                    onEdit={setEditingKeyStringIndex}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="kf-ready-box">
                    <div>
                        <h3>Key features are ready</h3>
                        <p>
                            Continue to results to review patent search, publications, products, drafts,
                            downloads, and Barcode Comments.
                        </p>
                    </div>

                    <button type="button" onClick={onProceed}>
                        › Proceed
                    </button>
                </div>
            </section>

            <KeyStringEditModal
                open={editingKeyStringIndex !== null}
                item={activeKeyString}
                index={editingKeyStringIndex || 0}
                onClose={() => setEditingKeyStringIndex(null)}
                onUpdate={updateKeyString}
            />
        </>
    );
}

export default memo(GeneratedKeyFeatures);

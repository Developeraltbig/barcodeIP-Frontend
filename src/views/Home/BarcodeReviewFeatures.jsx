import React, { useEffect, useMemo, useState } from "react";
import "./BarcodeReviewFeatures.css";

const primaryFeatures = [
    "A clamp configured for tapping power from a bare aluminium overhead power line while connecting to a copper service entry conductor.",
    "A clamp body shaped to hook onto, seat against, and remain positioned on an overhead live conductor before final tightening.",
    "A composition or terminal interface that supports connection between aluminium overhead conductors and copper service entry conductors.",
    "A screw, bolt, pressure plate, or equivalent tightening member fixes the clamp to the live conductor after placement.",
    "A mating interface allows an installation tool to hold, tighten, release, or detach from the clamp after mounting.",
];

const secondaryFeatures = [
    "An elongated electrically insulated tool allows an operator to work safely from ground level or at a distance from live components.",
    "The distal end of the tool includes an adapter that mates with the clamp during lifting, tightening, and installation.",
    "The tool can disengage from the clamp once the clamp is securely fixed on the overhead power line.",
    "The clamp geometry can accommodate multiple conductor or cable diameters through shaped jaws or adjustable pressure areas.",
    "Material selection and surface design reduce galvanic corrosion and outdoor degradation in power distribution environments.",
];

const initialKeyStrings = [
    {
        id: 1,
        label: "Broad",
        title: "Broad conductor clamp search",
        query:
            "(clamp OR connector OR tap OR fitting) AND (screw OR bolt OR fastener OR thread*) AND (tool OR stick OR pole OR rod) AND (insulat* OR insulated) AND (overhead OR aerial) AND (conductor OR line)",
    },
    {
        id: 2,
        label: "Problem-focused",
        title: "Live-line installation search",
        query:
            "(install* OR mount* OR attach*) AND (clamp OR connector OR tap) AND (live line OR hot line OR energized OR under load) AND (tool OR stick OR hot stick) AND (remote OR from the ground)",
    },
    {
        id: 3,
        label: "Narrow",
        title: "Bimetal novelty search",
        query:
            "(hot tap OR live tap OR hot line clamp) AND (bimetallic OR bi-metal OR dissimilar metal) AND (aluminium OR aluminum) AND (copper) AND (conductor OR cable OR line)",
    },
    {
        id: 4,
        label: "Feature-focused",
        title: "Tool adapter search",
        query:
            "(clamp OR connector OR terminal OR tap OR stirrup) AND (bimetal* OR dissimilar metal OR copper-aluminium) AND (overhead line OR power line) AND (tool OR hot stick OR live line tool OR pole OR apparatus)",
    },
    {
        id: 5,
        label: "Workflow",
        title: "Ground-level installation search",
        query:
            "(overhead conductor connector) AND (ground level installation OR remote installation OR insulated pole) AND (live line maintenance OR energized distribution)",
    },
    {
        id: 6,
        label: "Material",
        title: "Material compatibility search",
        query:
            "(aluminium copper connector OR aluminum copper clamp) AND (galvanic corrosion OR bimetal interface OR service tap) AND (overhead distribution)",
    },
    {
        id: 7,
        label: "Feature-focused",
        title: "Clamp geometry search",
        query:
            "(hook shaped clamp OR C shaped clamp OR jaw clamp) AND (overhead conductor) AND (tightening screw OR pressure plate OR threaded fastener)",
    },
    {
        id: 8,
        label: "Tool-focused",
        title: "Hot-stick compatibility search",
        query:
            "(hot stick compatible clamp OR shotgun stick clamp OR grip-all clamp) AND (distribution line OR live line OR overhead power)",
    },
    {
        id: 9,
        label: "Strict",
        title: "Claims-only strict search",
        query:
            "(claim:clamp AND claim:overhead AND claim:conductor AND claim:tightening AND claim:insulated tool) AND (aluminium OR aluminum OR copper OR bimetallic)",
    },
];

function BarcodeReviewFeatures() {
    const [keyStrings, setKeyStrings] = useState(initialKeyStrings);
    const [editingKey, setEditingKey] = useState(null);

    const activeKeyString = useMemo(() => {
        if (!editingKey) return null;
        return keyStrings.find((item) => item.id === editingKey.id);
    }, [editingKey, keyStrings]);

    const openModal = (item) => {
        setEditingKey({
            ...item,
            dateRange: "Priority",
            startDate: "",
            endDate: "",
            inventor: "",
            assignee: "",
            patentOffice: "Patent Office",
            language: "Language",
            status: "Status",
            type: "Type",
            litigation: "Litigation",
        });
    };

    const closeModal = () => setEditingKey(null);

    const updateEditingValue = (field, value) => {
        setEditingKey((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleUpdate = () => {
        setKeyStrings((prev) =>
            prev.map((item) =>
                item.id === editingKey.id
                    ? {
                        ...item,
                        query: editingKey.query,
                        title: editingKey.title,
                        label: editingKey.label,
                    }
                    : item
            )
        );

        closeModal();
    };

    const copyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            console.log("Clipboard copy failed");
        }
    };

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") closeModal();
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    return (
        <div className="barcode-review-page">
            <Sidebar />

            <main className="review-main">
                <Topbar />

                <section className="review-shell">
                    <div className="review-card">
                        <div className="review-header">
                            <div>
                                <span className="case-pill">CASE 016</span>
                                <h1>Review generated key features</h1>
                                <p>
                                    The input step is complete. Review the extracted features,
                                    optionally check key strings, then continue to results.
                                </p>
                            </div>

                            <button className="start-case-btn">
                                <span>←</span>
                                Start another case
                            </button>
                        </div>

                        <div className="divider" />

                        <section className="features-section">
                            <div className="section-title-row">
                                <div>
                                    <h2>Key Features</h2>
                                    <p>These features will be used for all selected outputs.</p>
                                </div>

                                <button className="edit-features-btn">
                                    <span>✎</span>
                                    Edit Features
                                </button>
                            </div>

                            <div className="feature-columns">
                                <FeaturePanel
                                    type="primary"
                                    title="Primary Features"
                                    count={5}
                                    items={primaryFeatures}
                                />

                                <FeaturePanel
                                    type="secondary"
                                    title="Secondary Features"
                                    count={5}
                                    items={secondaryFeatures}
                                />
                            </div>
                        </section>

                        <button className="advanced-search">
                            <span className="advanced-arrow">⌄</span>
                            <span>
                                <strong>Advanced Search</strong>
                                <small>
                                    Optional: review and edit patent search queries before running
                                    Patent Search.
                                </small>
                            </span>
                            <em>9 Key Strings</em>
                        </button>

                        <section className="key-string-section">
                            <div className="key-string-header">
                                <div>
                                    <h2>Key Strings</h2>
                                    <p>
                                        Optional: review and edit patent search queries before
                                        running Patent Search.
                                    </p>
                                </div>

                                <button
                                    className="copy-all-btn"
                                    onClick={() =>
                                        copyText(keyStrings.map((item) => item.query).join("\n\n"))
                                    }
                                >
                                    <span>▣</span>
                                    Copy All
                                </button>
                            </div>

                            <div className="key-string-grid">
                                {keyStrings.map((item) => (
                                    <KeyStringCard
                                        key={item.id}
                                        item={item}
                                        onEdit={() => openModal(item)}
                                        onCopy={() => copyText(item.query)}
                                    />
                                ))}
                            </div>
                        </section>

                        <div className="ready-bar">
                            <div>
                                <h3>Key features are ready</h3>
                                <p>
                                    Continue to results to review patent search, publications,
                                    products, drafts, downloads, and Barcode Comments.
                                </p>
                            </div>

                            <button>
                                <span>›</span>
                                Proceed
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {editingKey && (
                <EditKeyStringModal
                    keyString={editingKey}
                    activeKeyString={activeKeyString}
                    onChange={updateEditingValue}
                    onClose={closeModal}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
}

function Sidebar() {
    return (
        <aside className="review-sidebar">
            <div className="review-brand">
                <div className="review-brand-icon">b</div>
                <div className="review-brand-name">
                    barcode<span>IP.</span>
                </div>
                <button className="review-menu-btn">☰</button>
            </div>

            <nav className="review-nav">
                <button className="review-nav-item active">
                    <span>✣</span>
                    New Case
                </button>

                <button className="review-nav-item">
                    <span>▦</span>
                    My Projects
                </button>

                <button className="review-nav-item">
                    <span>▤</span>
                    Barcode Comments
                    <strong>1</strong>
                </button>

                <button className="review-nav-item">
                    <span>⇩</span>
                    Downloads
                </button>
            </nav>

            <div className="review-sidebar-footer">
                <button>1 Comments Ready</button>
            </div>
        </aside>
    );
}

function Topbar() {
    return (
        <header className="review-topbar">
            <div />

            <button className="review-profile-btn">
                <span className="review-profile-avatar">♙</span>
                <span>Developeraltbig</span>
                <span className="review-profile-arrow">⌄</span>
            </button>
        </header>
    );
}

function FeaturePanel({ type, title, count, items }) {
    return (
        <div className={`feature-panel ${type}`}>
            <div className="feature-panel-header">
                <h3>{title}</h3>
                <span>{count}</span>
            </div>

            <div className="feature-list">
                {items.map((item, index) => (
                    <div className="feature-item" key={index}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <p>{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function KeyStringCard({ item, onEdit, onCopy }) {
    return (
        <article className="key-string-card">
            <div className="key-card-top">
                <span>KEY STRING {String(item.id).padStart(2, "0")}</span>
                <em className={item.label === "Strict" ? "strict" : ""}>
                    {item.label}
                </em>
            </div>

            <h3>{item.title}</h3>

            <div className="query-box">{item.query}</div>

            <div className="key-actions">
                <button onClick={onCopy}>
                    <span>▣</span>
                    Copy
                </button>

                <button onClick={onEdit}>
                    <span>✎</span>
                    Edit
                </button>
            </div>
        </article>
    );
}

function EditKeyStringModal({
    keyString,
    activeKeyString,
    onChange,
    onClose,
    onUpdate,
}) {
    return (
        <div className="modal-layer" onMouseDown={onClose}>
            <div className="edit-modal" onMouseDown={(event) => event.stopPropagation()}>
                <div className="edit-modal-header">
                    <div className="modal-title-wrap">
                        <span className="modal-edit-icon">✎</span>

                        <div>
                            <h2>Edit Key String {String(keyString.id).padStart(2, "0")}</h2>
                            <p>
                                Update this search query and optional filters before Patent
                                Search.
                            </p>
                        </div>
                    </div>

                    <button className="modal-close" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="modal-body">
                    <div className="form-group full">
                        <label>Date Range</label>
                        <select
                            value={keyString.dateRange}
                            onChange={(e) => onChange("dateRange", e.target.value)}
                        >
                            <option>Priority</option>
                            <option>Publication</option>
                            <option>Filing</option>
                        </select>
                    </div>

                    <div className="form-grid two">
                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="date"
                                value={keyString.startDate}
                                onChange={(e) => onChange("startDate", e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>End Date</label>
                            <input
                                type="date"
                                value={keyString.endDate}
                                onChange={(e) => onChange("endDate", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group full">
                        <label>Key String</label>
                        <textarea
                            value={keyString.query}
                            onChange={(e) => onChange("query", e.target.value)}
                        />
                    </div>

                    <div className="form-grid with-plus">
                        <div className="form-group">
                            <label>Inventor</label>
                            <input
                                value={keyString.inventor}
                                onChange={(e) => onChange("inventor", e.target.value)}
                                placeholder="Inventor"
                            />
                        </div>

                        <button className="small-plus-btn">+</button>

                        <div className="form-group">
                            <label>Assignee</label>
                            <input
                                value={keyString.assignee}
                                onChange={(e) => onChange("assignee", e.target.value)}
                                placeholder="Assignee"
                            />
                        </div>

                        <button className="small-plus-btn">+</button>
                    </div>

                    <div className="form-group full">
                        <label>Patent Office</label>
                        <select
                            value={keyString.patentOffice}
                            onChange={(e) => onChange("patentOffice", e.target.value)}
                        >
                            <option>Patent Office</option>
                            <option>USPTO</option>
                            <option>EPO</option>
                            <option>WIPO</option>
                            <option>IPO India</option>
                        </select>
                    </div>

                    <div className="form-grid two">
                        <div className="form-group">
                            <label>Language</label>
                            <select
                                value={keyString.language}
                                onChange={(e) => onChange("language", e.target.value)}
                            >
                                <option>Language</option>
                                <option>English</option>
                                <option>German</option>
                                <option>French</option>
                                <option>Japanese</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select
                                value={keyString.status}
                                onChange={(e) => onChange("status", e.target.value)}
                            >
                                <option>Status</option>
                                <option>Granted</option>
                                <option>Application</option>
                                <option>Expired</option>
                                <option>Active</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Type</label>
                            <select
                                value={keyString.type}
                                onChange={(e) => onChange("type", e.target.value)}
                            >
                                <option>Type</option>
                                <option>Patent</option>
                                <option>Utility Model</option>
                                <option>Design</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Litigation</label>
                            <select
                                value={keyString.litigation}
                                onChange={(e) => onChange("litigation", e.target.value)}
                            >
                                <option>Litigation</option>
                                <option>Included</option>
                                <option>Excluded</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>

                    <button className="update-btn" onClick={onUpdate}>
                        <span>✓</span>
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BarcodeReviewFeatures;
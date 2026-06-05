import React from "react";
import "./LandingPage.css";

const navLinks = ["Platform", "Search", "Drafts", "Pricing"];

const featureGroups = [
    {
        title: "Problem Features",
        items: [
            "Device overheating during continuous operation.",
            "User cannot identify failed components quickly.",
            "Existing solutions require manual inspection.",
            "Current systems do not generate structured IP outputs."
        ]
    },
    {
        title: "Invention Features",
        items: [
            "Automatic feature extraction from invention text.",
            "Structured patent-search ready feature list.",
            "Draft sections generated from reviewed features.",
            "Reusable case workspace for reports and comments."
        ]
    }
];

const outputCards = [
    "Patent Search",
    "Publication Search",
    "Product Comparison",
    "Provisional Draft",
    "Non-Provisional Draft"
];

const searchRows = [
    { title: "Automatic feature extraction", score: "92" },
    { title: "Patent-ready invention mapping", score: "78" },
    { title: "Structured claim-support sections", score: "71" }
];

const testimonials = [
    {
        name: "Amit R.",
        role: "Founder",
        text: "Oolto helped us convert our rough invention notes into a cleaner review-ready case."
    },
    {
        name: "Neha S.",
        role: "IP Consultant",
        text: "The structured feature flow makes it easier to review invention inputs before drafting."
    },
    {
        name: "Rahul M.",
        role: "Product Lead",
        text: "Useful for early patent search, product comparison, and draft planning."
    }
];

function LandingPage() {
    return (
        <main className="landing-page">
            <header className="landing-header">
                <a href="#home" className="landing-logo" aria-label="Oolto home">
                    ∞
                </a>

                <nav className="landing-nav" aria-label="Landing navigation">
                    {navLinks.map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`}>
                            {item}
                        </a>
                    ))}
                </nav>

                <button className="landing-header-btn" type="button">
                    Start now
                </button>
            </header>

            <section id="home" className="landing-hero">
                <div className="landing-hero-inner">
                    <span className="eyebrow">Built for inventors, teams, and IP workflows</span>

                    <h1>
                        Turn one invention into a <br />
                        structured IP case.
                    </h1>

                    <p>
                        Oolto helps you organize invention text, identify key features, run
                        patent-focused search, compare products, and prepare draft-ready sections.
                    </p>

                    <div className="hero-actions">
                        <button className="primary-btn" type="button">
                            Start a case
                        </button>
                        <button className="secondary-btn" type="button">
                            View workflow
                        </button>
                    </div>

                    <div className="hero-preview">
                        <MiniSidebar />
                        <div className="preview-main">
                            <div className="preview-title-row">
                                <div>
                                    <h3>Describe your invention</h3>
                                    <span>Select the outputs you want Oolto to generate.</span>
                                </div>
                                <button type="button">Generate</button>
                            </div>

                            <div className="preview-textarea" />

                            <div className="preview-output-grid">
                                {outputCards.map((item) => (
                                    <div key={item} className="preview-output-card">
                                        <span />
                                        <strong>{item}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="landing-section clear-structure-section">
                <SectionHead
                    title="Every result starts with a clear invention structure"
                    text="Oolto first converts messy invention text into a cleaner feature structure that your team can review before reports are created."
                />

                <div className="feature-board">
                    <div className="feature-board-head">
                        <span>Key Features</span>
                        <button type="button">Edit Features</button>
                    </div>

                    <div className="feature-columns">
                        {featureGroups.map((group) => (
                            <div key={group.title} className="feature-column">
                                <h3>{group.title}</h3>

                                {group.items.map((item, index) => (
                                    <div key={item} className="feature-item">
                                        <span>{index + 1}</span>
                                        <p>{item}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="output-strip">
                        {outputCards.map((item) => (
                            <div key={item}>
                                <span>▧</span>
                                <strong>{item}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="search" className="landing-section patent-search-section">
                <SectionHead
                    title="Patent search built for review, not just result lists."
                    text="Search outputs are organized around invention features, references, and review-friendly relevance signals."
                    center
                />

                <div className="search-layout">
                    <div className="search-filters">
                        {["Target Features", "Technical Keywords", "Prior Art Signals", "Search History", "Citations"].map(
                            (item) => (
                                <div key={item} className="search-filter-card">
                                    <span>↗</span>
                                    <div>
                                        <strong>{item}</strong>
                                        <p>Structured information used for better review.</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <div className="search-results">
                        {searchRows.map((item, index) => (
                            <div key={item.title} className="search-result-row">
                                <div className="result-rank">{index + 1}</div>

                                <div className="result-content">
                                    <span>Patent reference</span>
                                    <h4>{item.title}</h4>
                                    <p>
                                        Short mapping explanation showing why this reference may be
                                        relevant to the selected invention features.
                                    </p>
                                </div>

                                <div className="result-score">
                                    <strong>{item.score}</strong>
                                    <span>Score</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="drafts" className="landing-section draft-section">
                <div className="split-layout">
                    <div>
                        <span className="eyebrow">Draft-ready workflow</span>
                        <h2>Move from invention text to draft-ready sections.</h2>
                        <p>
                            Review key features first, then generate patent search, product comparison,
                            provisional draft sections, or non-provisional draft sections.
                        </p>

                        <div className="mini-check-grid">
                            {["Feature Review", "Patent Search", "Publication Search", "Product Compare"].map(
                                (item) => (
                                    <div key={item}>
                                        <span>✓</span>
                                        {item}
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <div className="draft-card">
                        <div className="draft-card-head">
                            <strong>Generate Draft Sections</strong>
                            <span>●</span>
                        </div>

                        <div className="draft-fields">
                            <span />
                            <span />
                            <span />
                        </div>

                        <div className="draft-pills">
                            {["Summary", "Claims", "Abstract", "Description"].map((item) => (
                                <span key={item}>{item}</span>
                            ))}
                        </div>

                        <button type="button">Generate Draft</button>
                    </div>
                </div>
            </section>

            <section className="landing-section messy-section">
                <div className="split-layout reverse">
                    <div>
                        <span className="eyebrow">Clean start</span>
                        <h2>Invention work usually starts messy.</h2>
                        <p>
                            Oolto gives your team a cleaner place to capture ideas, classify
                            invention features, and decide which output should be generated next.
                        </p>

                        <div className="simple-card-list">
                            <div>
                                <strong>1. Invention input</strong>
                                <p>Add the rough invention description.</p>
                            </div>
                            <div>
                                <strong>2. Feature review</strong>
                                <p>Review generated key features before outputs.</p>
                            </div>
                            <div>
                                <strong>3. Team comments</strong>
                                <p>Request review and collect comments in one case.</p>
                            </div>
                        </div>
                    </div>

                    <div className="messy-mockup">
                        <div className="sticky-note one">problem</div>
                        <div className="sticky-note two">feature</div>
                        <div className="mini-table">
                            {["Patent Search", "Publication Search", "Draft"].map((item) => (
                                <div key={item}>
                                    <span>{item}</span>
                                    <strong>Ready</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="pricing" className="landing-section pricing-section">
                <div className="pricing-copy">
                    <h2>Simple pricing for every invention case.</h2>
                    <p>
                        Create a structured IP case and add the outputs your workflow needs.
                    </p>
                </div>

                <div className="price-card">
                    <span className="eyebrow">Starter case</span>
                    <h3>$25</h3>
                    <p>per invention case</p>

                    <div className="price-options">
                        {["Patent Search", "Publication Search", "Product Comparison", "Draft Sections"].map(
                            (item) => (
                                <div key={item}>
                                    <span>✓</span>
                                    {item}
                                </div>
                            )
                        )}
                    </div>

                    <button type="button">Get Started</button>
                </div>

                <div className="pricing-note-card">
                    <strong>Need more?</strong>
                    <p>Use add-ons for deeper search, attorney review, or draft support.</p>
                </div>
            </section>

            <section className="landing-section market-section">
                <div className="market-grid">
                    <div className="publication-card">
                        <h3>Publication Search</h3>

                        {[1, 2, 3].map((item) => (
                            <div key={item} className="publication-row">
                                <span>{item}</span>
                                <p>Relevant technical publication result with short reason.</p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2>See the market, not only the patent database.</h2>
                        <p>
                            Compare products and public references to understand where the invention
                            may connect with real market activity.
                        </p>

                        <div className="product-list">
                            {["Product cooling system", "Smart hand tool reference", "Sensor monitoring setup"].map(
                                (item, index) => (
                                    <div key={item} className="product-row">
                                        <div>{index + 1}</div>
                                        <div className="product-thumb" />
                                        <div>
                                            <strong>{item}</strong>
                                            <span>Product comparison summary</span>
                                        </div>
                                        <b>{[92, 78, 71][index]}</b>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="landing-section testimonial-section">
                <SectionHead
                    title="Why innovators choose Oolto"
                    text="A clean workspace for invention review, patent search, drafting, and team comments."
                    center
                />

                <div className="testimonial-grid">
                    {testimonials.map((item) => (
                        <article key={item.name} className="testimonial-card">
                            <div className="quote-mark">“</div>
                            <p>{item.text}</p>
                            <div>
                                <strong>{item.name}</strong>
                                <span>{item.role}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="landing-section reports-section">
                <div className="report-tile-grid">
                    {["Patent Search", "Publication Search", "Product Compare", "Draft Sections", "Team Comments", "Downloads"].map(
                        (item) => (
                            <div key={item}>
                                <span>▢</span>
                                <strong>{item}</strong>
                            </div>
                        )
                    )}
                </div>

                <div className="report-copy">
                    <h2>Creates reports your team can actually use.</h2>
                    <p>
                        Each output is organized for review, sharing, and follow-up action.
                    </p>
                </div>
            </section>

            <section className="landing-section contact-section">
                <div className="contact-copy">
                    <h2>Let’s talk about your invention work.</h2>
                    <p>
                        Tell us what your team needs and we’ll help you set up the right workflow.
                    </p>

                    <div className="contact-points">
                        <span>📍 Remote IP workflow support</span>
                        <span>✉️ team@oolto.com</span>
                        <span>☎️ +91 00000 00000</span>
                    </div>
                </div>

                <form className="contact-form">
                    <h3>Send your requirement</h3>

                    <div className="contact-two-grid">
                        <input placeholder="Name" />
                        <input placeholder="Email" />
                    </div>

                    <input placeholder="Phone" />
                    <textarea placeholder="Message" />

                    <button type="button">Submit</button>
                </form>
            </section>

            <footer className="landing-footer">
                <div>
                    <div className="footer-logo">∞</div>
                    <p>Oolto helps convert invention ideas into structured IP workflows.</p>
                </div>

                <div className="footer-links">
                    <a href="#home">Home</a>
                    <a href="#search">Search</a>
                    <a href="#pricing">Pricing</a>
                </div>
            </footer>
        </main>
    );
}

function SectionHead({ title, text, center = false }) {
    return (
        <div className={center ? "section-head center" : "section-head"}>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    );
}

function MiniSidebar() {
    return (
        <aside className="preview-sidebar">
            <div className="preview-brand">
                <span>barcode</span>IP.
            </div>

            {["New Case", "My Projects", "Comments", "Downloads"].map((item, index) => (
                <div key={item} className={index === 0 ? "preview-nav active" : "preview-nav"}>
                    <span />
                    {item}
                </div>
            ))}
        </aside>
    );
}

export default LandingPage;
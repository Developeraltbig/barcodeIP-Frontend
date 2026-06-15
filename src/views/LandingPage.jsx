import React from "react";
import "./LandingPage.css";
import background1 from "../assets/landingPage/Background1.jpg";
import background from "../assets/landingPage/Background.png";
import logo from "../assets/landingPage/logo.jpg";
import background2ndSection from "../assets/landingPage/section2-Background.jpg";
import background3rdSection from "../assets/landingPage/section3-Background.png";




const navLinks = ["How it works", "Output", "Pricing", "Who it's for"];

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

            <section id="home" className="landing-hero" style={{
                backgroundImage: `url(${background1})`,

            }}>
                <header className="landing-header">
                    <a href="#home" className="landing-logo" aria-label="Oolto home">
                        <img src={logo} alt="Logo Feature" />
                    </a>

                    <nav className="landing-nav" aria-label="Landing navigation">
                        {navLinks.map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`}>
                                {item}
                            </a>
                        ))}
                    </nav>

                    <button className="landing-header-btn" type="button">
                        Start New Case
                    </button>
                </header>
                <div className="landing-hero-inner">

                    <h1>
                        Turn one invention into a <br />
                        structured IP case.
                    </h1>

                    <p>
                        Enter your invention once. Oolto helps organize the idea, search relevant references, compare related products, and prepare reports and draft-ready sections.
                    </p>

                    <div className="hero-actions">
                        <button className="primary-btn" type="button">
                            Get Started
                        </button>
                        <button className="secondary-btn" type="button">
                            See how it works
                        </button>
                    </div>
                    <p>
                        $20 per invention case. All selected outputs included.
                    </p>
                </div>
                {/* New image container placed right after the section closes */}
                <div className="hero-bg-image-wrapper">
                    <img src={background} alt="Background Feature" />
                </div>
            </section>

            {/* 2nd Section */}
            <div className="section-2nd">
                {/* 1. Main Content Split Section */}
                <section className="messy-inputs-section">
                    {/* Left Side: Content Column */}
                    <div className="section-content-left">
                        <h2 className="section-title">
                            Invention work usually <br /> starts messy.
                        </h2>
                        <p className="section-description">
                            Most teams start with notes, emails, PDFs, or rough technical descriptions.
                            The hard part is turning that into something searchable, reviewable, and shareable.
                        </p>

                        {/* Feature Cards Group */}
                        <div className="feature-cards-container">
                            <div className="feature-card">
                                <div className="card-icon">🔍</div>
                                <div className="card-text">
                                    <h3>Scattered searching</h3>
                                    <p>Patent, publication, and product checks happen in different places.</p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="card-icon">🔀</div>
                                <div className="card-text">
                                    <h3>Unclear features</h3>
                                    <p>If the invention is not structured, every report becomes harder to review.</p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="card-icon">📤</div>
                                <div className="card-text">
                                    <h3>Hard-to-share outputs</h3>
                                    <p>Teams need clean reports, mapped evidence, and editable drafts.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Image Column */}
                    <div className="section-image-right">
                        <div className="dashboard-mockup-container">
                            <img src={background2ndSection} alt="Invention Workflow Mockup" className="mockup-img" />
                        </div>
                    </div>
                </section>

                {/* 2. New Content Workflow Bar (Steps 1-4) */}
                <div className="workflow-bar-container">
                    <div className="workflow-intro">
                        <span className="workflow-eyebrow">Start simple</span>
                        <h3 className="workflow-title">Reveal detail only <br /> when needed.</h3>
                    </div>

                    <div className="workflow-steps">
                        <div className="workflow-step">
                            <div className="step-badge">
                                <span className="step-icon">💡</span>
                                <span className="step-number">1</span>
                            </div>
                            <h4>Describe the invention</h4>
                            <p>Paste the idea in plain English.</p>
                        </div>

                        <div className="workflow-step">
                            <div className="step-badge">
                                <span className="step-icon">📋</span>
                                <span className="step-number">2</span>
                            </div>
                            <h4>Review the features</h4>
                            <p>See the extracted invention structure.</p>
                        </div>

                        <div className="workflow-step">
                            <div className="step-badge">
                                <span className="step-icon">📥</span>
                                <span className="step-number">3</span>
                            </div>
                            <h4>Choose outputs</h4>
                            <p>Run search, comparison, drafts, or all.</p>
                        </div>

                        <div className="workflow-step">
                            <div className="step-badge">
                                <span className="step-icon">📁</span>
                                <span className="step-number">4</span>
                            </div>
                            <h4>Open the case</h4>
                            <p>Review results, download, reports, or share.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3rd Section */}
            <section className="structure-section-dark">
                {/* Explicit layout container to match screenshot rows */}
                <div className="structure-layout-container">

                    {/* ROW 1: Content Left, Tall Non-Provisional Card Right */}
                    <div className="structure-row-top">
                        <div className="structure-header-left">
                            <h2 className="structure-title-dark">
                                Every result starts with a clear invention structure
                            </h2>
                            <p className="structure-description-dark">
                                Before creating reports, Oolto identifies the important technical features in your invention.
                                You can review and edit them before moving ahead.
                            </p>
                        </div>

                        <div className="action-card-item tall-card">
                            <div className="action-card-icon">👤</div>
                            <h3>Non-Provisional Draft</h3>
                            <p>Create a non-provisional patent application.</p>
                        </div>
                    </div>

                    {/* ROW 2: The 4 horizontal cards side-by-side */}
                    <div className="structure-row-bottom-four">
                        <div className="action-card-item">
                            <div className="action-card-icon">📄</div>
                            <h3>Patent Search</h3>
                            <p>Find relevant patents.</p>
                        </div>

                        <div className="action-card-item">
                            <div className="action-card-icon">💻</div>
                            <h3>Publication Search</h3>
                            <p>Find relevant publications.</p>
                        </div>

                        <div className="action-card-item">
                            <div className="action-card-icon">📦</div>
                            <h3>Product Comparison</h3>
                            <p>Compare products and key features.</p>
                        </div>

                        <div className="action-card-item">
                            <div className="action-card-icon">✍️</div>
                            <h3>Provisional Draft</h3>
                            <p>Create a provisional patent application.</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Dashboard Table Image */}
                <div className="structure-dashboard-preview">
                    <img src={background3rdSection} alt="Key Features Structure Dashboard" className="dashboard-preview-img" />
                </div>
            </section>

            {/* 4th Section */}
            <section className="pricing-section">
                <div className="pricing-max-container">

                    {/* LEFT COLUMN: Heading & Info */}
                    <div className="pricing-content-left">
                        <h2 className="pricing-title">
                            Simple pricing for <br /> every invention <br /> case.
                        </h2>
                        <p className="pricing-subtitle">
                            One submitted invention uses one invention credit. One credit costs $25 and includes all selected outputs for that case.
                        </p>
                    </div>

                    {/* MIDDLE COLUMN: Main Featured Pricing Card */}
                    <div className="pricing-main-card">
                        <span className="card-badge-title">Invention Credit</span>
                        <div className="card-price">$25</div>
                        <span className="card-price-subtext">per submitted invention</span>

                        {/* The Equation/Formula Bar Component */}
                        <div className="pricing-formula-bar">
                            <div className="formula-item">
                                <span className="formula-circle">1</span>
                                <span className="formula-label">invention</span>
                            </div>
                            <span className="formula-operator">=</span>
                            <div className="formula-item">
                                <span className="formula-circle">1</span>
                                <span className="formula-label">project</span>
                            </div>
                            <span className="formula-operator">=</span>
                            <div className="formula-item bold-price">$25</div>
                            <span className="formula-operator">=</span>
                            <div className="formula-item">
                                <span className="formula-check-circle">✓</span>
                                <span className="formula-label">all selected outputs</span>
                            </div>
                        </div>

                        {/* Two-Column Features Grid inside the Card */}
                        <div className="card-features-list">
                            <div className="feature-check-item">
                                <span className="check-icon">✓</span> Key Features
                            </div>
                            <div className="feature-check-item">
                                <span className="check-icon">✓</span> Provisional Draft
                            </div>
                            <div className="feature-check-item">
                                <span className="check-icon">✓</span> Patent Search
                            </div>
                            <div className="feature-check-item">
                                <span className="check-icon">✓</span> Non-Provisional Draft
                            </div>
                            <div className="feature-check-item">
                                <span className="check-icon">✓</span> Publication Search
                            </div>
                            <div className="feature-check-item">
                                <span className="check-icon">✓</span> Reports and downloads
                            </div>
                            <div className="feature-check-item">
                                <span className="check-icon">✓</span> Product Comparison
                            </div>
                            <div className="feature-check-item">
                                <span className="check-icon">✓</span> Attorney review request option
                            </div>
                        </div>

                        {/* Call to Action Button */}
                        <button className="pricing-cta-btn" type="button">
                            Get Started
                        </button>
                    </div>

                    {/* RIGHT COLUMN: Stacked Benefit Cards */}
                    <div className="pricing-benefits-right">
                        <div className="benefit-mini-card">
                            <div className="benefit-icon red-shield">🛡️</div>
                            <p><strong>Select one output or all outputs.</strong></p>
                            <p className="benefit-subtext">The same invention case still uses one project.</p>
                        </div>

                        <div className="benefit-mini-card">
                            <div className="benefit-icon red-arrow">➡️</div>
                            <h3>One case, all outputs</h3>
                            <p className="benefit-subtext">No per-module pricing.</p>
                        </div>
                    </div>

                </div>
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
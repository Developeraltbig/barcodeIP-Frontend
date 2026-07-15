import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";
import background1 from "../assets/landingPage/Background1.jpg";
import background from "../assets/landingPage/Background.png";
import logo from "../assets/landingPage/logo.svg";
import background2ndSection from "../assets/landingPage/section2nd-Background.jpg";
import edit2ndSection from "../assets/landingPage/icons/edit.svg";
import guidance2ndSection from "../assets/landingPage/icons/guidance.svg";
import pageSearch2ndSection from "../assets/landingPage/icons/page-search.svg";
import personEdit2ndSection from "../assets/landingPage/icons/person-edit.svg";
import productVarient2ndSection from "../assets/landingPage/icons/product-varient.svg";

import background3rdSection from "../assets/landingPage/section3rd.jpg";
import patentResult3rdSection from "../assets/landingPage/icons/patent-result.svg";
import topMapped3rdSection from "../assets/landingPage/icons/top-mapped.svg";
import viewMapped3rdSection from "../assets/landingPage/icons/view-mapping.svg";
import overlap3rdSection from "../assets/landingPage/icons/overlap-summary.svg";
import strictMode3rdSection from "../assets/landingPage/icons/strict-mode.svg";

import background4thSection from "../assets/landingPage/section4th.jpg";
import provisionalDraft4thSection from "../assets/landingPage/icons/provisional-draft.svg";
import titleField4thSection from "../assets/landingPage/icons/title-field.svg";
import backgroundSummary4thSection from "../assets/landingPage/icons/background-summary.svg";
import detailDescription4thSection from "../assets/landingPage/icons/detail-description.svg";
import advantageAbstract4thSection from "../assets/landingPage/icons/advantage-abstract.svg";
import nonprovisionalDraft4thSection from "../assets/landingPage/icons/non-provisional-draft.svg";
import draft4thSection from "../assets/landingPage/icons/draft-section.svg";
import representativeClaim4thSection from "../assets/landingPage/icons/representative-claim.svg";
import blockDiagram4thSection from "../assets/landingPage/icons/block-diagram.svg";
import flowChart4thSection from "../assets/landingPage/icons/flow-chart.svg";

import background5thSection from "../assets/landingPage/section5-Background.jpg";
import scatterSearching5thSection from "../assets/landingPage/icons/scatter-searching.svg";
import unclearFeature5thSection from "../assets/landingPage/icons/unclear-feature.svg";
import hardToShare5thSection from "../assets/landingPage/icons/hard-to-share-output.svg";
import describeInvention5thSection from "../assets/landingPage/icons/describe-invention.svg";
import reviewFeature5thSection from "../assets/landingPage/icons/reviewFeature.svg";
import chooseOutput5thSection from "../assets/landingPage/icons/choose-output.svg";
import openCase5thSection from "../assets/landingPage/icons/open-case.svg";

import invention16thSection from "../assets/landingPage/icons/invention1.svg";
import circleCheck6thSection from "../assets/landingPage/icons/circle-checked.svg";
import shieldCheck6thSection from "../assets/landingPage/icons/shield-check.svg";
import caseOutput6thSection from "../assets/landingPage/icons/case_output.svg";
import equal6thSection from "../assets/landingPage/icons/equal.svg";


import smartRecovery7thSection from "../assets/landingPage/smart_recovery.jpg";
import thermalGel7thSection from "../assets/landingPage/thermal_gel.jpg";
import wearable7thSection from "../assets/landingPage/wearable.jpg";
import one7thSection from "../assets/landingPage/icons/1.svg";
import two7thSection from "../assets/landingPage/icons/2.svg";
import three7thSection from "../assets/landingPage/icons/3.svg";
import seventyOne7thSection from "../assets/landingPage/icons/71.svg";
import seventyEight7thSection from "../assets/landingPage/icons/78.svg";
import nintyTwo7thSection from "../assets/landingPage/icons/92.svg";
import liveShare7thSection from "../assets/landingPage/icons/live-share.svg";
import publishSearch7thSection from "../assets/landingPage/icons/publish_search.svg";
import draftOutline7thSection from "../assets/landingPage/icons/draft-outline.svg";
import showFeature7thSection from "../assets/landingPage/icons/show_feature.svg";
import amazon7thSection from "../assets/landingPage/icons/amazon.svg";

import left8thSection from "../assets/landingPage/section8th-left.jpg";
import right8thSection from "../assets/landingPage/section8th-right.jpg";
import starReview8thSection from "../assets/landingPage/icons/star_review.svg";
import personReview8thSection from "../assets/landingPage/icons/person_review.svg";

import bottom9thSection from '../assets/landingPage/section-nine.png'
import carbonReview8thSection from "../assets/landingPage/icons/carbon_review.svg";
import checkShield8thSection from "../assets/landingPage/icons/check-shield.svg";
import circleOne8thSection from "../assets/landingPage/icons/circle-one.svg";
import circleTwo8thSection from "../assets/landingPage/icons/circle-two.svg";
import circleThree8thSection from "../assets/landingPage/icons/circle-three.svg";
import circleFour8thSection from "../assets/landingPage/icons/circle-four.svg";
import circleFive8thSection from "../assets/landingPage/icons/circle-five.svg";
import NonDraftOutline8thSection from "../assets/landingPage/icons/non-draft-outline.svg";
import patentSearchReport8thSection from "../assets/landingPage/icons/patent-search-report.svg";
import provisionalDraft8thSection from "../assets/landingPage/icons/provisional-draft-icon.svg";
import reportFinance8thSection from "../assets/landingPage/icons/report-finance.svg";
import reportLibrary8thSection from "../assets/landingPage/icons/report-library.svg";

import footerLine10thSection from '../assets/landingPage/footer-line.png'
import footerLogo10thSection from "../assets/landingPage/icons/footer-logo.svg";
import footerRightArrow10thSection from "../assets/landingPage/icons/footer-rightArrow.svg";

import emailIconSection from "../assets/landingPage/icons/email-icon.svg";
import locationIconSection from "../assets/landingPage/icons/location-icon.svg";
import phoneIconSection from "../assets/landingPage/icons/phone-icon.svg";
import { toast } from "react-toastify";
import axios from "axios";



const navLinks = [
    {
        label: "How it works",
        id: "key-Feature"
    },
    {
        label: "Output",
        id: "search-section"
    },
    {
        label: "Pricing",
        id: "pricing"
    },
    {
        label: "Who it's for",
        id: "invention-messy"
    }
];


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
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        projectType: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const projectTypes = [
        "Patent Search",
        "Publication Search",
        "Product Search",
        "Provisional Draft",
        "Nonprovisional Draft",
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };


    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {
            newErrors.email = "Invalid email address";
        }

        if (!formData.number.trim()) {
            newErrors.number = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.number)) {
            newErrors.number = "Enter valid 10 digit phone number";
        }

        if (!formData.projectType) {
            newErrors.projectType = "Please select project type";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.length < 10) {
            newErrors.message = "Message should be at least 10 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        console.log('formData', formData);

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/v1/auth/contact",
                formData
            );
            console.log('response', response)
            if (response.data.success) {
                toast.success(response.data.message);

                setFormData({
                    name: "",
                    email: "",
                    number: "",
                    projectType: "",
                    message: "",
                });
            } else {
                toast.error("Kindly Contact Adminstration");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

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
                            <a key={item.id} href={`#${item.id}`}>
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <button className="landing-header-btn" type="button" onClick={() => navigate("/auth/login")}>
                        Sign In
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
                        <button className="primary-btn" type="button" onClick={() => navigate("/pages/auth/register")}>
                            Get Started
                        </button>
                        <button className="secondary-btn" type="button">
                            See how it works
                        </button>
                    </div>
                    <p>
                        $25 per invention case. All selected outputs included.
                    </p>
                </div>
                {/* New image container placed right after the section closes */}
                <div className="hero-bg-image-wrapper">
                    <img src={background} alt="Background Feature" />
                </div>
            </section>

            {/* 2nd Section */}
            <section id="key-Feature" className="structure-section-dark">
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
                    </div>
                </div>

                {/* Bottom Dashboard Table Image */}
                <div className="structure-dashboard-preview">
                    <img src={background2ndSection} alt="Key Features Structure Dashboard" className="dashboard-preview-img" />
                </div>

                {/* ROW 2: The 5 horizontal cards side-by-side */}
                <div className="structure-row-bottom-four">
                    <div className="action-card-item">
                        <div className="action-card-icon"><img src={pageSearch2ndSection} alt="page search" className="page-search-img" /></div>
                        <h3>Patent Search</h3>
                        <p>Find relevant patents.</p>
                    </div>

                    <div className="action-card-item">
                        <div className="action-card-icon"><img src={guidance2ndSection} alt="publication" className="publication-img" /></div>
                        <h3>Publication Search</h3>
                        <p>Find relevant publications.</p>
                    </div>

                    <div className="action-card-item">
                        <div className="action-card-icon"><img src={productVarient2ndSection} alt="product" className="product-img" /></div>
                        <h3>Product Comparison</h3>
                        <p>Compare products and key features.</p>
                    </div>

                    <div className="action-card-item">
                        <div className="action-card-icon"><img src={edit2ndSection} alt="edit" className="edit-img" /></div>
                        <h3>Provisional Draft</h3>
                        <p>Create a provisional patent application.</p>
                    </div>

                    <div className="action-card-item">
                        <div className="action-card-icon"><img src={personEdit2ndSection} alt="personEdit" className="personEdit-img" /></div>
                        <h3>Non-Provisional Draft</h3>
                        <p>Create a non-provisional patent application.</p>
                    </div>
                </div>
            </section>

            {/* 3rd Section */}

            <section id="search-section" className="review-search-section">
                <div className="review-max-container">

                    {/* TOP HEADER: Centered title and description stretching across full width */}
                    <div className="review-header-top">
                        <h2 className="review-title">
                            Patent search built for review, not just result lists.
                        </h2>
                        <p className="review-subtitle">
                            Oolto searches relevant patent references, ranks the results, prepares mapped comparisons, and creates a report that is easier to review.
                        </p>
                    </div>

                    {/* BOTTOM CONTENT GRID: Holds the left list stack and right image side-by-side */}
                    <div className="review-grid-body">

                        {/* LEFT COLUMN: Vertical Navigation Tabs Stack */}
                        <div className="review-tabs-left">
                            <div className="review-tab-item active">
                                <div className="tab-icon-wrap"><img src={patentResult3rdSection} alt="patent Result" className="page-search-img" /></div>
                                <div className="tab-text-wrap">
                                    <h3>Top Patent Results</h3>
                                    <p>Review a wider set of relevant references.</p>
                                </div>
                            </div>

                            <div className="review-tab-item">
                                <div className="tab-icon-wrap"><img src={topMapped3rdSection} alt="top mapped" className="page-search-img" /></div>
                                <div className="tab-text-wrap">
                                    <h3>Top Mapped Reference</h3>
                                    <p>Prepared for deeper review.</p>
                                </div>
                            </div>

                            <div className="review-tab-item">
                                <div className="tab-icon-wrap"><img src={viewMapped3rdSection} alt="view mapped" className="page-search-img" /></div>
                                <div className="tab-text-wrap">
                                    <h3>View Mapping</h3>
                                    <p>Compare invention features against patent evidence.</p>
                                </div>
                            </div>

                            <div className="review-tab-item">
                                <div className="tab-icon-wrap"><img src={overlap3rdSection} alt="overlap summary" className="page-search-img" /></div>
                                <div className="tab-text-wrap">
                                    <h3>Overlap Summary</h3>
                                    <p>Understand high, medium or low overlap at a glance.</p>
                                </div>
                            </div>

                            <div className="review-tab-item">
                                <div className="tab-icon-wrap"><img src={strictMode3rdSection} alt="strict mode" className="page-search-img" /></div>
                                <div className="tab-text-wrap">
                                    <h3>Strict Mode</h3>
                                    <p>Compare against patent claims only when needed.</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Mockup Image */}
                        <div className="review-image-right">
                            <img src={background3rdSection} alt="Patent Search Results Review List" className="review-mockup-img" />
                        </div>

                    </div>
                </div>
            </section>


            {/* 4th Section */}
            <section id="draft-ready-section" className="draft-ready-section">
                <div className="draft-max-container">

                    {/* LEFT COLUMN: Content + Sub-cards */}
                    <div className="draft-content-left">
                        <div className="draft-header-block">
                            <h2 className="draft-title">
                                Move from invention text <br /> to draft-ready sections.
                            </h2>
                            <p className="draft-subtitle">
                                Oolto can generate editable patent-style content from the same invention description and reviewed features.
                            </p>
                        </div>

                        {/* Sub-cards Container */}
                        <div className="draft-subcards-wrapper">
                            {/* Card 1 */}
                            <div className="draft-feature-card">
                                <div className="draft-card-header">
                                    <span className="draft-card-icon icon-orange"><img src={provisionalDraft4thSection} alt="provisional" className="page-search-img" /></span>
                                    <h3>Provisional Draft</h3>
                                </div>
                                <ul className="draft-card-list">
                                    <li><span className="list-bullet"><img src={titleField4thSection} alt="title" className="page-search-img" /></span> Title and field</li>
                                    <li><span className="list-bullet"><img src={backgroundSummary4thSection} alt="background summary" className="page-search-img" /></span> Background and summary</li>
                                    <li><span className="list-bullet"><img src={detailDescription4thSection} alt="detail description" className="page-search-img" /></span> Detailed description</li>
                                    <li><span className="list-bullet"><img src={advantageAbstract4thSection} alt="advantage Abstract" className="page-search-img" /></span> Advantages and abstract</li>
                                </ul>
                            </div>

                            {/* Card 2 */}
                            <div className="draft-feature-card">
                                <div className="draft-card-header">
                                    <span className="draft-card-icon icon-red"><img src={nonprovisionalDraft4thSection} alt="Non provisional" className="page-search-img" /></span>
                                    <h3>Non-Provisional Draft</h3>
                                </div>
                                <ul className="draft-card-list">
                                    <li><span className="list-bullet"><img src={draft4thSection} alt="draft section" className="page-search-img" /></span> Draft sections</li>
                                    <li><span className="list-bullet"><img src={representativeClaim4thSection} alt="representative claim" className="page-search-img" /></span> Representative claims</li>
                                    <li><span className="list-bullet"><img src={blockDiagram4thSection} alt="block diagram" className="page-search-img" /></span> Block diagram cards</li>
                                    <li><span className="list-bullet"><img src={flowChart4thSection} alt="flow chart" className="page-search-img" /></span> Flow chart cards</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Interactive Modal Mockup Image */}
                    <div className="draft-image-right">
                        <div className="draft-mockup-wrapper">
                            <img src={background4thSection} alt="Request Oolto Comments Panel" className="draft-mockup-img" />
                        </div>
                    </div>

                </div>
            </section>
            <hr />

            {/* 5th Section */}
            <div id="invention-messy" className="section-2nd">
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
                                <div className="card-icon"><img src={scatterSearching5thSection} alt="scatterSearch" className="page-search-img" /></div>
                                <div className="card-text">
                                    <h3>Scattered searching</h3>
                                    <p>Patent, publication, and product checks happen in different places.</p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="card-icon"><img src={unclearFeature5thSection} alt="unclear feature" className="page-search-img" /></div>
                                <div className="card-text">
                                    <h3>Unclear features</h3>
                                    <p>If the invention is not structured, every report becomes harder to review.</p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="card-icon"><img src={hardToShare5thSection} alt="hard to share" className="page-search-img" /></div>
                                <div className="card-text">
                                    <h3>Hard-to-share outputs</h3>
                                    <p>Teams need clean reports, mapped evidence, and editable drafts.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Image Column */}
                    <div className="section-image-right">
                        <img src={background5thSection} alt="Invention Workflow Mockup" className="mockup-img" />
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
                                <span className="step-icon"><img src={describeInvention5thSection} alt="describe Invention" className="page-search-img" /></span>
                            </div>
                            <h4>Describe the invention</h4>
                            <p>Paste the idea in plain English.</p>
                        </div>

                        <div className="workflow-step">
                            <div className="step-badge">
                                <span className="step-icon"><img src={reviewFeature5thSection} alt="review feature" className="page-search-img" /></span>
                            </div>
                            <h4>Review the features</h4>
                            <p>See the extracted invention structure.</p>
                        </div>

                        <div className="workflow-step">
                            <div className="step-badge">
                                <span className="step-icon"><img src={chooseOutput5thSection} alt="choose output" className="page-search-img" /></span>
                            </div>
                            <h4>Choose outputs</h4>
                            <p>Run search, comparison, drafts, or all.</p>
                        </div>

                        <div className="workflow-step">
                            <div className="step-badge">
                                <span className="step-icon"><img src={openCase5thSection} alt="open case" className="page-search-img" /></span>
                            </div>
                            <h4>Open the case</h4>
                            <p>Review results, download, reports, or share.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 6th Section */}
            <section id="pricing" className="pricing-section">
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
                                <span className="formula-circle"><img src={invention16thSection} alt="Invention" className="mockup-img" /></span>
                                <span className="formula-label">invention</span>
                            </div>
                            <span className="formula-operator"><img src={equal6thSection} alt="equal" className="mockup-img" /></span>
                            <div className="formula-item">
                                <span className="formula-circle"><img src={invention16thSection} alt="Invention" className="mockup-img" /></span>
                                <span className="formula-label">project</span>
                            </div>
                            <span className="formula-operator"><img src={equal6thSection} alt="equal" className="mockup-img" /></span>
                            <div className="formula-item bold-price">$25</div>
                            <span className="formula-operator"><img src={equal6thSection} alt="equal" className="mockup-img" /></span>
                            <div className="formula-item">
                                <span className="formula-check-circle"><img src={circleCheck6thSection} alt="circle checked" className="mockup-img" /></span>
                                <span className="formula-label">all selected outputs</span>
                            </div>
                        </div>

                        {/* Two-Column Features Grid inside the Card */}
                        <div className="card-features-list">
                            <div className="feature-check-item">
                                <span className="check-icon"><img src={circleCheck6thSection} alt="circle checked" className="mockup-img" /></span> Key Features
                            </div>
                            <div className="feature-check-item">
                                <span className="check-icon"><img src={circleCheck6thSection} alt="circle checked" className="mockup-img" /></span> Provisional Draft
                            </div>
                            <div className="feature-check-item">
                                <span className="check-icon"><img src={circleCheck6thSection} alt="circle checked" className="mockup-img" /></span> Patent Search
                            </div>
                            <div className="feature-check-item">
                                <span className="check-icon"><img src={circleCheck6thSection} alt="circle checked" className="mockup-img" /></span> Non-Provisional Draft
                            </div>
                            <div className="feature-check-item">
                                <span className="check-icon"><img src={circleCheck6thSection} alt="circle checked" className="mockup-img" /></span> Publication Search
                            </div>
                            <div className="feature-check-item">
                                <span className="check-icon"><img src={circleCheck6thSection} alt="circle checked" className="mockup-img" /></span> Reports and downloads
                            </div>
                            <div className="feature-check-item">
                                <span className="check-icon"><img src={circleCheck6thSection} alt="circle checked" className="mockup-img" /></span> Product Comparison
                            </div>
                            <div className="feature-check-item">
                                <span className="check-icon"><img src={circleCheck6thSection} alt="circle checked" className="mockup-img" /></span> Attorney review request option
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
                            <div className="benefit-icon red-shield"><img src={shieldCheck6thSection} alt="circle checked" className="" /></div>
                            <p><strong>Select one output or all outputs.</strong></p>
                            <p className="benefit-subtext">The same invention case still uses one project.</p>
                        </div>

                        <div className="benefit-mini-card">
                            <div className="benefit-icon red-arrow"><img src={caseOutput6thSection} alt="circle checked" className="" /></div>
                            <p><strong>One case, all outputs</strong></p>
                            <p className="benefit-subtext">No per-module pricing.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* 7th Section */}
            <section id="market-search" className="market-search-section">
                <div className="layout-split-grid">
                    {/* Left Side: Publication Search Card Panel */}
                    <div className="dashboard-side-left">
                        <div className="publication-container-panel">
                            <div className="publication-header">
                                <span className="search-icon"><img src={publishSearch7thSection} alt="publish search" className="page-search-img" /></span>
                                <div>
                                    <h3 className="publication-title">Publication Search</h3>
                                    <p className="publication-subtitle">
                                        Find technical papers and articles related to your invention and compare key insights.
                                    </p>
                                </div>
                            </div>

                            <div className="publication-cards-stack">
                                {/* Card 1 */}
                                <div className="pub-card">
                                    <div className="pub-card-header">
                                        <span className="doc-icon"><img src={draftOutline7thSection} alt="draft outline" className="page-search-img" /></span>
                                        <h4>Flexible thermal interfaces for wearable devices</h4>
                                        <span className="share-icon"><img src={liveShare7thSection} alt="live share" className="page-search-img" /></span>
                                    </div>
                                    <p className="pub-card-desc">
                                        A review of materials and structures that enable conformal heat transfer in wearable applications.
                                    </p>
                                    <span className="pub-card-meta">Journal Article 2024</span>
                                </div>

                                {/* Card 2 */}
                                <div className="pub-card">
                                    <div className="pub-card-header">
                                        <span className="doc-icon"><img src={draftOutline7thSection} alt="draft outline" className="page-search-img" /></span>
                                        <h4>Microfluidic cooling layers in compact electronics</h4>
                                        <span className="share-icon"><img src={liveShare7thSection} alt="live share" className="page-search-img" /></span>
                                    </div>
                                    <p className="pub-card-desc">
                                        Design approaches for integrating microfluidic channels to manage heat in slim devices.
                                    </p>
                                    <span className="pub-card-meta">Conference Paper 2023</span>
                                </div>

                                {/* Card 3 */}
                                <div className="pub-card">
                                    <div className="pub-card-header">
                                        <span className="doc-icon"><img src={draftOutline7thSection} alt="draft outline" className="page-search-img" /></span>
                                        <h4>Skin-safe adhesive materials for wearable hardware</h4>
                                        <span className="share-icon"><img src={liveShare7thSection} alt="live share" className="page-search-img" /></span>
                                    </div>
                                    <p className="pub-card-desc">
                                        Formulation and testing of adhesives that ensure long-term wear and skin compatibility.
                                    </p>
                                    <span className="pub-card-meta">Technical Report 2023</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content Side: Main Headers and Product Rankings */}
                    <div className="content-side-right">
                        <h2 className="main-section-title">See the market, not only the patent database.</h2>
                        <p className="main-section-desc">
                            Some inventions may be close to existing products. Oolto can surface related products and show why they matter through ranked product cards and feature breakdowns.
                        </p>

                        <div className="ranked-product-cards">
                            {/* Rank 1 */}
                            <div className="product-rank-card">
                                <div className="rank-badge-column">
                                    <span className="rank-number text-red"><img src={one7thSection} alt="one section" className="page-search-img" /></span>
                                    <span className="rank-label">Rank</span>
                                </div>
                                <div className="product-image-container">
                                    <img src={wearable7thSection} alt="wearable watch" className="page-search-img" />
                                </div>
                                <div className="product-details-column">
                                    <h3>Wearable cooling patch</h3>
                                    <span className="vendor-brand"><img src={amazon7thSection} alt="amazon" className="page-search-img" /></span>
                                    <p className="product-quote">"Reusable adhesive patch delivers up to 8 hours of targeted cooling relief."</p>
                                    <img src={showFeature7thSection} alt="show feature" className="page-search-img" />
                                </div>
                                <div className="score-column">
                                    <span className="score-label">Relevance Score</span>
                                    <span className="score-value text-red"><img src={nintyTwo7thSection} alt="ninty two" className="page-search-img" /></span>
                                    <span className="score-badge badge-red-light">Very High</span>
                                </div>
                            </div>

                            {/* Rank 2 */}
                            <div className="product-rank-card">
                                <div className="rank-badge-column">
                                    <span className="rank-number"><img src={two7thSection} alt="two section" className="page-search-img" /></span>
                                    <span className="rank-label">Rank</span>
                                </div>
                                <div className="product-image-container">
                                    <img src={thermalGel7thSection} alt="thermal gel" className="page-search-img" />
                                </div>
                                <div className="product-details-column">
                                    <h3>Thermal gel pad for electronics</h3>
                                    <span className="vendor-brand"><img src={amazon7thSection} alt="amazon" className="page-search-img" /></span>
                                    <p className="product-quote">"High-conductivity gel pad for efficient heat transfer in compact devices."</p>
                                    <img src={showFeature7thSection} alt="show feature" className="page-search-img" />
                                </div>
                                <div className="score-column">
                                    <span className="score-label">Relevance Score</span>
                                    <span className="score-value"><img src={seventyEight7thSection} alt="seventy eight" className="page-search-img" /></span>
                                    <span className="score-badge badge-orange-light">High</span>
                                </div>
                            </div>

                            {/* Rank 3 */}
                            <div className="product-rank-card">
                                <div className="rank-badge-column">
                                    <span className="rank-number"><img src={three7thSection} alt="three section" className="page-search-img" /></span>
                                    <span className="rank-label">Rank</span>
                                </div>
                                <div className="product-image-container">
                                    <img src={smartRecovery7thSection} alt="smart recovery" className="page-search-img" />
                                </div>
                                <div className="product-details-column">
                                    <h3>Smart recovery cooling wrap</h3>
                                    <span className="vendor-brand"><img src={amazon7thSection} alt="amazon" className="page-search-img" /></span>
                                    <p className="product-quote">"Wearable wrap with adjustable cooling and app-connected temperature control."</p>
                                    <img src={showFeature7thSection} alt="show feature" className="page-search-img" />
                                </div>
                                <div className="score-column">
                                    <span className="score-label">Relevance Score</span>
                                    <span className="score-value"><img src={seventyOne7thSection} alt="seventy one" className="page-search-img" /></span>
                                    <span className="score-badge badge-orange-light">High</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8th Section */}
            <section id="testimonial-section" className="testimonials-section">
                {/* Section Header */}
                <div className="section-header-centered">
                    <h2 className="main-section-title">Why innovators choose Oolto</h2>
                    <p className="main-section-desc">
                        Inventors, startups, and IP teams use Oolto to move from raw ideas to patent search, novelty analysis, and draft-ready outputs with more clarity.
                    </p>
                </div>

                {/* Top Grid: Large Featured Testimonials */}
                <div className="featured-testimonials-grid">
                    <div className="testimonial-card card-large">
                        <div className="card-image-wrapper">
                            <img src={left8thSection} alt="Ananya Rao working" className="page-search-img" />
                        </div>
                        <div className="card-content-wrapper">
                            <div className="star-rating"><img src={starReview8thSection} alt="Star Review" className="page-search-img" /></div>
                            <p className="testimonial-quote">
                                "Oolto helped us turn a rough invention note into clear key features, a patent search direction, and a provisional draft path in one clean flow."
                            </p>
                            <div className="testimonial-author">
                                <h4>Ananya Rao</h4>
                                <span>Founder @ MedTech Startup</span>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card card-large">
                        <div className="card-image-wrapper">
                            <img src={right8thSection} alt="Team Disscussing" className="page-search-img" />
                        </div>
                        <div className="card-content-wrapper">
                            <div className="star-rating"><img src={starReview8thSection} alt="Star Review" className="page-search-img" /></div>
                            <p className="testimonial-quote">
                                "Oolto helped us turn a rough invention note into clear key features, a patent search direction, and a provisional draft path in one clean flow."
                            </p>
                            <div className="testimonial-author">
                                <h4>Ananya Rao</h4>
                                <span>Founder @ MedTech Startup</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =========================================================
       NEW ROTATING HORIZONTAL TRACK (Infinite Left-to-Right Loop)
       ========================================================= */}
                <div className="compact-testimonials-marquee-container">
                    <div className="marquee-track">

                        {/* Originals Set */}
                        <div className="marquee-group">
                            {[1, 2, 3, 4].map((item) => (
                                <div className="testimonial-card card-small" key={`orig-${item}`}>
                                    <div className="star-rating"><img src={starReview8thSection} alt="Star Review" className="page-search-img" /></div>
                                    <p className="testimonial-quote">
                                        "Oolto helped us turn a rough invention note into clear key features, a patent search direction, and a provisional draft path in one clean flow."
                                    </p>
                                    <div className="author-row-compact">
                                        <img src={personReview8thSection} alt="Ananya Avatar" className="page-search-img" />
                                        <div className="testimonial-author">
                                            <h4>Ananya Rao</h4>
                                            <span>Founder @ MedTech Startup</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Duplicated Set for Seamless Loop Wrapping */}
                        <div className="marquee-group" aria-hidden="true">
                            {[1, 2, 3, 4].map((item) => (
                                <div className="testimonial-card card-small" key={`dup-${item}`}>
                                    <div className="star-rating">⭐⭐⭐⭐⭐</div>
                                    <p className="testimonial-quote">
                                        "Oolto helped us turn a rough invention note into clear key features, a patent search direction, and a provisional draft path in one clean flow."
                                    </p>
                                    <div className="author-row-compact">
                                        <img src="/path-to-profile-sm.jpg" alt="Ananya Rao" className="author-avatar-sm" />
                                        <div className="testimonial-author">
                                            <h4>Ananya Rao</h4>
                                            <span>Founder @ MedTech Startup</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* 9th Section */}
            <section id="team-report" className="team-reports-section">
                {/* Top Grid: Numbered Audience Cards & Section Title */}
                <div className="audience-layout-grid">
                    <div className="cards-wrapper-left">
                        <div className="audience-card-row row-three-items">
                            {/* Card 01 */}
                            <div className="numbered-audience-card">
                                <span className=""><img src={circleOne8thSection} alt="circle one" className="circle-number" /></span>
                                <h3>Inventors</h3>
                                <p>Protect and document ideas.</p>
                            </div>
                            {/* Card 02 */}
                            <div className="numbered-audience-card">
                                <span className=""><img src={circleTwo8thSection} alt="circle two" className="circle-number" /></span>
                                <h3>Startup founders</h3>
                                <p>Move IP early and build with confidence.</p>
                            </div>
                            <div className="">
                                <h2 className="main-section-title">
                                    Creates reports <br /> your team can <br /> actually use.
                                </h2>
                            </div>
                        </div>

                        <div className="audience-card-row row-three-items">
                            {/* Card 03 */}
                            <div className="numbered-audience-card">
                                <span className=""><img src={circleThree8thSection} alt="circle three" className="circle-number3" /></span>
                                <h3>R&D teams</h3>
                                <p>Accelerate disclosure review and decisions.</p>
                            </div>
                            {/* Card 04 */}
                            <div className="numbered-audience-card">
                                <span className=""><img src={circleFour8thSection} alt="circle four" className="circle-number3" /></span>
                                <h3>Patent analysts</h3>
                                <p>Save time on search and analysis.</p>
                            </div>
                            {/* Card 05 */}
                            <div className="numbered-audience-card">
                                <span className=""><img src={circleFive8thSection} alt="circle five" className="circle-number3" /></span>
                                <h3>IP teams and attorneys</h3>
                                <p>Streamline case prep and reporting.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Report Grid Options */}
                <div className="reports-inclusion-wrapper">
                    <p className="reports-subheading-label">Reports are included with each invention case.</p>

                    <div className="reports-options-grid">
                        {/* Box 1 */}
                        <div className="report-option-box">
                            <span className="report-box-icon"><img src={patentSearchReport8thSection} alt="patent search report" className="page-search-img" /></span>
                            <h4>Patent Search Report</h4>
                        </div>
                        {/* Box 2 */}
                        <div className="report-option-box">
                            <span className="report-box-icon"><img src={reportLibrary8thSection} alt="report library" className="page-search-img" /></span>
                            <h4>Mapping Report</h4>
                        </div>
                        {/* Box 3 */}
                        <div className="report-option-box">
                            <span className="report-box-icon"><img src={reportFinance8thSection} alt="report finance" className="page-search-img" /></span>
                            <h4>Patent Comparison Report</h4>
                        </div>
                        {/* Box 4 */}
                        <div className="report-option-box">
                            <span className="report-box-icon"><img src={provisionalDraft8thSection} alt="provisional draft" className="page-search-img" /></span>
                            <h4>Provisional Draft</h4>
                        </div>
                        {/* Box 5 */}
                        <div className="report-option-box">
                            <span className="report-box-icon"><img src={NonDraftOutline8thSection} alt="non provisional draft" className="page-search-img" /></span>
                            <h4>Non Provisional Draft</h4>
                        </div>
                        {/* Box 6 */}
                        <div className="report-option-box">
                            <span className="report-box-icon"><img src={carbonReview8thSection} alt="carbon review" className="page-search-img" /></span>
                            <h4>Attorney Review Package</h4>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Warning/Disclaimer Bar */}
                <div className="judgment-disclaimer-box">
                    <span className="shield-check-icon"><img src={checkShield8thSection} alt="check shield" className="page-search-img" /></span>
                    <div className="disclaimer-text">
                        <strong>Built to support review, not replace professional judgment.</strong>
                        <p>
                            Oolto helps organize invention information, search evidence, compare references, generate draft-ready sections, and prepare reports. For legal decisions, users should consult qualified professionals.
                        </p>
                    </div>
                </div>

                <img src={bottom9thSection} alt="ninth section" className="ninth-section-bottom" />

            </section>

            {/* 10th Section */}
            <section id="contact" className="contact-requirement-section">
                <div className="layout-split-grid">
                    {/* Left Column: Contact Copy & Details */}
                    <div className="content-side-left">
                        <h2 className="main-section-title">Let's talk about your invention work.</h2>
                        <p className="main-section-desc">
                            Share your idea, patent document, or project requirement with us. Our team will help you understand the next best step clearly.
                        </p>

                        <div className="contact-info-list">
                            {/* Phone Item */}
                            <div className="contact-info-item">
                                <div className="icon-circle">
                                    <span className="info-icon"><img src={phoneIconSection} alt="phone icon" className="page-search-img" /></span>
                                </div>
                                <div className="info-text">
                                    <span className="info-label">PHONE</span>
                                    <a href="tel:+919876543210" className="info-value">+91 98765 43210</a>
                                </div>
                            </div>

                            {/* Email Item */}
                            <div className="contact-info-item">
                                <div className="icon-circle">
                                    <span className="info-icon"><img src={emailIconSection} alt="email icon" className="page-search-img" /></span>
                                </div>
                                <div className="info-text">
                                    <span className="info-label">EMAIL</span>
                                    <a href="mailto:oolto@gmail.com" className="info-value">oolto@gmail.com</a>
                                </div>
                            </div>

                            {/* Location Item */}
                            <div className="contact-info-item">
                                <div className="icon-circle">
                                    <span className="info-icon"><img src={locationIconSection} alt="location icon" className="page-search-img" /></span>
                                </div>
                                <div className="info-text">
                                    <span className="info-label">LOCATION</span>
                                    <span className="info-value">New Delhi, India</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Floating Requirement Form Card */}
                    <div className="form-side-right">
                        <div className="requirement-form-panel">
                            <h3 className="form-title">Send your requirement</h3>
                            <p className="form-subtitle">
                                Tell us what you want to create, review, search, or file. We will get back with a clear next step.
                            </p>

                            <form className="requirement-form" onSubmit={handleSubmit}>
                                <div className="form-row-twin">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && (
                                            <small className="text-danger">{errors.name}</small>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && (
                                            <small className="text-danger">{errors.email}</small>
                                        )}
                                    </div>
                                </div>

                                <div className="form-row-twin">
                                    <div className="form-group">
                                        <label>Number</label>
                                        <input
                                            type="number"
                                            name="number"
                                            value={formData.number}
                                            onChange={handleChange}
                                            maxLength={14}
                                        />
                                        {errors.number && (
                                            <small className="text-danger">{errors.number}</small>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label>Project Type</label>

                                        <select
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Project Type</option>

                                            {projectTypes.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>

                                        {errors.projectType && (
                                            <small className="text-danger">
                                                {errors.projectType}
                                            </small>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Message</label>

                                    <textarea
                                        rows="5"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                    />

                                    {errors.message && (
                                        <small className="text-danger">{errors.message}</small>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn-send-requirement"
                                    disabled={loading}
                                >
                                    {loading ? "Sending..." : "Send"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* 11th Section */}
            {/* Footer Section */}
            <footer id="footer" className="site-footer-section">
                <div className="footer-dark-card-panel">
                    <div className="footer-main-layout">

                        {/* Left Column: Brand, Tagline, & Newsletter */}
                        <div className="footer-brand-column">
                            <div className="footer-logo-area">
                                {/* Infinite Logo Symbol Mockup */}
                                <img src={footerLogo10thSection} alt="footer logo" className="page-search-img" />
                            </div>

                            <p className="footer-tagline-text">
                                Receive the latest articles, tips <br />
                                and offers from Longevity
                            </p>

                            <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="input-with-button-wrapper">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="newsletter-input"
                                        required
                                    />
                                    <button type="submit" className="newsletter-submit-btn" aria-label="Submit">
                                        <span className="arrow-icon"><img src={footerRightArrow10thSection} alt="footer line" className="page-search-img" /></span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Column: Multi-Column Link Navigation lists */}
                        <div className="footer-nav-links-wrapper">
                            {/* Column 1 */}
                            <div className="nav-links-column">
                                <a className="footer-link" href="#draft-ready-section">Product</a>
                                <a className="footer-link" href="#home">How it works</a>
                                <a className="footer-link" href="#key-Feature">Modules</a>
                                <a className="footer-link" href="#team-report">Reports</a>
                            </div>

                            <div className="nav-links-column">
                                <a className="footer-link" href="#pricing">Pricing</a>
                                <a className="footer-link" onClick={() => navigate("/auth/login")}>Sign in</a>
                                <a className="footer-link" onClick={() => navigate("/auth/register")}>Sign up</a>
                                <a className="footer-link" href="#terms">Terms & conditions</a>
                                <a className="footer-link" onClick={() => navigate("/auth/register")}>Request a demo</a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Horizontal Row: Dividers & Meta Text */}
                    <img src={footerLine10thSection} alt="footer arrow" className="page-search-img" />

                    <div className="footer-copyright-row">
                        <p>© 2026 Barcode IP. Oolto is a product by Barcode IP. Built for structured invention review.</p>
                    </div>
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
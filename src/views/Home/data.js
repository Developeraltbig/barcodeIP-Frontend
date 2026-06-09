import { PAGES } from "./constants";
import PatentSearchIcon from '../../assets/icons/patentSearchIcon.svg';
import NonProvisionalDraftIcon from '../../assets/icons/nonProvisionalDraftIcon.svg';
import ProductSearchIcon from '../../assets/icons/productSearchIcon.svg';
import ProvisionalDraftIcon from '../../assets/icons/provisionalDraftIcon.svg';
import PublicationSearchIcon from '../../assets/icons/publicationSearchIcon.svg';

import DownloadIcon from "../../assets/icons/download.svg";
import MyProjectIcon from "../../assets/icons/myProject.svg";
import NewCaseIcon from "../../assets/icons/newCase.svg";
import OoltoCommentsIcon from "../../assets/icons/oolto_comments.svg";

export const navItems = [
    {
        id: PAGES.NEW_CASE,
        label: "New Case",
        icon: NewCaseIcon,
    },
    {
        id: PAGES.PROJECTS,
        label: "My Projects",
        icon: MyProjectIcon,
    },
    {
        id: PAGES.COMMENTS,
        label: "Barcode Comments",
        icon: OoltoCommentsIcon,
        badge: 1,
    },
    {
        id: PAGES.DOWNLOADS,
        label: "Downloads",
        icon: DownloadIcon,
    },
];

export const modules = [
    {
        id: "patent",
        title: "Patent Search",
        desc: "Find patents and mappings",
        icon: PatentSearchIcon,
    },
    {
        id: "publish",
        title: "Publications Search",
        desc: "Find papers and references",
        icon: PublicationSearchIcon,
    },
    {
        id: "product",
        title: "Product Comparison",
        desc: "Compare market products",
        icon: ProductSearchIcon,
    },
    {
        id: "provisional",
        title: "Provisional Draft",
        desc: "Create draft sections",
        icon: ProvisionalDraftIcon,
    },
    {
        id: "nonProvisional",
        title: "Non-Provisional Draft",
        desc: "Create claims and diagrams",
        icon: NonProvisionalDraftIcon,
    },
];

export const projects = [
    {
        id: "016",
        title: "Bimetallic Clamp and Tool for Live Tapping of Overhead Power Lines",
        date: "13 May 2026",
        status: "Completed",
        commentStatus: "Request Review",
        tags: [
            "Patent Search",
            "Publication Search",
            "Product Comparison",
            "Provisional Draft",
            "Non-Provisional Draft",
        ],
    },
    {
        id: "015",
        title: "Power Amplifier with Selectable Parallel Amplifier Chains",
        date: "13 May 2026",
        status: "Processing",
        commentStatus: "Request Review",
        tags: ["Product Comparison"],
    },
    {
        id: "014",
        title: "Distributed Quantum-Resilient Key Management for IoT Edge Devices",
        date: "12 May 2026",
        status: "Completed",
        commentStatus: "Request Review",
        tags: [
            "Patent Search",
            "Publication Search",
            "Product Comparison",
            "Provisional Draft",
            "Non-Provisional Draft",
        ],
    },
    {
        id: "013",
        title: "Artificial Intelligence and Machine Learning for Semantic Analysis",
        date: "07 May 2026",
        status: "Completed",
        commentStatus: "Request Review",
        tags: ["Patent Search"],
    },
    {
        id: "012",
        title: "Artificial Intelligence and Machine Learning Search Pipeline",
        date: "07 May 2026",
        status: "Comments Pending",
        commentStatus: "Request Review",
        tags: [
            "Patent Search",
            "Publication Search",
            "Product Comparison",
            "Provisional Draft",
            "Non-Provisional Draft",
        ],
    },
    {
        id: "011",
        title: "Computer Vision System for Crop Disease Prediction",
        date: "07 May 2026",
        status: "Completed",
        commentStatus: "Comments ready",
        tags: ["Patent Search", "Publication Search"],
    },
];

export const barcodeComments = [
    {
        id: "BC-1027",
        caseId: "016",
        title: "Bimetallic Clamp and Tool for Live Tapping of Overhead Power Lines",
        status: "Comments Pending",
        requestedAt: "13 May 2026, 3:18 PM",
        tags: ["Patent Search", "Product Comparison", "Provisional Draft", "Publication Search", "Publication Search"],
    },
    {
        id: "BC-1019",
        caseId: "012",
        title: "Artificial Intelligence and Machine Learning Search Pipeline",
        status: "Comments Ready",
        requestedAt: "07 May 2026, 5:21 PM",
        tags: ["Patent Search", "Publication Search"],
    },
];
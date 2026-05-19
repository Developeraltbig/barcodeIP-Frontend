import { PAGES } from "./constants";

export const navItems = [
    {
        id: PAGES.NEW_CASE,
        label: "New Case",
        icon: "✦",
    },
    {
        id: PAGES.PROJECTS,
        label: "My Projects",
        icon: "▦",
    },
    {
        id: PAGES.COMMENTS,
        label: "Barcode Comments",
        icon: "▤",
        badge: 1,
    },
    {
        id: PAGES.DOWNLOADS,
        label: "Downloads",
        icon: "⇩",
    },
];

export const modules = [
    {
        id: "patent",
        title: "Patent Search",
        desc: "Find patents and mappings",
        icon: "▣",
    },
    {
        id: "publish",
        title: "Publications Search",
        desc: "Find papers and references",
        icon: "▤",
    },
    {
        id: "product",
        title: "Product Comparison",
        desc: "Compare market products",
        icon: "⬡",
    },
    {
        id: "provisional",
        title: "Provisional Draft",
        desc: "Create draft sections",
        icon: "▤",
    },
    {
        id: "nonProvisional",
        title: "Non-Provisional Draft",
        desc: "Create claims and diagrams",
        icon: "▤",
    },
];

export const projects = [
    {
        id: "016",
        title: "Bimetallic Clamp and Tool for Live Tapping of Overhead Power Lines",
        date: "13 May 2026",
        status: "Completed",
        commentStatus: "Not requested",
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
        commentStatus: "Not requested",
        tags: ["Product Comparison"],
    },
    {
        id: "014",
        title: "Distributed Quantum-Resilient Key Management for IoT Edge Devices",
        date: "12 May 2026",
        status: "Completed",
        commentStatus: "Not requested",
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
        commentStatus: "Not requested",
        tags: ["Patent Search"],
    },
    {
        id: "012",
        title: "Artificial Intelligence and Machine Learning Search Pipeline",
        date: "07 May 2026",
        status: "Comments Pending",
        commentStatus: "In review",
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
        tags: ["Patent Search", "Product Comparison", "Provisional Draft"],
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
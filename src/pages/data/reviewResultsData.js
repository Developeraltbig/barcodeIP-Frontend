export const TAB_KEYS = {
  PATENT: "patent",
  PUBLICATIONS: "publications",
  PRODUCTS: "products",
  PROVISIONAL: "provisional",
  NON_PROVISIONAL: "nonProvisional"
};

export const OUTPUT_TABS = [
  { key: TAB_KEYS.PATENT, label: "Patent" },
  { key: TAB_KEYS.PUBLICATIONS, label: "Publications" },
  { key: TAB_KEYS.PRODUCTS, label: "Products" },
  { key: TAB_KEYS.PROVISIONAL, label: "Provisional" },
  { key: TAB_KEYS.NON_PROVISIONAL, label: "Non-Provisional" }
];

export const PROJECT_INFO = {
  id: "BC-1019",
  caseId: "016",
  title: "Bimetallic Clamp and Tool for Live Tapping of Overhead Power Lines"
};

export const PRIMARY_FEATURES = [
  "A clamp configured for tapping power from a bare aluminium overhead power line while connecting to a copper service entry conductor.",
  "A clamp body shaped to hook onto, seat against, and remain positioned on an overhead live conductor before final tightening.",
  "A composition or terminal interface that supports connection between aluminium overhead conductors and copper service entry conductors.",
  "A screw, bolt, pressure plate, or equivalent tightening member fixes the clamp to the live conductor after placement.",
  "A mating interface allows an installation tool to hold, tighten, release, or detach from the clamp after mounting."
];

export const SECONDARY_FEATURES = [
  "An elongated electrically insulated tool allows an operator to work safely from ground level or at a distance from live components.",
  "The distal end of the tool includes an adapter that mates with the clamp during lifting, tightening, and installation.",
  "The tool can disengage from the clamp once the clamp is securely fixed on the overhead power line.",
  "The clamp geometry can accommodate multiple conductor or cable diameters through shaped jaws or adjustable pressure areas.",
  "Material selection and surface design reduce galvanic corrosion and outdoor degradation in power distribution environments."
];

export const INITIAL_TAB_RUNTIME = {
  patent: {
    status: "processing",
    progress: 58,
    message: "Patent Search is running",
    subMessage: "Top results may appear first. Mapping for top 10 may take 5–6 minutes.",
    steps: [
      { id: "sources", label: "Searching patent sources", status: "done" },
      { id: "duplicates", label: "Removing duplicates", status: "done" },
      { id: "ranking", label: "Ranking references", status: "done" },
      { id: "mapping", label: "Preparing top 10 mappings", status: "active" },
      { id: "summary", label: "Preparing overlap summaries", status: "waiting" }
    ]
  },
  publications: {
    status: "processing",
    progress: 20,
    message: "Publication search is waiting",
    subMessage: "This module is ready for your next tab design.",
    steps: []
  },
  products: {
    status: "processing",
    progress: 10,
    message: "Product comparison is waiting",
    subMessage: "This module is ready for product evidence and comparison UI.",
    steps: []
  },
  provisional: {
    status: "queued",
    progress: 0,
    message: "Provisional draft is queued",
    subMessage: "Draft generation panel can be added here later.",
    steps: []
  },
  nonProvisional: {
    status: "queued",
    progress: 0,
    message: "Non-provisional draft is queued",
    subMessage: "This tab is ready for future document generation UI.",
    steps: []
  }
};

export const PATENT_RESULTS = Array.from({ length: 5 }).map((_, index) => ({
  id: index + 1,
  publication: "CN217984278U",
  date: "2022-06-21",
  assignee: "State Grid Utility Model Division",
  priority: "2022-06-21",
  title: "A high-voltage drainage clamp and its special live installation tool",
  description:
    "Discloses a high-voltage drainage wire clamp and live installation tool with clamping base, pressing block, tightening shaft, spring, support rod, and wrench operating rod.",
  tags: ["Hook-on clamp body", "Tightening mechanism", "Tool interface"],
  risk: "High",
  overall: "86%"
}));

export const FEATURE_MAPPING_ROWS = [
  {
    id: 1,
    featureType: "P1",
    feature:
      "Bi-metallic clamp for tapping power from a bare Aluminium overhead power line.",
    evidence:
      "The reference describes a clamp for operating grounding or tap-like clamp structures on overhead electrical conductors. The document does not expressly emphasise copper-to-aluminium live service tapping, but the clamp form and conductor engagement are relevant.",
    whereFound: "Description / Figures",
    level: "Partially Found"
  },
  {
    id: 2,
    featureType: "P2",
    feature: "A body configured to hook onto the overhead power line.",
    evidence:
      "The reference includes jaws extending from a body and movable relative to each other to clamp onto an overhead electrical conductor.",
    whereFound: "Claims / Description",
    level: "Found"
  },
  {
    id: 3,
    featureType: "P3",
    feature:
      "A composition of Copper and Aluminium to facilitate connection between conductors.",
    evidence:
      "The document focuses on grounding connection and is silent on copper-aluminium bimetallic interface for service entry conductors.",
    whereFound: "Not found",
    level: "Not Found"
  },
  {
    id: 4,
    featureType: "P1",
    feature:
      "Bi-metallic clamp for tapping power from a bare Aluminium overhead power line.",
    evidence:
      "The reference describes a clamp for operating grounding or tap-like clamp structures on overhead electrical conductors. The document also teaches clamping support and conductor engagement.",
    whereFound: "Description / Figures",
    level: "Partially Found"
  },
  {
    id: 5,
    featureType: "S1",
    feature:
      "Bi-metallic clamp for tapping power from a bare Aluminium overhead power line.",
    evidence:
      "The reference describes a clamp for operating grounding or tap-like clamp structures on overhead electrical conductors.",
    whereFound: "Description / Figures",
    level: "Partially Found"
  },
  {
    id: 6,
    featureType: "P1",
    feature:
      "Bi-metallic clamp for tapping power from a bare Aluminium overhead power line.",
    evidence:
      "The reference describes a clamp for operating grounding or tap-like clamp structures on overhead electrical conductors.",
    whereFound: "Description / Figures",
    level: "Partially Found"
  },
  {
    id: 7,
    featureType: "P1",
    feature:
      "Bi-metallic clamp for tapping power from a bare Aluminium overhead power line.",
    evidence:
      "The reference describes a clamp for operating grounding or tap-like clamp structures on overhead electrical conductors.",
    whereFound: "Description / Figures",
    level: "Partially Found"
  },
  {
    id: 8,
    featureType: "P1",
    feature:
      "Bi-metallic clamp for tapping power from a bare Aluminium overhead power line.",
    evidence:
      "The reference describes a clamp for operating grounding or tap-like clamp structures on overhead electrical conductors.",
    whereFound: "Description / Figures",
    level: "Partially Found"
  }
];

export const BIBLIOGRAPHIC_DATA = [
  ["Publication", "CN217984278U"],
  ["Date", "2022-12-06"],
  ["Assignee", "State Grid Utility Model Division"],
  ["Inventor", "Liang Cheny; Ming Zhao"],
  ["Priority Date", "2022-05-21"],
  ["Classification", "H01R4/48"]
];

export const CLASSIFICATIONS = [
  ["H01R11/14", "Grounding clamps for electrical conductors"],
  ["H02G1/02", "Installing electric cables or lines"],
  ["H01R43/00", "Apparatus for making connections"],
  ["H01R4/48", "Clamping connections"]
];

export const PATENT_CITATIONS = [
  ["US3683915A", "1968-12-15", "Kimberly Clark Co", "Electrical connection and clamp reference"],
  ["US3902502A", "1969-12-15", "Saul Liss", "Electrical connection and clamp reference"],
  ["US3933477A", "1970-12-15", "Wall Wilbur E Du", "Electrical connection and clamp reference"],
  ["US3941136A", "1971-12-15", "Neuromyx Corp", "Electrical connection and clamp reference"],
  ["US4406288A", "1972-12-15", "Hugh P. Cash", "Electrical connection and clamp reference"]
];

export const OVERLAP_BREAKDOWN = [
  { label: "Primary features", value: 88, note: "4/5 found across document" },
  { label: "Secondary features", value: 98, note: "5/5 found across document" },
  { label: "Claims support", value: 68, note: "Claim language support" },
  { label: "Description support", value: 88, note: "Detailed description support" },
  { label: "Drawing support", value: 58, note: "Figure-level support present" }
];

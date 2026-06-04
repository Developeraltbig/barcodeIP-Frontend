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
    status: "completed",
    progress: 100,
    message: "Publication Search is ready",
    subMessage: "Related non-patent literature, papers, public disclosures, and technical references are ready.",
    steps: []
  },
  products: {
    status: "completed",
    progress: 100,
    message: "Product comparison is ready",
    subMessage: "Commercial product matches ranked against the invention requirements are ready.",
    steps: []
  },
  provisional: {
    status: "completed",
    progress: 100,
    message: "Provisional draft is ready",
    subMessage: "Editable provisional specification sections generated from the invention disclosure.",
    steps: []
  },
  nonProvisional: {
    status: "completed",
    progress: 100,
    message: "Non-provisional draft is ready",
    subMessage: "Draft sections, representative claims, block diagrams, and flow charts are ready.",
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

export const PUBLICATION_RESULTS = [
  {
    id: 1,
    relevance: "High relevance",
    type: "Conference Paper",
    title: "Magnetic-pulse pressing of electrical connections for stranded wires",
    summary:
      "Discusses conductor connection behavior and mechanical joining in electrical line hardware.",
    source: "Proceedings of Electrical Engineering",
    meta: "2019, ZV Samokhvalova, VN Samokhvalov"
  },
  {
    id: 2,
    relevance: "Medium relevance",
    type: "Journal Article",
    title: "Aluminium-alloy conductors for AC traction overhead equipment",
    summary:
      "Reviews material behavior and compatibility for overhead conductor systems.",
    source: "Institution of Electrical Engineers",
    meta: "2017, MN Mukerjee, CA Sankaranarayanan"
  },
  {
    id: 3,
    relevance: "Medium relevance",
    type: "Conference Paper",
    title: "Electrical contacts: principles and applications in power connectors",
    summary:
      "Explains contact resistance, pressure, and corrosion mechanisms in conductor interfaces.",
    source: "Technical Monograph",
    meta: "2017, Q Maib, P Blysshe"
  },
  {
    id: 4,
    relevance: "Medium relevance",
    type: "Technical Article",
    title: "Conductor systems for overhead lines: selection and installation considerations",
    summary:
      "Covers installation practices and safety constraints for overhead conductor accessories.",
    source: "Power Distribution Review",
    meta: "2016, DD Ash, P Dry, R Gibbon"
  },
  {
    id: 5,
    relevance: "High relevance",
    type: "Conference Paper",
    title: "Overhead-line practice and live-line accessories",
    summary:
      "Older reference discussing live-line maintenance equipment and field workflows.",
    source: "Institution of Electrical Engineers",
    meta: "1975, EH Cox"
  },
  {
    id: 6,
    relevance: "High relevance",
    type: "Conference Paper",
    title: "Aluminum electrical conductor handbook",
    summary:
      "Provides background on aluminum conductor properties and connection requirements.",
    source: "Academia / Technical Archive",
    meta: "2004, S Saric"
  }
];

export const PRODUCT_RESULTS = [
  {
    id: 1,
    domain: "hubbel.com",
    title: "Hubbell HLC Series Hot Line Clamp with Hot-Stick Interface",
    description:
      "The product is a direct commercial embodiment of the user's requirements, matching the live-line clamp concept, conductor engagement, tightening interface, and hot-stick installation workflow.",
    price: "Commercial catalog",
    score: 10,
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=300&auto=format&fit=crop",
    breakdownOpen: true,
    features: [
      "Live-line clamp body — Clamp is intended for energized overhead conductor work.",
      "Tool-compatible operation — Hot-stick compatible interface supports remote installation.",
      "Bimetallic connection — Material variants support live-line conductor use depending on selected catalog option."
    ]
  },
  {
    id: 2,
    domain: "shopwagner.com",
    title: "Chance C-Type Hot Line Clamp for Overhead Distribution Conductors",
    description:
      "The product explicitly meets the core technical requirements, including an overhead line clamp body, mechanical tightening, and hot-stick installation compatibility.",
    price: "$569.05",
    score: 10,
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=300&auto=format&fit=crop",
    breakdownOpen: false,
    features: []
  },
  {
    id: 3,
    domain: "tekit.com",
    title: "TE Connectivity Live-Line Tap Connector with Aluminum-Copper Options",
    description:
      "The product directly supports the required power distribution use case, including live-line tapping, service conductor connection, and dissimilar metal compatibility in selected models.",
    price: "$1,054.00",
    score: 10,
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=300&auto=format&fit=crop",
    breakdownOpen: false,
    features: []
  },
  {
    id: 4,
    domain: "maclempower.com",
    title: "MacLean Power Systems Bronze Hot Line Clamp Assembly",
    description:
      "This product is almost explicit evidence of a hot-line clamp used for overhead distribution, with conductor engagement, screw-style tightening, and field installation compatibility.",
    price: "$699.99",
    score: 10,
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=300&auto=format&fit=crop",
    breakdownOpen: false,
    features: []
  }
];



export const PROVISIONAL_SECTIONS = [
  {
    id: "title",
    number: "01",
    title: "Title of Invention",
    content: "Bimetallic Clamp and Tool for Live Tapping of Overhead Power Lines"
  },
  {
    id: "background",
    number: "02",
    title: "Background",
    content:
      "Electrical utilities employ extensive networks of overhead power lines, typically comprising bare aluminium or aluminium-alloy conductors. Establishing a secure and reliable connection, or tap, from these main power lines to a service drop conductor is a routine but safety-critical operation. Conventional methods may require power interruption or close manual interaction near energized conductors. Existing clamps may also suffer from galvanic corrosion when copper conductors are joined to aluminium conductors without an appropriate bimetallic interface."
  },
  {
    id: "summary",
    number: "03",
    title: "Summary",
    content:
      "The disclosure describes a bi-metallic clamp system designed to safely tap power from a bare aluminium overhead power line. The system includes a clamp accommodating copper service conductors and an insulated hand tool enabling quick installation without power-line disruption. The clamp includes a tightening mechanism, mating tool interface, and corrosion-resistant conductive structure."
  },
  {
    id: "field",
    number: "04",
    title: "Field of Invention",
    content:
      "The invention relates to electrical distribution hardware, and more specifically to live-line installable bimetallic clamp assemblies and insulated installation tools for overhead conductors."
  },
  {
    id: "description",
    number: "05",
    title: "Detailed Description",
    content:
      "In one implementation, the clamp body is configured to hook over a bare aluminium overhead conductor and receive a copper service entry conductor. A tightening member, such as a bolt, screw, pressure plate, or threaded shaft, applies clamping force to secure the conductors. An insulated tool engages a mating interface on the clamp body to lift, position, tighten, and release the clamp from ground level or from a safe distance."
  },
  {
    id: "advantages",
    number: "06",
    title: "Advantages",
    content:
      "The system reduces manual exposure near energized conductors, supports installation without service interruption, improves bimetallic compatibility, and provides a repeatable clamp tightening workflow."
  },
  {
    id: "abstract",
    number: "07",
    title: "Abstract",
    content:
      "A bimetallic clamp and insulated installation tool are provided for live tapping a bare aluminium overhead power conductor to a copper service conductor. The clamp includes a conductor engagement body, tightening mechanism, and tool mating interface enabling remote installation and release."
  }
];

export const NON_PROVISIONAL_SECTIONS = [
  {
    id: "technical-field",
    group: "Specification",
    number: "01",
    title: "Technical Field",
    content:
      "The disclosure relates to electrical distribution hardware and, more specifically, to live-line installable bimetallic clamp assemblies and insulated installation tools for overhead conductors."
  },
  {
    id: "problem-statement",
    group: "Specification",
    number: "02",
    title: "Problem Statement",
    content:
      "Service tapping of live overhead conductors creates safety, downtime, and material compatibility challenges, particularly when copper service entry conductors must be connected to aluminium distribution lines."
  },
  {
    id: "block-diagram-notes",
    group: "Drawings",
    number: "03",
    title: "Block Diagram Notes",
    content:
      "Figure 1 may show the system architecture including overhead conductor, bimetallic clamp body, copper service entry, tightening screw, mating adapter, and insulated installation pole."
  },
  {
    id: "flow-chart-notes",
    group: "Drawings",
    number: "04",
    title: "Flow Chart Notes",
    content:
      "Figure 2 may show the installation sequence: prepare clamp, attach tool, raise clamp, hook onto conductor, tighten, verify connection, release tool, and complete service tap without power interruption."
  },
  {
    id: "claims",
    group: "Claims",
    number: "05",
    title: "Claims",
    content:
      "1. A live-line installable bimetallic clamp assembly comprising a clamp body configured to engage an aluminium overhead conductor, a service conductor interface configured to receive a copper conductor, a tightening member configured to secure the clamp body, and a tool mating interface configured to be engaged by an insulated installation tool."
  },
  {
    id: "block-diagrams",
    group: "Drawings",
    number: "06",
    title: "Block Diagrams",
    content:
      "Block diagrams may include the conductor path, clamp body, copper service interface, tightening mechanism, tool adapter, insulated tool shaft, and operator control portion."
  },
  {
    id: "flow-charts",
    group: "Drawings",
    number: "07",
    title: "Flow Charts",
    content:
      "Flow charts may describe remote installation, clamp tightening, tool release, and optional inspection or verification steps."
  }
];

export const FEATURE_MAPPING_ROWS = [
  {
    id: 1,
    featureType: "P1",
    feature: "Bi-metallic clamp for tapping power from a bare Aluminium overhead power line.",
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
    feature: "Bi-metallic clamp for tapping power from a bare Aluminium overhead power line.",
    evidence:
      "The reference describes a clamp for operating grounding or tap-like clamp structures on overhead electrical conductors. The document also teaches clamping support and conductor engagement.",
    whereFound: "Description / Figures",
    level: "Partially Found"
  },
  {
    id: 5,
    featureType: "S1",
    feature: "Bi-metallic clamp for tapping power from a bare Aluminium overhead power line.",
    evidence:
      "The reference describes a clamp for operating grounding or tap-like clamp structures on overhead electrical conductors.",
    whereFound: "Description / Figures",
    level: "Partially Found"
  },
  {
    id: 6,
    featureType: "P1",
    feature: "Bi-metallic clamp for tapping power from a bare Aluminium overhead power line.",
    evidence:
      "The reference describes a clamp for operating grounding or tap-like clamp structures on overhead electrical conductors.",
    whereFound: "Description / Figures",
    level: "Partially Found"
  },
  {
    id: 7,
    featureType: "P1",
    feature: "Bi-metallic clamp for tapping power from a bare Aluminium overhead power line.",
    evidence:
      "The reference describes a clamp for operating grounding or tap-like clamp structures on overhead electrical conductors.",
    whereFound: "Description / Figures",
    level: "Partially Found"
  },
  {
    id: 8,
    featureType: "P1",
    feature: "Bi-metallic clamp for tapping power from a bare Aluminium overhead power line.",
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

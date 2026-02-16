import {
  Packer,
  Document,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  convertInchesToTwip,
} from "docx";
import {
  FaPlus,
  FaTimes,
  FaFilePdf,
  FaFileWord,
  FaArrowRight,
} from "react-icons/fa";
import axios from "axios";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAuthStore from "../../store/authStore";
import DraftSection from "../Shared/DraftSection";
// import CustomLoader from "../Shared/CustomLoader";
import { getSafeFilename } from "../../utils/formatUtils";
import { htmlToDocxParagraphs } from "../../utils/docxUtils";

import "../../assets/css/Draft.css";

const ProvisionalDraftResult = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { projectId } = useParams();
  const [draftData, setDraftData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { toggleConsultModal, socket } = useAuthStore();
  const [inventionData, setInventionData] = useState(null);
  const [generatingSections, setGeneratingSections] = useState({});
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const isAnyGenerating = Object.values(generatingSections).some(Boolean);

  const [sectionVisibility, setSectionVisibility] = useState({
    title_of_invention: true,
    background_of_invention: true,
    summary_of_invention: true,
    fields_of_invention: true,
    detailed_description: true,
    advantages_of_invention: true,
    // add_embodiments: false,
    // add_few_claims: false,
    // add_key_features: false,
    // add_abstract: false,
    // add_custom_paragraph: false,
  });

  const sectionsConfig = [
    { key: "title_of_invention", label: "Title of Invention" },
    { key: "background_of_invention", label: "Background" },
    { key: "summary_of_invention", label: "Summary" },
    { key: "fields_of_invention", label: "Field of Invention" },
    { key: "detailed_description", label: "Detailed Description" },
    { key: "advantages_of_invention", label: "Advantages" },
    // { key: "add_embodiments", label: "Embodiments", isOptional: true },
    // { key: "add_few_claims", label: "Claims", isOptional: true },
    // { key: "add_key_features", label: "Key Features", isOptional: true },
    // { key: "add_abstract", label: "Abstract", isOptional: true },
    {
      key: "add_custom_paragraph",
      label: "Custom Paragraph",
      isOptional: true,
    },
  ];

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`/api/provisionaldraft/${projectId}`);

      if (response.data.inventionData) {
        setInventionData(response.data.inventionData);
      }

      const incomingDraft = response.data.provisionalData;

      if (incomingDraft) {
        setDraftData(incomingDraft);

        setSectionVisibility((prev) => ({
          ...prev,
          add_embodiments:
            prev.add_embodiments || !!incomingDraft.add_embodiments,
          add_few_claims: prev.add_few_claims || !!incomingDraft.add_few_claims,
          add_key_features:
            prev.add_key_features || !!incomingDraft.add_key_features,
          add_abstract: prev.add_abstract || !!incomingDraft.add_abstract,
          add_custom_paragraph:
            prev.add_custom_paragraph || !!incomingDraft.add_custom_paragraph,
        }));

        if (incomingDraft.status === "Generating") {
          setGeneratingSections((prev) => ({
            ...prev,
            background_of_invention: !incomingDraft.background_of_invention,
            summary_of_invention: !incomingDraft.summary_of_invention,
            fields_of_invention: !incomingDraft.fields_of_invention,
            detailed_description: !incomingDraft.detailed_description,
            advantages_of_invention: !incomingDraft.advantages_of_invention,
          }));
        }
      } else {
        setDraftData((prev) => ({
          ...prev,
          title_of_invention: response.data.inventionData.project_title,
        }));
        triggerInitialGeneration();
      }
    } catch (error) {
      if (!import.meta.env.PROD) {
        console.log("Draft fetch error:", error);
      }
      toast.error(
        "Provisional draft not found. It may have been deleted or you do not have permission to view it.",
      );
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerInitialGeneration = async () => {
    try {
      setGeneratingSections((prev) => ({
        ...prev,
        background_of_invention: true,
        summary_of_invention: true,
        fields_of_invention: true,
        detailed_description: true,
        advantages_of_invention: true,
      }));

      await axios.get(`/api/provisionaldraft/generateall/${projectId}`);
    } catch (error) {
      if (!import.meta.env.PROD) {
        console.error("Generation Trigger Error:", error);
      }

      setGeneratingSections((prev) => ({
        ...prev,
        background_of_invention: false,
        summary_of_invention: false,
        fields_of_invention: false,
        detailed_description: false,
        advantages_of_invention: false,
      }));

      toast.error("Generation failed. Please refresh the page to try again!");
    }
  };

  // const handleSaveSection = async (
  //   sectionKey,
  //   newContent,
  //   showModal = true,
  // ) => {
  //   const currentContent = draftData[sectionKey];
  //   try {
  //     setDraftData((prev) => ({ ...prev, [sectionKey]: newContent }));
  //     await axios.put(`/api/provisionaldraft/update/${projectId}`, {
  //       field: sectionKey,
  //       content: newContent,
  //     });
  //     if (showModal) {
  //       toast.success("Section updated!");
  //     }
  //   } catch (error) {
  //     if (!import.meta.env.PROD) {
  //       console.error("Section updation error:", error);
  //     }
  //     setDraftData((prev) => ({ ...prev, [sectionKey]: currentContent }));
  //     if (showModal) {
  //       toast.error("Failed to save section. Please try again!");
  //     }
  //   }
  // };

  // const handleRegenerate = async (sectionKey) => {
  //   if (sectionKey === "add_custom_paragraph") {
  //     return;
  //   }

  //   setGeneratingSections((prev) => ({ ...prev, [sectionKey]: true }));
  //   try {
  //     await axios.post(`/api/provisionaldraft/regenerate/${projectId}`, {
  //       field: sectionKey,
  //     });
  //   } catch (error) {
  //     if (!import.meta.env.PROD) {
  //       console.error("Regeneration error:", error);
  //     }
  //     setGeneratingSections((prev) => ({ ...prev, [sectionKey]: false }));
  //     toast.error("Failed to regenerate section. Please try again!");
  //   }
  // };

  // const toggleSection = async (key) => {
  //   const isVisible = sectionVisibility[key];
  //   setSectionVisibility((prev) => ({ ...prev, [key]: !isVisible }));
  //   if (!isVisible && key !== "add_custom_paragraph") {
  //     handleRegenerate(key);
  //   } else {
  //     setDraftData((prev) => ({ ...prev, [key]: "" }));
  //     if (draftData[key]) {
  //       handleSaveSection(key, "", false);
  //     }
  //   }
  // };

  const handleDownloadDocx = () => {
    const docChildren = [];

    // Helper to add sections
    const addSection = (title, contentKey) => {
      const content = draftData[contentKey];
      if (!content || !sectionVisibility[contentKey]) return;

      // 1. Main Section Title (e.g. "BACKGROUND")
      docChildren.push(
        new Paragraph({
          text: title.toUpperCase(),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          alignment: AlignmentType.LEFT,
        }),
      );

      // 2. Content Processing
      if (contentKey === "add_few_claims") {
        // Special handling for Claims to ensure strict numbering 1. 2. 3.
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;
        const claimItems = Array.from(tempDiv.querySelectorAll("li, p"))
          .map((el) => el.textContent.trim())
          .filter((text) => text.length > 0);

        claimItems.forEach((claimText) => {
          docChildren.push(
            new Paragraph({
              text: claimText,
              numbering: {
                reference: "claims-numbering",
                level: 0,
              },
              spacing: { after: 200 },
            }),
          );
        });
      } else {
        // Standard handling for text/lists
        const contentParagraphs = htmlToDocxParagraphs(content);
        docChildren.push(...contentParagraphs);
      }
    };

    // Build Document Structure (Order matters)
    sectionsConfig.forEach((section) => {
      addSection(section.label, section.key);
    });

    // Create Document with Styles
    const doc = new Document({
      numbering: {
        config: [
          {
            reference: "claims-numbering",
            levels: [
              {
                level: 0,
                format: "decimal",
                text: "%1.",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(0.5),
                      hanging: convertInchesToTwip(0.25),
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      sections: [
        {
          properties: {},
          children: docChildren,
        },
      ],
      styles: {
        paragraphStyles: [
          // Main Section Headings (e.g. TITLE, BACKGROUND)
          {
            id: "Heading1",
            name: "Heading 1",
            run: {
              size: 28, // 14pt
              bold: true,
              color: "000000", // Black
              font: "Arial",
            },
            paragraph: {
              spacing: { after: 120 },
            },
          },
          // Sub-Headings inside content (e.g. "System Architecture")
          {
            id: "Heading3",
            name: "Heading 3",
            run: {
              size: 24, // 12pt
              bold: true,
              color: "000000", // Black
              font: "Arial",
            },
            paragraph: {
              spacing: { before: 240, after: 120 },
            },
          },
          // Body Text
          {
            id: "Normal",
            name: "Normal",
            run: {
              size: 24, // 12pt
              font: "Times New Roman",
              color: "000000",
            },
            paragraph: {
              spacing: { line: 276 }, // 1.15 line spacing
              alignment: AlignmentType.JUSTIFIED,
            },
          },
        ],
      },
    });

    // Generate & Download
    Packer.toBlob(doc).then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Provisional Draft - ${getSafeFilename(
        draftData.title_of_invention,
      )}.docx`;
      link.click();
    });

    setShowDownloadOptions(false);

    setTimeout(() => {
      toast.success("Document downloaded successfully.");
    }, 100);
  };

  const handleDownloadPDF = async () => {
    toast.info("Preparing PDF...");
    setShowDownloadOptions(false);

    try {
      const response = await axios.get(
        `/api/provisionaldraft/download-pdf/${projectId}`,
        {
          responseType: "blob",
        },
      );

      const contentDisposition = response.headers["content-disposition"];
      let filename = `Provisional Draft - ${projectId}.pdf`; // Fallback
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch.length > 1) {
          filename = filenameMatch[1];
        }
      }

      saveAs(new Blob([response.data]), filename);

      toast.success("PDF Downloaded!");
    } catch (error) {
      if (!import.meta.env.PROD) {
        console.error("PDF Download Error:", error);
      }
      toast.error("Failed to download PDF. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDownloadOptions(false);
      }
    };

    if (showDownloadOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDownloadOptions]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleFieldGenerated = (data) => {
      if (projectId === data.projectId) {
        setDraftData((prev) => ({
          ...prev,
          [data.field]: data.content,
        }));

        setGeneratingSections((prev) => ({
          ...prev,
          [data.field]: false,
        }));
      }
    };

    const handleFieldError = (data) => {
      if (projectId === data.projectId) {
        setGeneratingSections((prev) => ({
          ...prev,
          [data.field]: false,
        }));

        if (!import.meta.env.PROD) {
          console.error(`Error generation ${data.field}:`, data.error);
        }

        const sectionConfig = sectionsConfig.find((s) => s.key === data.field);

        const label = sectionConfig
          ? sectionConfig.label
          : data.field?.replace(/_/g, " ") || "Section";

        toast.error(`Failed to generate ${label}`);
      }
    };

    socket.on("provisional_field_generated", handleFieldGenerated);
    socket.on("provisional_field_error", handleFieldError);

    return () => {
      socket.off("provisional_field_generated", handleFieldGenerated);
      socket.off("provisional_field_error", handleFieldError);
    };
  }, [socket]);

  return (
    <>
      <div className="draft-container container-fluid">
        {/* Header */}
        <div className="page-header d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h1 className="page-title">Provisional Draft</h1>
            <p className="page-subtitle">
              Generate a comprehensive provisional patent specification
            </p>
          </div>
          <div>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() =>
                navigate(`/provisiodraft/${projectId}`, {
                  state: {
                    pdfText: inventionData.pdf_text,
                  },
                })
              }
            >
              Edit Invention Text
            </button>
          </div>
        </div>

        <div className="row g-4">
          {/* Main Content */}
          <div className="col-lg-7 col-xl-8">
            <div className="draft-content-wrapper">
              {sectionsConfig.map((section) => {
                const isGenerating = generatingSections[section.key];

                return (
                  <DraftSection
                    key={section.key}
                    sectionKey={section.key}
                    title={section.label}
                    content={draftData[section.key] || ""}
                    isVisible={sectionVisibility[section.key]}
                    isRegenerating={isGenerating}
                    onSave={handleSaveSection}
                    onRegenerate={handleRegenerate}
                  />
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="col-lg-5 col-xl-4">
            <div className="sidebar-sticky">
              <div className="sidebar-card">
                <h6 className="sidebar-title">Manage Sections</h6>
                <div className="sidebar-btn-grid">
                  {sectionsConfig
                    .filter((s) => s.isOptional)
                    .map((s) => (
                      <button
                        key={s.key}
                        className={`sidebar-action-btn ${
                          sectionVisibility[s.key] ? "active" : ""
                        }`}
                        onClick={() => toggleSection(s.key)}
                        disabled={generatingSections[s.key]}
                      >
                        {sectionVisibility[s.key] ? <FaTimes /> : <FaPlus />}
                        {s.label}
                      </button>
                    ))}
                </div>
              </div>

              <div className="sidebar-card">
                <h6 className="sidebar-title">Export & Actions</h6>
                <div className="d-flex flex-column gap-2">
                  <div className="position-relative" ref={dropdownRef}>
                    <button
                      className="btn-sidebar-primary"
                      onClick={() =>
                        setShowDownloadOptions(!showDownloadOptions)
                      }
                      disabled={isAnyGenerating}
                    >
                      Download Draft <span>▼</span>
                    </button>
                    {showDownloadOptions && (
                      <div
                        className="dropdown-menu show w-100 mt-1 border-0"
                        style={{
                          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                          borderRadius: "12px",
                        }}
                      >
                        <button
                          className="dropdown-item d-flex align-items-center gap-2"
                          onClick={handleDownloadDocx}
                        >
                          <FaFileWord className="text-primary" /> As DOCX
                        </button>
                        <button
                          className="dropdown-item d-flex align-items-center gap-2"
                          onClick={handleDownloadPDF}
                        >
                          <FaFilePdf className="text-danger" /> As PDF
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    className="btn-sidebar-outline mt-2"
                    onClick={() => navigate(`/search-report/${projectId}`)}
                  >
                    Inno Check <FaArrowRight className="ms-1" />
                  </button>

                  <button
                    className="btn-sidebar-outline mt-2"
                    onClick={() =>
                      navigate(`/non-provisional-draft/${projectId}`)
                    }
                  >
                    Non Provisional Draft <FaArrowRight className="ms-1" />
                  </button>

                  <button
                    className="btn-sidebar-dark mt-2"
                    onClick={() => toggleConsultModal(projectId)}
                  >
                    Consult Expert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading && <CustomLoader loaderText="Retrieving data..." />}
    </>
  );
};

export default ProvisionalDraftResult;

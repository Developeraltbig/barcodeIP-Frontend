import { Packer, Document, ImageRun, Paragraph, HeadingLevel, AlignmentType, convertInchesToTwip } from 'docx';
import { FaPlus, FaTimes, FaFilePdf, FaFileWord, FaArrowRight, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from "@mui/material";
import '../../../assets/css/style.css';
import { getPlantUmlImageUrl } from '../../../utils/plantUmlUtils';
import { htmlToDocxParagraphs } from '../../../utils/docxUtils';
import { getSafeFilename } from '../../../utils/formatUtils';
import DraftSection from './DraftSection';
import DiagramSection from './DiagramSection';
import useAuthStore from '../../../store/authStore';

const DraftMasterResult = ({data}) => {
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
    abstract: true,
    background_of_invention: true,
    summary_of_invention: true,
    fields_of_invention: true,
    claims: true,
    brief_description: true,
    flow_chart: true,
    block_diagram: true,
    detailed_descriptions: true,
    embodiments: false,
    sequence_listing: false,
    industrial_applicability: false,
    custom_paragraphs: false
  });

  const sectionsConfig = [
    { key: 'title_of_invention', label: 'Title of Invention' },
    { key: 'abstract', label: 'Abstract' },
    { key: 'background_of_invention', label: 'Background' },
    { key: 'summary_of_invention', label: 'Summary' },
    { key: 'fields_of_invention', label: 'Field of Invention' },
    { key: 'claims', label: 'Claims' },
    { key: 'brief_description', label: 'Brief Description of Drawing' },
    { key: 'flow_chart', label: 'Flow Chart' },
    { key: 'block_diagram', label: 'Block Diagram' },
    {
      key: 'detailed_descriptions',
      label: 'Detailed Description of Invention'
    },
    { key: 'embodiments', label: 'Embodiments', isOptional: true },
    { key: 'sequence_listing', label: 'Sequence Listing', isOptional: true },
    {
      key: 'industrial_applicability',
      label: 'Industrial Applicability',
      isOptional: true
    },
    { key: 'custom_paragraphs', label: 'Custom Paragraph', isOptional: true }
  ];

  const fetchData = async () => {
    try {
      setIsLoading(true);

      // --- COMMENTED OUT API CALL ---
      // const response = await axios.get(`/api/nonprovisionaldraft/${projectId}`);
      // if (response.data.inventionData) {
      //   setInventionData(response.data.inventionData);
      // }
      // const incomingDraft = response.data.nonProvisionalData;
      // -----------------------------

      // --- USING STATIC DATA ---
      const incomingDraft = data;
      setInventionData(data);

      // Simulate a small network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      // -------------------------

      if (incomingDraft) {
        setDraftData(incomingDraft);

        setSectionVisibility((prev) => ({
          ...prev,
          embodiments: prev.embodiments || !!incomingDraft.embodiments,
          sequence_listing: prev.sequence_listing || !!incomingDraft.sequence_listing,
          industrial_applicability: prev.industrial_applicability || !!incomingDraft.industrial_applicability,
          custom_paragraphs: prev.custom_paragraphs || !!incomingDraft.custom_paragraphs
        }));

        if (incomingDraft.status === 'Generating') {
          setGeneratingSections((prev) => ({
            ...prev,
            abstract: !incomingDraft.abstract,
            background_of_invention: !incomingDraft.background_of_invention,
            summary_of_invention: !incomingDraft.summary_of_invention,
            fields_of_invention: !incomingDraft.fields_of_invention,
            claims: !incomingDraft.fields_of_invention,
            brief_description: !incomingDraft.brief_description,
            flow_chart: !!incomingDraft.brief_description && !incomingDraft.flow_chart,
            block_diagram: !!incomingDraft.brief_description && !incomingDraft.block_diagram,
            detailed_descriptions: !!incomingDraft.brief_description && !incomingDraft.detailed_descriptions
          }));
        }
      } else {
        // Fallback for new drafts
        setDraftData((prev) => ({
          ...prev,
          title_of_invention: data.title_of_invention
        }));
        triggerInitialGeneration();
      }
    } catch (error) {
      console.log('Draft fetch error:', error);
      toast.error('Error loading data.');
    } finally {
      setIsLoading(false);
    }
  };

  const triggerInitialGeneration = async () => {
    // --- MOCKED GENERATION ---
    toast.info('Generating initial draft sections (Mock)...');
    setGeneratingSections((prev) => ({
      ...prev,
      abstract: true,
      background_of_invention: true
      // ... others
    }));

    setTimeout(() => {
      setGeneratingSections({});
      setDraftData(STATIC_DRAFT_DATA); // Just fill it all in after delay
      toast.success('Generation Complete');
    }, 2000);
    // ------------------------
  };

  const handleSaveSection = async (sectionKey, newContent, showModal = true) => {
    if (sectionKey === 'flow_chart' || sectionKey === 'block_diagram') {
      return;
    }

    const currentContent = draftData[sectionKey];
    try {
      setDraftData((prev) => ({ ...prev, [sectionKey]: newContent }));

      // --- COMMENTED OUT API CALL ---
      // await axios.put(`/api/nonprovisionaldraft/update/${projectId}`, {
      //   field: sectionKey,
      //   content: newContent,
      // });
      // -----------------------------

      if (showModal) {
        toast.success('Section updated (Local Only)!');
      }
    } catch (error) {
      console.error('Section updation error:', error);
      setDraftData((prev) => ({ ...prev, [sectionKey]: currentContent }));
      if (showModal) {
        toast.error('Failed to save section.');
      }
    }
  };

  const handleRegenerate = async (sectionKey) => {
    if (sectionKey === 'custom_paragraphs' || sectionKey === 'sequence_listing') {
      return;
    }

    setGeneratingSections((prev) => ({ ...prev, [sectionKey]: true }));

    // --- SIMULATED REGENERATION ---
    setTimeout(() => {
      setGeneratingSections((prev) => ({ ...prev, [sectionKey]: false }));
      // Optionally change the text to show it "Regenerated"
      setDraftData((prev) => ({
        ...prev,
        [sectionKey]: prev[sectionKey] + ' (Regenerated)'
      }));
      toast.success(`${sectionKey.replace(/_/g, ' ')} regenerated!`);
    }, 2000);
    // -----------------------------
  };

  const toggleSection = async (key) => {
    const isVisible = sectionVisibility[key];
    setSectionVisibility((prev) => ({ ...prev, [key]: !isVisible }));
    if (!isVisible && key !== 'custom_paragraphs' && key !== 'sequence_listing') {
      handleRegenerate(key);
    } else {
      setDraftData((prev) => ({ ...prev, [key]: '' }));
      if (draftData[key]) {
        handleSaveSection(key, '', false);
      }
    }
  };

  const handleDownloadDocx = async () => {
    const docChildren = [];

    // Helper to add a section with a standardized header
    const addSection = (title, contentKey) => {
      const content = draftData[contentKey];
      if (!content || !sectionVisibility[contentKey]) {
        return;
      }

      // Add Section Title
      docChildren.push(
        new Paragraph({
          text: title.toUpperCase(),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          alignment: AlignmentType.LEFT
        })
      );

      // 2. Special Handling for Claims: Force Numbered List
      if (contentKey === 'claims') {
        // Create a temporary div to parse the claims HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;

        // Extract text from <li> or <p> tags
        const claimItems = Array.from(tempDiv.querySelectorAll('li, p'))
          .map((el) => el.textContent.trim())
          .filter((text) => text.length > 0);

        claimItems.forEach((claimText) => {
          docChildren.push(
            new Paragraph({
              text: claimText,
              numbering: {
                reference: 'claims-numbering', // We define this below
                level: 0
              },
              spacing: { after: 200 }
            })
          );
        });
      } else {
        // Standard processing for other sections
        const contentParagraphs = htmlToDocxParagraphs(content);
        docChildren.push(...contentParagraphs);
      }
    };

    // 1. Add Text Sections
    sectionsConfig.forEach((section) => {
      // Skip diagrams for now, handle them separately
      if (section.key !== 'flow_chart' && section.key !== 'block_diagram') {
        addSection(section.label, section.key);
      }
    });

    // 2. Handle Diagrams (Flow Chart & Block Diagram)
    const addDiagram = async (title, key) => {
      if (draftData[key] && sectionVisibility[key]) {
        try {
          // Get Image URL
          const svgUrl = getPlantUmlImageUrl(draftData[key]);
          // Switch to PNG for Docx compatibility
          const pngUrl = svgUrl.replace('/svg/', '/png/');

          const response = await fetch(pngUrl);
          const blob = await response.blob();
          const buffer = await blob.arrayBuffer();

          docChildren.push(
            new Paragraph({
              text: title.toUpperCase(),
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
              pageBreakBefore: true // Start diagrams on new page
            })
          );

          docChildren.push(
            new Paragraph({
              children: [
                new ImageRun({
                  data: buffer,
                  transformation: {
                    width: 500, // Max width in doc
                    height: 400
                  }
                })
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 }
            })
          );
        } catch (e) {
          console.error(`Failed to add diagram ${title}:`, e);
        }
      }
    };

    // We must await these image fetches
    await addDiagram('Flow Chart', 'flow_chart');
    await addDiagram('Block Diagram', 'block_diagram');

    // 3. Create Document
    const doc = new Document({
      numbering: {
        config: [
          {
            reference: 'claims-numbering',
            levels: [
              {
                level: 0,
                format: 'decimal',
                text: '%1.', // Output: "1.", "2."
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(0.5),
                      hanging: convertInchesToTwip(0.25)
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      sections: [
        {
          properties: {},
          children: docChildren
        }
      ],
      styles: {
        paragraphStyles: [
          {
            id: 'Heading1',
            name: 'Heading 1',
            run: {
              size: 28,
              bold: true,
              color: '000000',
              font: 'Arial'
            },
            paragraph: {
              spacing: { after: 120 }
            }
          },
          {
            id: 'Heading3',
            name: 'Heading 3',
            run: {
              size: 24, // 12pt
              bold: true,
              color: '000000',
              font: 'Arial'
            },
            paragraph: {
              spacing: { before: 200, after: 100 }
            }
          },
          {
            id: 'Normal',
            name: 'Normal',
            run: {
              size: 24, // 12pt
              font: 'Times New Roman',
              color: '000000'
            },
            paragraph: {
              spacing: { line: 276 } // 1.15 line spacing
            }
          }
        ]
      }
    });

    // 4. Save
    Packer.toBlob(doc).then((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Non Provisional Draft - ${getSafeFilename(draftData.title_of_invention)}.docx`;
      link.click();
    });

    setShowDownloadOptions(false);

    setTimeout(() => {
      toast.success('Document downloaded successfully.');
    }, 100);
  };

  const handleDownloadPDF = async () => {
    toast.info('Preparing PDF (Mock)...');
    setShowDownloadOptions(false);
    // Since we don't have a backend to generate PDF, we can't really do this client-side easily
    // without a library like jsPDF. For now, just a toast.
    toast.warning('PDF Download requires backend connection.');
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
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDownloadOptions]);

  // --- COMMENTED OUT SOCKET LOGIC ---
  /*
  useEffect(() => {
    if (!socket) {
      return;
    }
    const handleFieldGenerated = (data) => {
      // ... socket logic
    };
    const handleFieldError = (data) => {
      // ... socket logic
    };
    socket.on("non_provisional_field_generated", handleFieldGenerated);
    socket.on("non_provisional_field_error", handleFieldError);
    return () => {
      socket.off("non_provisional_field_generated", handleFieldGenerated);
      socket.off("non_provisional_field_error", handleFieldError);
    };
  }, [socket]);
  */
  // ----------------------------------

  const dependents = ['flow_chart', 'block_diagram', 'detailed_descriptions'];
  const isDependentsGenerating = dependents.some((key) => generatingSections[key]);

  return (
    <>
<Box className="draft-container">
  {/* Header */}

  <Box>
    {/* Main Content */}
    <Box>
      <Box class="draft-content-wrapper">
        {sectionsConfig.map((section) => {
          const isDiagram =
            section.key === "flow_chart" || section.key === "block_diagram";
          const isGenerating = generatingSections[section.key];
          const disableRegenerate =
            section.key === "brief_description" && isDependentsGenerating;

          // Conditional Rendering
          if (isDiagram) {
            return (
              <DiagramSection
                key={section.key}
                sectionKey={section.key}
                title={section.label}
                content={draftData[section.key] || ""}
                isVisible={sectionVisibility[section.key]}
                isRegenerating={isGenerating}
                onRegenerate={handleRegenerate}
              />
            );
          }

          // Standard Text Section
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
              disableRegenerate={disableRegenerate}
            />
          );
        })}
      </Box>
    </Box>
  </Box>
</Box>
    </>
  );
};

export default DraftMasterResult;

import { Packer, Document, ImageRun, Paragraph, HeadingLevel, AlignmentType, convertInchesToTwip } from 'docx';
import { FaPlus, FaTimes, FaFilePdf, FaFileWord, FaArrowRight, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import '../../../assets/css/style.css';
import { getPlantUmlImageUrl } from '../../../utils/plantUmlUtils';
import { htmlToDocxParagraphs } from '../../../utils/docxUtils';
import { getSafeFilename } from '../../../utils/formatUtils';
import DraftSection from './DraftSection';
import DiagramSection from './DiagramSection';
import useAuthStore from '../../../store/authStore';

// --- STATIC DATA DEFINITION ---
// const STATIC_INVENTION_DATA = {
//   title: 'AI-Powered Smart Home Energy Optimizer',
//   pdf_text: 'Sample extraction text from the uploaded PDF...'
// };

// const STATIC_DRAFT_DATA = {
//   _id: {
//     $oid: '6992d1bb1c12c22630785fee'
//   },
//   project_id: {
//     $oid: '698da9f6a049d678208e9f5b'
//   },
//   u_id: {
//     $oid: '698d9ec60facefb740a85469'
//   },
//   title_of_invention: '<p>Small Molecule Estrogen Receptor Inhibitor for Breast Cancer Treatment</p>',
//   title_of_invention_generating: false,
//   abstract:
//     '<p>Concepts and technologies disclosed herein are directed to a novel small molecule, with a molecular weight of 222.328 g/mol, specifically designed for treating breast cancer. This molecule selectively binds to estrogen receptors alpha and beta, thereby blocking the estrogen hormone signal. This mechanism aids in controlling tumor growth, offering a promising therapeutic option, particularly for ER-positive breast cancer cases. The invention aims to provide an improved treatment with potentially fewer or no side effects compared to current medications, addressing the significant burden of breast cancer.</p>',
//   abstract_generating: false,
//   background_of_invention:
//     '<p>The present disclosure relates to the field of oncology, and more specifically to therapeutic compounds for the treatment of hormone-dependent cancers. Breast cancer represents a significant global health burden, accounting for a substantial percentage of all cancer diagnoses in women. The high incidence and mortality rates associated with the disease underscore the persistent need for effective and well-tolerated treatment options. A majority of breast cancer cases are diagnosed in postmenopausal women, presenting unique challenges for therapeutic intervention.</p><p>The pathophysiology of many breast tumors is closely linked to hormonal imbalances. Steroid hormones, particularly estrogen, play a critical role in regulating cell proliferation in breast tissue. Elevated levels of estrogen can lead to the activation of specific signaling pathways that promote uncontrolled cell division, a hallmark of cancer. This activation is mediated through the estrogen receptor (ER). A significant majority, approximately 70-80%, of all breast cancer cases are classified as estrogen receptor-positive (ER-positive), making the estrogen signaling pathway a primary target for therapeutic strategies.</p><p>Current treatment paradigms for ER-positive breast cancer primarily focus on antagonizing the estrogen signaling pathway. Therapies are designed to block the estrogen receptor or inhibit estrogen production to slow or halt tumor growth. While these approaches have demonstrated clinical efficacy, they are often accompanied by a range of undesirable side effects. Patients may experience adverse effects such as vaginal discharge, menstrual irregularities, an increased risk of thromboembolic events, joint pain, and a reduction in bone density leading to conditions like osteoporosis. Consequently, there remains a critical need in the art for alternative therapeutic agents that can effectively treat ER-positive breast cancer while presenting a more favorable safety profile.</p>',
//   background_of_invention_generating: false,
//   summary_of_invention:
//     '<p>A novel small molecule addresses breast cancer by specifically binding to estrogen receptors alpha and beta. This molecule (MW 222.328 g/mol) effectively blocks estrogen hormone signals, which are key drivers of tumor development. The invention offers a promising therapeutic approach to control tumor growth with potentially fewer side effects.</p>\n<ul>\n    <li>Optionally, the small molecule has a molecular weight of 222.328 g/mol.</li>\n    <li>Optionally, the molecule is designed to inhibit estrogen-receptor-mediated cell division.</li>\n    <li>Optionally, the molecule aims to control tumor growth effectively.</li>\n    <li>Optionally, the molecule is anticipated to have fewer or no adverse side effects.</li>\n    <li>Optionally, the molecule offers an improved treatment alternative for breast cancer.</li>\n</ul>',
//   summary_of_invention_generating: false,
//   fields_of_invention:
//     '<p>The invention belongs to the field of oncology, particularly methods and compositions for treating hormone-dependent cancers like breast cancer. More specifically, it relates to novel small molecules and pharmaceutical compositions designed to modulate estrogen receptor activity, thereby inhibiting abnormal cell proliferation and tumor growth associated with elevated hormone levels and improved safety profiles.</p>',
//   fields_of_invention_generating: false,
//   claims:
//     '<p>A method for treating estrogen receptor (ER)-positive breast cancer in a subject, the method comprising: administering to the subject a therapeutically effective amount of a small molecule compound having a molecular weight of approximately 222.328 g/mol, wherein said compound is configured to bind to one or more estrogen receptors of the subject.</p><ol><li>The method of claim 1, wherein the binding of the compound to the one or more estrogen receptors blocks a signaling pathway initiated by an estrogen hormone, thereby inhibiting estrogen-mediated cell division.</li><li>The method of claim 1, wherein the one or more estrogen receptors comprise estrogen receptor alpha (ERα) and estrogen receptor beta (ERβ).</li><li>The method of claim 3, wherein the compound specifically binds to both estrogen receptor alpha (ERα) and estrogen receptor beta (ERβ).</li><li>The method of claim 1, wherein the administration of the compound results in the control or inhibition of breast tumor growth.</li><li>The method of claim 1, wherein the compound is administered as part of a pharmaceutical composition that further comprises at least one pharmaceutically acceptable excipient or carrier.</li><li>The method of claim 1, wherein the subject is a human female.</li><li>The method of claim 7, wherein the human female is a post-menopausal patient.</li></ol>',
//   claims_generating: false,
//   brief_description:
//     '<p>Figure 1: A block diagram illustrating the interaction between estrogen (110), estrogen receptor (120), and the small molecule (130) to block signaling (150) within a cell (140).</p><p>Figure 2: A flow chart depicting the therapeutic pathway of the small molecule (250). It binds the estrogen receptor (260), blocks estrogen signaling (270), and inhibits uncontrolled cell division, controlling tumor growth (280).</p><p>Figure 3: A block diagram illustrating the specific binding of the small molecule (330) to both estrogen receptor alpha (310) and estrogen receptor beta (320) at their active sites (340).</p><p>Figure 4: A flow chart comparing existing breast cancer treatments (410) with significant side effects (420) to the small molecule therapy (430), which offers tumor growth control (450) with fewer or no observed side effects (440).</p><p>Figure 5: A block diagram illustrating the small molecule (530) binding to the estrogen receptor (520) to interrupt the signal transduction pathway (540), thereby preventing uncontrolled gene expression (550) and cell proliferation (560).</p><p>Figure 6: A flow chart outlining the small molecule&#39;s (620) therapeutic journey, from targeting the estrogen receptor (610) and design (620), through in vitro (630) and in vivo (640) testing, leading to its clinical application (660).</p><p>Figure 7: A block diagram showing the small molecule (710) with its molecular weight (720) and key binding moieties (730). It further illustrates the molecule&#39;s favorable pharmacokinetic properties (740).</p><p>Figure 8: A flow chart illustrating the patient benefit from small molecule therapy (830) compared to conventional treatments (820). It depicts reduced side effects (840), improved quality of life (850), and effective tumor regression (860).</p>',
//   brief_description_generating: false,
//   flow_chart:
//     '@startuml\nstart\n:Step 250: Administer the small molecule;\nif (Is estrogen receptor present?) then (yes)\n  :Step 260: Bind molecule to estrogen receptor;\n  :Step 270: Block estrogen signaling;\n  :Step 280: Inhibit uncontrolled cell division;\n  :Step 280: Control tumor growth;\nelse (no)\n  :Molecule has no target;\nendif\nstop\n@enduml',
//   flow_chart_generating: false,
//   block_diagram:
//     '@startuml\n[Estrogen 110]\n[Small Molecule 130]\n[Cell 140] -- [Estrogen Receptor 120]\n[Estrogen 110] --> [Estrogen Receptor 120] : activates\n[Small Molecule 130] --> [Estrogen Receptor 120] : binds and blocks\n[Estrogen Receptor 120] --> [Signal Transduction Pathway 540]\n[Signal Transduction Pathway 540] --> [Uncontrolled Cell Division 280]\n@enduml',
//   block_diagram_generating: false,
//   detailed_descriptions:
//     "<h3>General Overview</h3>\n<p>The present invention relates to the field of oncological therapeutics, and more specifically, to a novel small molecule compound for the treatment of hormone-receptor-positive breast cancer. Breast cancer represents a significant global health challenge, with a large percentage of cases being estrogen receptor-positive (ER-positive). In these cases, the steroid hormone estrogen promotes the growth of tumors by binding to estrogen receptors on cancer cells, which in turn stimulates cell proliferation. This mechanism is particularly prevalent in postmenopausal women. Current treatments, such as selective estrogen receptor modulators (SERMs) and aromatase inhibitors, are often associated with significant and debilitating side effects, including an increased risk of blood clots, severe joint pain, and osteoporosis, which can negatively impact a patient's quality of life and treatment adherence. Therefore, a clear and unmet need exists for a more targeted therapy with an improved safety profile that can effectively inhibit tumor growth without causing severe adverse effects.</p>\n<p>The invention described herein is a specifically designed small molecule compound with a molecular weight of 222.328 g/mol, which functions as a potent and selective antagonist of the estrogen receptor. This compound is engineered to bind with high affinity to estrogen receptors, thereby blocking the binding of endogenous estrogen and inhibiting the downstream signaling pathways that lead to uncontrolled cell division and tumor proliferation. By directly interfering with the hormonal driver of cancer growth, this small molecule offers a precise therapeutic strategy. Its unique chemical structure is intended to maximize efficacy against ER-positive cancer cells while minimizing off-target effects, presenting a promising alternative to existing treatments with a potentially superior balance of efficacy and tolerability for patients battling breast cancer.</p>\n\n<h3>System and Mechanism of Action</h3>\n<p>Referring to the figures, the fundamental mechanism of action for the disclosed invention is illustrated. Figure 1 provides a schematic representation of the molecular interactions occurring within a target cell <b>140</b>. In a typical ER-positive cancer cell, the hormone estrogen <b>110</b> enters the cell and binds to its corresponding estrogen receptor <b>120</b>. This binding event activates the receptor, initiating a cascade of intracellular signals that ultimately promote gene transcription and cell division, leading to tumor growth. The present invention introduces a small molecule <b>130</b> designed to interrupt this pathological process. The small molecule <b>130</b> acts as a competitive antagonist, meaning it is specifically designed to bind to the same site on the estrogen receptor <b>120</b> that estrogen <b>110</b> would normally occupy. By occupying this binding site, the small molecule <b>130</b> effectively prevents estrogen <b>110</b> from binding and activating the receptor, resulting in the blocking of the downstream proliferative signaling <b>150</b>. This blockade is the critical step in halting the hormonal stimulation that fuels the cancer's growth.</p>\n<p>The therapeutic pathway and its clinical outcome are further detailed in the flow chart of Figure 2. The process begins with the administration of the therapeutic agent, the small molecule <b>250</b>. Upon reaching the target tissue, the primary action of the small molecule <b>250</b> is to bind the estrogen receptor <b>260</b> within the cancerous cells. This binding event, as previously described, leads to the crucial second step: blocking estrogen signaling <b>270</b>. By preventing the estrogen-mediated signals, the molecule directly addresses the root cause of proliferation in these specific tumors. The final and most significant therapeutic consequence of this action is the inhibition of uncontrolled cell division and the subsequent control of tumor growth <b>280</b>. This pathway demonstrates how the molecule translates from a molecular-level interaction into a tangible clinical benefit, offering a direct method to manage and potentially regress ER-positive breast tumors by neutralizing their primary growth driver.</p>\n\n<h3>Embodiments and Formulations</h3>\n<p>In various embodiments, the small molecule of the present invention may be synthesized and formulated into a variety of pharmaceutical compositions suitable for administration to a subject in need thereof. The specific formulation can be adapted to optimize bioavailability, patient compliance, and therapeutic efficacy. For example, in one embodiment, the small molecule can be formulated for oral administration as a tablet, capsule, or liquid solution. An oral dosage form is often preferred for chronic treatment regimens due to its convenience. To enhance oral absorption and stability, the composition may include various pharmaceutically acceptable excipients, such as binders, fillers, disintegrants, and coatings. In another embodiment, the compound may be formulated for parenteral administration, such as an intravenous, intramuscular, or subcutaneous injection. This route may be advantageous for achieving rapid and high concentrations of the drug in the bloodstream, which can be critical in certain clinical scenarios. Such formulations would be sterile and isotonic to minimize irritation at the injection site.</p>\n<p>Further embodiments may include the development of a transdermal patch for continuous, controlled delivery of the small molecule over an extended period. This can help maintain steady therapeutic drug levels in the body, potentially improving efficacy and reducing side effects associated with the peak-and-trough concentration profiles of other administration methods. The dosage and frequency of administration will be determined by a physician based on factors such as the stage of the cancer, the patient's overall health, body weight, and response to the therapy. Furthermore, the small molecule may be used as a monotherapy or, in other embodiments, as part of a combination therapy. It could be administered concurrently or sequentially with other anticancer agents, such as chemotherapy drugs, targeted therapies, or immunotherapies, to achieve a synergistic effect and overcome potential drug resistance, thereby providing a more comprehensive treatment strategy for breast cancer.</p>\n\n<h3>Specificity and Therapeutic Advantages</h3>\n<p>A key aspect of the invention is the high specificity of the small molecule for both estrogen receptor alpha (ERα) and estrogen receptor beta (ERβ), which are the two primary subtypes of the estrogen receptor. By effectively binding to both subtypes, the molecule ensures a comprehensive blockade of estrogen-mediated signaling, as both ERα and ERβ can play roles in breast cancer pathology. This dual antagonism is a critical feature that contributes to its potent antitumor activity. The design of the molecule, with its precise molecular weight of 222.328 g/mol, has been optimized to fit snugly into the ligand-binding domain of these receptors, ensuring high-affinity binding and effective inhibition. This specificity is paramount not only for efficacy but also for safety. By selectively targeting the estrogen receptors, the molecule is designed to avoid interacting with other receptors or cellular pathways, which is a common cause of off-target side effects seen in less specific drugs.</p>\n<p>The anticipated therapeutic advantage of this high specificity is a significantly improved side effect profile compared to existing breast cancer treatments. Many current therapies, while effective, cause a range of adverse reactions such as hot flashes, vaginal dryness, joint pain, and more severe complications like thromboembolic events and an increased risk of endometrial cancer or osteoporosis. These side effects can severely diminish a patient's quality of life and may lead to non-compliance with the treatment regimen. By precisely blocking only the estrogen receptor-mediated growth signals in cancer cells, the small molecule described herein is expected to have fewer or no such side effects. This potential for a better-tolerated treatment makes it a highly attractive option, particularly for long-term adjuvant therapy aimed at preventing cancer recurrence. The ability to control tumor growth effectively without imposing a heavy burden of side effects represents a major advancement in the management of ER-positive breast cancer.</p>",
//   detailed_descriptions_generating: false,
//   embodiments: '',
//   embodiments_generating: false,
//   sequence_listing: '',
//   industrial_applicability:
//     "<p>The described small molecule has significant industrial applicability in the pharmaceutical sector, particularly in oncology and women's health. Given breast cancer's global prevalence and high mortality, this invention presents a novel drug candidate for a major unmet medical need. Its specific action of binding to and blocking estrogen receptors alpha and beta addresses approximately 70-80% of breast cancer cases, which are ER-positive. This directly impacts the drug discovery and development pipeline, potentially leading to new therapeutic agents for ER-positive breast cancer. The emphasis on fewer or no side effects compared to existing medications indicates a strong potential for improved patient outcomes, adherence, and quality of life, which is a critical differentiator in the competitive pharmaceutical market. Furthermore, the development of such a molecule could lead to patentable intellectual property, licensing opportunities, and the creation of manufacturing processes for a new generation of targeted breast cancer treatments. This invention holds promise for companies looking to expand their portfolio of cancer therapeutics with an improved safety and efficacy profile.</p>",
//   industrial_applicability_generating: false,
//   custom_paragraphs: '',
//   createdAt: {
//     $date: '2026-02-16T08:13:47.245Z'
//   },
//   updatedAt: {
//     $date: '2026-02-17T05:42:26.964Z'
//   },
//   __v: 0
// };
// ------------------------------

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
      <div className="draft-container container">
        {/* Header */}
      

        <div className="container">
          {/* Main Content */}
          <div>
            <div className="draft-content-wrapper">
              {sectionsConfig.map((section) => {
                const isDiagram = section.key === 'flow_chart' || section.key === 'block_diagram';
                const isGenerating = generatingSections[section.key];
                const disableRegenerate = section.key === 'brief_description' && isDependentsGenerating;

                // Conditional Rendering
                if (isDiagram) {
                  return (
                    <DiagramSection
                      key={section.key}
                      sectionKey={section.key}
                      title={section.label}
                      content={draftData[section.key] || ''}
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
                    content={draftData[section.key] || ''}
                    isVisible={sectionVisibility[section.key]}
                    isRegenerating={isGenerating}
                    onSave={handleSaveSection}
                    onRegenerate={handleRegenerate}
                    disableRegenerate={disableRegenerate}
                  />
                );
              })}
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default DraftMasterResult;

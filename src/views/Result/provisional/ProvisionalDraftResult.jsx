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

// Ensure these paths match your project structure
// import useAuthStore from "../../../store/authStore"; 
// import DraftSection from "../Shared/DraftSection";
// import CustomLoader from "../Shared/CustomLoader";
import { getSafeFilename } from "../../../utils/formatUtils";
import { htmlToDocxParagraphs } from "../../../utils/docxUtils";

import "../../../assets/css/style.css";
import useAuthStore from "../../../store/authStore";
import DraftSection from "../non_provisional/DraftSection";

// --- STATIC DATA ---
// const STATIC_INVENTION_DATA = {
//   project_title: "Smart Agricultural Drone System",
//   pdf_text: "Text extracted from uploaded PDF regarding agricultural drones...",
// };

// const STATIC_PROVISIONAL_DATA = {
//   "_id": {
//     "$oid": "698da9f7a049d678208e9f72"
//   },
//   "project_id": {
//     "$oid": "698da9f6a049d678208e9f5b"
//   },
//   "u_id": {
//     "$oid": "698d9ec60facefb740a85469"
//   },
//   "title_of_invention": "<p>A Small Molecule Estrogen Receptor Blocker for Breast Cancer Treatment</p>",
//   "title_of_invention_generating": false,
//   "background_of_invention": "<p>The&nbsp;present&nbsp;disclosure&nbsp;relates&nbsp;generally&nbsp;to&nbsp;the&nbsp;field&nbsp;of&nbsp;oncology&nbsp;and&nbsp;more&nbsp;specifically&nbsp;to&nbsp;therapeutic&nbsp;compounds&nbsp;for&nbsp;treating&nbsp;hormone-responsive&nbsp;cancers.&nbsp;Breast&nbsp;cancer&nbsp;is&nbsp;a&nbsp;prevalent&nbsp;and&nbsp;serious&nbsp;disease,&nbsp;representing&nbsp;a&nbsp;significant&nbsp;cause&nbsp;of&nbsp;cancer-related&nbsp;mortality&nbsp;in&nbsp;women&nbsp;globally.&nbsp;The&nbsp;high&nbsp;incidence&nbsp;of&nbsp;this&nbsp;disease&nbsp;highlights&nbsp;the&nbsp;ongoing&nbsp;need&nbsp;for&nbsp;the&nbsp;development&nbsp;of&nbsp;new&nbsp;and&nbsp;effective&nbsp;treatment&nbsp;options&nbsp;to&nbsp;improve&nbsp;patient&nbsp;outcomes&nbsp;and&nbsp;manage&nbsp;the&nbsp;progression&nbsp;of&nbsp;the&nbsp;disease.</p><p>A&nbsp;majority&nbsp;of&nbsp;breast&nbsp;cancer&nbsp;cases&nbsp;are&nbsp;characterized&nbsp;as&nbsp;hormone&nbsp;receptor-positive,&nbsp;wherein&nbsp;the&nbsp;growth&nbsp;of&nbsp;cancer&nbsp;cells&nbsp;is&nbsp;stimulated&nbsp;by&nbsp;hormones&nbsp;such&nbsp;as&nbsp;estrogen.&nbsp;In&nbsp;these&nbsp;types&nbsp;of&nbsp;cancers,&nbsp;estrogen&nbsp;binds&nbsp;to&nbsp;and&nbsp;activates&nbsp;estrogen&nbsp;receptors&nbsp;(ER)&nbsp;located&nbsp;within&nbsp;the&nbsp;tumor&nbsp;cells.&nbsp;This&nbsp;interaction&nbsp;triggers&nbsp;a&nbsp;signaling&nbsp;pathway&nbsp;that&nbsp;promotes&nbsp;cell&nbsp;proliferation&nbsp;and&nbsp;tumor&nbsp;growth.&nbsp;The&nbsp;dysregulation&nbsp;of&nbsp;this&nbsp;hormonal&nbsp;pathway&nbsp;is&nbsp;a&nbsp;key&nbsp;driver&nbsp;in&nbsp;the&nbsp;development&nbsp;and&nbsp;progression&nbsp;of&nbsp;a&nbsp;large&nbsp;percentage&nbsp;of&nbsp;breast&nbsp;tumors,&nbsp;making&nbsp;the&nbsp;estrogen&nbsp;receptor&nbsp;a&nbsp;primary&nbsp;target&nbsp;for&nbsp;therapeutic&nbsp;intervention.</p><p>While&nbsp;various&nbsp;treatments&nbsp;targeting&nbsp;the&nbsp;estrogen&nbsp;signaling&nbsp;pathway&nbsp;currently&nbsp;exist,&nbsp;they&nbsp;are&nbsp;often&nbsp;associated&nbsp;with&nbsp;significant&nbsp;and&nbsp;debilitating&nbsp;side&nbsp;effects.&nbsp;Conventional&nbsp;therapies&nbsp;can&nbsp;lead&nbsp;to&nbsp;adverse&nbsp;events&nbsp;such&nbsp;as&nbsp;an&nbsp;increased&nbsp;risk&nbsp;of&nbsp;blood&nbsp;clots,&nbsp;joint&nbsp;pain,&nbsp;osteoporosis,&nbsp;and&nbsp;menstrual&nbsp;irregularities,&nbsp;which&nbsp;can&nbsp;negatively&nbsp;impact&nbsp;a&nbsp;patient&#39;s&nbsp;quality&nbsp;of&nbsp;life.&nbsp;Therefore,&nbsp;a&nbsp;need&nbsp;exists&nbsp;in&nbsp;the&nbsp;art&nbsp;for&nbsp;new&nbsp;therapeutic&nbsp;agents&nbsp;for&nbsp;treating&nbsp;hormone-responsive&nbsp;breast&nbsp;cancer&nbsp;that&nbsp;offer&nbsp;a&nbsp;more&nbsp;favorable&nbsp;safety&nbsp;profile&nbsp;and&nbsp;minimize&nbsp;the&nbsp;burden&nbsp;of&nbsp;treatment-related&nbsp;side&nbsp;effects.</p>",
//   "background_of_invention_generating": false,
//   "summary_of_invention": "<p>The present disclosure provides a novel small molecule designed to treat breast cancer, particularly estrogen receptor-positive cases. This molecule specifically targets and binds to estrogen receptors alpha and beta, effectively blocking the estrogen hormone signal. This mechanism helps control tumor growth and offers a promising therapeutic alternative with potentially reduced side effects compared to existing treatments.</p>\n<ul>\n  <li>Optionally, the small molecule has a molecular weight of 222.328 g/mol.</li>\n  <li>Optionally, the small molecule specifically binds to estrogen receptors alpha and beta.</li>\n  <li>Optionally, the small molecule blocks the signal of the estrogen hormone.</li>\n  <li>Optionally, the small molecule is for controlling breast tumor growth.</li>\n  <li>Optionally, the small molecule has fewer or no side effects compared to existing breast cancer treatments.</li>\n</ul>",
//   "summary_of_invention_generating": false,
//   "fields_of_invention": "<p>The invention belongs to the field of\npharmaceutical chemistry,\nmolecular biology, and\noncology, specifically relating to novel compounds and methods for treating breast cancer. More particularly, it concerns small molecules designed to modulate estrogen receptor activity for controlling tumor growth with reduced side effects.</p>",
//   "fields_of_invention_generating": false,
//   "detailed_description": "<p>The present disclosure relates generally to the field of medicinal chemistry and oncology. More specifically, it pertains to novel small molecule compounds that act as antagonists of estrogen receptors, pharmaceutical compositions comprising these compounds, and methods for their use in the treatment of hormone-sensitive diseases, particularly estrogen receptor-positive (ER-positive) breast cancer.</p>\n<p>Breast cancer remains a significant global health challenge, representing one of the most common malignancies diagnosed in women. A substantial subset of breast cancers, estimated to be between 70% and 80% of all cases, are classified as ER-positive. The growth and proliferation of these cancer cells are driven by the hormone estrogen. The biological pathway involves estrogen binding to and activating estrogen receptors (ER-alpha and ER-beta), which are ligand-activated transcription factors. Upon activation, these receptors promote the expression of genes that are critical for cell division and survival. Consequently, blocking this signaling pathway has become a cornerstone of therapy for ER-positive breast cancer. Current treatments, such as selective estrogen receptor modulators (SERMs) like tamoxifen and aromatase inhibitors, aim to disrupt this pathway either by competing with estrogen at the receptor level or by reducing systemic estrogen production. While effective for many patients, these existing therapies are often associated with a range of debilitating side effects, including an increased risk of blood clots, endometrial changes, joint pain, bone density loss (osteoporosis), and severe allergic reactions. Furthermore, many patients eventually develop resistance to these treatments, leading to disease progression. Thus, there is a persistent and urgent need for new therapeutic agents with improved efficacy, a more favorable safety profile, and the ability to overcome existing mechanisms of drug resistance.</p>\n<p>The disclosed invention addresses this need by providing a novel small molecule compound, and its pharmaceutically acceptable derivatives, designed to function as a potent and specific antagonist of both estrogen receptor alpha (ER-alpha) and estrogen receptor beta (ER-beta). The compound is characterized by a molecular weight of approximately 222.328 g/mol. By binding with high affinity to the ligand-binding domain of the estrogen receptors, this molecule effectively blocks the binding of endogenous estrogen, thereby preventing receptor activation and subsequent downstream signaling that leads to cancer cell proliferation. This targeted mechanism of action is anticipated to result in robust anti-tumor activity specifically in ER-positive breast cancer cells. A key advantage of the disclosed compound is its unique chemical structure, which has been designed to maximize receptor antagonism while minimizing off-target effects. This specificity is expected to translate into a significantly improved side-effect profile compared to current standards of care, potentially eliminating or reducing adverse events such as thromboembolic events and osteoporosis, thereby improving patient quality of life and treatment compliance.</p>\n<h3>System and Method Embodiments</h3>\n<p>Referring now to the drawings, which are for illustrative purposes only and not intended to limit the scope of the invention. FIG. 1 provides a simplified schematic of the conventional estrogen-mediated signaling pathway in a cancer cell. As shown, the estrogen hormone 102, a steroid molecule, circulates in the bloodstream and can passively diffuse across the cell membrane 104 into the cytoplasm of a breast cancer cell 100. Inside the cell, the estrogen 102 binds to an unoccupied estrogen receptor (ER) 106, which may reside in the cytoplasm or the nucleus. This binding event induces a conformational change in the ER 106, causing it to dimerize with another ER-ligand complex, forming an activated dimer 108. This activated dimer 108 then translocates into the nucleus 110 (if not already present) and binds to specific DNA sequences known as Estrogen Response Elements (EREs) 112 located in the promoter region of target genes. This binding event recruits a complex of co-activator proteins 114, which in turn initiates the transcription of genes 116 responsible for cell proliferation, growth, and survival. This cascade of events ultimately leads to uncontrolled cell division 118 and tumor growth.</p>\n<p>FIG. 2 illustrates the mechanism of action of the disclosed therapeutic compound in accordance with an embodiment of the invention. The therapeutic compound 202, a small molecule antagonist, is administered to the patient and enters the breast cancer cell 100. Due to its high binding affinity for the estrogen receptor 106, the compound 202 effectively competes with and displaces endogenous estrogen 102. The compound 202 binds to the ligand-binding pocket of the estrogen receptor 106. This binding event induces a distinct conformational change in the receptor, resulting in an antagonist-receptor complex 208. This altered conformation prevents the receptor from adopting the active state required for proper dimerization and/or effective binding to the Estrogen Response Elements 112 on the DNA. Furthermore, the antagonist-bound conformation may instead promote the recruitment of co-repressor proteins 214 rather than co-activators. The net result is the complete blockage of the transcriptional activation of estrogen-responsive genes 116. By disrupting this critical signaling pathway at its source, the compound 202 effectively halts estrogen-driven cell proliferation 220, leading to the inhibition of tumor growth and potentially inducing apoptosis (programmed cell death) in the cancer cells.</p>\n<h3>The Therapeutic Compound</h3>\n<p>In various embodiments, the therapeutic agent is a small molecule compound having a molecular weight of approximately 222.328 g/mol. The term \"compound\" as used herein is intended to encompass not only the specific molecule but also any of its pharmaceutically acceptable salts, solvates (including hydrates), polymorphs, isomers, tautomers, and prodrugs. Pharmaceutically acceptable salts can be formed with a variety of inorganic and organic acids and bases. The specific chemical structure of the compound is designed to fit snugly within the ligand-binding domain of both ER-alpha and ER-beta, providing a dual-antagonist activity that may offer a more comprehensive blockade of estrogen signaling than agents selective for a single receptor subtype. The compound's physiochemical properties are optimized for good oral bioavailability, metabolic stability, and a favorable pharmacokinetic profile, allowing for convenient administration and sustained therapeutic concentrations in the body.</p>\n<h3>Pharmaceutical Compositions and Administration</h3>\n<p>For therapeutic use, the disclosed compound is typically formulated into a pharmaceutical composition. Such compositions comprise a therapeutically effective amount of the active compound along with one or more pharmaceutically acceptable carriers, excipients, or diluents. The choice of carrier is largely determined by the intended route of administration and standard pharmaceutical practice.\nThe compositions may be formulated for various routes of administration, including:\n<ul>\n<li>Oral administration: Formulations can be in the form of tablets, capsules, powders, granules, solutions, or suspensions. These formulations may include excipients such as binders (e.g., starch, gelatin), fillers (e.g., lactose, microcrystalline cellulose), lubricants (e.g., magnesium stearate), and disintegrants (e.g., croscarmellose sodium). Tablets may be coated to delay disintegration and absorption in the gastrointestinal tract.</li>\n<li>Parenteral administration: Formulations for intravenous, subcutaneous, or intramuscular injection may be prepared as sterile aqueous or non-aqueous solutions or suspensions. Such formulations may include agents to adjust tonicity (e.g., sodium chloride, mannitol) and pH (e.g., citrate or phosphate buffers), as well as stabilizers and preservatives.</li>\n<li>Topical administration: Formulations such as creams, gels, or patches may also be developed for localized delivery.</li>\n</ul>\n<p>A therapeutically effective amount is an amount of the compound sufficient to ameliorate or inhibit the progression of the disease. This amount will vary depending on factors such as the patient's age, weight, the severity of the cancer, the specific formulation, and the route of administration. A typical dosage regimen might involve oral administration of the compound once or twice daily, with a total daily dose ranging from about 10 mg to 500 mg, although the final determination of the appropriate dose is within the judgment of the treating physician.</p>\n<h3>Method of Treatment</h3>\n<p>FIG. 3 presents a flowchart illustrating an exemplary method for treating a subject with ER-positive breast cancer. The process begins at step 302, where a subject, such as a human female, is diagnosed with breast cancer. This diagnosis typically involves imaging studies and a biopsy, followed by immunohistochemical staining of the tumor tissue to confirm its ER-positive status. Once the subject is identified as a suitable candidate for hormone therapy (step 304), a treatment regimen is initiated. At step 306, a therapeutically effective amount of the pharmaceutical composition containing the disclosed compound is administered to the subject. The administration is continued for a prescribed period, as determined by the oncologist. During the course of treatment, the subject is monitored for therapeutic response (step 308). Monitoring may involve periodic imaging (e.g., MRI, CT scans) to assess changes in tumor size, as well as blood tests to measure tumor markers. The patient is also monitored for any potential side effects. Based on this monitoring, the dosage or frequency of administration may be adjusted (step 310) to optimize efficacy and minimize toxicity. The treatment continues as long as a clinical benefit is observed and the treatment is well-tolerated by the patient.</p>\n<h3>Exemplary Data</h3>\n<p>The efficacy of the disclosed compound can be demonstrated through pre-clinical studies. FIG. 4 shows a hypothetical graph from an in-vitro cell proliferation assay. In this type of experiment, an ER-positive human breast cancer cell line (e.g., MCF-7) is cultured. The cells are treated with a control vehicle, a known standard-of-care drug (e.g., tamoxifen), and varying concentrations of the disclosed compound. As depicted in the graph 400, the y-axis represents cell viability or proliferation 402, while the x-axis represents the concentration of the drug 404. The results show that the disclosed compound 406 causes a dose-dependent decrease in cell proliferation, demonstrating potent anti-cancer activity. Notably, the inhibitory concentration (IC50) of the disclosed compound may be lower than that of the standard drug 408, indicating greater potency. Furthermore, in animal xenograft models where human ER-positive tumors are grown in immunodeficient mice, oral administration of the compound would be expected to lead to a significant reduction in tumor volume compared to a control group, with minimal signs of toxicity, further supporting its potential as a safe and effective therapeutic agent for the treatment of ER-positive breast cancer.</p>",
//   "detailed_description_generating": false,
//   "advantages_of_invention": "<ul>\n    <li><strong>Improved Safety Profile:</strong> The designed small molecule may have fewer or no side effects, presenting a better option for treating breast cancer compared to existing medications that cause serious side effects such as vaginal discharge, menstrual irregularities, increased risk of blood clots, joint pain, severe allergic reactions, and osteoporosis.</li>\n    <li><strong>Specific Mechanism of Action for Tumor Control:</strong> The invention specifically binds with estrogen receptors alpha and beta and blocks the signal of the estrogen hormone, which actively helps in controlling tumor growth.</li>\n</ul>",
//   "advantages_of_invention_generating": false,
//   "add_embodiments": "<ol>\n    <li>A small molecule designed for treating breast cancer.</li>\n    <li>The small molecule has a molecular weight of 222.328 g/mol.</li>\n    <li>The small molecule specifically binds with estrogen receptors alpha and beta.</li>\n    <li>The small molecule blocks the signal of the estrogen hormone.</li>\n    <li>The small molecule helps in tumor growth control.</li>\n    <li>The small molecule may have fewer or no side effects.</li>\n    <li>The small molecule is a better option for treating breast cancer.</li>\n</ol>",
//   "add_embodiments_generating": false,
//   "add_few_claims": "<ol>\n    <li>A small molecule, characterized by a molecular weight of 222.328 g/mol, wherein the small molecule specifically binds to estrogen receptors alpha (ERα) and beta (ERβ) and blocks estrogen hormone signaling.</li>\n    <li>A method for treating breast cancer in a subject, the method comprising administering to the subject a therapeutically effective amount of the small molecule of claim 1.</li>\n    <li>The small molecule of claim 1, wherein the binding to estrogen receptors alpha (ERα) and beta (ERβ) inhibits estrogen-induced cell division.</li>\n    <li>The small molecule of claim 1, wherein the blocking of estrogen hormone signaling controls tumor growth.</li>\n    <li>The method of claim 2, wherein the breast cancer is estrogen receptor-positive (ER+) breast cancer.</li>\n    <li>The method of claim 2, wherein the administering of the small molecule provides reduced side effects compared to existing breast cancer treatments.</li>\n    <li>A pharmaceutical composition for treating breast cancer, the composition comprising:\n        <ul>\n            <li>the small molecule of claim 1; and</li>\n            <li>a pharmaceutically acceptable carrier.</li>\n        </ul>\n    </li>\n    <li>The pharmaceutical composition of claim 7, further comprising at least one pharmaceutically acceptable excipient selected from the group consisting of diluents, binders, disintegrants, lubricants, and coatings.</li>\n</ol>",
//   "add_few_claims_generating": false,
//   "add_key_features": "",
//   "add_key_features_generating": false,
//   "add_abstract": "",
//   "add_abstract_generating": false,
//   "add_custom_paragraph": "",
//   "createdAt": {
//     "$date": "2026-02-12T10:22:47.830Z"
//   },
//   "updatedAt": {
//     "$date": "2026-02-16T13:20:10.461Z"
//   },
//   "__v": 0
// };
// -------------------

const ProvisionalDraftResult = ({data}) => {
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
    add_embodiments: false,
    add_few_claims: false,
    add_key_features: false,
    add_abstract: false,
    add_custom_paragraph: false,
  });

  const sectionsConfig = [
    { key: "title_of_invention", label: "Title of Invention" },
    { key: "background_of_invention", label: "Background" },
    { key: "summary_of_invention", label: "Summary" },
    { key: "fields_of_invention", label: "Field of Invention" },
    { key: "detailed_description", label: "Detailed Description" },
    { key: "advantages_of_invention", label: "Advantages" },
    { key: "add_embodiments", label: "Embodiments", isOptional: true },
    { key: "add_few_claims", label: "Claims", isOptional: true },
    { key: "add_key_features", label: "Key Features", isOptional: true },
    { key: "add_abstract", label: "Abstract", isOptional: true },
    {
      key: "add_custom_paragraph",
      label: "Custom Paragraph",
      isOptional: true,
    },
  ];

  const fetchData = async () => {
    try {
      setIsLoading(true);

      // --- MOCKED DATA FETCH ---
      // const response = await axios.get(`/api/provisionaldraft/${projectId}`);
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay

      const incomingDraft = data;
      setInventionData(data);
      // -------------------------

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
          // title_of_invention: STATIC_INVENTION_DATA.project_title,
        }));
        triggerInitialGeneration();
      }
    } catch (error) {
      console.log("Draft fetch error:", error);
      toast.error("Error loading data.");
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

      // --- MOCKED GENERATION ---
      // await axios.get(`/api/provisionaldraft/generateall/${projectId}`);
      // setTimeout(() => {
      //   setGeneratingSections({});
      //   // setDraftData(STATIC_PROVISIONAL_DATA);
      //   toast.success("Generation Complete (Mock)");
      // }, 2000);
      // ------------------------

    } catch (error) {
      console.error("Generation Trigger Error:", error);
      setGeneratingSections({});
      toast.error("Generation failed.");
    }
  };

  const handleSaveSection = async (
    sectionKey,
    newContent,
    showModal = true,
  ) => {
    const currentContent = draftData[sectionKey];
    try {
      setDraftData((prev) => ({ ...prev, [sectionKey]: newContent }));
      
      // --- MOCKED SAVE ---
      // await axios.put(`/api/provisionaldraft/update/${projectId}`, {
      //   field: sectionKey,
      //   content: newContent,
      // });
      // -------------------

      if (showModal) {
        toast.success("Section updated (Local Only)!");
      }
    } catch (error) {
      console.error("Section updation error:", error);
      setDraftData((prev) => ({ ...prev, [sectionKey]: currentContent }));
      if (showModal) {
        toast.error("Failed to save section.");
      }
    }
  };

  const handleRegenerate = async (sectionKey) => {
    if (sectionKey === "add_custom_paragraph") {
      return;
    }

    setGeneratingSections((prev) => ({ ...prev, [sectionKey]: true }));
    try {
      // --- MOCKED REGENERATE ---
      // await axios.post(`/api/provisionaldraft/regenerate/${projectId}`, {
      //   field: sectionKey,
      // });
      setTimeout(() => {
         setGeneratingSections((prev) => ({ ...prev, [sectionKey]: false }));
         setDraftData((prev) => ({
            ...prev,
            [sectionKey]: prev[sectionKey] + " (Regenerated)"
         }));
         toast.success("Section Regenerated (Mock)");
      }, 1500);
      // -------------------------
    } catch (error) {
      console.error("Regeneration error:", error);
      setGeneratingSections((prev) => ({ ...prev, [sectionKey]: false }));
      toast.error("Failed to regenerate section.");
    }
  };

  const toggleSection = async (key) => {
    const isVisible = sectionVisibility[key];
    setSectionVisibility((prev) => ({ ...prev, [key]: !isVisible }));
    if (!isVisible && key !== "add_custom_paragraph") {
      handleRegenerate(key);
    } else {
      setDraftData((prev) => ({ ...prev, [key]: "" }));
      if (draftData[key]) {
        handleSaveSection(key, "", false);
      }
    }
  };

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
    toast.info("Preparing PDF (Mock)...");
    setShowDownloadOptions(false);

    // --- MOCKED PDF DOWNLOAD ---
    setTimeout(() => {
      toast.warning("PDF Download requires backend connection.");
    }, 500);
    // -------------------------
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

  // --- COMMENTED OUT SOCKET LOGIC ---
  /*
  useEffect(() => {
    if (!socket) {
      return;
    }
    const handleFieldGenerated = (data) => {
      // ...
    };
    const handleFieldError = (data) => {
      // ...
    };
    socket.on("provisional_field_generated", handleFieldGenerated);
    socket.on("provisional_field_error", handleFieldError);
    return () => {
      socket.off("provisional_field_generated", handleFieldGenerated);
      socket.off("provisional_field_error", handleFieldError);
    };
  }, [socket]);
  */
  // ----------------------------------

  return (
    <>
      <div className="draft-container container">
        {/* Header */}


        <div className="container">
          {/* Main Content */}
          <div>
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

        </div>
      </div>

      {/* {isLoading && <CustomLoader loaderText="Retrieving data..." />} */}
    </>
  );
};

export default ProvisionalDraftResult;
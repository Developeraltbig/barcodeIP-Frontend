import React, { memo, useMemo, useState, useEffect } from "react";
import ActionButton from "./ActionButton";
import NonDraftSectionCard from "./NonDraftSectionCard";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";

function NonProvisionalTab({
  title,
  description,
  sectionsData,
  downloadLabel = "Download Draft",
  onDownload
}) {
  const { token } = useSelector((state) => state.auth);
  const sections = useMemo(() => {
    if (!sectionsData?.length) return [];

    const patent = sectionsData[0];
    console.log('patent==', patent)

    return [
      {
        _id: patent.project_id,
        id: "title_of_invention",
        number: "01",
        title: "Title of Invention",
        content: patent.title_of_invention
      },
      {
        _id: patent.project_id,
        id: "abstract",
        number: "02",
        title: "Abstract",
        content: patent.abstract
      },
      {
        _id: patent.project_id,
        id: "background_of_invention",
        number: "03",
        title: "Background of Invention",
        content: patent.background_of_invention
      },
      {
        _id: patent.project_id,
        id: "summary_of_invention",
        number: "04",
        title: "Summary of Invention",
        content: patent.summary_of_invention
      },
      {
        _id: patent.project_id,
        id: "fields_of_invention",
        number: "05",
        title: "Field of Invention",
        content: patent.fields_of_invention
      },
      {
        _id: patent.project_id,
        id: "claims",
        number: "06",
        title: "Claims",
        content: patent.claims
      },
      {
        _id: patent.project_id,
        id: "brief_description",
        number: "07",
        title: "Brief Description",
        content: patent.brief_description
      },
      {
        _id: patent.project_id,
        id: "flow_chart",
        number: "08",
        title: "Flow Chart",
        content: patent.flow_chart
      },
      {
        _id: patent.project_id,
        id: "block_diagram",
        number: "09",
        title: "Block Diagram",
        content: patent.block_diagram
      },
      {
        _id: patent.project_id,
        id: "detailed_descriptions",
        number: "10",
        title: "Detailed Description",
        content: patent.detailed_descriptions
      },
      {
        _id: patent.project_id,
        id: "embodiments",
        number: "11",
        title: "Embodiments",
        content: patent.embodiments
      },
      {
        _id: patent.project_id,
        id: "sequence_listing",
        number: "12",
        title: "Sequence Listing",
        content: patent.sequence_listing
      },
      {
        _id: patent.project_id,
        id: "industrial_applicability",
        number: "13",
        title: "Industrial Applicability",
        content: patent.industrial_applicability
      },
      {
        _id: patent.project_id,
        id: "custom_paragraphs",
        number: "14",
        title: "Custom Paragraphs",
        content: patent.custom_paragraphs
      }
    ].filter(section => {
      return (
        section.content &&
        String(section.content).trim() !== ""
      );
    });
  }, [sectionsData]);

  const [activeSectionId, setActiveSectionId] = useState("");
  const [downloading, setDownloading] = useState(false)
  useEffect(() => {
    console.log('sections')
    if (sections.length > 0) {
      setActiveSectionId(sections[0].id);
    }
  }, [sections]);

  const activeSection = useMemo(
    () => sections.find(item => item.id === activeSectionId),
    [sections, activeSectionId]
  );

  const scrollToSection = (sectionId) => {
    setActiveSectionId(sectionId);

    requestAnimationFrame(() => {
      document
        .getElementById(`draft-section-${sectionId}`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
    });
  };

  const handleDownload = async () => {
    try {
      setDownloading(true)
      const projectId = sectionsData?.[0]?.project_id;

      if (!projectId) {
        toast.error("Project ID missing");
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/nonProvisionalDraft/download-pdf/${projectId}`,
        {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/pdf",
          },
        }
      );
      const pdfBlob = new Blob(
        [response.data],
        {
          type: "application/pdf",
        }
      );
      // console.log("PDF size:", pdfBlob.size);
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Non-Provisional-Draft.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
      toast.success("NonProvisional Draft Generated is Successfully");
      setDownloading(false)
    } catch (error) {
      setDownloading(false)
      toast.error("PDF download error: Contact administration");
      console.error(
        "PDF download error:",
        error
      );

    }
  };
  return (
    <section className="rr-draft-shell">
      <aside className="rr-draft-sidebar">
        <div className="rr-draft-sidebar-card">
          <h3>Sections</h3>

          <div className="rr-draft-section-list">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={
                  activeSection?.id === section.id ? "active" : ""
                }
                onClick={() => scrollToSection(section.id)}
              >
                <span>{section.number}</span>
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="rr-draft-content">
        <div className="rr-draft-head">
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          {downloading ? "Loading..." : <ActionButton icon="download" onClick={handleDownload}>
            {downloadLabel}
          </ActionButton>}

        </div>

        <div className="rr-draft-section-stack">
          {sections.map((section) => (
            <NonDraftSectionCard
              key={section.id}
              section={section}
              isActive={activeSection?.id === section.id}

            />
          ))}
        </div>
      </main>
    </section>
  );
}

export default memo(NonProvisionalTab);
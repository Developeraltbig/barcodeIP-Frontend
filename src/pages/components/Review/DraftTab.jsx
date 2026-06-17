import React, { memo, useMemo, useState, useEffect } from "react";
import ActionButton from "./ActionButton";
import DraftSectionCard from "./DraftSectionCard";
import axios from "axios";


function DraftTab({
  title,
  description,
  sectionsData,
  downloadLabel = "Download Draft",
  onDownload
}) {
  console.log("sectionsData", sectionsData);
  const sections = useMemo(() => {
    if (!sectionsData?.length) return [];

    const patent = sectionsData[0];

    return [
      {
        _id: patent.project_id,
        id: "title_of_invention",
        number: "01",
        title: "Title of Invention",
        content: patent.title_of_invention || ""
      },
      {
        _id: patent.project_id,
        id: "background_of_invention",
        number: "02",
        title: "Background of Invention",
        content: patent.background_of_invention || ""
      },
      {
        _id: patent.project_id,
        id: "summary_of_invention",
        number: "03",
        title: "Summary of Invention",
        content: patent.summary_of_invention || ""
      },
      {
        _id: patent.project_id,
        id: "fields_of_invention",
        number: "04",
        title: "Field of Invention",
        content: patent.fields_of_invention || ""
      },
      {
        _id: patent.project_id,
        id: "detailed_description",
        number: "05",
        title: "Detailed Description",
        content: patent.detailed_description || ""
      },
      {
        _id: patent.project_id,
        id: "advantages_of_invention",
        number: "06",
        title: "Advantages of Invention",
        content: patent.advantages_of_invention || ""
      },
      {
        _id: patent.project_id,
        id: "abstract",
        number: "07",
        title: "Abstract",
        content: patent.add_abstract || ""
      }
    ].filter(item => item.content);
  }, [sectionsData]);

  const [activeSectionId, setActiveSectionId] = useState("");

  useEffect(() => {
    console.log('sections')
    if (sections.length > 0) {
      setActiveSectionId(sections[0]._id);
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

      const projectId = sectionsData?.[0]?.project_id;

      if (!projectId) {
        console.error("Project ID missing");
        return;
      }


      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/provisionalDraft/download-pdf/${projectId}`,
        {
          responseType: "arraybuffer",

          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTUxZDYxODFhNmFiYTgyMTY5ZGM3ZCIsImlhdCI6MTc4MTY5NTM5NywiZXhwIjoxNzgxNzgxNzk3fQ.Blaw1WiG8eDorMq-HQzHt7yrec9MkcZ3xIIMWZ_i6EQ`,
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


      console.log("PDF size:", pdfBlob.size);


      const url = window.URL.createObjectURL(pdfBlob);


      const a = document.createElement("a");

      a.href = url;

      a.download = "Provisional-Draft.pdf";


      document.body.appendChild(a);

      a.click();

      a.remove();


      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);


    } catch (error) {

      console.error(
        "PDF download error:",
        error
      );

    }
  };

  console.log("sections", sections);

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

          <ActionButton icon="download" onClick={handleDownload} >
            {downloadLabel}
          </ActionButton>
        </div>

        <div className="rr-draft-section-stack">
          {sections.map((section) => (
            <DraftSectionCard
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

export default memo(DraftTab);
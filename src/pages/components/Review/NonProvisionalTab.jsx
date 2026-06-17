import React, { memo, useMemo, useState, useEffect } from "react";
import ActionButton from "./ActionButton";
import NonDraftSectionCard from "./NonDraftSectionCard";

function NonProvisionalTab({
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
        id: "title_of_invention",
        number: "01",
        title: "Title of Invention",
        content: patent.title_of_invention
      },
      {
        id: "abstract",
        number: "02",
        title: "Abstract",
        content: patent.abstract
      },
      {
        id: "background_of_invention",
        number: "03",
        title: "Background of Invention",
        content: patent.background_of_invention
      },
      {
        id: "summary_of_invention",
        number: "04",
        title: "Summary of Invention",
        content: patent.summary_of_invention
      },
      {
        id: "fields_of_invention",
        number: "05",
        title: "Field of Invention",
        content: patent.fields_of_invention
      },
      {
        id: "claims",
        number: "06",
        title: "Claims",
        content: patent.claims
      },
      {
        id: "brief_description",
        number: "07",
        title: "Brief Description",
        content: patent.brief_description
      },
      {
        id: "flow_chart",
        number: "08",
        title: "Flow Chart",
        content: patent.flow_chart
      },
      {
        id: "block_diagram",
        number: "09",
        title: "Block Diagram",
        content: patent.block_diagram
      },
      {
        id: "detailed_descriptions",
        number: "10",
        title: "Detailed Description",
        content: patent.detailed_descriptions
      },
      {
        id: "embodiments",
        number: "11",
        title: "Embodiments",
        content: patent.embodiments
      },
      {
        id: "sequence_listing",
        number: "12",
        title: "Sequence Listing",
        content: patent.sequence_listing
      },
      {
        id: "industrial_applicability",
        number: "13",
        title: "Industrial Applicability",
        content: patent.industrial_applicability
      },
      {
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

          <ActionButton icon="download" onClick={onDownload}>
            {downloadLabel}
          </ActionButton>
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
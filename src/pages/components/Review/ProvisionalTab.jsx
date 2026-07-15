import React, { memo, useMemo, useState } from "react";
import ActionButton from "./ActionButton";
import DraftSectionCard from "./DraftSectionCard";
import { PROVISIONAL_SECTIONS } from "../../data/draftTabsData";
import DownloadIcon from "../../../assets/icons/download.svg";

function ProvisionalTab({
  sections = PROVISIONAL_SECTIONS,
  onDownload
}) {
  const [activeSectionId, setActiveSectionId] = useState(sections?.[0]?.id || "");

  const activeSection = useMemo(() => {
    return sections.find((section) => section.id === activeSectionId) || sections?.[0];
  }, [activeSectionId, sections]);

  const scrollToSection = (sectionId) => {
    setActiveSectionId(sectionId);

    requestAnimationFrame(() => {
      document.getElementById(`draft-section-${sectionId}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });
  };

  return (
    <section className="rr-draft-shell rr-provisional-tab">
      <aside className="rr-draft-sidebar">
        <div className="rr-draft-sidebar-card">
          <h3>Sections</h3>

          <div className="rr-draft-section-list">
            {sections.map((section) => (
              <button
                type="button"
                key={section.id}
                className={activeSection?.id === section.id ? "active" : ""}
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
            <h2>Provisional Draft</h2>
            <p>Editable provisional specification sections generated from the invention disclosure.qq</p>
          </div>

          <ActionButton onClick={onDownload}>
            <img src={DownloadIcon} alt="" className="download-icon" />
            Download Provisional
          </ActionButton>
        </div>

        <div className="rr-draft-section-stack">
          {sections.map((section) => (
            <DraftSectionCard
              key={section.id}
              section={section}
              isActive={activeSection?.id === section.id}
              onFocus={() => setActiveSectionId(section.id)}
            />
          ))}
        </div>
      </main>
    </section>
  );
}

export default memo(ProvisionalTab);

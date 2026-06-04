import React, { memo, useState } from "react";

function DraftIconButton({ children, label, onClick }) {
  return (
    <button type="button" title={label} aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}

function DraftSectionCard({ section, isActive, onFocus }) {
  const [content, setContent] = useState(section.content);
  const [isEditing, setIsEditing] = useState(false);

  const copySection = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {
      console.error("Copy section failed:", error);
    }
  };

  const regenerateSection = () => {
    console.log("Regenerate section:", section.id);
  };

  return (
    <article
      id={`draft-section-${section.id}`}
      className={`rr-draft-section-card ${isActive ? "active" : ""}`}
      onMouseEnter={onFocus}
      onFocus={onFocus}
    >
      <header>
        <div>
          {section.group && <span>{section.group}</span>}
          <h3>{section.title}</h3>
        </div>

        <div className="rr-draft-actions">
          <DraftIconButton label="Copy section" onClick={copySection}>
            ⧉
          </DraftIconButton>

          <DraftIconButton label="Edit section" onClick={() => setIsEditing((prev) => !prev)}>
            ✎
          </DraftIconButton>

          <DraftIconButton label="Regenerate section" onClick={regenerateSection}>
            ⟳
          </DraftIconButton>
        </div>
      </header>

      {isEditing ? (
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          autoFocus
        />
      ) : (
        <p>{content}</p>
      )}
    </article>
  );
}

export default memo(DraftSectionCard);

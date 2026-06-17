import React, {
  memo,
  useState,
  useEffect,
  useMemo
} from "react";
import { getPlantUmlImageUrl } from "../../../utils/plantUmlUtils";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import CopyFilesIcon from "../../../assets/icons/copyFile.svg";
import EditIcon from "../../../assets/icons/edit_icon.svg";
import RegenerateIcon from "../../../assets/icons/regenerate_icon.svg";
import './Draft.css'

import {
  useUpdateNonProvisionalSectionMutation,
  useRegenerateNonProvisionalSectionMutation
} from "../../../features/nonProvisionalDraftApi";

function DraftIconButton({
  children,
  label,
  onClick
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className="draft-card-action-btn"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
}


function NonDraftSectionCard({
  section,
  isActive,
  onFocus,
  onRegenerate
}) {
  console.log('section---', section)
  const [isEditing, setIsEditing] =
    useState(false);

  const [content, setContent] =
    useState("");

  const [draftContent, setDraftContent] =
    useState("");

  const [
    updateSection,
    { isLoading: isUpdating }
  ] = useUpdateNonProvisionalSectionMutation();

  const [
    regenerateSectionApi,
    { isLoading: isRegenerating }
  ] = useRegenerateNonProvisionalSectionMutation();

  useEffect(() => {
    const value = section?.content || "";

    setContent(value);
    setDraftContent(value);
  }, [section?.id, section?.content]);

  const isDiagramSection =
    section.id === "flow_chart" ||
    section.id === "block_diagram";

  const diagramUrl = useMemo(() => {
    if (!isDiagramSection) return null;

    return getPlantUmlImageUrl(content);
  }, [content, isDiagramSection]);

  const copySection = async (e) => {
    console.log("COPY CLICKED");
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      const div = document.createElement("div");
      div.innerHTML = content;

      const text =
        div.textContent ||
        div.innerText ||
        "";

      await navigator.clipboard.writeText(text);

      console.log("Copied");
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (e) => {
    console.log("EDIT CLICKED");
    e.preventDefault();
    e.stopPropagation();

    setIsEditing(true);
  };

  const handleSave = async () => {
    try {

      await updateSection({
        projectId: section._id,
        field: section.id,
        content: draftContent
      }).unwrap();

      setContent(draftContent);
      setIsEditing(false);

      console.log("Updated Successfully");

    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setDraftContent(content);
    setIsEditing(false);
  };

  const regenerateSection = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {

      await regenerateSectionApi({
        projectId,
        field: section.id
      }).unwrap();

      console.log(
        "Regeneration Started:",
        section.id
      );

    } catch (error) {
      console.error(error);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link"],
      ["clean"]
    ]
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "blockquote",
    "code-block",
    "link"
  ];


  return (
    <article
      id={`draft-section-${section.id}`}
      className={`rr-draft-section-card ${isActive ? "active" : ""
        }`}
    >
      <header className="rr-section-header">
        <div className="rr-section-title">
          <span>
            {section.number || ""}
          </span>

          <h3>{section.title}</h3>
        </div>

        <div className="draft-card-actions" style={{
          display: "flex",
          gap: "10px",
          alignItems: "center"
        }}>
          {!isDiagramSection && (
            <>
              <button
                type="button"
                className="draft-card-action-btn"
                onClick={copySection}
              >
                <img
                  src={CopyFilesIcon}
                  alt="Copy"
                  draggable={false}
                />
              </button>

              <button
                type="button"
                className="draft-card-action-btn"
                onClick={handleEdit}
              >
                <img
                  src={EditIcon}
                  alt="Edit"
                  draggable={false}
                />
              </button>
            </>
          )}

          <button
            type="button"
            className="draft-card-action-btn"
            onClick={regenerateSection}
            disabled={isRegenerating}
          >
            <img
              src={RegenerateIcon}
              alt="Regenerate"
              draggable={false}
            />
          </button>
        </div>
      </header>

      {isEditing ? (
        <div className="draft-editor-container">

          <div className="draft-editor-header">

            <span className="rr-editor-label">
              Edit Mode
            </span>

            <div className="draft-editor-actions">
              <button
                type="button"
                className="draft-btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="draft-btn-save"
                onClick={handleSave}
                disabled={isUpdating}

              >
                {isUpdating
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>

          </div>

          <div className="draft-quill-wrapper">
            <ReactQuill
              theme="snow"
              value={draftContent}
              onChange={setDraftContent}
              modules={quillModules}
              formats={quillFormats}
            />
          </div>

        </div>
      ) : (
        <>
          {isDiagramSection ? (
            <div className="rr-diagram-wrapper">
              {diagramUrl ? (
                <img
                  src={diagramUrl}
                  alt={section.title}
                  className="rr-diagram-image"
                />
              ) : (
                <pre>{content}</pre>
              )}
            </div>
          ) : (
            <div
              className="rr-draft-html-content"
              dangerouslySetInnerHTML={{
                __html: content
              }}
            />
          )}
        </>
      )}
    </article>
  );
}

export default NonDraftSectionCard
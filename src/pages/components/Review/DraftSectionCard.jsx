import React, { memo, useState, useEffect } from "react";

import CopyFilesIcon from "../../../assets/icons/copyFile.svg";
import EditIcon from "../../../assets/icons/edit_icon.svg";
import RegenerateIcon from "../../../assets/icons/regenerate_icon.svg";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import {
  useUpdateProposalDraftSectionMutation,
  useRegenerateProposalDraftSectionMutation,
} from "../../../features/proposalDraftApi";

function DraftIconButton({
  children,
  label,
  onClick
}) {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    onClick?.(e);
  };

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className="draft-card-action-btn"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

function DraftSectionCard({
  section,
  isActive,
  onFocus
}) {
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [
    updateSection,
    { isLoading: isUpdating }
  ] = useUpdateProposalDraftSectionMutation();

  const [
    regenerateSectionApi,
    { isLoading: isRegenerating }
  ] = useRegenerateProposalDraftSectionMutation();
  const [draftContent, setDraftContent] =
    useState("");

  useEffect(() => {
    const value = section?.content || "";

    setContent(value);
    setDraftContent(value);
  }, [section?.id, section?.content]);

  const copySection = async () => {
    try {
      const plainText = content.replace(/<[^>]*>/g, "");

      await navigator.clipboard.writeText(plainText);

      console.log("Copied successfully");
    } catch (error) {
      console.error("Copy failed:", error);
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
        content: draftContent,
      }).unwrap();

      setContent(draftContent);
      setIsEditing(false);

      console.log("Section Updated");

    } catch (error) {
      console.error(
        "Update Failed:",
        error
      );
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
        projectId: section._id,
        field: section.id,
      }).unwrap();

      console.log(
        "Regeneration Started:",
        section.id
      );

    } catch (error) {
      console.error(
        "Regenerate Failed:",
        error
      );
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
      onMouseEnter={onFocus}
      onFocus={onFocus}
    >
      <header>
        <div>
          <h3>{section.title}</h3>
        </div>

        <div className="draft-card-actions">
          <DraftIconButton
            label="Copy"
            onClick={copySection}
          >
            <img
              src={CopyFilesIcon}
              alt="Copy"
              draggable={false}
            />
          </DraftIconButton>

          <DraftIconButton
            label="Edit"
            onClick={handleEdit}
          >
            <img
              src={EditIcon}
              alt="Edit"
              draggable={false}
            />
          </DraftIconButton>

          <DraftIconButton
            label="Regenerate"
            onClick={regenerateSection}
          >
            <img
              src={RegenerateIcon}
              alt="Regenerate"
              draggable={false}
            />
          </DraftIconButton>
        </div>
      </header>

      {isEditing ? (
        <div className="draft-editor-container">

          <div className="draft-editor-header">

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
        <div
          className="rr-draft-html-content"
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
      )}
    </article>
  );
}

export default DraftSectionCard;
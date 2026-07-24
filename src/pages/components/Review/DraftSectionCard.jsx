import React, { memo, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import CopyFilesIcon from "../../../assets/icons/copyFile.svg";
import EditIcon from "../../../assets/icons/edit_icon.svg";
import RegenerateIcon from "../../../assets/icons/regenerate_icon.svg";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { socket } from "../../../utils/socket";
import { toast } from "react-toastify";
import {
  useUpdateProposalDraftSectionMutation,
  useRegenerateProposalDraftSectionMutation,
} from "../../../features/proposalDraftApi";

function DraftIconButton({
  children,
  label,
  onClick,
  disabled = false,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    onClick?.(e);
  };

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className="draft-card-action-btn"
      onClick={handleClick}
      disabled={disabled}
      style={{
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
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
  const { id } = useParams();
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

  const [editingSection, setEditingSection] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    const value = section?.content || "";

    setContent(value);
    setDraftContent(value);
  }, [section?.id, section?.content]);


  const handleGenerated = (data) => {
    // console.log("Socket Response:", data);

    // Ignore events for other projects
    if (data.projectId !== id) return;

    // console.log("Socket field:", data.field);
    // console.log("Section field:", section.id);

    // Ignore events for other sections
    if (data.field !== section.id) return;

    // Update this section
    setContent(data.content);
    setDraftContent(data.content);
    setRegenerating(false);
    // console.log("Updated:", section.id);
  };

  useEffect(() => {
    if (!id) return;

    // console.log("Provisional room", id);
    socket.on(
      "provisional_field_generated",
      handleGenerated
    );
    return () => {
      socket.off(
        "provisional_field_generated",
        handleGenerated
      );
    };
  }, [id, section.id]);

  const copySection = async () => {
    try {
      const plainText = content.replace(/<[^>]*>/g, "");

      await navigator.clipboard.writeText(plainText);

      toast.success("Copied successfully!");
    } catch (error) {
      toast.error("Failed to copy text:");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setEditingSection(true);
      await updateSection({
        projectId: section._id,
        field: section.id,
        content: draftContent,
      }).unwrap();

      setContent(draftContent);
      setIsEditing(false);
      setEditingSection(false);
      toast.success("Updated Successfully");
    } catch (error) {
      setEditingSection(false);
      toast.error("Failed to update contact adminstration:");
    }
  };

  const handleCancel = () => {
    setDraftContent(content);
    setIsEditing(false);
  };

  const regenerateSection = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRegenerating(true);

    try {

      await regenerateSectionApi({
        projectId: section._id,
        field: section.id,
      }).unwrap();

      toast.success("Regenerate Process Start Successfully");

    } catch (error) {
      setRegenerating(false);
      if (error.status == 403 && error.data.status == "error") {
        toast.error(error.data.message);
      } else {
        toast.error("Failed to regenerate contact adminstration:");
      }
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
            disabled={regenerating || editingSection}
          >
            {editingSection ? (
              <span className="spinner" />
            ) : (
              <img src={EditIcon} alt="Edit" />
            )}
          </DraftIconButton>

          <DraftIconButton
            label="Regenerate"
            onClick={regenerateSection}
            disabled={regenerating}
          >
            {regenerating ? (
              <span className="spinner" />
            ) : (
              <img src={RegenerateIcon} alt="Regenerate" />
            )}
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
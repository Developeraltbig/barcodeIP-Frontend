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
import { useParams } from 'react-router-dom';
import { socket } from "../../../utils/socket";
import {
  useUpdateNonProvisionalSectionMutation,
  useRegenerateNonProvisionalSectionMutation
} from "../../../features/nonProvisionalDraftApi";
import { toast } from "react-toastify";

function DraftIconButton({
  children,
  label,
  onClick,
  disabled = false,
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
        if (disabled) return;
        onClick?.(e);
      }}
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


function NonDraftSectionCard({
  section,
  isActive,
  onFocus,
  onRegenerate
}) {
  console.log('section---', section)
  const { id } = useParams();

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

  const [editingSection, setEditingSection] = useState(false);
  const [regenerating, setRegenerating] = useState(false);


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
      "non_provisional_field_generated",
      handleGenerated
    );
    return () => {
      socket.off(
        "non_provisional_field_generated",
        handleGenerated
      );
    };
  }, [id, section.id]);

  const copySection = async (e) => {
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
        content: draftContent
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
        field: section.id
      }).unwrap();

      console.log(
        "Regeneration Started:",
        section.id
      );
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
    >
      <header className="rr-section-header">
        <div className="rr-section-title">
          {/* <span>
            {section.number || ""}
          </span> */}

          <h3>{section.title}</h3>
        </div>

        <div className="draft-card-actions" style={{
          display: "flex",
          gap: "10px",
          alignItems: "center"
        }}>
          {!isDiagramSection && (
            <>
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
            </>
          )}

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
import ReactQuill from "react-quill-new";
import { useState, useEffect } from "react";
import { FaPen, FaTimes, FaRedo, FaCopy, FaCheck } from "react-icons/fa";

import "react-quill-new/dist/quill.snow.css";

const DraftSection = ({
  title,
  onSave,
  content,
  isVisible,
  sectionKey,
  onRegenerate,
  isRegenerating,
  disableRegenerate = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localContent, setLocalContent] = useState(content);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleSave = async () => {
    await onSave(sectionKey, localContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalContent(content);
    setIsEditing(false);
  };

  const handleCopy = () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = localContent;
    navigator.clipboard.writeText(tempDiv.textContent || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPlaceholder = () => {
    if (
      sectionKey === "add_custom_paragraph" ||
      sectionKey === "sequence_listing" ||
      sectionKey === "custom_paragraphs"
    ) {
      return "<i>No content yet. Click edit to add your content.</i>";
    } else if (sectionKey === "detailed_descriptions") {
      return "<i>Waiting for Brief Description...</i>";
    }
    return "<i>No content generated yet.</i>";
  };

  const quillModules = {
    toolbar: [
      [{ header: [3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const isDetailedDescEmpty =
    sectionKey === "detailed_descriptions" && !localContent;

  if (!isVisible) {
    return null;
  }

  return (
    <div className="draft-section" id={`section-${sectionKey}`}>
      <div className="section-header">
        <h3 className="section-title">{title}</h3>

        <div className="d-flex gap-2">
          {isEditing ? (
            <>
              <button
                className="icon-btn text-danger"
                onClick={handleCancel}
                title="Cancel Editing"
              >
                <FaTimes />
              </button>
              <button
                className="icon-btn text-success"
                onClick={handleSave}
                title="Save Changes"
              >
                <FaCheck />
              </button>
            </>
          ) : (
            !isRegenerating &&
            !isDetailedDescEmpty && (
              <>
                {!!localContent && (
                  <button
                    className="icon-btn"
                    onClick={handleCopy}
                    title="Copy"
                  >
                    {copied ? <FaCheck className="text-success" /> : <FaCopy />}
                  </button>
                )}

                {/* {sectionKey !== "add_custom_paragraph" &&
                  sectionKey !== "custom_paragraphs" &&
                  sectionKey !== "sequence_listing" && (
                    <button
                      className="icon-btn"
                      onClick={() => onRegenerate(sectionKey)}
                      title={
                        disableRegenerate
                          ? "Dependents are updating..."
                          : "Regenerate"
                      }
                      disabled={disableRegenerate}
                      style={
                        disableRegenerate
                          ? { opacity: 0.5, cursor: "not-allowed" }
                          : {}
                      }
                    >
                      <FaRedo />
                    </button>
                  )} */}

                {/* <button
                  className="icon-btn text-danger"
                  onClick={() => setIsEditing(true)}
                  title="Edit"
                >
                  <FaPen />

                </button> */}
              </>
            )
          )}
        </div>
      </div>

      {/* Content Area */}
      {isRegenerating ? (
        <div className="section-loader">
          <div className="skeleton-text w-100"></div>
          <div className="skeleton-text w-100"></div>
          <div className="skeleton-text w-75"></div>
        </div>
      ) : isEditing ? (
        <div className="quill-wrapper">
          <ReactQuill
            theme="snow"
            value={localContent}
            modules={quillModules}
            onChange={setLocalContent}
          />
        </div>
      ) : (
        <div
          className="content-view"
          dangerouslySetInnerHTML={{
            __html: localContent || getPlaceholder(),
          }}
        />
      )}
    </div>
  );
};

export default DraftSection;

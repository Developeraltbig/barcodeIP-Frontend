// import ReactQuill from "react-quill-new";
// import { useState, useEffect } from "react";
// import { FaPen, FaTimes, FaRedo, FaCopy, FaCheck } from "react-icons/fa";

// import "react-quill-new/dist/quill.snow.css";

// const DraftSection = ({
//   title,
//   onSave,
//   content,
//   isVisible,
//   sectionKey,
//   onRegenerate,
//   isRegenerating,
//   disableRegenerate = false,
// }) => {
//   const [copied, setCopied] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [localContent, setLocalContent] = useState(content);

//   useEffect(() => {
//     setLocalContent(content);
//   }, [content]);

//   const handleSave = async () => {
//     await onSave(sectionKey, localContent);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setLocalContent(content);
//     setIsEditing(false);
//   };

//   const handleCopy = () => {
//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = localContent;
//     navigator.clipboard.writeText(tempDiv.textContent || "");
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const getPlaceholder = () => {
//     if (
//       sectionKey === "add_custom_paragraph" ||
//       sectionKey === "sequence_listing" ||
//       sectionKey === "custom_paragraphs"
//     ) {
//       return "<i>No content yet. Click edit to add your content.</i>";
//     } else if (sectionKey === "detailed_descriptions") {
//       return "<i>Waiting for Brief Description...</i>";
//     }
//     return "<i>Generating your content.</i>";
//   };

//   const quillModules = {
//     toolbar: [
//       [{ header: [3, false] }],
//       ["bold", "italic", "underline"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ script: "sub" }, { script: "super" }],
//       ["clean"],
//     ],
//     clipboard: {
//       matchVisual: false,
//     },
//   };

//   const isDetailedDescEmpty =
//     sectionKey === "detailed_descriptions" && !localContent;

//   if (!isVisible) {
//     return null;
//   }

//   return (
//     <div className="draft-section" id={`section-${sectionKey}`}>
//       <div className="section-header">
//         <h3 className="section-title">{title}</h3>

//         <div className="d-flex gap-2">
//           {isEditing ? (
//             <>
//               <button
//                 className="icon-btn text-danger"
//                 onClick={handleCancel}
//                 title="Cancel Editing"
//               >
//                 <FaTimes />
//               </button>
//               <button
//                 className="icon-btn text-success"
//                 onClick={handleSave}
//                 title="Save Changes"
//               >
//                 <FaCheck />
//               </button>
//             </>
//           ) : (
//             !isRegenerating &&
//             !isDetailedDescEmpty && (
//               <>
//                 {!!localContent && (
//                   <button
//                     className="icon-btn"
//                     onClick={handleCopy}
//                     title="Copy"
//                   >
//                     {copied ? <FaCheck className="text-success" /> : <FaCopy />}
//                   </button>
//                 )}

//                 {sectionKey !== "add_custom_paragraph" &&
//                   sectionKey !== "custom_paragraphs" &&
//                   sectionKey !== "sequence_listing" && (
//                     <button
//                       className="icon-btn"
//                       onClick={() => onRegenerate(sectionKey)}
//                       title={
//                         disableRegenerate
//                           ? "Dependents are updating..."
//                           : "Regenerate"
//                       }
//                       disabled={disableRegenerate}
//                       style={
//                         disableRegenerate
//                           ? { opacity: 0.5, cursor: "not-allowed" }
//                           : {}
//                       }
//                     >
//                       <FaRedo />
//                     </button>
//                   )}

//                 <button
//                   className="icon-btn text-danger"
//                   onClick={() => setIsEditing(true)}
//                   title="Edit"
//                 >
//                   <FaPen />

//                 </button>
//               </>
//             )
//           )}
//         </div>
//       </div>

//       {/* Content Area */}
//       {isRegenerating ? (
//         <div className="section-loader">
//           <div className="skeleton-text w-100"></div>
//           <div className="skeleton-text w-100"></div>
//           <div className="skeleton-text w-75"></div>
//         </div>
//       ) : isEditing ? (
//         <div className="quill-wrapper">
//           <ReactQuill
//             theme="snow"
//             value={localContent}
//             modules={quillModules}
//             onChange={setLocalContent}
//           />
//         </div>
//       ) : (
//         <div
//           className="content-view"
//           dangerouslySetInnerHTML={{
//             __html: localContent || getPlaceholder()
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default DraftSection;
















import ReactQuill from "react-quill-new";
import { useState, useEffect } from "react";
import { FaPen, FaTimes, FaRedo, FaCopy, FaCheck } from "react-icons/fa";
import { Box, Typography, IconButton, Tooltip, Stack, Skeleton } from "@mui/material";

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
    return "<i>Generating your content.</i>";
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
    <Box className="draft-section" id={`section-${sectionKey}`} sx={{ mb: 3 }}>
      <Box
        className="section-header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6" component="h3" className="section-title">
          {title}
        </Typography>

        <Stack direction="row" spacing={1}>
          {isEditing ? (
            <>
              <Tooltip title="Cancel Editing">
                <IconButton color="error" onClick={handleCancel}>
                  <FaTimes />
                </IconButton>
              </Tooltip>
              <Tooltip title="Save Changes">
                <IconButton color="success" onClick={handleSave}>
                  <FaCheck />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            !isRegenerating &&
            !isDetailedDescEmpty && (
              <>
                {!!localContent && (
                  <Tooltip title="Copy">
                    <IconButton
                      color={copied ? "success" : "default"}
                      onClick={handleCopy}
                    >
                      {copied ? <FaCheck /> : <FaCopy />}
                    </IconButton>
                  </Tooltip>
                )}

                {sectionKey !== "add_custom_paragraph" &&
                  sectionKey !== "custom_paragraphs" &&
                  sectionKey !== "sequence_listing" && (
                    // <Tooltip
                    //   title={
                    //     disableRegenerate
                    //       ? "Dependents are updating..."
                    //       : "Regenerate"
                    //   }
                    // >
                    //   {/* Wrapping in span allows tooltip to show even if button is disabled */}
                    //   <span
                    //     style={
                    //       disableRegenerate ? { cursor: "not-allowed" } : {}
                    //     }
                    //   >
                    //     <IconButton
                    //       onClick={() => onRegenerate(sectionKey)}
                    //       disabled={disableRegenerate}
                    //       sx={
                    //         disableRegenerate
                    //           ? { pointerEvents: "none" }
                    //           : {}
                    //       }
                    //     >
                    //       <FaRedo />
                    //     </IconButton>
                    //   </span>
                    // </Tooltip>
                    <> </>
                  )}

                <Tooltip title="Edit">
                  <IconButton color="error" onClick={() => setIsEditing(true)}>
                    <FaPen />
                  </IconButton>
                </Tooltip>
              </>
            )
          )}
        </Stack>
      </Box>

      {/* Content Area */}
      {isRegenerating ? (
        <Box className="section-loader" sx={{ display: "flex", flexDirection: "column", gap: 1, py: 2 }}>
          <Skeleton animation="wave" variant="text" width="100%" />
          <Skeleton animation="wave" variant="text" width="100%" />
          <Skeleton animation="wave" variant="text" width="75%" />
        </Box>
      ) : isEditing ? (
        <Box className="quill-wrapper">
          <ReactQuill
            theme="snow"
            value={localContent}
            modules={quillModules}
            onChange={setLocalContent}
          />
        </Box>
      ) : (
        <Box
          className="content-view"
          dangerouslySetInnerHTML={{
            __html: localContent || getPlaceholder(),
          }}
        />
      )}
    </Box>
  );
};

export default DraftSection;
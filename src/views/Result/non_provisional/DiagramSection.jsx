// import {
//   FaRedo,
//   FaTimes,
//   FaExpand,
//   FaDownload,
//   FaExclamationTriangle,
// } from "react-icons/fa";
// import { useState } from "react";
// import { useEffect } from "react";
// import { saveAs } from "file-saver";
// import { toast } from "react-toastify";
// import { getPlantUmlImageUrl } from "../../../utils/plantUmlUtils";
// // import { getPlantUmlImageUrl } from "../../utils/plantUmlUtils";

// const DiagramSection = ({
//   sectionKey,
//   title,
//   content,
//   onRegenerate,
//   isRegenerating,
//   isVisible,
// }) => {
//   const [imageError, setImageError] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [imageLoading, setImageLoading] = useState(false);

//   const imageUrl = getPlantUmlImageUrl(content);

//   const handleDownload = async () => {
//     try {
//       const pngUrl = imageUrl.replace("/svg/", "/png/");

//       const response = await fetch(pngUrl);
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const blob = await response.blob();
//       saveAs(blob, `${title.replace(/\s+/g, "_")}.png`);
//     } catch (error) {
//       if (!import.meta.env.PROD) {
//         console.error("Download failed:", error);
//       }
//       toast.error("Something went wrong. Please try again!");
//     }
//   };

//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isModalOpen]);

//   useEffect(() => {
//     if (content && !isRegenerating) {
//       setImageLoading(true);
//       setImageError(false);
//     }
//   }, [content, isRegenerating]);

//   const isLoading = isRegenerating || (content && imageLoading);
//   const isReady = !isLoading && content && !imageError;
//   const showLoader = isLoading;
//   const showError = !isLoading && imageError && content;
//   const showImage = content && !isRegenerating && !imageError && !imageLoading;
//   const showEmpty = !content && !isRegenerating;

//   if (!isVisible) {
//     return null;
//   }

//   return (
//     <>
//       {/* 1. The Main Card Section */}
//       <div className="draft-section" id={`section-${sectionKey}`}>
//         <div className="section-header">
//           <h3 className="section-title">{title}</h3>
//           <div className="d-flex gap-2">
//             {isReady && (
//               <>
//                 <button
//                   className="icon-btn"
//                   onClick={handleDownload}
//                   title="Download Diagram"
//                 >
//                   <FaDownload />
//                 </button>
//                 {/* <button
//                   className="icon-btn"
//                   onClick={() => onRegenerate(sectionKey)}
//                   title="Regenerate Diagram"
//                 >
//                   <FaRedo />
//                 </button> */}
//                 <button
//                   className="icon-btn"
//                   onClick={() => setIsModalOpen(true)}
//                   title="Expand View"
//                 >
//                   <FaExpand />
//                 </button>
//               </>
//             )}

//             {/* {imageError && !isRegenerating && (
//               <button
//                 className="icon-btn text-danger"
//                 onClick={() => onRegenerate(sectionKey)}
//                 title="Retry Generation"
//               >
//                 <FaRedo />
//               </button>
//             )} */}
//           </div>
//         </div>

//         <div
//           className={`section-body ${
//             content ? "d-flex justify-content-center align-items-center" : ""
//           }`}
//           style={{
//             overflow: "hidden",
//             position: "relative",
//           }}
//         >
//           {/* Loader State */}
//           {showLoader && (
//             <div
//               className="section-loader"
//               style={{
//                 width: "100%",
//               }}
//             >
//               <div className="skeleton-text w-100"></div>
//               <div className="skeleton-text w-100"></div>
//               <div className="skeleton-text w-75"></div>
//             </div>
//           )}

//           {/* Error State */}
//           {showError && (
//             <div className="text-center p-4">
//               <FaExclamationTriangle className="text-danger mb-3" size={32} />
//               <p className="text-muted mb-2">Failed to render diagram.</p>
//             </div>
//           )}

//           {/* 
//             Hidden preloader image - renders while loading to trigger the load/error events
//             This is positioned absolutely so it doesn't affect layout
//           */}
//           {content && !isRegenerating && imageLoading && (
//             <img
//               src={imageUrl}
//               alt=""
//               style={{
//                 position: "absolute",
//                 width: 0,
//                 height: 0,
//                 opacity: 0,
//                 pointerEvents: "none",
//               }}
//               onLoad={() => {
//                 setImageLoading(false);
//                 setImageError(false);
//               }}
//               onError={() => {
//                 setImageLoading(false);
//                 setImageError(true);
//               }}
//             />
//           )}

//           {/* Image State - only renders when fully loaded */}
//           {showImage && (
//             <div
//               style={{
//                 width: "100%",
//                 textAlign: "center",
//                 cursor: "zoom-in",
//                 padding: "20px",
//                 background: "white",
//                 transition: "opacity 0.3s ease",
//               }}
//               onClick={() => setIsModalOpen(true)}
//             >
//               <img
//                 src={imageUrl}
//                 alt={title}
//                 style={{
//                   maxWidth: "100%",
//                   maxHeight: "400px",
//                   objectFit: "contain",
//                 }}
//               />
//             </div>
//           )}

//           {/* {content && !isRegenerating && !imageError && (
//             <div
//               style={{
//                 width: "100%",
//                 textAlign: "center",
//                 cursor: isReady ? "zoom-in" : "default",
//                 padding: "20px",
//                 background: "white",
//                 opacity: imageLoading ? 0 : 1,
//                 transition: "opacity 0.3s ease",
//               }}
//               onClick={() => isReady && setIsModalOpen(true)}
//             >
//               <img
//                 src={imageUrl}
//                 alt={title}
//                 style={{
//                   maxWidth: "100%",
//                   maxHeight: "400px",
//                   objectFit: "contain",
//                 }}
//                 onLoad={() => {
//                   setImageLoading(false);
//                   setImageError(false);
//                 }}
//                 onError={() => {
//                   setImageLoading(false);
//                   setImageError(true);
//                 }}
//               />
//             </div>
//           )} */}

//           {/* Empty State */}
//           {showEmpty && (
//             <div className="empty-content-placeholder">
//               Waiting for Brief Description...
//             </div>
//           )}
//         </div>
//       </div>

//       {/* 2. The Expand Modal (Portal or Inline Overlay) */}
//       {isModalOpen && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             backgroundColor: "rgba(0, 0, 0, 0.85)",
//             zIndex: 9999,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             backdropFilter: "blur(5px)",
//           }}
//           onClick={() => setIsModalOpen(false)}
//         >
//           {/* Close Button */}
//           <button
//             onClick={() => setIsModalOpen(false)}
//             style={{
//               position: "absolute",
//               top: "20px",
//               right: "20px",
//               background: "white",
//               border: "none",
//               borderRadius: "50%",
//               width: "40px",
//               height: "40px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//               zIndex: 10000,
//             }}
//           >
//             <FaTimes size={20} color="#333" />
//           </button>

//           {/* Large Image */}
//           <div
//             style={{
//               maxWidth: "90%",
//               maxHeight: "90%",
//               background: "white",
//               padding: "40px",
//               borderRadius: "12px",
//               overflow: "auto",
//               boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <img
//               src={imageUrl}
//               alt={`${title} - Full View`}
//               style={{
//                 width: "100%",
//                 height: "auto",
//                 display: "block",
//               }}
//             />
//             <div className="text-center mt-3">
//               <button className="btn btn-primary" onClick={handleDownload}>
//                 <FaDownload className="me-2" /> Download High-Res Image
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default DiagramSection;
























import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  IconButton, 
  Modal, 
  Fade, 
  Backdrop, 
  CircularProgress, 
  Button,
  Paper 
} from "@mui/material";
import { 
  FaDownload, 
  FaExpand, 
  FaExclamationTriangle, 
  FaTimes 
} from "react-icons/fa";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { getPlantUmlImageUrl } from "../../../utils/plantUmlUtils";

const DiagramSection = ({
  sectionKey,
  title,
  content,
  isRegenerating,
  isVisible,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const imageUrl = getPlantUmlImageUrl(content);

  const handleDownload = async () => {
    try {
      const pngUrl = imageUrl.replace("/svg/", "/png/");
      const response = await fetch(pngUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      saveAs(blob, `${title.replace(/\s+/g, "_")}.png`);
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  useEffect(() => {
    if (content && !isRegenerating) {
      setImageLoading(true);
      setImageError(false);
    }
  }, [content, isRegenerating]);

  const isLoading = isRegenerating || (content && imageLoading);
  const isReady = !isLoading && content && !imageError;

  if (!isVisible) return null;

  return (
    <Paper 
      id={`section-${sectionKey}`} 
      elevation={1} 
      sx={{ p: 2, mb: 3, borderRadius: 2, overflow: "hidden" }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>
        {isReady && (
          <Box>
            <IconButton onClick={handleDownload} title="Download">
              <FaDownload size={18} />
            </IconButton>
            <IconButton onClick={() => setIsModalOpen(true)} title="Expand">
              <FaExpand size={18} />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Body */}
      <Box sx={{ position: "relative", minHeight: "200px", maxWidth: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {isLoading && <CircularProgress color="primary" />}
        
        {!isLoading && imageError && (
          <Box sx={{ textAlign: "center", color: "error.main", maxWidth: "100%" }}>
            <FaExclamationTriangle size={32} />
            <Typography>Failed to render diagram.</Typography>
          </Box>
        )}

        {isReady && (
          <Box 
            component="img" 
            src={imageUrl} 
            alt={title}
            onClick={() => setIsModalOpen(true)}
            sx={{ 
              maxWidth: "100%", 
              maxHeight: "400px", 
              objectFit: "contain", 
              cursor: "zoom-in" 
            }}
          />
        )}

        {!content && !isRegenerating && (
          <Typography color="text.secondary">Waiting for Brief Description...</Typography>
        )}
      </Box>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isModalOpen}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '90vw', height: '90vh', bgcolor: 'background.paper',
            borderRadius: 2, boxShadow: 24, p: 4, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}>
            <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} onClick={() => setIsModalOpen(false)}>
              <FaTimes />
            </IconButton>
            <Box component="img" src={imageUrl} sx={{ maxWidth: "100%", height: "auto" }} />
            <Button variant="contained" onClick={handleDownload} sx={{ mt: 3 }}>
              <FaDownload style={{ marginRight: 8 }} /> Download High-Res
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Paper>
  );
};

export default DiagramSection;
import React, { memo, useEffect } from "react";
import ReactDOM from "react-dom";

const ViewUserModal = memo(({ open, data, onClose }) => {

  // 1. Helper: Format Date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; 

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  // 2. Helper: Check if string is HTML
  const isHTML = (str) => {
    if (typeof str !== 'string') return false;
    const htmlRegex = /<[a-z][\s\S]*>/i; 
    return htmlRegex.test(str);
  };

  // Handle Body Scroll Lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [open]);

  if (!open || !data) return null;

  return ReactDOM.createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={headerStyle}>
          <h3 style={titleStyle}>Article Details</h3>
          <button style={closeIconBtn} onClick={onClose}>&times;</button>
        </div>
        
        <div style={contentScrollStyle}>
          
          {/* 1. Image Preview Section (If image exists) */}
          <div style={imageSectionStyle}>
            <span style={labelStyle}>Featured Image</span>
            {data.image ? (
              <img 
                src={data.image} 
                alt="Preview" 
                style={imagePreviewStyle} 
                onClick={() => window.open(data.image, '_blank')}
              />
            ) : (
              <div style={noImagePlaceholder}>No Image Available</div>
            )}
          </div>

          {/* 2. Title Section */}
          <div style={rowStyle}>
            <span style={labelStyle}>Title</span>
            <span style={valueStyle}>{data.title || "-"}</span>
          </div>

          {/* 3. Description Section (HTML Content) */}
          <div style={htmlRowStyle}>
            <span style={labelStyle}>Description</span>
            <div 
              style={htmlContentStyle}
              className="modal-html-view"
              dangerouslySetInnerHTML={{ __html: data.description || "<i>No description provided</i>" }} 
            />
          </div>
          
          {/* 4. Metadata (Dates) */}
          <div style={metaGrid}>
            <div style={rowStyle}>
              <span style={labelStyle}>Created At</span>
              <span style={valueStyle}>{formatDate(data.createdAt)}</span>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Updated At</span>
              <span style={valueStyle}>{formatDate(data.updatedAt)}</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <button style={closeBtnStyle} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>,
    document.body
  );
});

export default ViewUserModal;

/* ========= ENHANCED STYLES ========= */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15, 23, 42, 0.6)",
  backdropFilter: "blur(8px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 99999,
  padding: "20px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "700px",
  maxHeight: "85vh",
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

const headerStyle = {
  padding: "20px 24px",
  borderBottom: "1px solid #f1f5f9",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const titleStyle = {
  margin: 0,
  fontSize: "1.25rem",
  fontWeight: "700",
  color: "#0f172a",
};

const closeIconBtn = {
  background: "none",
  border: "none",
  fontSize: "24px",
  color: "#94a3b8",
  cursor: "pointer",
};

const contentScrollStyle = {
  padding: "24px",
  overflowY: "auto",
  flex: 1,
};

/* --- Image Styles --- */
const imageSectionStyle = {
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "8px"
};

const imagePreviewStyle = {
  width: "100%",
  maxHeight: "250px",
  objectFit: "contain",
  borderRadius: "12px",
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  cursor: "zoom-in"
};

const noImagePlaceholder = {
  width: "100%",
  height: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f1f5f9",
  borderRadius: "12px",
  color: "#94a3b8",
  fontSize: "14px",
  border: "1px dashed #cbd5e1"
};

/* --- Row Styles --- */
const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "14px 0",
  borderBottom: "1px solid #f1f5f9",
};

const labelStyle = {
  fontSize: "0.85rem",
  color: "#64748b",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.025em"
};

const valueStyle = {
  fontSize: "0.95rem",
  color: "#1e293b",
  fontWeight: "500",
  textAlign: "right",
};

/* --- HTML Content Styles --- */
const htmlRowStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "20px 0",
  gap: "10px",
};

const htmlContentStyle = {
  fontSize: "0.95rem",
  color: "#334155",
  lineHeight: "1.6",
  backgroundColor: "#f8fafc",
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  maxHeight: "300px",
  overflowY: "auto"
};

const metaGrid = {
  marginTop: "10px"
};

const footerStyle = {
  padding: "16px 24px",
  backgroundColor: "#f8fafc",
  display: "flex",
  justifyContent: "flex-end",
  borderTop: "1px solid #f1f5f9",
};

const closeBtnStyle = {
  padding: "10px 24px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#ffffff",
  color: "#475569",
  fontSize: "0.875rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s",
};
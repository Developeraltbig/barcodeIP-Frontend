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

  // 3. Render Row (Conditional Rendering for HTML vs Text)
  const DataRow = ({ label, value }) => {
    const contentIsHtml = isHTML(value);

    // If HTML, render label top, content bottom (Full Width)
    if (contentIsHtml) {
      return (
        <div style={htmlRowStyle}>
          <span style={labelStyle}>{label}</span>
          <div 
            style={htmlContentStyle}
            dangerouslySetInnerHTML={{ __html: value }} 
          />
        </div>
      );
    }

    // If Text/Date, render standard Flex row (Label Left, Value Right)
    return (
      <div style={rowStyle}>
        <span style={labelStyle}>{label}</span>
        <span style={valueStyle}>{value || "-"}</span>
      </div>
    );
  };

  return ReactDOM.createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>About Us Details</h3>
        </div>
        
        <div style={contentScrollStyle}>
          {/* Render HTML content properly */}
          <DataRow label="Description" value={data.description} />
          
          {/* Standard Fields */}
          <DataRow label="Created At" value={formatDate(data.createdAt)} />
          <DataRow label="Updated At" value={formatDate(data.updatedAt)} />
        </div>

        <div style={footerStyle}>
          <button 
            style={closeBtnStyle} 
            onClick={onClose}
          >
            Close
          </button>
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
  backgroundColor: "rgba(15, 23, 42, 0.45)",
  backdropFilter: "blur(4px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 99999,
  padding: "20px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "750px",
  maxHeight: "90vh", // Prevent modal from being taller than screen
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  animation: "modalFadeIn 0.2s ease-out",
};

const headerStyle = {
  padding: "20px 24px",
  borderBottom: "1px solid #f1f5f9",
};

const titleStyle = {
  margin: 0,
  fontSize: "1.25rem",
  fontWeight: "600",
  color: "#1e293b",
};

const contentScrollStyle = {
  padding: "12px 24px",
  overflowY: "auto", // Allow scrolling if content is long
  flex: 1,
};

/* --- Standard Text Row Styles --- */
const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 0",
  borderBottom: "1px solid #f8fafc",
};

const labelStyle = {
  fontSize: "0.875rem",
  color: "#64748b",
  fontWeight: "600",
  minWidth: "100px",
};

const valueStyle = {
  fontSize: "0.9rem",
  color: "#0f172a",
  fontWeight: "500",
  textAlign: "right",
  wordBreak: "break-word",
  marginLeft: "20px",
};

/* --- HTML Content Row Styles --- */
const htmlRowStyle = {
  display: "flex",
  flexDirection: "column", // Stack vertically
  padding: "16px 0",
  borderBottom: "1px solid #f8fafc",
  gap: "8px",
};

const htmlContentStyle = {
  fontSize: "0.9rem",
  color: "#334155",
  lineHeight: "1.6",
  backgroundColor: "#f8fafc", // Light gray background for HTML block
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  width: "100%",
  boxSizing: "border-box",
  overflowX: "auto", // Handle wide tables/images
};

const footerStyle = {
  padding: "16px 24px",
  backgroundColor: "#f8fafc",
  display: "flex",
  justifyContent: "flex-end",
  borderTop: "1px solid #f1f5f9",
};

const closeBtnStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  fontSize: "0.875rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s ease",
  boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.3)",
};
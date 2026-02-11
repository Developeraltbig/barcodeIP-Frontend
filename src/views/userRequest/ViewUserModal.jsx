import React, { memo, useEffect } from "react";
import ReactDOM from "react-dom";

const ViewUserModal = memo(({ open, data, onClose }) => {

   const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    
    // Check if date is valid
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


  // Handle Body Scroll Lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open || !data) return null;

  // Helper to render rows
  const DataRow = ({ label, value }) => (
    <div style={rowStyle}>
      <span style={labelStyle}>{label}</span>
      <span style={valueStyle}>{value || "-"}</span>
    </div>
  );

  return ReactDOM.createPortal(
    <div style={overlayStyle} onClick={onClose}>
      {/* onClick on card is stopped so clicking the card doesn't close it */}
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        <h3 style={headerStyle}>User Request</h3>
        
        <div style={contentStyle}>
          <DataRow label="Email Address" value={data.email} />
          <DataRow label="Created At" value={formatDate(data.createdAt)} />
        </div>

        <div style={footerStyle}>
          <button 
            style={closeBtnStyle} 
            onClick={onClose}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
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

/* ========= Enhanced Styles ========= */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15, 23, 42, 0.45)", // Modern Slate overlay
  backdropFilter: "blur(4px)", // Modern glass effect
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 99999,
  padding: "20px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "450px",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", // Deep soft shadow
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  animation: "modalFadeIn 0.2s ease-out",
};

const headerStyle = {
  margin: 0,
  padding: "20px 24px",
  fontSize: "1.25rem",
  fontWeight: "600",
  color: "#1e293b",
  borderBottom: "1px solid #f1f5f9",
};

const contentStyle = {
  padding: "12px 24px",
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 0",
  borderBottom: "1px solid #f8fafc",
};

const labelStyle = {
  fontSize: "0.875rem",
  color: "#64748b", // Muted Slate
  fontWeight: "500",
};

const valueStyle = {
  fontSize: "0.9rem",
  color: "#0f172a", // Darker Slate
  fontWeight: "600",
  textAlign: "right",
  wordBreak: "break-all",
  marginLeft: "10px",
};

const footerStyle = {
  padding: "16px 24px",
  backgroundColor: "#f8fafc",
  display: "flex",
  justifyContent: "flex-end", // Aligns button to bottom right
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
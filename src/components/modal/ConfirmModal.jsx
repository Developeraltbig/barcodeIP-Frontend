import React, { memo, useEffect } from "react";
import ReactDOM from "react-dom";

const ConfirmModal = memo(({ open, title, message, onConfirm, onClose }) => {
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

  if (!open) return null;

  return ReactDOM.createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        
        {/* Header & Icon Area */}
        <div style={contentAreaStyle}>
          <div style={iconContainerStyle}>
            <span style={iconStyle}>!</span>
          </div>
          <div style={textContainerStyle}>
            <h3 style={titleStyle}>{title || "Are you sure?"}</h3>
            <p style={msgStyle}>{message || "This action cannot be undone."}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={footerStyle}>
          <button 
            style={cancelBtnStyle} 
            onClick={onClose}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f1f5f9")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            Cancel
          </button>
          <button 
            style={deleteBtnStyle} 
            onClick={onConfirm}
            onMouseOver={(e) => (e.target.style.opacity = "0.9")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
});

export default ConfirmModal;

/* ================= ENHANCED STYLES ================= */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15, 23, 42, 0.45)",
  backdropFilter: "blur(6px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 99999,
  padding: "20px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "400px", // Slightly narrower for confirmation
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  overflow: "hidden",
  animation: "modalSlideUp 0.3s ease-out",
};

const contentAreaStyle = {
  padding: "32px 24px 24px 24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center", // Center content for confirmation
  textAlign: "center",
};

const iconContainerStyle = {
  width: "48px",
  height: "48px",
  backgroundColor: "#fee2e2", // Light red
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "16px",
};

const iconStyle = {
  color: "#ef4444", // Danger red
  fontSize: "24px",
  fontWeight: "bold",
};

const textContainerStyle = {
  width: "100%",
};

const titleStyle = {
  margin: "0 0 8px 0",
  fontSize: "1.25rem",
  fontWeight: "700",
  color: "#1e293b",
};

const msgStyle = {
  margin: 0,
  fontSize: "0.95rem",
  color: "#64748b",
  lineHeight: "1.5",
};

const footerStyle = {
  padding: "16px 24px",
  backgroundColor: "#f8fafc",
  display: "flex",
  justifyContent: "flex-end", // Buttons to the right
  gap: "12px",
};

const cancelBtnStyle = {
  padding: "10px 18px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  backgroundColor: "transparent",
  color: "#64748b",
  fontSize: "0.875rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const deleteBtnStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(135deg, #ef4444, #dc2626)", // Red Gradient
  color: "#ffffff",
  fontSize: "0.875rem",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 6px -1px rgba(239, 68, 68, 0.2)",
  transition: "all 0.2s ease",
};
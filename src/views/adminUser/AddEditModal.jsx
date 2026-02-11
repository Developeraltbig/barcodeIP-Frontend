import React, { memo, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const AdminUserFormModal = memo(({ open, mode, data, onSubmit, onClose }) => {
  const [email, setEmail] = useState("");
  const [oldserpkey, setOldSerpkey] = useState("")
  const [password, setPassword] = useState("");
  const [updateValue, setUpdateValue] = useState(""); // For Edit Mode

  useEffect(() => {
    if (open) {
      if (mode === "edit" && data) {
        console.log('data-', data)
        setEmail(data.email);
        setOldSerpkey(data.old_serp_key)
        setUpdateValue(""); // Reset update field
      } else {
        setEmail("");
        setPassword("");
      }
    }
  }, [mode, data, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "add") {
      onSubmit({ email, password });
    } else {
      // Sending as key-value pair as requested
      onSubmit({ key: updateValue }); 
    }
  };

  return ReactDOM.createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>{mode === "edit" ? "Update Admin User" : "Register Admin"}</h3>
        </div>

        <form onSubmit={handleSubmit} style={contentStyle}>
          {/* Field 1: Email (Disabled in Edit Mode) */}
          <label style={labelStyle}>Email Address</label>
          <input
            style={{ ...inputStyle, backgroundColor: mode === "edit" ? "#f1f5f9" : "#fff" }}
            type="email"
            disabled={mode === "edit"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Field 2: Password (Add Mode) OR New Value (Edit Mode) */}
          {mode === "add" ? (
            <>
              <label style={{ ...labelStyle, marginTop: "15px" }}>Password</label>
              <input
                style={inputStyle}
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          ) : (
            <>
             <label style={labelStyle}>Old SERP KEY</label>
              <input
                style={{ ...inputStyle, backgroundColor: mode === "edit" ? "#f1f5f9" : "#fff" }}
                type="old_serp_key"
                disabled={mode === "edit"}
                value={oldserpkey}
              />
              <label style={{ ...labelStyle, marginTop: "15px" }}>New SERP KEY</label>
              <input
                style={inputStyle}
                type="text"
                placeholder="Enter new value to update"
                value={updateValue}
                onChange={(e) => setUpdateValue(e.target.value)}
                required
              />
            </>
          )}

          <div style={footerStyle}>
            <button type="button" style={cancelBtnStyle} onClick={onClose}>Cancel</button>
            <button type="submit" style={primaryBtnStyle}>
              {mode === "edit" ? "Update Details" : "Create Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
});

export default AdminUserFormModal;

// ... (keep your existing styles below)

/* ================== ENHANCED STYLES ================== */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15, 23, 42, 0.45)",
  backdropFilter: "blur(6px)", // Frosted glass effect
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 99999,
  padding: "20px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "440px",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  overflow: "hidden",
  animation: "modalSlideUp 0.3s ease-out",
};

const headerStyle = {
  padding: "24px 24px 12px 24px",
};

const titleStyle = {
  margin: 0,
  fontSize: "1.25rem",
  fontWeight: "700",
  color: "#1e293b",
};

const subtitleStyle = {
  margin: "4px 0 0 0",
  fontSize: "0.875rem",
  color: "#64748b",
};

const contentStyle = {
  padding: "12px 24px 24px 24px",
};

const labelStyle = {
  display: "block",
  fontSize: "0.875rem",
  fontWeight: "600",
  marginBottom: "8px",
  color: "#475569",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  outline: "none",
  fontSize: "0.95rem",
  color: "#1e293b",
  transition: "all 0.2s ease",
  boxSizing: "border-box",
};

const footerStyle = {
  padding: "16px 24px",
  backgroundColor: "#f8fafc", // Light gray footer background
  display: "flex",
  justifyContent: "flex-end",
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

const primaryBtnStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(135deg, #2563eb, #3b82f6)", // Richer Blue Gradient
  color: "#ffffff",
  fontSize: "0.875rem",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
  transition: "all 0.2s ease",
};
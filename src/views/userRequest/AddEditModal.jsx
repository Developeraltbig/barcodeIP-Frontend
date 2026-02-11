import React, { memo, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const AdminUserFormModal = memo(({ open, mode, data, onSubmit, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updateValue, setUpdateValue] = useState(""); // For Edit Mode - New SERP Key
  const [activate, setActivate] = useState("No"); // New State for Activate

  useEffect(() => {
    if (open) {
      if (mode === "edit" && data) {
        // Pre-fill data
        setEmail(data.email || "");
        setUpdateValue(""); // Reset update field
        // Set activate state from data, default to "No" if missing
        setActivate(data.activate || "No"); 
      } else {
        // Reset for Add mode
        setEmail("");
        setPassword("");
        setActivate("No");
      }
    }
  }, [mode, data, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "add") {
      onSubmit({ email, password });
    } else {
      console.log('data --', data)
      // Sending payload as requested
      onSubmit({ 
        user_id: data.user_id || data._id, // Ensure we grab the ID from the passed data
        activate: activate,               // The Yes/No state
      }); 
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

          {/* ADD MODE */}
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
            /* EDIT MODE */
            <>

              {/* Activate Dropdown (Yes/No) */}
              <label style={{ ...labelStyle, marginTop: "15px" }}>Activate User</label>
              <select 
                style={inputStyle} 
                value={activate} 
                onChange={(e) => setActivate(e.target.value)}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
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

/* ================== STYLES (Unchanged) ================== */

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
  backgroundColor: "#fff", // Default bg
};

const footerStyle = {
  padding: "16px 24px",
  backgroundColor: "#f8fafc",
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
  background: "linear-gradient(135deg, #2563eb, #3b82f6)",
  color: "#ffffff",
  fontSize: "0.875rem",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
  transition: "all 0.2s ease",
};
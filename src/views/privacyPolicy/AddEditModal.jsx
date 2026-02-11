import React, { memo, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; 

const PrivacyPolicyFormModal = memo(({ open, mode, data, onSubmit, onClose }) => {
  // 1. Single state for description
  const [description, setDescription] = useState("");

  // 2. Populate state based on mode
  useEffect(() => {
    if (open) {
      if (mode === "edit" && data) {
        setDescription(data.description || "");
      } else {
        setDescription("");
      }
    }
  }, [mode, data, open]);

  // Handle Body Scroll Lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  // 3. Handle Editor Change
  const handleEditorChange = (content) => {
    setDescription(content);
  };

  // 4. Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Sending as an object payload
    onSubmit({ description });
  };

  // Quill Toolbar Modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'clean']
    ],
  };

  return ReactDOM.createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={headerStyle}>
          <h3 style={titleStyle}>{mode === "edit" ? "Edit Description" : "Add Description"}</h3>
          <p style={subtitleStyle}>Update the main content for the Privacy Policy Section.</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={formContainerStyle}>
          <div style={contentStyle}>
            
            <label style={labelStyle}>Description Content</label>
            <div style={editorWrapper}>
              <ReactQuill 
                theme="snow" 
                modules={modules}
                value={description} 
                onChange={handleEditorChange}
                placeholder="Write your description here..."
                style={{ height: "250px" }} // Set inner height for editor
              />
            </div>

          </div>

          {/* Footer Actions */}
          <div style={footerStyle}>
            <button type="button" style={cancelBtnStyle} onClick={onClose}>Cancel</button>
            <button type="submit" style={primaryBtnStyle}>
              {mode === "edit" ? "Update About Us" : "Save About Us"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
});

export default PrivacyPolicyFormModal;

/* ================== STYLES ================== */

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
  maxWidth: "700px", 
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  animation: "modalFadeIn 0.3s ease",
};

const headerStyle = {
  padding: "24px 30px",
  borderBottom: "1px solid #f1f5f9",
};

const titleStyle = { margin: 0, fontSize: "1.25rem", fontWeight: "700", color: "#1e293b" };
const subtitleStyle = { margin: "4px 0 0 0", fontSize: "0.875rem", color: "#64748b" };

const formContainerStyle = {
  display: "flex",
  flexDirection: "column",
};

const contentStyle = {
  padding: "24px 30px 40px 30px", // Added bottom padding for editor height
};

const labelStyle = {
  display: "block",
  fontSize: "0.875rem",
  fontWeight: "600",
  marginBottom: "10px",
  color: "#475569",
};

const editorWrapper = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  // Ensure the container is tall enough for the editor + toolbar
  minHeight: "300px", 
  display: "flex",
  flexDirection: "column",
};

const footerStyle = {
  padding: "20px 30px",
  backgroundColor: "#f8fafc",
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  borderTop: "1px solid #f1f5f9",
};

const cancelBtnStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#fff",
  color: "#64748b",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background 0.2s",
};

const primaryBtnStyle = {
  padding: "10px 24px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(135deg, #2563eb, #3b82f6)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
  transition: "opacity 0.2s",
};
import React, { memo, useEffect, useState } from "react";
import ReactDOM from "react-dom";
// Updated import to react-quill-new
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; 

const ContentFormModal = memo(({ open, mode, data, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    welcome_note: "",
    email: "",
    address: "",
    contact: "",
    copyright: "",
    image: ""
  });

  useEffect(() => {
    if (open) {
      if (mode === "edit" && data) {
        setFormData({
          welcome_note: data.welcome_note || "",
          email: data.email || "",
          address: data.address || "",
          contact: data.contact || "",
          copyright: data.copyright || "",
          image: data.image || ""
        });
      } else {
        setFormData({ 
          welcome_note: "", email: "", address: "", 
          contact: "", copyright: "", image: "" 
        });
      }
    }
  }, [mode, data, open]);

  // Handle Body Scroll Lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({ ...prev, welcome_note: content }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Standard Quill Modules for a nice toolbar
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean']
    ],
  };

  return ReactDOM.createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={headerStyle}>
          <h3 style={titleStyle}>{mode === "edit" ? "Edit Site Content" : "Add Site Content"}</h3>
          <p style={subtitleStyle}>Manage your welcome message and contact information.</p>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} style={formScrollContainer}>
          <div style={contentStyle}>
            
            {/* Rich Text Editor Section */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Welcome Note</label>
              <div style={editorWrapper}>
                <ReactQuill 
                  theme="snow" 
                  modules={modules}
                  value={formData.welcome_note} 
                  onChange={handleEditorChange}
                  placeholder="Write a warm welcome note..."
                />
              </div>
            </div>

            {/* Grid for other fields */}
            <div style={gridStyle}>
              <div style={inputGroup}>
                <label style={labelStyle}>Email Address</label>
                <input style={inputStyle} name="email" value={formData.email} onChange={handleChange} placeholder="contact@example.com" />
              </div>

              <div style={inputGroup}>
                <label style={labelStyle}>Contact Number</label>
                <input style={inputStyle} name="contact" value={formData.contact} onChange={handleChange} placeholder="+1 234 567 890" />
              </div>

              <div style={inputGroup}>
                <label style={labelStyle}>Copyright Text</label>
                <input style={inputStyle} name="copyright" value={formData.copyright} onChange={handleChange} placeholder="© 2024 Your Brand" />
              </div>

              <div style={inputGroup}>
                <label style={labelStyle}>Image URL</label>
                <input style={inputStyle} name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
              </div>
            </div>

            <div style={{ ...inputGroup, marginTop: "20px" }}>
              <label style={labelStyle}>Physical Address</label>
              <textarea 
                style={{ ...inputStyle, height: "80px", resize: "none" }} 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Enter full address details..." 
              />
            </div>

          </div>

          {/* Footer Actions */}
          <div style={footerStyle}>
            <button type="button" style={cancelBtnStyle} onClick={onClose}>Cancel</button>
            <button type="submit" style={primaryBtnStyle}>
              {mode === "edit" ? "Save Changes" : "Create Content"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
});

export default ContentFormModal;

/* ================== ENHANCED STYLES ================== */

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
  maxWidth: "750px", 
  maxHeight: "90vh",
  backgroundColor: "#ffffff",
  borderRadius: "20px",
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

const formScrollContainer = {
  overflowY: "auto",
  flex: 1,
  paddingBottom: "20px",
};

const contentStyle = {
  padding: "24px 30px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

const inputGroup = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  fontSize: "0.85rem",
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
  boxSizing: "border-box",
  transition: "all 0.2s",
};

const editorWrapper = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  minHeight: "200px",
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
  padding: "10px 24px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#fff",
  color: "#64748b",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background 0.2s",
};

const primaryBtnStyle = {
  padding: "10px 24px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #2563eb, #3b82f6)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
  transition: "opacity 0.2s",
};
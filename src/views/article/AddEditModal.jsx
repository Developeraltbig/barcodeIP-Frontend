import React, { memo, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; 

const ArticleFormModal = memo(({ open, mode, data, onSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  // 1. Populate state when modal opens or data changes
  useEffect(() => {
    if (open) {
      if (mode === "edit" && data) {
        setTitle(data.title || "");
        setDescription(data.description || "");
        setImagePreview(data.image || ""); // Existing image URL
        setImageFile(null); // Reset file selection
      } else {
        setTitle("");
        setDescription("");
        setImagePreview("");
        setImageFile(null);
      }
    }
  }, [mode, data, open]);

  // Handle Body Scroll Lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  // 2. Handle Image Change & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Create local URL for preview
    }
  };

  // 3. Handle Submit using FormData
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    
    // Only append image if a new one was selected
    if (imageFile) {
      formData.append("image", imageFile);
    }

    onSubmit(formData);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'clean']
    ],
  };

  return ReactDOM.createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={headerStyle}>
          <h3 style={titleStyle}>{mode === "edit" ? "Edit Article" : "Create New Article"}</h3>
          <p style={subtitleStyle}>Fill in the details below to update your content.</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={formContainerStyle}>
          <div style={contentScrollStyle}>
            
            {/* Title Input */}
            <div style={inputGroup}>
              <label style={labelStyle}>Article Title</label>
              <input 
                type="text" 
                style={inputStyle} 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a catchy title..."
                required
              />
            </div>

            {/* Image Upload */}
            <div style={inputGroup}>
              <label style={labelStyle}>Featured Image</label>
              <div style={uploadWrapper}>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" style={previewImageStyle} />
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={fileInputStyle}
                />
                <button 
                  type="button" 
                  style={uploadBtnStyle} 
                  onClick={() => fileInputRef.current.click()}
                >
                  {imagePreview ? "Change Image" : "Upload Image"}
                </button>
              </div>
            </div>

            {/* Description (Quill Editor) */}
            <div style={inputGroup}>
              <label style={labelStyle}>Article Description</label>
              <div style={editorWrapper}>
                <ReactQuill 
                  theme="snow" 
                  modules={modules}
                  value={description} 
                  onChange={setDescription}
                  placeholder="Write the body of your article..."
                />
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div style={footerStyle}>
            <button type="button" style={cancelBtnStyle} onClick={onClose}>Cancel</button>
            <button type="submit" style={primaryBtnStyle}>
              {mode === "edit" ? "Save Changes" : "Create Article"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
});

export default ArticleFormModal;

/* ================== STYLES ================== */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15, 23, 42, 0.6)",
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 99999,
  padding: "20px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "750px", 
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  display: "flex",
  flexDirection: "column",
  maxHeight: "90vh",
  overflow: "hidden",
};

const headerStyle = {
  padding: "20px 30px",
  borderBottom: "1px solid #f1f5f9",
};

const titleStyle = { margin: 0, fontSize: "1.25rem", fontWeight: "700", color: "#1e293b" };
const subtitleStyle = { margin: "4px 0 0 0", fontSize: "0.85rem", color: "#64748b" };

const formContainerStyle = { display: "flex", flexDirection: "column", overflow: "hidden" };
const contentScrollStyle = { padding: "24px 30px", overflowY: "auto", flex: 1 };

const inputGroup = { marginBottom: "20px" };

const labelStyle = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: "600",
  marginBottom: "8px",
  color: "#475569",
  textTransform: "uppercase",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  fontSize: "0.95rem",
  outline: "none",
  boxSizing: "border-box",
};

/* --- Image Upload Styles --- */
const uploadWrapper = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  alignItems: "flex-start",
};

const previewImageStyle = {
  width: "120px",
  height: "120px",
  borderRadius: "12px",
  objectFit: "cover",
  border: "2px solid #f1f5f9",
};

const fileInputStyle = { display: "none" };

const uploadBtnStyle = {
  padding: "8px 16px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  background: "#fff",
  fontSize: "0.85rem",
  fontWeight: "600",
  cursor: "pointer",
};

/* --- Editor Styles --- */
const editorWrapper = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  overflow: "hidden",
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
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#fff",
  color: "#64748b",
  fontWeight: "600",
  cursor: "pointer",
};

const primaryBtnStyle = {
  padding: "10px 24px",
  borderRadius: "10px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
};
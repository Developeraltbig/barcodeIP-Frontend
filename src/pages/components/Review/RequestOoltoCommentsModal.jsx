import React, { memo, useState } from "react";
import Icon from "./icons";
import CloseIcon from "../../../assets/icons/closeIcon.svg";
import RequestOoltoComment1Icon from "../../../assets/icons/requestOoltoComment1.svg";
import RequestOoltoCommentIcon from "../../../assets/icons/requestOoltoComment.svg";
import { useCreateAnalystConnectionsMutation } from '../../../features/userApi';
import { toast } from "react-toastify";

function RequestOoltoCommentsModal({ project, onClose }) {
  const [selectedModules, setSelectedModules] = useState([]);
  const [note, setNote] = useState("");
  const [createAnalyst] = useCreateAnalystConnectionsMutation();
  const [loading, setLoading] = useState(false);


  const MODULE_LABELS = {
    patent: "Patent Search",
    publish: "Publication Search",
    product: "Product Search",
    provisional: "Provisional Draft",
    nonProvisional: "Non-Provisional Draft",
  };

  const moduleOptions = project?.module?.map((key) => ({
    key,
    label: MODULE_LABELS[key] || key,
  })) || [];

  const toggleModule = (moduleName) => {
    setSelectedModules((prev) =>
      prev.includes(moduleName)
        ? prev.filter((item) => item !== moduleName)
        : [...prev, moduleName]
    );
  };

  const submitRequest = async () => {
    try {
      setLoading(true);
      // Call the API
      const response = await createAnalyst({
        projectId: project._id,
        body: {
          project_title: project?.project_title || 'Untitled Project',
          modules: selectedModules,
          message: note || 'Please review my project.',
        }
      }).unwrap();

      console.log('Analyst review response:', response);
      toast.success("Review Requested Successfully");
      // Close modal and show success
      onClose();
    } catch (err) {
      toast.error("Error creating analyst request");
      console.error('Error creating analyst request:', err);
      // Optionally: show toast/alert
    } finally {
      setLoading(false);
    }
  };

  console.log('projectsdfsa', project);

  return (
    <div className="rr-modal-backdrop" onMouseDown={onClose}>
      <div className="rr-comment-modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="rr-comment-modal-head">
          <div className="rr-comment-title">
            <span>
              <img src={RequestOoltoComment1Icon} alt="" className="requestOolto-icon" />
            </span>
            <div>
              <h2>Request Oolto Comments</h2>
              <p>Send selected generated outputs for review comments.</p>
            </div>
          </div>

          <img src={CloseIcon} alt="" className="close-icon" onClick={onClose} />
          {/* <button className="rr-modal-close" onClick={onClose}>
          </button> */}
        </div>

        <div className="rr-comment-case-box">
          <h3>{project.project_title}</h3>
          <p>CASE ID : {project.case_id}</p>
        </div>

        <div className="rr-comment-field">
          <h4>Select modules to include</h4>

          <div className="rr-module-check-grid">
            {moduleOptions.map((module) => {
              const checked = selectedModules.includes(module.key);

              return (
                <label
                  key={module.key}
                  className={`rr-module-check ${checked ? "checked" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleModule(module.key)}
                  />
                  <span />
                  {module.label}
                </label>
              );
            })}
          </div>
        </div>

        <div className="rr-comment-field">
          <h4>Comment</h4>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Example. Please focus on novelty and claim overlap for the top patent references."
          />
        </div>

        <div className="rr-comment-footer">
          <button type="button" className="rr-submit-comment" onClick={submitRequest} disabled={loading}>
            {loading ? (
              "Loading..."
            ) : (
              <>
                <img src={RequestOoltoCommentIcon} alt="" className="requestOolto-icon" />
                Submit Request
              </>
            )}


          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(RequestOoltoCommentsModal);

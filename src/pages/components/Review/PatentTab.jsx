import React, { memo, useState } from "react";
import ActionButton from "./ActionButton";
import PatentResultCard from "./PatentResultCard";
import DownloadIcon from "../../../assets/icons/DownloadIcon1.svg";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import axios from "axios";


function ProcessingSteps({ steps }) {
  if (!steps?.length) return null;

  return (
    <div className="rr-processing-steps">
      {steps.map((step) => (
        <span key={step.id} className={step.status}>
          {step.label}
        </span>
      ))}
    </div>
  );
}

function PatentProcessingCard({ runtime }) {
  return (
    <div className="rr-processing-card">
      <h3>{runtime.message}</h3>
      <p>{runtime.subMessage}</p>
      <ProcessingSteps steps={runtime.steps} />
    </div>
  );
}

function PatentTab({
  runtime,
  results,
  strictMode,
  onStrictModeChange,
  onViewMapping,
  onViewDetails,
  onViewOverlap,
  onDownloadPatentReport
}) {

  const { token } = useSelector((state) => state.auth);
  const [downloading, setDownloading] = useState(false)

  if (!results) {
    return null;
  }

  const handleDownload = async () => {
    try {
      setDownloading(true)
      const projectId = results[0]?.project_id;
      if (!projectId) {
        console.error("Project ID missing");
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/patents/download-pdf/${projectId}`,
        {
          responseType: "arraybuffer",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/pdf",
          },
        }
      );
      const pdfBlob = new Blob(
        [response.data],
        {
          type: "application/pdf",
        }
      );
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Patent-Draft.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
      toast.success("Patent Draft Generated is Successfully");
      setDownloading(false)
    } catch (error) {
      setDownloading(false)
      toast.error("PDF download error: Contact administration");
      console.error(
        "PDF download error:",
        error
      );
    }
  };

  return (
    <>
      <section className="rr-results-summary">
        <div className="rr-results-summary-head">
          <div>
            <h2>Patent Search Results</h2>
            <p>The Top 10 have mapping and overlap summary ready.</p>
          </div>

          <div className="rr-results-actions">
            {/* <button
              type="button"
              className="rr-strict-toggle"
              onClick={() => onStrictModeChange((prev) => !prev)}
            >
              <span className={strictMode ? "is-on" : ""}>
                <i />
              </span>
              Strict Mode
            </button> */}

            <ActionButton
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? (
                "Loading..."
              ) : (
                <>
                  <img
                    src={DownloadIcon}
                    alt=""
                    className="download-icon"
                  />
                  Patent Report
                </>
              )}
            </ActionButton>


          </div>
        </div>

        <PatentProcessingCard runtime={runtime} />
      </section>

      <section className="rr-results-list-panel">
        {results[0]?.novelty_analysis?.selectedPatentIds?.map((result, index) => (
          <PatentResultCard
            key={index}
            count={index + 1}
            result={result}
            onViewMapping={() => onViewMapping(result)}
            onViewDetails={() => onViewDetails(result)}
            onViewOverlap={() => onViewOverlap(result)}
          />
        ))}
      </section>
    </>
  );
}

export default memo(PatentTab);

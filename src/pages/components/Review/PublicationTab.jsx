import React, { memo, useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import axios from "axios";
import ActionButton from "./ActionButton";
import PublicationCard from "./PublicationCard";
import DownloadIcon from "../../../assets/icons/DownloadIcon1.svg";

function PublicationTab({ results, onViewPublication }) {
  const { token } = useSelector((state) => state.auth);
  const [downloading, setDownloading] = useState(false);

  // Safeguard render if dataset has not resolved yet
  const publicationData = results?.[0];
  const scholarResults = publicationData?.scholarResults || [];

  const handleDownload = async () => {
    const projectId = publicationData?.project_id;
    if (!projectId) {
      toast.error("Project identifier missing, cannot retrieve report.");
      return;
    }

    try {
      setDownloading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/projects/publish/download-pdf/${projectId}`,
        {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/pdf",
          },
        }
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      const linkElement = document.createElement("a");

      linkElement.href = url;
      linkElement.download = "Publish-Report.pdf";
      document.body.appendChild(linkElement);
      linkElement.click();
      linkElement.remove();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);

      toast.success("Publish Report generated successfully");
    } catch (error) {
      toast.error("PDF download error. Contact system administration.");
      console.error("PDF download error:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="rr-publication-panel">
      <div className="rr-tab-page-head">
        <div>
          <h2>Publication Search</h2>
          <p>Related non-patent literature, papers, public disclosures, and technical references.</p>
        </div>

        <ActionButton
          onClick={handleDownload}
          disabled={downloading || scholarResults.length === 0}
        >
          {downloading ? (
            "Generating PDF..."
          ) : (
            <>
              <img
                src={DownloadIcon}
                alt=""
                className="download-icon"
              />
              Download Publications
            </>
          )}
        </ActionButton>
      </div>

      {scholarResults.length === 0 ? (
        <div className="rr-empty-state">
          <p>No publications found or generated for this project.</p>
        </div>
      ) : (
        <div className="rr-publication-grid">
          {scholarResults.map((item) => (
            <PublicationCard
              key={item.id || item._id}
              item={item}
              onViewMore={(selectedPublication) => {
                if (onViewPublication) {
                  onViewPublication(selectedPublication);
                }
                if (selectedPublication?.scholar_link) {
                  window.open(
                    selectedPublication.scholar_link,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default memo(PublicationTab);
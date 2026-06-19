import React, { memo, useState } from "react";
import ActionButton from "./ActionButton";
import PublicationCard from "./PublicationCard";
import DownloadIcon from "../../../assets/icons/DownloadIcon1.svg";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import axios from "axios";


function PublicationTab({ results, onDownloadPublications, onViewPublication }) {
  const { token } = useSelector((state) => state.auth);
  const [downloading, setDownloading] = useState(false)

  if (!results) {
    return null
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
        `${import.meta.env.VITE_API_URL}/api/v1/projects/publish/download-pdf/${projectId}`,
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
      a.download = "Publish-Report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
      toast.success("Publish Report Generated is Successfully");
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
    <section className="rr-publication-panel">
      <div className="rr-tab-page-head">
        <div>
          <h2>Publication Search</h2>
          <p>Related non-patent literature, papers, public disclosures, and technical references.</p>
        </div>

        {downloading ? "Loading..." : <ActionButton onClick={handleDownload}>
          <img src={DownloadIcon} alt="" className="download-icon" />
          Download Publications
        </ActionButton>}

      </div>

      <div className="rr-publication-grid">
        {results[0].scholarResults.map((item) => (
          <PublicationCard
            key={item.id}
            item={item}
            onViewMore={(selectedPublication) => {
              if (selectedPublication.scholar_link) {
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
    </section>
  );
}

export default memo(PublicationTab);

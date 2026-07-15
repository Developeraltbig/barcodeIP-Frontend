import React, { memo, useState } from "react";
import ActionButton from "./ActionButton";
import leftArrowIcon from "../../../assets/icons/leftArrow.svg";
import FeatureSearchIcon from "../../../assets/icons/feature-search.svg";
import requestOoltoCommentIcon from "../../../assets/icons/requestOoltoComment1.svg";
import DownloadIcon from "../../../assets/icons/DownloadIcon1.svg";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import axios from "axios";

function ResultHeader({
  project,
  onBack,
  onViewKeyFeatures,
  onRequestComments,
  onDownloadReport
}) {
  const { token } = useSelector((state) => state.auth);
  const [downloading, setDownloading] = useState(false)

  console.log('project eee--', project)
  const handleDownloadAllReport = async () => {
    try {
      setDownloading(true)
      await handlePatentDownload(project._id)
      await handlePublicationDownload(project._id)
      await handleProvisionalDownload(project._id)
      await handleNonProvisionalDownload(project._id)
      toast.success("All Report Generated is Successfully");
      setDownloading(false)
    } catch (error) {
      setDownloading(false)
      toast.error("All PDF download error: Contact administration");
      console.error(
        "All PDF download error:",
        error
      );
    }
  }

  const handlePublicationDownload = async (projectId) => {
    try {
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
    } catch (error) {
      toast.error("PDF download error: Contact administration");
      console.error(
        "PDF download error:",
        error
      );
    }
  };

  const handlePatentDownload = async (projectId) => {
    try {
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
    } catch (error) {
      toast.error("PDF download error: Contact administration");
      console.error(
        "PDF download error:",
        error
      );
    }
  };

  const handleNonProvisionalDownload = async (projectId) => {
    try {
      if (!projectId) {
        toast.error("Project ID missing");
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/nonProvisionalDraft/download-pdf/${projectId}`,
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
      // console.log("PDF size:", pdfBlob.size);
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Non-Provisional-Draft.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
    } catch (error) {
      toast.error("PDF download error: Contact administration");
      console.error(
        "PDF download error:",
        error
      );

    }
  };

  const handleProvisionalDownload = async (projectId) => {
    try {
      if (!projectId) {
        console.error("Project ID missing");
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/provisionalDraft/download-pdf/${projectId}`,
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
      a.download = "Provisional-Draft.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
    } catch (error) {
      toast.error("PDF download error: Contact administration");
      console.error(
        "PDF download error:",
        error
      );
    }
  };

  return (
    <>
      <button className="rr-back-btn" type="button" onClick={onBack}>
        <img src={leftArrowIcon} alt="" className="leftArrow-icon" /> Back
      </button>

      <div className="rr-project-card">
        <div>
          <h1>{project.project_title}</h1>
          <p>CASE ID : {project.case_id ?? ""}</p>
        </div>

        <div className="rr-project-actions">
          {project?.module?.includes("patent") && (
            <ActionButton variant="light" onClick={onViewKeyFeatures}>
              <img
                src={FeatureSearchIcon}
                alt=""
                className="featureSearch-icon"
              />
              View Key Features
            </ActionButton>
          )}
          {project.analyst_status === "notRequested" ? (
            <ActionButton variant="outline" onClick={onRequestComments}>
              <img src={requestOoltoCommentIcon} alt="" className="requestOolto-icon" /> Request Oolto Comments
            </ActionButton>
          ) : <></>}

          {downloading ? "Loading..." : <ActionButton onClick={handleDownloadAllReport}>
            <img src={DownloadIcon} alt="" className="Download-icon" /> Download Report
          </ActionButton>}


        </div>
      </div>
    </>
  );
}

export default memo(ResultHeader);

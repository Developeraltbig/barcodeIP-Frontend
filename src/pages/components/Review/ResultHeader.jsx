import React, { memo } from "react";
import ActionButton from "./ActionButton";
import leftArrowIcon from "../../../assets/icons/leftArrow.svg";
import FeatureSearchIcon from "../../../assets/icons/feature-search.svg";
import requestOoltoCommentIcon from "../../../assets/icons/requestOoltoComment1.svg";
import DownloadIcon from "../../../assets/icons/DownloadIcon1.svg";

function ResultHeader({
  project,
  onBack,
  onViewKeyFeatures,
  onRequestComments,
  onDownloadReport
}) {
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
          <ActionButton variant="light" onClick={onViewKeyFeatures}>
            <img src={FeatureSearchIcon} alt="" className="featureSearch-icon" /> View Key Features
          </ActionButton>

          <ActionButton variant="outline" onClick={onRequestComments}>
            <img src={requestOoltoCommentIcon} alt="" className="requestOolto-icon" /> Request Oolto Comments
          </ActionButton>

          <ActionButton onClick={onDownloadReport}>
            <img src={DownloadIcon} alt="" className="Download-icon" /> Download Report
          </ActionButton>
        </div>
      </div>
    </>
  );
}

export default memo(ResultHeader);

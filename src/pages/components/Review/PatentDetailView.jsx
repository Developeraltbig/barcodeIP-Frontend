import React, { memo, useEffect, useState } from "react";
import ActionButton from "./ActionButton";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  BIBLIOGRAPHIC_DATA,
  CLASSIFICATIONS,
  PATENT_CITATIONS
} from "../../data/reviewResultsData";
import viewMappingIcon from "../../../assets/icons/carbon_view1.svg";
import DownloadIcon from "../../../assets/icons/DownloadIcon1.svg";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";
import {
  useGetBibilioDataMutation,
  useGetPatentDescriptionQuery
} from "../../../features/patentApi";

function ClassificationTable({ rows }) {
  return (
    <div className="classification-table">
      {rows?.map((item, index) => (
        <div key={index} className="classification-row">
          <div className="classification-code">{item.code}</div>
          <div className="classification-description">{item.description}</div>
        </div>
      ))}
    </div>
  );
}

function DataTable({ rows }) {
  return (
    <div className="rr-data-table">
      {rows.map(([label, value]) => (
        <div key={label} className="rr-data-row">
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function PatentDetailView({ patent, onBack, onViewMapping, onDownloadMapping }) {
  const patentId = patent?.patent_id;
  const [getBibilioData, { data, isLoading }] = useGetBibilioDataMutation();

  useEffect(() => {
    if (patent?.patent_id) {
      getBibilioData(patent.patent_id);
    }
  }, [patent, getBibilioData]);

  console.log("Patent:", patent);
  const images = data?.data?.data[0]?.images || [];
  const biblioRows = [
    ["Publication Number", data?.data?.data[0]?.publication_number || "-"],
    ["Publication Date", data?.data?.data[0]?.publication_date || "-"],
    ["Application Number", data?.data?.data[0]?.application_number || "-"],
    ["Inventor", data?.data?.data[0]?.inventors?.map(i => i.name).join(", ") || "-"],
    ["Assignee", data?.data?.data[0]?.assignees?.join(", ") || "-"],
    ["Patent", data?.data?.patent_id || "-"],
  ];

  const descriptionUrl = data?.data?.data?.[0]?.description_link;
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    data: descriptionHtml,
    isLoading: isDescLoading,
    error: descError
  } = useGetPatentDescriptionQuery(descriptionUrl ? descriptionUrl : skipToken);

  console.log('descriptionHtml --', descriptionHtml);

  return (
    <>
      <button className="rr-back-btn" type="button" onClick={onBack}>
        <img src={LeftArrowIcon} alt="" className="LeftArrow-icon" /> Back
      </button>

      <div className="rr-detail-title-card">
        <div>
          <h1>{patent.title}</h1>
          <p>
            <span>{data?.data?.data[0]?.publication_date}</span> · {data?.data?.data[0]?.assignees}
          </p>
          <em>Patent Details</em>
        </div>

        <div className="rr-subpage-actions">
          <ActionButton variant="outline" onClick={onViewMapping}>
            <img src={viewMappingIcon} alt="" className="viewMapping-icon" />
            View Mapping
          </ActionButton>

          <ActionButton onClick={onDownloadMapping}>
            <img src={DownloadIcon} alt="" className="download-icon" />
            Download Mapping
          </ActionButton>
        </div>
      </div>

      <div className="rr-figure-tabs">
        {images.length > 0 ? (
          images.map((image, index) => (
            <button key={index} type="button" className="rr-figure-tab" onClick={() => setSelectedImage(image)}>
              <img src={image} alt={`Patent Figure ${index + 1}`} loading="lazy" />
              <span>Patent Figure {index + 1}</span>
            </button>
          ))
        ) : (
          <div className="rr-no-images">No patent figures available.</div>
        )}
      </div>

      {selectedImage && (
        <div className="rr-image-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="rr-image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="rr-modal-close-btn"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img src={selectedImage} alt="Patent Figure Expanded" />
          </div>
        </div>
      )}

      <div className="rr-detail-grid">
        <section className="rr-detail-card">
          <h2>Bibliographic Data</h2>
          <DataTable rows={biblioRows} />
        </section>

        <section className="rr-detail-card">
          <h2>Classifications</h2>
          <ClassificationTable rows={data?.data?.data[0]?.classifications || []} />
        </section>
      </div>

      <section className="rr-detail-card">
        <h2>Description</h2>

        {isDescLoading && <p>Loading description text...</p>}
        {descError && <p style={{ color: "red" }}>Error rendering description details.</p>}

        {descriptionHtml ? (
          <div
            className="rr-description-text"
            dangerouslySetInnerHTML={{ __html: descriptionHtml.data }}
          />
        ) : (
          !isDescLoading && !descError && <p>No description available.</p>
        )}
      </section>

      <section className="rr-detail-card">
        <h2>Patent Citations</h2>
        <table className="rr-citation-table">
          <thead>
            <tr>
              <th>Publication</th>
              <th>Priority</th>
              <th>Assignee</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.data?.[0]?.patent_citations?.original?.length > 0 ? (
              data.data.data[0].patent_citations.original.map((citation, index) => (
                <tr key={citation.publication_number || index}>
                  <td>{citation.publication_number || "-"}</td>
                  <td>{citation.priority_date || "-"}</td>
                  <td>{citation.assignee_original || "-"}</td>
                  <td>{citation.title || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No Patent Citations Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default memo(PatentDetailView);
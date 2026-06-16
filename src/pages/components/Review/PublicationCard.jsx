import React, { memo, useMemo } from "react";

import DateTimeIcon from "../../../assets/icons/date-time.svg";
import LightFileIcon from "../../../assets/icons/light_file.svg";

const getPublicationType = (item) => {
  if (item?.publication_type) {
    return item.publication_type;
  }

  if (item?.type) {
    return item.type;
  }

  const title = String(item?.title || "").toLowerCase();
  const snippet = String(item?.snippet || "").toLowerCase();
  const link = String(item?.scholar_link || "").toLowerCase();

  const searchableText = `${title} ${snippet} ${link}`;

  if (
    searchableText.includes("conference") ||
    searchableText.includes("proceedings") ||
    searchableText.includes("symposium") ||
    searchableText.includes("workshop") ||
    link.includes("aclanthology.org")
  ) {
    return "Conference Paper";
  }

  if (
    title.includes("survey") ||
    title.includes("review")
  ) {
    return "Review Article";
  }

  if (
    searchableText.includes("thesis") ||
    searchableText.includes("dissertation") ||
    link.includes("student-papers")
  ) {
    return "Thesis";
  }

  if (
    link.includes("sciencedirect.com/science/article") ||
    link.includes("link.springer.com/article") ||
    link.includes("emerald.com") ||
    link.includes("sciendo.com")
  ) {
    return "Journal Article";
  }

  if (
    link.endsWith(".pdf") ||
    searchableText.includes("technical report")
  ) {
    return "Technical Article";
  }

  return "Scholarly Article";
};

const getRelevance = (item) => {
  if (item?.relevance) {
    return item.relevance;
  }

  const score = Number(item?.relevance_score);

  if (Number.isFinite(score)) {
    if (score >= 55) {
      return "High Relevance";
    }

    if (score >= 30) {
      return "Medium Relevance";
    }

    return "Low Relevance";
  }

  return "Not Rated";
};

const getRelevanceClassName = (relevance) => {
  return String(relevance || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

const getPublicationDate = (item) => {
  if (item?.publication_date) {
    return item.publication_date;
  }

  if (item?.filing_date) {
    return item.filing_date;
  }

  /*
   * Scholar snippets often contain the publication year:
   * "Author - Journal Name, 2020 - Publisher"
   */
  const yearMatch = String(item?.snippet || "").match(
    /\b(19|20)\d{2}\b/
  );

  return yearMatch?.[0] || "N/A";
};

function PublicationCard({
  item,
  onViewMore,
}) {
  const safeItem = item || {};

  const publicationType = useMemo(
    () => getPublicationType(safeItem),
    [safeItem]
  );

  const relevance = useMemo(
    () => getRelevance(safeItem),
    [safeItem]
  );

  const publicationDate = useMemo(
    () => getPublicationDate(safeItem),
    [safeItem]
  );

  const relevanceClassName =
    getRelevanceClassName(relevance);

  const handleViewMore = () => {
    if (typeof onViewMore === "function") {
      onViewMore(safeItem);
      return;
    }

    if (safeItem.scholar_link) {
      window.open(
        safeItem.scholar_link,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  if (!item) {
    return null;
  }

  return (
    <article className="rr-publication-card">
      <div className="rr-publication-top">
        <span
          className={`rr-publication-relevance ${relevanceClassName}`}
        >
          {relevance}

          {Number.isFinite(
            Number(safeItem.relevance_score)
          ) && (
              <small>
                {` ${Number(
                  safeItem.relevance_score
                )}%`}
              </small>
            )}
        </span>

        <em>{publicationType}</em>
      </div>

      <h3>
        {safeItem.title || "Untitled publication"}
      </h3>

      <p>
        {safeItem.snippet ||
          "No publication description is available."}
      </p>

      <div className="rr-publication-meta">
        <span>
          <img
            src={LightFileIcon}
            alt=""
            className="LightFile-icon"
          />

          {safeItem.author ||
            safeItem.inventor ||
            "Author not available"}
        </span>

        <span>
          <img
            src={DateTimeIcon}
            alt=""
            className="DateTime-icon"
          />

          {publicationDate}
        </span>
      </div>

      <button
        type="button"
        onClick={handleViewMore}
        disabled={
          !safeItem.scholar_link &&
          typeof onViewMore !== "function"
        }
      >
        View More
      </button>
    </article>
  );
}

export default memo(PublicationCard);
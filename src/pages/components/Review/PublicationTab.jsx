import React, { memo } from "react";
import ActionButton from "./ActionButton";
import PublicationCard from "./PublicationCard";
import DownloadIcon from "../../../assets/icons/DownloadIcon1.svg";

function PublicationTab({ results, onDownloadPublications, onViewPublication }) {
  return (
    <section className="rr-publication-panel">
      <div className="rr-tab-page-head">
        <div>
          <h2>Publication Search</h2>
          <p>Related non-patent literature, papers, public disclosures, and technical references.</p>
        </div>

        <ActionButton onClick={onDownloadPublications}>
          <img src={DownloadIcon} alt="" className="download-icon" />
          Download Publications
        </ActionButton>
      </div>

      <div className="rr-publication-grid">
        {results.map((item) => (
          <PublicationCard
            key={item.id}
            item={item}
            onViewMore={() => onViewPublication?.(item)}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(PublicationTab);

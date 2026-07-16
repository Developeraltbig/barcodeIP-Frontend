import React, { memo, useMemo, useState } from "react";
import ActionButton from "./ActionButton";

import overlapSummaryIcon from "../../../assets/icons/overlapSummary1.svg";
import DownloadIcon from "../../../assets/icons/DownloadIcon1.svg";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";

/**
 * Makes different patent ID formats comparable.
 *
 * Examples:
 * patent/US8929578B2/en
 * US8929578B2
 *
 * Both become: US8929578B2
 */
const normalizePatentId = (value) => {
  return String(value || "")
    .trim()
    .replace(/^patent\//i, "")
    .replace(/\/[a-z]{2}$/i, "")
    .replace(/\s+/g, "")
    .toUpperCase();
};

/**
 * Remove basic Markdown formatting from table values.
 */
const cleanMarkdownText = (value) => {
  return String(value || "")
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/\\+"/g, '"')
    .trim();
};

/**
 * Convert escaped newline characters into real new lines.
 */
const normalizeMatrixString = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  let matrix = value.trim();

  // Support a JSON-stringified Markdown value.
  if (matrix.startsWith('"') && matrix.endsWith('"')) {
    try {
      matrix = JSON.parse(matrix);
    } catch (error) {
      console.warn("Unable to parse matrix as JSON string:", error);
    }
  }

  return String(matrix)
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\r\n/g, "\n")
    .trim();
};

/**
 * Split one Markdown table line.
 *
 * Example:
 * | Feature | Evidence | Considerable |
 */
const splitMarkdownRow = (line) => {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map(cleanMarkdownText);
};

/**
 * Check whether the row is the Markdown separator:
 * | :--- | :--- | :--- |
 */
const isSeparatorRow = (cells) => {
  return (
    Array.isArray(cells) &&
    cells.length > 0 &&
    cells.every((cell) => /^:?-{3,}:?$/.test(cell.trim()))
  );
};

/**
 * Convert comparison.matrix Markdown into UI rows.
 */
const parseComparisonMatrix = (matrix) => {
  const normalizedMatrix = normalizeMatrixString(matrix);

  if (!normalizedMatrix) {
    return [];
  }

  const tableLines = normalizedMatrix
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) => line.startsWith("|") && line.endsWith("|")
    );

  if (tableLines.length < 2) {
    return [];
  }

  const parsedLines = tableLines.map(splitMarkdownRow);

  // Remove the heading row and separator row.
  return parsedLines
    .slice(1)
    .filter((cells) => !isSeparatorRow(cells))
    .map((cells, index) => {
      const feature = cells[0] || "";
      const evidence = cells[1] || "";
      const overlap = cells[2] || "-";

      const normalizedOverlap = overlap
        .trim()
        .toLowerCase();

      const isNotFound =
        !normalizedOverlap ||
        normalizedOverlap === "-" ||
        normalizedOverlap === "none" ||
        normalizedOverlap.includes("not found") ||
        normalizedOverlap.includes("no overlap");

      return {
        id: `feature-mapping-${index + 1}`,
        featureType: `${index + 1}`,
        feature,
        evidence,
        overlap,
        whereFound: isNotFound ? "Not found" : "Found",
        level: isNotFound ? "No overlap" : overlap,
      };
    })
    .filter((row) => row.feature || row.evidence);
};

const getLevelClassName = (level) => {
  const normalizedLevel = String(level || "")
    .trim()
    .toLowerCase();

  if (
    !normalizedLevel ||
    normalizedLevel === "-" ||
    normalizedLevel === "none" ||
    normalizedLevel.includes("not found") ||
    normalizedLevel.includes("no overlap")
  ) {
    return "no-overlap";
  }

  return normalizedLevel
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

function FeatureMappingView({
  patent,
  data,
  onBack,
  onOpenOverlap,
  onDownload,
}) {
  const [strictMode, setStrictMode] = useState(false);

  /**
   * Get all comparison objects from the API result.
   */
  const comparisons = useMemo(() => {
    const result = data?.novelty_analysis?.comparisons;

    return Array.isArray(result) ? result : [];
  }, [data]);

  /**
   * Find the comparison belonging to the patent selected
   * from PatentResultCard.
   */
  const selectedComparison = useMemo(() => {
    // In case PatentTab already passes the comparison object.
    if (patent?.matrix) {
      return patent;
    }

    const selectedPatentId = normalizePatentId(
      patent?.patentId ||
      patent?.patent_id ||
      patent?.details?.patent_id ||
      patent?.id
    );

    if (!selectedPatentId) {
      return null;
    }

    const comparisonById = comparisons.find((comparison) => {
      const comparisonPatentId = normalizePatentId(
        comparison?.patentId ||
        comparison?.patent_id ||
        comparison?.details?.patent_id
      );

      return comparisonPatentId === selectedPatentId;
    });

    if (comparisonById) {
      return comparisonById;
    }

    /*
     * Optional title fallback in case ID formats from the API
     * do not match.
     */
    const selectedTitle = String(
      patent?.title || patent?.details?.title || ""
    )
      .trim()
      .toLowerCase();

    if (!selectedTitle) {
      return null;
    }

    return (
      comparisons.find((comparison) => {
        const comparisonTitle = String(
          comparison?.details?.title || comparison?.title || ""
        )
          .trim()
          .toLowerCase();

        return comparisonTitle === selectedTitle;
      }) || null
    );
  }, [patent, comparisons]);

  /**
   * Parse only the selected patent's matrix.
   */
  const mappingRows = useMemo(() => {
    return parseComparisonMatrix(selectedComparison?.matrix);
  }, [selectedComparison]);

  const patentId =
    selectedComparison?.details?.patent_id ||
    selectedComparison?.patentId ||
    patent?.patent_id ||
    patent?.patentId ||
    patent?.details?.patent_id ||
    "Patent";

  const patentTitle =
    selectedComparison?.details?.title ||
    patent?.title ||
    patent?.details?.title ||
    "Patent result";

  const hasDataLoaded = Boolean(data?.novelty_analysis);

  console.log("FeatureMappingView patent:", patent);
  console.log("FeatureMappingView comparisons:", comparisons);
  console.log(
    "FeatureMappingView selected comparison:",
    selectedComparison
  );
  console.log("FeatureMappingView mapping rows:", mappingRows);

  return (
    <>
      <button
        className="rr-back-btn"
        type="button"
        onClick={onBack}
      >
        <img
          src={LeftArrowIcon}
          alt=""
          className="leftArrow-icon"
        />
        Back
      </button>

      <div className="rr-subpage-header">
        <div>
          <h1>Feature Mapping</h1>

          <p>
            <span>{patentId}</span> · {patentTitle}
          </p>
        </div>

        <div className="rr-subpage-actions">
          {/* <button
            type="button"
            className={`rr-strict-toggle ${strictMode ? "active" : ""
              }`}
            aria-pressed={strictMode}
            onClick={() =>
              setStrictMode((previousValue) => !previousValue)
            }
          >
            <span>
              <i />
            </span>
            Strict Mode
          </button> */}

          <ActionButton
            variant="outline"
            onClick={onOpenOverlap}
          >
            <img
              src={overlapSummaryIcon}
              alt=""
              className="overlapSummary-icon"
            />
            Overlap Summary
          </ActionButton>

          <ActionButton onClick={onDownload}>
            <img
              src={DownloadIcon}
              alt=""
              className="download-icon"
            />
            Download Mapping
          </ActionButton>
        </div>
      </div>

      {selectedComparison?.foundSummary && (
        <section className="rr-mapping-summary">
          <strong>Overlap Summary</strong>
          <p>{selectedComparison.foundSummary}</p>
        </section>
      )}

      <section className="rr-mapping-table-card">
        {!hasDataLoaded ? (
          <div className="rr-empty-state">
            <h3>Loading feature mapping...</h3>
            <p>
              Please wait while the patent analysis is loading.
            </p>
          </div>
        ) : !selectedComparison ? (
          <div className="rr-empty-state">
            <h3>Comparison not found</h3>
            <p>
              No comparison data was found for the selected patent.
            </p>
          </div>
        ) : mappingRows.length === 0 ? (
          <div className="rr-empty-state">
            <h3>No feature mapping found</h3>
            <p>
              The comparison does not contain feature mapping rows.
            </p>
          </div>
        ) : (
          <div className="rr-mapping-table-wrapper">
            <table className="rr-mapping-table">
              <thead>
                <tr>
                  <th>Your Feature</th>
                  <th>Patent Evidence</th>
                  <th>Where Found</th>
                  <th>Level</th>
                </tr>
              </thead>

              <tbody>
                {mappingRows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <span className="rr-feature-type">
                        {row.featureType}
                      </span>

                      <strong>{row.feature}</strong>
                    </td>

                    <td>
                      {row.evidence || "No evidence available"}
                    </td>

                    <td>
                      <span
                        className={`rr-where-pill ${row.whereFound === "Not found"
                          ? "not-found"
                          : ""
                          }`}
                      >
                        {row.whereFound}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`rr-level-pill ${getLevelClassName(
                          row.level
                        )}`}
                      >
                        {row.level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

export default memo(FeatureMappingView);
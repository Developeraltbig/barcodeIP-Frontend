import React, { memo, useMemo } from "react";
import ActionButton from "./ActionButton";

import viewMappingIcon from "../../../assets/icons/carbon_view1.svg";
import DownloadIcon from "../../../assets/icons/DownloadIcon1.svg";
import LeftArrowIcon from "../../../assets/icons/leftArrow.svg";

/**
 * Convert different patent ID formats into the same value.
 *
 * Examples:
 * patent/US8929578B2/en
 * US8929578B2
 *
 * Both become:
 * US8929578B2
 */
const normalizePatentId = (value) => {
  return String(value || "")
    .trim()
    .replace(/^patent\//i, "")
    .replace(/\/[a-z]{2}$/i, "")
    .replace(/\s+/g, "")
    .toUpperCase();
};

const normalizeMatrixString = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\r\n/g, "\n")
    .trim();
};

/**
 * Use matrix values as a fallback when comparison.metrics
 * is missing from the response.
 */
const calculateMetricsFromMatrix = (matrix) => {
  const normalizedMatrix = normalizeMatrixString(matrix);

  const defaultMetrics = {
    considerable: 0,
    partial: 0,
    none: 0,
  };

  if (!normalizedMatrix) {
    return defaultMetrics;
  }

  const lines = normalizedMatrix
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) => line.startsWith("|") && line.endsWith("|")
    );

  if (lines.length < 3) {
    return defaultMetrics;
  }

  return lines.slice(2).reduce((metrics, line) => {
    const cells = line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

    const overlap = String(cells[2] || "")
      .trim()
      .toLowerCase();

    if (overlap.includes("considerable")) {
      metrics.considerable += 1;
    } else if (overlap.includes("partial")) {
      metrics.partial += 1;
    } else {
      metrics.none += 1;
    }

    return metrics;
  }, defaultMetrics);
};

const getSafeNumber = (value) => {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) && numberValue >= 0
    ? numberValue
    : 0;
};

const calculatePercentage = (value, total) => {
  if (!total) {
    return 0;
  }

  return Math.round((value / total) * 100);
};

/**
 * Considerable = full support
 * Partial = half support
 * None = no support
 */
const calculateSupportScore = ({
  considerable,
  partial,
  none,
}) => {
  const total = considerable + partial + none;

  if (!total) {
    return 0;
  }

  const weightedScore =
    ((considerable + partial * 0.5) / total) * 100;

  return Math.round(weightedScore);
};

const getOverlapLevel = (supportScore, metrics) => {
  const { considerable, partial } = metrics;

  if (supportScore >= 70) {
    return {
      label: "High Overlap",
      className: "high-overlap",
    };
  }

  if (supportScore >= 40) {
    return {
      label: "Moderate Overlap",
      className: "moderate-overlap",
    };
  }

  if (
    supportScore > 0 ||
    considerable > 0 ||
    partial > 0
  ) {
    return {
      label: "Low Overlap",
      className: "low-overlap",
    };
  }

  return {
    label: "No Overlap",
    className: "no-overlap",
  };
};

function OverlapSummaryView({
  patent,
  data,
  strictMode,
  onStrictModeChange,
  onBack,
  onViewMapping,
  onDownloadMapping,
}) {
  /**
   * All patent comparisons returned from the API.
   */
  const comparisons = useMemo(() => {
    const comparisonData =
      data?.novelty_analysis?.comparisons;

    return Array.isArray(comparisonData)
      ? comparisonData
      : [];
  }, [data]);

  /**
   * Find the comparison associated with the selected patent.
   */
  const selectedComparison = useMemo(() => {
    // Support passing the comparison object directly.
    if (
      patent?.matrix &&
      (patent?.metrics || patent?.foundSummary)
    ) {
      return patent;
    }

    const selectedPatentId = normalizePatentId(
      patent?.patentId ||
      patent?.patent_id ||
      patent?.publication ||
      patent?.details?.patent_id ||
      patent?.id
    );

    if (!selectedPatentId) {
      return null;
    }

    const matchedById = comparisons.find((comparison) => {
      const comparisonPatentId = normalizePatentId(
        comparison?.patentId ||
        comparison?.patent_id ||
        comparison?.details?.patent_id
      );

      return comparisonPatentId === selectedPatentId;
    });

    if (matchedById) {
      return matchedById;
    }

    /**
     * Title fallback when patent IDs use different formats.
     */
    const selectedPatentTitle = String(
      patent?.title ||
      patent?.details?.title ||
      ""
    )
      .trim()
      .toLowerCase();

    if (!selectedPatentTitle) {
      return null;
    }

    return (
      comparisons.find((comparison) => {
        const comparisonTitle = String(
          comparison?.details?.title ||
          comparison?.title ||
          ""
        )
          .trim()
          .toLowerCase();

        return comparisonTitle === selectedPatentTitle;
      }) || null
    );
  }, [patent, comparisons]);

  /**
   * Get metrics from the API, or calculate them from
   * comparison.matrix when the metrics object is unavailable.
   */
  const metrics = useMemo(() => {
    if (!selectedComparison) {
      return {
        considerable: 0,
        partial: 0,
        none: 0,
      };
    }

    const apiMetrics = selectedComparison?.metrics;

    const hasApiMetrics =
      apiMetrics &&
      typeof apiMetrics === "object" &&
      (
        apiMetrics.considerable !== undefined ||
        apiMetrics.partial !== undefined ||
        apiMetrics.none !== undefined
      );

    if (hasApiMetrics) {
      return {
        considerable: getSafeNumber(
          apiMetrics.considerable
        ),
        partial: getSafeNumber(apiMetrics.partial),
        none: getSafeNumber(apiMetrics.none),
      };
    }

    return calculateMetricsFromMatrix(
      selectedComparison?.matrix
    );
  }, [selectedComparison]);

  const totalFeatures =
    metrics.considerable +
    metrics.partial +
    metrics.none;

  const supportScore = useMemo(() => {
    return calculateSupportScore(metrics);
  }, [metrics]);

  const overlapLevel = useMemo(() => {
    return getOverlapLevel(supportScore, metrics);
  }, [supportScore, metrics]);

  /**
   * Dynamic coverage progress bars.
   */
  const coverageBreakdown = useMemo(() => {
    return [
      {
        label: "Considerable overlap",
        note: `${metrics.considerable} of ${totalFeatures} features`,
        value: calculatePercentage(
          metrics.considerable,
          totalFeatures
        ),
        className: "considerable",
      },
      {
        label: "Partial overlap",
        note: `${metrics.partial} of ${totalFeatures} features`,
        value: calculatePercentage(
          metrics.partial,
          totalFeatures
        ),
        className: "partial",
      },
      {
        label: "No overlap",
        note: `${metrics.none} of ${totalFeatures} features`,
        value: calculatePercentage(
          metrics.none,
          totalFeatures
        ),
        className: "none",
      },
    ];
  }, [metrics, totalFeatures]);

  const patentId =
    selectedComparison?.details?.patent_id ||
    selectedComparison?.patentId ||
    patent?.publication ||
    patent?.patent_id ||
    patent?.patentId ||
    patent?.details?.patent_id ||
    "Patent";

  const patentTitle =
    selectedComparison?.details?.title ||
    patent?.title ||
    patent?.details?.title ||
    "Patent result";

  const summary =
    selectedComparison?.foundSummary ||
    "No overlap summary is available for this patent.";

  const hasAnalysisLoaded = Boolean(
    data?.novelty_analysis
  );

  console.log(
    "OverlapSummaryView selected patent:",
    patent
  );
  console.log(
    "OverlapSummaryView comparisons:",
    comparisons
  );
  console.log(
    "OverlapSummaryView selected comparison:",
    selectedComparison
  );
  console.log(
    "OverlapSummaryView metrics:",
    metrics
  );

  return (
    <>
      <button
        className="rr-back-btn rr-large-back"
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

      {!hasAnalysisLoaded ? (
        <section className="rr-overlap-empty-state">
          <h3>Loading overlap analysis...</h3>

          <p>
            Please wait while the patent comparison data
            is loading.
          </p>
        </section>
      ) : !selectedComparison ? (
        <section className="rr-overlap-empty-state">
          <h3>Overlap comparison not found</h3>

          <p>
            No overlap comparison was found for the
            selected patent.
          </p>
        </section>
      ) : (
        <>
          <div
            className={`rr-overlap-top-card ${overlapLevel.className}`}
          >
            <div>
              <h1>{overlapLevel.label}</h1>

              <p>
                <span>{patentId}</span>
                {" · "}
                {patentTitle}
              </p>

              <em>Overlap Summary</em>
            </div>

            <div className="rr-subpage-actions">
              {/* <button
                type="button"
                className="rr-strict-toggle"
                aria-pressed={Boolean(strictMode)}
                onClick={() =>
                  onStrictModeChange?.(
                    (previousValue) =>
                      !previousValue
                  )
                }
              >
                <span
                  className={
                    strictMode ? "is-on" : ""
                  }
                >
                  <i />
                </span>

                Strict Mode
              </button> */}

              <ActionButton
                variant="outline"
                onClick={onViewMapping}
              >
                <img
                  src={viewMappingIcon}
                  alt=""
                  className="viewMapping-icon"
                />

                View Mapping
              </ActionButton>

              <ActionButton
                onClick={onDownloadMapping}
              >
                <img
                  src={DownloadIcon}
                  alt=""
                  className="download-icon"
                />

                Download Mapping
              </ActionButton>
            </div>
          </div>

          <section className="rr-overlap-summary-card">
            <div>
              <h2>Full-document comparison</h2>

              <p>{summary}</p>

              <em
                className={overlapLevel.className}
              >
                {overlapLevel.label}
              </em>
            </div>

            <div className="rr-support-score">
              <strong>{supportScore}%</strong>
              <span>support score</span>
            </div>
          </section>

          <section className="rr-coverage-card">
            <div className="rr-coverage-heading">
              <div>
                <h2>Coverage Breakdown</h2>

                <p>
                  Analysis of {totalFeatures} key{" "}
                  {totalFeatures === 1
                    ? "feature"
                    : "features"}
                  .
                </p>
              </div>

              <strong>
                {metrics.considerable +
                  metrics.partial}{" "}
                supported
              </strong>
            </div>

            <div className="rr-breakdown-list">
              {coverageBreakdown.map((item) => (
                <div
                  className={`rr-breakdown-item ${item.className}`}
                  key={item.label}
                >
                  <div className="rr-breakdown-label">
                    <span>{item.label}</span>

                    <em>
                      {item.note} · {item.value}%
                    </em>
                  </div>

                  <div className="rr-progress-track">
                    <span
                      style={{
                        width: `${item.value}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default memo(OverlapSummaryView);
import React, { memo, useMemo } from "react";

function FeaturePanel({ title, items, variant, startIndex = 0 }) {
  return (
    <div
      className={`rr-feature-panel ${variant === "primary" ? "primary" : ""
        }`}
    >
      <h3>{title}</h3>

      <div className="rr-feature-list-box">
        {items.map((item, index) => (
          <div className="rr-feature-item" key={`${title}-${index}`}>
            <span>
              {String(startIndex + index + 1).padStart(2, "0")}
            </span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function parseKeyFeatures(keyFeatures) {
  if (!keyFeatures) {
    return {
      primaryFeatures: [],
      secondaryFeatures: [],
    };
  }

  const extractFeatures = (sectionName) => {
    const regex = new RegExp(
      `###\\s*${sectionName}\\s*([\\s\\S]*?)(?=###|$)`,
      "i"
    );

    const match = keyFeatures.match(regex);

    if (!match) return [];

    const sectionContent = match[1];

    const liMatches = sectionContent.match(/<li>([\s\S]*?)<\/li>/gi);

    if (!liMatches) return [];

    return liMatches.map((item) =>
      item
        .replace(/<li>/gi, "")
        .replace(/<\/li>/gi, "")
        .replace(/<[^>]+>/g, "")
        .trim()
    );
  };

  return {
    primaryFeatures: extractFeatures("Primary Features"),
    secondaryFeatures: extractFeatures("Secondary Features"),
  };
}

function KeyFeaturesSection({ patentResults }) {
  console.log("patentResults", patentResults);

  const { primaryFeatures, secondaryFeatures } = useMemo(
    () => parseKeyFeatures(patentResults?.key_features),
    [patentResults?.key_features]
  );

  return (
    <section id="rr-key-features" className="rr-section">
      <div className="rr-section-head">
        <div>
          <h2>Key Features</h2>
          <p>These features will be used for all selected outputs.</p>
        </div>
      </div>

      <div className="rr-feature-grid">
        {/* Primary: 01, 02, 03... */}
        <FeaturePanel
          title="Primary Features"
          items={primaryFeatures}
          variant="primary"
          startIndex={0}
        />

        {/* Secondary continues after Primary */}
        <FeaturePanel
          title="Secondary Features"
          items={secondaryFeatures}
          variant="secondary"
          startIndex={primaryFeatures.length}
        />
      </div>
    </section>
  );
}

export default memo(KeyFeaturesSection);
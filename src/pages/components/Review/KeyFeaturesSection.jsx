import React, { memo } from "react";

function FeaturePanel({ title, items, variant }) {
  return (
    <div className={`rr-feature-panel ${variant === "primary" ? "primary" : ""}`}>
      <h3>{title}</h3>

      <div className="rr-feature-list-box">
        {items.map((item, index) => (
          <div className="rr-feature-item" key={`${title}-${index}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function KeyFeaturesSection({ primaryFeatures, secondaryFeatures }) {
  return (
    <section id="rr-key-features" className="rr-section">
      <div className="rr-section-head">
        <div>
          <h2>Key Features</h2>
          <p>These features will be used for all selected outputs.</p>
        </div>
      </div>

      <div className="rr-feature-grid">
        <FeaturePanel
          title="Primary Features"
          items={primaryFeatures}
          variant="primary"
        />
        <FeaturePanel title="Secondary Features" items={secondaryFeatures} />
      </div>
    </section>
  );
}

export default memo(KeyFeaturesSection);

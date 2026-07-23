import React, { memo } from "react";

const TAB_LABELS = {
  patent: "Patent Search",
  publish: "Publication Search",
  product: "Product Comparison",
  provisional: "Provisional Patent Draft",
  nonProvisional: "Non-Provisional Patent Draft",
};

function OutputTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="rr-tabs-shell">
      {tabs?.module?.map((tab) => (
        <button
          key={tab}
          type="button"
          className={activeTab === tab ? "active" : ""}
          onClick={() => onChange(tab)}
        >
          {TAB_LABELS[tab] || tab}
        </button>
      ))}
    </div>
  );
}

export default memo(OutputTabs);
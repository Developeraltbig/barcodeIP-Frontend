import React, { memo } from "react";

function OutputTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="rr-tabs-shell">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={activeTab === tab.key ? "active" : ""}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default memo(OutputTabs);

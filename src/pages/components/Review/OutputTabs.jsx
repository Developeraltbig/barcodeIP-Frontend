import React, { memo } from "react";

function OutputTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="rr-tabs-shell">
      {tabs?.module?.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={activeTab === tab ? "active" : ""}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default memo(OutputTabs);

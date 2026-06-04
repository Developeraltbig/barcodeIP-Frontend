import React, { memo } from "react";

function ProcessingPlaceholderTab({ label, runtime }) {
  return (
    <section className="rr-placeholder-panel">
      <div className="rr-placeholder-inner">
        <span className="rr-placeholder-badge">Processing</span>
        <h2>{label} module</h2>
        <p>{runtime?.subMessage || "This module is ready for your next tab design."}</p>

        <div className="rr-placeholder-progress">
          <span style={{ width: `${runtime?.progress || 0}%` }} />
        </div>

        <small>{runtime?.progress || 0}% complete</small>
      </div>
    </section>
  );
}

export default memo(ProcessingPlaceholderTab);

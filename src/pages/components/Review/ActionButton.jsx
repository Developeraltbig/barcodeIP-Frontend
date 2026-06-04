import React, { memo } from "react";
import Icon from "./icons";

function ActionButton({ children, variant = "primary", icon, onClick }) {
  return (
    <button type="button" className={`rr-action-btn ${variant}`} onClick={onClick}>
      {icon && (
        <span className="rr-action-icon">
          <Icon name={icon} />
        </span>
      )}
      {children}
    </button>
  );
}

export default memo(ActionButton);

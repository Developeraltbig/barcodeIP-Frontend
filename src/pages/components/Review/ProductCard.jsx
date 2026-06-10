import React, { memo, useState } from "react";

import DownArrowIcon from "../../../assets/icons/down_arrow.svg";
import UpArrowIcon from "../../../assets/icons/up_arrow.svg";
import ViewIcon from "../../../assets/icons/icons_view.svg";

function ProductCard({ item, onViewDetails }) {
  const [open, setOpen] = useState(Boolean(item.breakdownOpen));

  return (
    <article className="rr-product-card">
      <div className="rr-product-main-row">
        <img
          className="rr-product-image"
          src={item.image}
          alt={item.title}
        />

        <div className="rr-product-content">
          <div className="rr-product-domain">{item.domain}</div>

          <h3>{item.title}</h3>

          <p>{item.description}</p>

          <div className="rr-product-footer">
            <strong>{item.price}</strong>

            <button
              className="rr-product-details-btn"
              type="button"
              onClick={() => onViewDetails?.(item)}
            >
              <img src={ViewIcon} alt="" className="viewIcon-icon" />
              View Details
            </button>
          </div>
        </div>

        <div className="rr-product-score">{item.score}</div>
      </div>

      <button
        className="rr-breakdown-toggle"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "Hide" : "Show"} feature breakdown {open ? <img src={DownArrowIcon} alt="" className="downArrow-icon" /> : <img src={UpArrowIcon} alt="" className="UpArrow-icon" />}
      </button>

      {open && item.features?.length > 0 && (
        <div className="rr-product-breakdown">
          {item.features.map((feature) => {
            const [title, description] = feature.split(" — ");

            return (
              <div key={feature} className="rr-product-feature-row">
                <span />
                <div>
                  <h4>{title}</h4>
                  <p>{description || ""}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}

export default memo(ProductCard);
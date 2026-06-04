import React, { memo, useState } from "react";
import Icon from "./icons";

function ProductCard({ item, onViewDetails }) {
  const [open, setOpen] = useState(Boolean(item.breakdownOpen));

  return (
    <article className="rr-product-card">
      <div className="rr-product-main-row">
        <img className="rr-product-image" src={item.image} alt={item.title} />

        <div className="rr-product-content">
          <div className="rr-product-domain">{item.domain}</div>

          <h3>{item.title}</h3>

          <p>{item.description}</p>

          <strong>{item.price}</strong>
        </div>

        <div className="rr-product-score">{item.score}</div>

        <button className="rr-product-details-btn" type="button" onClick={onViewDetails}>
          <Icon name="eye" />
          View Details
        </button>
      </div>

      <button
        className="rr-breakdown-toggle"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "Hide" : "Show"} feature breakdown⌄
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

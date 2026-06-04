import React, { memo } from "react";
import ProductCard from "./ProductCard";

function ProductTab({ results, onViewProductDetails }) {
  return (
    <section className="rr-product-panel">
      <div className="rr-tab-page-head">
        <div>
          <h2>Product Comparison</h2>
          <p>Commercial product matches ranked against the invention requirements.</p>
        </div>
      </div>

      <div className="rr-product-list">
        {results.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onViewDetails={() => onViewProductDetails?.(item)}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(ProductTab);

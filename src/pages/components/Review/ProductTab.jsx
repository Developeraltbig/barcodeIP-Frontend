import React, { memo, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from "./ProductCard";
import DownloadIcon from "../../../assets/icons/download.svg";
import { useParams } from 'react-router-dom';
import ActionButton from "./ActionButton";

function ProductTab({ results, onViewProductDetails, onDownload }) {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [downloading, setDownloading] = useState(false);

  console.log('results --', results)
  const handleDownload = async () => {
    try {
      setDownloading(true)
      const projectId = id;
      if (!projectId) {
        console.error("Project ID missing");
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/projects/product/download-pdf/${projectId}`,
        {
          responseType: "arraybuffer",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/pdf",
          },
        }
      );
      const pdfBlob = new Blob(
        [response.data],
        {
          type: "application/pdf",
        }
      );
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Product.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
      toast.success("Product Generated is Successfully");
      setDownloading(false)
    } catch (error) {
      setDownloading(false)
      toast.error("PDF download error: Contact administration");
      console.error(
        "PDF download error:",
        error
      );

    }
  };
  return (
    <section className="rr-product-panel">
      <div className="rr-tab-page-head">
        <div>
          <h2>Product Comparison</h2>
          <p>Commercial product matches ranked against the invention requirements.</p>
        </div>
        <ActionButton
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? (
            "Loading..."
          ) : (
            <>
              <img
                src={DownloadIcon}
                alt=""
                className="download-icon"
              />
              Download Product
            </>
          )}
        </ActionButton>
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

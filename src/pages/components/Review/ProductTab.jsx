import React, { memo, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from "./ProductCard";
import DownloadIcon from "../../../assets/icons/DownloadIcon1.svg";
import { useParams } from 'react-router-dom';
import ActionButton from "./ActionButton";
import {
  useStartProcessMutation,
} from "../../../features/userApi";

function ProductTab({ results, onViewProductDetails, onDownload }) {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [downloading, setDownloading] = useState(false);
  const [startProcess, { isLoading: isStartingProcess }] = useStartProcessMutation();

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

  const handleRegenerate = async () => {
    try {
      const data = {
        project_id: id,
        checked: ["product"], // regenerate only Product module
      };

      const response = await startProcess(data).unwrap();

      if (response.success) {
        toast.success("Product regeneration started successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err?.data?.error || "Failed to regenerate product report."
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
        {results?.length > 0 ? (
          results.map((item, index) => (
            <ProductCard
              key={item.id}
              item={item}
              onViewDetails={() => onViewProductDetails?.(item)}
            />
          ))
        ) : (
          <div
            style={{
              width: "100%",
              padding: "40px",
              textAlign: "center",
              color: "#666",
              fontSize: "16px",
            }}
          >
            No product comparison found.
            <br />
            Click <strong><ActionButton
              onClick={handleRegenerate}
            >
              {"Regenerate Product"}
            </ActionButton></strong> to generate product matches.
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(ProductTab);

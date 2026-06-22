import React, { useState } from "react";
import { useGetTransactionDetailsQuery } from "../../features/userApi";
import "./Transactions.css";
import {
    ArrowLeft,
    ArrowRight,
    Loader2,
    Download
} from "lucide-react";


function TransactionHistoryTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const limitPerPage = 10;

    const {
        data,
        error,
        isLoading,
        isFetching
    } = useGetTransactionDetailsQuery({
        page: currentPage,
        limit: limitPerPage
    });

    const transactions = data?.transactions || [];
    const totalPages = data?.totalPages || 1;

    if (isLoading) {
        return (
            <div className="transaction-loader">
                <Loader2 size={24} className="loader-spin" />
                <span>Loading transactions...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="transaction-error">
                Failed to load transactions history.
            </div>
        );
    }

    const handleInvoiceDownload = (transactionId) => {
        console.log("Download invoice:", transactionId);

        // Call your API here
        // downloadInvoice(transactionId);

        // Example:
        // dispatch(downloadInvoice(transactionId));
    };

    return (
        <div className="transaction-history-section">
            <div
                className="table-responsive-wrapper"
                style={{
                    opacity: isFetching ? 0.6 : 1
                }}
            >
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th className="sr-column">SR NO.</th>
                            <th>TRANSACTION ID</th>
                            <th>TYPE</th>
                            <th>DESCRIPTION</th>
                            <th>CREDITS USED/ADDED</th>
                            <th>MODULE</th>
                            <th>DATE</th>
                            <th className="invoice-column">INVOICE</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="empty-state"
                                >
                                    No transactions found.
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx, index) => (
                                <tr key={tx._id}>
                                    <td className="sr-column">
                                        {(currentPage - 1) *
                                            limitPerPage +
                                            index +
                                            1}
                                    </td>

                                    <td>
                                        <span className="transaction-id">
                                            {tx._id}
                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={`transaction-badge ${tx.type === "credit"
                                                ? "credit"
                                                : "debit"
                                                }`}
                                        >
                                            {tx.type}
                                        </span>
                                    </td>

                                    <td>
                                        <div
                                            className="transaction-description"
                                            title={tx.description}
                                        >
                                            {tx.description}
                                        </div>
                                    </td>

                                    <td>
                                        <span
                                            className={`credit-value ${tx.type === "credit"
                                                ? "credit"
                                                : "debit"
                                                }`}
                                        >
                                            {tx.type === "credit"
                                                ? "+"
                                                : "-"}
                                            {tx.credits}
                                        </span>
                                    </td>

                                    <td>
                                        {Array.isArray(tx.moduleName) && tx.moduleName.length > 0 ? (
                                            <div className="module-list">
                                                {tx.moduleName.map((module, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="module-pill"
                                                    >
                                                        {module}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="module-pill">—</span>
                                        )}
                                    </td>

                                    <td>
                                        {new Date(
                                            tx.createdAt
                                        ).toLocaleDateString(
                                            "en-GB"
                                        )}
                                    </td>
                                    <td className="invoice-column">
                                        <button
                                            type="button"
                                            className="invoice-download-btn"
                                            onClick={() => handleInvoiceDownload(tx._id)}
                                            title="Download Invoice"
                                        >
                                            <Download size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="transaction-pagination">
                <button
                    type="button"
                    className="pagination-btn"
                    disabled={
                        currentPage === 1 ||
                        isFetching
                    }
                    onClick={() =>
                        setCurrentPage((prev) =>
                            Math.max(prev - 1, 1)
                        )
                    }
                >
                    <ArrowLeft size={16} />
                    Previous
                </button>

                <div className="page-info">
                    Page {currentPage} of {totalPages}
                </div>

                <button
                    type="button"
                    className="pagination-btn"
                    disabled={
                        currentPage === totalPages ||
                        isFetching
                    }
                    onClick={() =>
                        setCurrentPage((prev) =>
                            Math.min(
                                prev + 1,
                                totalPages
                            )
                        )
                    }
                >
                    Next
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}

export default TransactionHistoryTable;
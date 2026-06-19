import React, { useState } from 'react';
import { useGetTransactionDetailsQuery } from '../../features/userApi'; // Adjust path to your API slice
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import './Transactions.css';


function TransactionHistoryTable() {
    // 1. Manage pagination local variables
    const [currentPage, setCurrentPage] = useState(1);
    const limitPerPage = 10;

    // 2. Pass dynamic parameters as an argument to your RTK Query hook
    const {
        data,
        error,
        isLoading,
        isFetching
    } = useGetTransactionDetailsQuery({ page: currentPage, limit: limitPerPage });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="animate-spin text-orange-500" size={24} />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-sm">Failed to load transactions history.</p>;
    }

    // Extract values returned from your Express paginated response
    const transactions = data?.transactions || [];
    const totalPages = data?.totalPages || 1;

    return (
        <div className="transaction-history-section">
            <div className="table-responsive-wrapper" style={{ opacity: isFetching ? 0.6 : 1 }}>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th>Sr no.</th>
                            <th>Transaction ID</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Credits Used/Added</th>
                            <th>Module</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-400">
                                    No transactions recorded yet.
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx, index) => (
                                <tr key={tx._id}>
                                    <td>{index + 1}</td>
                                    <td>{tx._id}</td>
                                    <td>
                                        <span className={`badge ${tx.type === 'credit' ? 'bg-green' : 'bg-red'}`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td>{tx.description}</td>
                                    <td>{tx.credits}</td>
                                    <td>{tx.moduleName || '—'}</td>
                                    <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls Interface */}
            <div className="pagination-controls-footer flex items-center justify-between mt-4">
                <button
                    type="button"
                    className="pagination-btn"
                    disabled={currentPage === 1 || isFetching}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                    <ArrowLeft size={16} /> Previous
                </button>

                <span className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    type="button"
                    className="pagination-btn"
                    disabled={currentPage === totalPages || isFetching}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                    Next <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}

export default TransactionHistoryTable;
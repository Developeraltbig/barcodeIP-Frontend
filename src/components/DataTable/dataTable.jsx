import React, { useState, useMemo } from "react";

const DataTable = ({
  columns,
  data = [],
  pageSize = 10,
  searchable = true,
  filters = [],
  rowKey = "id", 
  onView,
  onEdit,
  onDelete = null,
}) => {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  const getRowId = (row, index) => row[rowKey] || index;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString; 
    }
  };

  const isHTML = (str) => {
    if (typeof str !== 'string') return false;
    const htmlRegex = /<[a-z][\s\S]*>/i; 
    return htmlRegex.test(str);
  };

  /* ---------------- LOGIC (Search/Sort/Filter) ---------------- */
  const filteredData = useMemo(() => {
    let filtered = [...data];
    if (search) {
      filtered = filtered.filter((row) =>
        columns.some((col) =>
          String(row[col.accessor] ?? "").toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    Object.keys(activeFilters).forEach((key) => {
      if (activeFilters[key]) {
        filtered = filtered.filter((row) => row[key] === activeFilters[key]);
      }
    });
    return filtered;
  }, [search, activeFilters, data, columns]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  /* ---------------- HANDLERS ---------------- */
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const ids = paginatedData.map((row, i) => getRowId(row, i));
      setSelectedRows(ids);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row, i) => selectedRows.includes(getRowId(row, i)));

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div style={containerStyle}>
      <style>{`
        .dt-html-content p, .dt-html-content h1, .dt-html-content h2 { margin: 0 !important; line-height: 1.4; }
        .dt-html-content ul, .dt-html-content ol { padding-left: 18px; }
        .dt-img-preview { 
            width: 44px; height: 44px; border-radius: 6px; object-fit: cover; 
            border: 1px solid #e2e8f0; cursor: pointer; transition: transform 0.2s;
        }
        .dt-img-preview:hover { transform: scale(1.1); }
      `}</style>

      {/* 🔹 Toolbar */}
      <div style={toolbarStyle}>
        <div style={{ display: "flex", gap: "12px", flex: 1 }}>
          {searchable && (
            <input
              style={searchInputStyle}
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          )}
          {filters.map((filter) => (
            <select
              key={filter.key}
              style={filterSelectStyle}
              onChange={(e) =>
                setActiveFilters({ ...activeFilters, [filter.key]: e.target.value })
              }
            >
              <option value="">All {filter.label}</option>
              {filter.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {/* 🔹 Selected Summary */}
      {selectedRows.length > 0 && (
        <div style={summaryBarStyle}>
          <span style={{ fontSize: "14px", fontWeight: "600", color: "#2563eb" }}>
            {selectedRows.length} selected
          </span>
          <button style={bulkDeleteBtn} onClick={() => console.log(selectedRows)}>Delete Selected</button>
        </div>
      )}

      {/* 🔹 Table */}
      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={theadTrStyle}>
              <th style={thCheckStyle}>
                <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} />
              </th>
              <th style={thIdStyle}>#</th>
              {columns.map((col) => (
                <th key={col.accessor} style={thStyle} onClick={() => handleSort(col.accessor)}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    {col.label}
                    {sortConfig?.key === col.accessor && (
                      <span style={{ fontSize: "10px" }}>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                    )}
                  </div>
                </th>
              ))}
              <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length ? (
              paginatedData.map((row, index) => {
                const id = getRowId(row, index);
                const isSelected = selectedRows.includes(id);
                const serialNumber = (currentPage - 1) * pageSize + index + 1;

                return (
                  <tr key={id} style={{ ...trStyle, backgroundColor: isSelected ? "#f8fafc" : "transparent" }}>
                    <td style={tdCheckStyle}>
                      <input type="checkbox" checked={isSelected} onChange={() => handleSelectRow(id)} />
                    </td>

                    <td style={tdIdStyle}>{serialNumber}</td>

                    {columns.map((col) => {
                      const rawValue = row[col.accessor];
                      let content;

                      // 1. Handle Images
                      if (col.accessor === "image") {
                        content = rawValue ? (
                          <img 
                            src={rawValue} 
                            alt="Preview" 
                            className="dt-img-preview"
                            onClick={() => window.open(rawValue, '_blank')}
                          />
                        ) : (
                          <div style={{ color: "#cbd5e1", fontSize: "12px" }}>No Image</div>
                        );
                      } 
                      // 2. Handle Dates
                      else if (["createdAt", "updatedAt"].includes(col.accessor)) {
                        content = formatDate(rawValue);
                      } 
                      // 3. Handle HTML
                      else if (isHTML(rawValue)) {
                        content = (
                          <div 
                            className="dt-html-content"
                            style={{ whiteSpace: "normal", wordWrap: "break-word", minWidth: "180px" }} 
                            dangerouslySetInnerHTML={{ __html: rawValue }} 
                          />
                        );
                      } 
                      // 4. Default Text
                      else {
                        content = rawValue || "-";
                      }

                      return (
                        <td key={col.accessor} style={tdStyle}>
                          {content}
                        </td>
                      );
                    })}
                    
                    <td style={actionTdStyle}>
                      <div style={actionGroupStyle}>
                        {onView && <button title="View" style={iconBtnStyle} onClick={() => onView(row)}>👁️</button>}
                        {onEdit && <button title="Edit" style={iconBtnStyle} onClick={() => onEdit(row)}>✏️</button>}
                        {onDelete && <button title="Delete" style={{ ...iconBtnStyle, color: "#ef4444" }} onClick={() => onDelete(row)}>🗑️</button>}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length + 3} style={noDataStyle}>No matching records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination */}
      <div style={paginationStyle}>
        <div style={{ color: "#64748b", fontSize: "14px" }}>
          Page <strong>{currentPage}</strong> of {totalPages}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button style={pageBtnStyle} disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button style={pageBtnStyle} disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Prev</button>
          <button style={pageBtnStyle} disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
          <button style={pageBtnStyle} disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;

/* ================== STYLES ================== */

const containerStyle = {
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
  border: "1px solid #e2e8f0",
  overflow: "hidden",
  margin: "20px 0",
};

const toolbarStyle = {
  padding: "16px 20px",
  borderBottom: "1px solid #f1f5f9",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const searchInputStyle = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "14px",
  width: "280px",
  outline: "none",
};

const filterSelectStyle = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  background: "#f8fafc",
  fontSize: "14px",
};

const summaryBarStyle = {
  background: "#eff6ff",
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #dbeafe",
};

const bulkDeleteBtn = {
  padding: "6px 12px",
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
};

const tableWrapperStyle = { width: "100%", overflowX: "auto" };
const tableStyle = { width: "100%", borderCollapse: "collapse", textAlign: "left" };
const theadTrStyle = { background: "#f8fafc" };

const thStyle = {
  padding: "14px 20px",
  fontSize: "13px",
  fontWeight: "600",
  color: "#475569",
  textTransform: "uppercase",
  cursor: "pointer",
  borderBottom: "2px solid #f1f5f9",
};

const thCheckStyle = { ...thStyle, width: "40px" };
const thIdStyle = { ...thStyle, width: "60px", textAlign: "center" }; 

const trStyle = { borderBottom: "1px solid #f1f5f9" };
const tdStyle = {
  padding: "12px 20px",
  fontSize: "14px",
  color: "#1e293b",
  verticalAlign: "middle", 
};

const tdCheckStyle = { ...tdStyle, width: "40px" };
const tdIdStyle = { ...tdStyle, width: "60px", textAlign: "center", fontWeight: "600", color: "#64748b" }; 
const actionTdStyle = { ...tdStyle, textAlign: "right" };
const actionGroupStyle = { display: "flex", justifyContent: "flex-end", gap: "8px" };

const iconBtnStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  padding: "4px",
};

const noDataStyle = { padding: "40px", textAlign: "center", color: "#94a3b8" };
const paginationStyle = {
  padding: "16px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: "1px solid #f1f5f9",
  background: "#f8fafc",
};

const pageBtnStyle = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "1px solid #e2e8f0",
  background: "#fff",
  fontSize: "13px",
  cursor: "pointer",
};
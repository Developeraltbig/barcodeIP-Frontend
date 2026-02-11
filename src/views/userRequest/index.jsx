import React, { useState, useMemo, useCallback } from "react";
import DataTable from "../../components/DataTable/dataTable.jsx"; // Ensure path is correct
import {
  useGetUserAllRequestQuery,
  useEditUserRequestMutation
} from "../../features/userRequestApi.js";
import ViewUserModal from "./ViewUserModal";
import AdminUserFormModal from "./AddEditModal";
import { toast } from "react-toastify";

export default function Index() {
  const [page] = useState(1);
  const [limit] = useState(10);

  // RTK Query hooks
  const { data, isLoading } = useGetUserAllRequestQuery({
    page,
    limit,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // API Mutations
  const [editAdmin] = useEditUserRequestMutation();

  // Modal & Selection States
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const users = useMemo(() => data?.data?.data || [], [data]);

  /* ---------- ADD ---------- */
   const handleFormSubmit = async (payload) => {
    try {
      if (mode === "add") {
        // payload = { email, password }
        await addAdmin({ data: payload }).unwrap();
        toast.success("Admin registered successfully!");
      } else {
        // payload = { email: "new value" } 
        // Calling edit API: { id, data }
        await editAdmin({ 
          id: selectedUser._id, 
          data: payload 
        }).unwrap();
        toast.success("Admin updated successfully!");
      }
      setFormOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Operation failed. Please try again.");
    }
  };

  /* ---------- EDIT ---------- */
  const handleEdit = (row) => {
    setSelectedUser(row);
    setMode("edit");
    setFormOpen(true);
  };


  /* ---------- VIEW ---------- */
  const handleView = useCallback((row) => {
    setSelectedUser(row);
    setViewOpen(true);
  }, []);



  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>User Request</h2>
      </div>

      <DataTable
        rowKey="_id" // 👈 Crucial: This fixes the selection bug since your data uses _id
        columns={[
          { label: "First Name", accessor: "first_name" },
          { label: "Email", accessor: "email" },
          { label: "Last Login", accessor: "last_loggedin" },
          { label: "Activated", accessor: "activated" },
        ]}
        data={users}
        onView={handleView}
        onEdit={handleEdit}
      />

      {/* View Modal */}
      <ViewUserModal
        open={viewOpen}
        data={selectedUser}
        onClose={() => setViewOpen(false)}
      />

      {/* Add / Edit Form Modal */}
      <AdminUserFormModal
        open={formOpen}
        mode={mode}
        data={selectedUser}
        onSubmit={handleFormSubmit}
        onClose={() => setFormOpen(false)}
      />
    </div>
  );
}

/* ---------- Styles ---------- */

const styles = {
  container: { 
    padding: "32px",
    backgroundColor: "#f8fafc", // Very light background to make white table pop
    minHeight: "100vh"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: "-0.025em"
  },
  addBtn: {
    background: "linear-gradient(135deg, #2563eb, #3b82f6)", // Matching the modal button
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
};
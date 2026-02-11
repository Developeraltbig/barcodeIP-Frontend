import React, { useState, useMemo, useCallback } from "react";
import DataTable from "../../components/DataTable/dataTable.jsx"; // Ensure path is correct
import {
  useGetPrivacyPolicyQuery,
  useEditPrivacyPolicyMutation,
  useDeletePrivacyPolicyMutation,
  useAddPrivacyPolicyMutation
} from "../../features/privacyPolicyApi.js";
import ConfirmModal from "../../components/modal/ConfirmModal";
import ViewUserModal from "./ViewUserModal";
import PrivacyPolicyFormModal from "./AddEditModal";
import { toast } from "react-toastify";

export default function Index() {
  const [page] = useState(1);
  const [limit] = useState(10);

  // RTK Query hooks
  const { data, isLoading } = useGetPrivacyPolicyQuery({
     page,
    limit,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  // API Mutations
  const [addPrivacyPolicy] =   useAddPrivacyPolicyMutation();
  const [editPrivacyPolicy] = useEditPrivacyPolicyMutation();
  const [deletePrivacyPolicy] = useDeletePrivacyPolicyMutation();
  
  // Modal & Selection States
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  const users = useMemo(() => data?.data || [], [data]);

  /* ---------- ADD ---------- */
   const handleFormSubmit = async (payload) => {
    try {
      if (mode === "add") {
        // payload = { email, password }
        await addPrivacyPolicy({ data: payload }).unwrap();
        toast.success("Privacy Policy Created successfully!");
      } else {
        // Calling edit API: { id, data }
        await editPrivacyPolicy({ 
          id: selectedUser._id, 
          data: payload 
        }).unwrap();
        toast.success("Privacy Policy updated successfully!");
      }
      setFormOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Operation failed. Please try again.");
    }
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setMode("add");
    setFormOpen(true);
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



  /* ---------- DELETE ASK ---------- */
  const handleDeleteAsk = useCallback((row) => {
    setSelectedId(row._id); // Using _id from your data
    setOpenDelete(true);
  }, []);

  /* ---------- DELETE CONFIRM ---------- */
  const handleDelete = useCallback(async () => {
    if (!selectedId) return;
    try {
      await deletePrivacyPolicy(selectedId).unwrap();
      toast.success("Privacy Policy deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    } finally {
      setOpenDelete(false);
      setSelectedId(null);
    }
  }, [selectedId, deletePrivacyPolicy]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Privacy Policy</h2>
        <button 
          style={styles.addBtn} 
          onClick={handleAdd}
          onMouseOver={(e) => (e.target.style.opacity = "0.9")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          + Add Privacy Policy
        </button>
      </div>

      <DataTable
        rowKey="_id" // 👈 Crucial: This fixes the selection bug since your data uses _id
        columns={[
          { label: "Description", accessor: "description" },
          { label: "Created", accessor: "createdAt" },
          { label: "Updated", accessor: "updatedAt" },
        ]}
        data={users}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteAsk}  
      />

      {/* View Modal */}
      <ViewUserModal
        open={viewOpen}
        data={selectedUser}
        onClose={() => setViewOpen(false)}
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        open={openDelete}
        title="Delete User"
        message="Are you sure you want to delete this ? This action cannot be undone."
        onConfirm={handleDelete}
        onClose={() => {
          setOpenDelete(false);
          setSelectedId(null);
        }}
      />

      {/* Add / Edit Form Modal */}
      <PrivacyPolicyFormModal
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
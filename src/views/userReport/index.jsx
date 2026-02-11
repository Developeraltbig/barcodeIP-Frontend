import React from "react";
import DataTable from "components/DataTable/dataTable.jsx";

const styles = {
  container: {
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 600,
    color: "#1f2937", // slate-800
  },
  addBtn: {
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "background-color 0.2s ease",
  },
};

export default function Index() {
  const users = [
    { id: 1, name: "Amit", email: "amit@gmail.com", amount: 1200, role: "Admin" },
    { id: 2, name: "Neha", email: "neha@gmail.com", amount: 330, role: "User" },
    { id: 3, name: "Rahul", email: "rahul@gmail.com", amount: 135, role: "User" },
    { id: 4, name: "Sneha", email: "sneha@gmail.com", amount: 180, role: "Manager" },
    { id: 5, name: "Amit", email: "amit@gmail.com", amount: 1200, role: "Admin" },
    { id: 6, name: "Neha", email: "neha@gmail.com", amount: 330, role: "User" },
    { id: 7, name: "Rahul", email: "rahul@gmail.com", amount: 135, role: "User" },
    { id: 8, name: "Sneha", email: "sneha@gmail.com", amount: 180, role: "Manager" },
    { id: 9, name: "Amit", email: "amit@gmail.com", amount: 1200, role: "Admin" },
    { id: 10, name: "Neha", email: "neha@gmail.com", amount: 330, role: "User" },
    { id: 11, name: "Rahul", email: "rahul@gmail.com", amount: 135, role: "User" },
    { id: 12, name: "Sneha", email: "sneha@gmail.com", amount: 180, role: "Manager" },
    { id: 13, name: "Amit", email: "amit@gmail.com", amount: 1200, role: "Admin" },
    { id: 14, name: "Neha", email: "neha@gmail.com", amount: 330, role: "User" },
    { id: 15, name: "Rahul", email: "rahul@gmail.com", amount: 135, role: "User" },
    { id: 16, name: "Sneha", email: "sneha@gmail.com", amount: 180, role: "Manager" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>User Reports</h2>
      </div>

      <DataTable
        columns={[
          { label: "Name", accessor: "name" },
          { label: "Email", accessor: "email" },
          { label: "Amount", accessor: "amount" },
        ]}
        data={users}
        amountKey="amount"
        onView={(row) => console.log("view", row)}
        onEdit={(row) => console.log("edit", row)}
        onDelete={(id) => console.log("delete", id)}
      />
    </div>
  );
}

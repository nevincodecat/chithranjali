import React from "react";
import useClientIncome from "../../hooks/useClientIncome";
import styles from "./IncomeRecords.module.css"; // Create this CSS file if needed

const IncomeRecords = () => {
  const { incomeForms, loading, error, deleteIncome } = useClientIncome();

  if (loading) return <p>Loading income records...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className={styles.container}>
      <h2 className="text-center my-4">Client Income Records</h2>
      <table className={`table table-striped ${styles.table}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Date</th>
            <th>Price</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incomeForms.map((form) => (
            <tr key={form.documentId}>
              <td>{form.name || "—"}</td>
              <td>{form.age || "—"}</td>
              <td>{form.address || "—"}</td>
              <td>
                {form.date ? new Date(form.date).toLocaleDateString() : "—"}
              </td>
              <td>₹{form.price || 0}</td>
              <td>{form.phone || "—"}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteIncome(form.documentId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeRecords;

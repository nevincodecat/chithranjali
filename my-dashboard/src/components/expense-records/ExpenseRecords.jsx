import React from "react";
import useClientExpense from "../../hooks/useClientExpense";
import styles from "./ExpenseRecords.module.css";

const ExpenseRecords = () => {
  const { incomeForms, loading, error, deleteExpense } = useClientExpense();

  if (loading)
    return <p className={styles.textGray}>Loading income forms...</p>;
  if (error) return <p className={styles.textRed}>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {[
                "Name",
                "Age",
                "Phone",
                "Price",
                "Address",
                "Date",
                "Actions",
              ].map((heading) => (
                <th key={heading} className={styles.th}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {incomeForms.map(
              ({ documentId, name, category, amount, date, note }) => (
                <tr key={documentId} className={styles.tr}>
                  <td className={styles.td}>{name || "—"}</td>
                  <td className={styles.td}>{category || "—"}</td>
                  <td className={styles.td}>{amount || "—"}</td>
                  <td className={styles.td}>₹{date || "0"}</td>
                  <td className={styles.td}>{note || "—"}</td>
                  <td className={styles.td}>
                    {date ? new Date(date).toLocaleDateString() : "—"}
                  </td>
                  <td className={styles.td}>
                    <button
                      onClick={() => deleteExpense(documentId)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseRecords;

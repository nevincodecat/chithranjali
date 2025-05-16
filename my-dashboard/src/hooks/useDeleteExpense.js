// src/hooks/useDeleteExpense.js
import axios from "axios";
import { mutate } from "swr";

const useDeleteExpense = () => {
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/api/expenses/${id}`);

      // Trigger SWR to revalidate the data after delete
      mutate("http://localhost:1337/api/expenses", undefined, {
        revalidate: true,
      });
    } catch (error) {
      console.error("Failed to delete expense:", error);
      throw error; // Optionally throw for UI to catch
    }
  };

  return deleteExpense;
};

export default useDeleteExpense;

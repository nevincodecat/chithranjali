import useSWR, { mutate } from "swr";
import axios from "axios";
import { useState, useEffect } from "react";
import { getAllData } from "../utils/indexedDB"; // Optional if using IndexedDB fallback

// ✅ Safer fetcher that throws a simple error message
const fetcher = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data?.data || [];
  } catch (error) {
    throw new error("Network error: Cannot fetch expenses while offline");
  }
};

const useClientExpense = () => {
  const {
    data: incomeForms,
    error,
    isLoading,
  } = useSWR("http://localhost:1337/api/expenses", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
    fallbackData: [], // Ensures component doesn't crash
  });

  // ✅ Optional offline fallback using IndexedDB
  const [offlineData, setOfflineData] = useState(null);

  useEffect(() => {
    if (error && !navigator.onLine) {
      getAllData("expenses").then((data) => {
        setOfflineData(data);
      });
    }
  }, [error]);

  const deleteExpense = async (documentId) => {
    try {
      await axios.delete(`http://localhost:1337/api/expenses/${documentId}`);
      mutate("http://localhost:1337/api/expenses");
    } catch (error) {
      console.error("Error deleting expense:", error.response || error.message);
    }
  };

  return {
    incomeForms: offlineData || incomeForms || [],
    loading: isLoading && !offlineData,
    error: error?.message || null,
    deleteExpense,
  };
};

export default useClientExpense;

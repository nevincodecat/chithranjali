import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { saveData, getAllData, deleteData } from "../utils/indexedDB";

const useSubmitExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const isSyncing = useRef(false);
  const toastIds = useRef(new Set());

  const showToast = (message, type = "success", options = {}) => {
    const toastKey = `${type}-${message}`;
    if (!toastIds.current.has(toastKey)) {
      toastIds.current.add(toastKey);
      toast[type](message, {
        ...options,
        onClose: () => toastIds.current.delete(toastKey),
      });
    }
  };

  const submitExpense = useCallback(async (values) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const isEmpty = Object.values(values).every((value) => !value);
    if (isEmpty) {
      setLoading(false);
      setError("Expense data is empty");
      showToast("Expense data is empty", "error");
      return;
    }

    const transformedValues = {
      ...values,
      amount: Number(values.amount),
    };

    try {
      if (navigator.onLine) {
        // Online Submission
        await axios.post(
          "http://localhost:1337/api/expenses",
          { data: transformedValues },
          { timeout: 10000 }
        );
        setSuccess(true);
        showToast("Expense form submitted online", "success");
      } else {
        // Offline Submission
        const dataWithId = { ...transformedValues, id: Date.now() };
        await saveData("expenses", dataWithId);
        setSuccess(true);
        showToast("Expense form submitted offline", "success");
      }
    } catch (err) {
      console.error("Error submitting expense:", err);
      setError("Failed to save expense.");
      showToast("Failed to save expense.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const syncOfflineData = async () => {
      if (!navigator.onLine || isSyncing.current) return;

      isSyncing.current = true;

      try {
        const storedData = await getAllData("expenses");
        if (!storedData.length) return;

        for (const data of storedData) {
          try {
            const { id, ...dataWithoutId } = data;
            await axios.post(
              "http://localhost:1337/api/expenses",
              { data: dataWithoutId },
              { timeout: 10000 }
            );
            await deleteData("expenses", id);
          } catch (err) {
            console.error("Error syncing offline data:", err);
          }
        }

        showToast("Offline forms submitted", "success");
      } catch (err) {
        console.error("Error during offline sync:", err);
        showToast("Sync failed. Will retry later.", "error");
      } finally {
        isSyncing.current = false;
      }
    };

    window.addEventListener("online", syncOfflineData);
    syncOfflineData(); // Sync immediately on mount if online

    return () => {
      window.removeEventListener("online", syncOfflineData);
    };
  }, []);

  return { submitExpense, loading, error, success };
};

export default useSubmitExpense;

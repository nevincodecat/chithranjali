import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { saveData, getAllData, deleteData } from "../utils/indexedDB";

const useSubmitClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const isSyncing = useRef(false);
  const toastIds = useRef(new Set());

  const showToast = (message, type = "success", options = {}) => {
    const toastKey = `${type}-${message}-${Date.now()}`;
    if (!toastIds.current.has(toastKey)) {
      toastIds.current.add(toastKey);
      console.log(`Showing toast: ${message} (${type})`);
      const id = toast[type](message, {
        ...options,
        onClose: () => toastIds.current.delete(toastKey),
      });
      return id;
    }
    console.log(`Toast suppressed (duplicate): ${message} (${type})`);
    return null;
  };

  const submitClient = useCallback(async (values) => {
    console.log("submitClient called with values:", values);
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (navigator.onLine) {
      const isEmpty = Object.values(values).every(
        (value) => value === undefined || value === null || value === ""
      );
      if (isEmpty) {
        console.log("Client data is empty, submission aborted");
        setLoading(false);
        setError("Client data is empty");
        throw new Error("Client data is empty");
      }

      try {
        const transformedValues = {
          ...values,
          price: Number(values.price),
          age: values.age ? Number(values.age) : undefined,
        };
        console.log("Submitting online:", transformedValues);
        const res = await axios.post(
          "http://localhost:1337/api/clientforms",
          {
            data: transformedValues,
          },
          { timeout: 10000 }
        );
        console.log("Data submitted:", res.data);
        showToast("Form submitted online");
        setSuccess(true);
      } catch (err) {
        console.error(
          "Error submitting data:",
          err.response?.data || err.message
        );
        setError("Failed to save client.");
        showToast("Failed to save client.", "error");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        console.log("Saving to IndexedDB:", values);
        const dataWithId = {
          ...values,
          id: Date.now(),
          price: Number(values.price),
          age: values.age ? Number(values.age) : undefined,
        };
        await saveData("clients", dataWithId);
        showToast("Form submitted offline");
        setSuccess(true);
      } catch (err) {
        console.error("Error saving data locally:", err);
        setError("Failed to save client locally.");
        showToast("Failed to save client locally.", "error");
      } finally {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const syncData = async () => {
      if (!navigator.onLine || isSyncing.current || !mounted) return;
      isSyncing.current = true;

      try {
        const storedData = await getAllData("clients");
        console.log("Data retrieved for sync:", storedData.length, "records");
        if (storedData.length === 0) return;

        const batchSize = 10;
        for (let i = 0; i < storedData.length; i += batchSize) {
          const batch = storedData.slice(i, i + batchSize);
          for (const data of batch) {
            let retries = 3;
            while (retries > 0 && mounted) {
              try {
                const { id, ...dataWithoutId } = data;
                console.log("Sending to server:", { data: dataWithoutId });
                const res = await axios.post(
                  "http://localhost:1337/api/clientforms",
                  {
                    data: dataWithoutId,
                  },
                  { timeout: 10000 }
                );
                if (res.status === 200 || res.status === 201) {
                  await deleteData("clients", id);
                  console.log(`Record ${id} synced and deleted`);
                  break;
                }
              } catch (err) {
                console.error(
                  `Error syncing record ${data.id} (attempt ${4 - retries}):`,
                  err.response?.data || err.message
                );
                retries--;
                if (retries === 0) {
                  console.error(`Record ${data.id} failed after 3 attempts`);
                  showToast(
                    `Failed to sync record ${data.id}. Will retry later.`,
                    "error"
                  );
                }
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }
            }
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        if (mounted) {
          const remaining = await getAllData("clients");
          if (remaining.length === 0) {
            showToast("All offline data synced and cleared!");
          } else {
            showToast("Some records failed to sync. Will retry later.", "warn");
          }
        }
      } catch (err) {
        console.error("Error during sync:", err);
        if (mounted) {
          showToast("Sync failed. Will retry later.", "error");
        }
      } finally {
        isSyncing.current = false;
      }
    };

    window.addEventListener("online", syncData);
    syncData();

    return () => {
      mounted = false;
      window.removeEventListener("online", syncData);
    };
  }, []);

  return { submitClient, loading, error, success };
};

export default useSubmitClient;

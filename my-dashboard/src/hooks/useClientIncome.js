import useSWR, { mutate } from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data?.data || []);

const useClientIncome = () => {
  const {
    data: incomeForms,
    error,
    isLoading,
  } = useSWR("http://localhost:1337/api/clientforms", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const deleteIncome = async (documentId) => {
    try {
      await axios.delete(`http://localhost:1337/api/clientforms/${documentId}`);
      mutate("http://localhost:1337/api/clientforms"); // Re-fetch after delete
    } catch (error) {
      console.error(
        "Error deleting client form:",
        error.response || error.message
      );
    }
  };

  return {
    incomeForms: incomeForms || [],
    loading: isLoading,
    error,
    deleteIncome,
  };
};

export default useClientIncome;

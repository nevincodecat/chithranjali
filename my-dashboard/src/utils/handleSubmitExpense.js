import { toast } from "react-toastify";

export const handleSubmitExpense = async ({
  values,
  isSubmitting,
  setIsSubmitting,
  setFormErrors,
  submitExpense,
}) => {
  if (isSubmitting) {
    console.log("Submission blocked: Already submitting");
    return;
  }

  setIsSubmitting(true);

  try {
    // Call the submitExpense function to post data to the backend
    await submitExpense(values);
    setFormErrors({});
  } catch (error) {
    // Handle errors from the backend
    if (error.message === "Expense data is empty") {
      toast.error("Expense data is empty. Please fill the form.");
    } else if (error.message === "No offline data to submit") {
      toast.error("No offline data to submit.");
    } else {
      toast.error("Submission failed. Please try again.");
    }
  } finally {
    setIsSubmitting(false);
  }
};

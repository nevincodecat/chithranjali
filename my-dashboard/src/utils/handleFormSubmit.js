import { toast } from "react-toastify";
import { validateForm } from "./validation";

export const handleFormSubmit = async ({
  values,
  isSubmitting,
  setIsSubmitting,
  setFormErrors,
  submitClient,
}) => {
  if (isSubmitting) {
    console.log("Submission blocked: Already submitting");
    return;
  }

  setIsSubmitting(true);
  const errors = validateForm(values);
  if (Object.keys(errors).length === 0) {
    try {
      await submitClient(values);
      setFormErrors({});
    } catch (error) {
      if (error.message === "Client data is empty") {
        toast.error("Client data is empty. Please fill the form.");
      } else if (error.message === "No offline data to submit") {
        toast.error("No offline data to submit.");
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  } else {
    setFormErrors(errors);
    toast.error("Please fix the form errors.");
    setIsSubmitting(false);
  }
};

import React, { useState, useCallback } from "react";
import { Form } from "informed";
import { Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomInput from "../../customFields/CustomInput";
import CustomDatePicker from "../../customFields/CustomDatePicker";
import useSubmitExpense from "../../hooks/useSubmitExpense";
import { handleSubmitExpense } from "../../utils/handleSubmitExpense";
import styles from "./Expense.module.css";

const AddExpense = () => {
  const { submitExpense, loading } = useSubmitExpense();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    async ({ values }) => {
      // Using handleSubmitExpense for submitting the expense form
      await handleSubmitExpense({
        values,
        isSubmitting,
        setIsSubmitting,
        setFormErrors: () => {}, // No form error handling since you don't need validation now
        submitExpense, // Pass submitExpense function to handle submission
      });
    },
    [submitExpense, isSubmitting]
  );

  return (
    <div className={`container ${styles.containerWrapper}`}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className={styles.formContainer}>
            <h2 className="text-center mb-4">Add Expense</h2>
            <Form onSubmit={onSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <CustomInput
                  name="name"
                  id="name"
                  placeholder="Enter name"
                  className={styles.formControl}
                  required
                />
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <CustomInput
                  name="category"
                  id="category"
                  placeholder="Enter expense category"
                  className={styles.formControl}
                />
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <CustomInput
                  name="amount"
                  id="amount"
                  placeholder="Enter amount"
                  className={styles.formControl}
                  required
                />
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <CustomDatePicker name="date" id="date" required />
                <label htmlFor="phone" className="form-label">
                  Mobile Number
                </label>
                <CustomInput
                  name="phone"
                  id="phone"
                  placeholder="Enter mobile number"
                  className={styles.formControl}
                />
                <label htmlFor="note" className="form-label">
                  Note
                </label>
                <CustomInput
                  name="note"
                  id="note"
                  placeholder="Reminder note"
                  className={styles.formControl}
                />
              </div>
              <div className={styles.submitWrapper}>
                <Button
                  type="submit"
                  className="btn btn-dark w-50"
                  disabled={loading || isSubmitting}
                >
                  {loading || isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;

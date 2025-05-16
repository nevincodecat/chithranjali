import React, { useState, useCallback } from "react";
import { Form } from "informed";
import { Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomInput from "../../customFields/CustomInput";
import useSubmitClient from "../../hooks/useSubmitClient.js";
import { handleFormSubmit } from "../../utils/handleFormSubmit";
import styles from "./AddIncome.module.css";
import CustomDatePicker from "../../customFields/CustomDatePicker.jsx";

const AddIncome = () => {
  const { submitClient, loading } = useSubmitClient();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    async ({ values }) => {
      await handleFormSubmit({
        values,
        isSubmitting,
        setIsSubmitting,
        setFormErrors,
        submitClient,
      });
    },
    [submitClient, isSubmitting]
  );

  return (
    <div className={`container ${styles.containerWrapper}`}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className={styles.formContainer}>
            <h2 className="text-center mb-4">Add Transaction</h2>
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
                  error={formErrors.name}
                />
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <CustomInput
                  name="age"
                  id="age"
                  placeholder="Enter customer age"
                  className={styles.formControl}
                  error={formErrors.age}
                />
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <CustomInput
                  name="address"
                  id="address"
                  placeholder="Enter customer address"
                  className={styles.formControl}
                  error={formErrors.address}
                />
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <CustomDatePicker name="date" id="date" required />

                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <CustomInput
                  name="price"
                  id="price"
                  placeholder="Enter price"
                  required
                  className={styles.formControl}
                  error={formErrors.price}
                />
                <label htmlFor="mobile" className="form-label">
                  Mobile Number
                </label>
                <CustomInput
                  name="phone"
                  id="mobile"
                  placeholder="Enter mobile number"
                  formatter="+91 #### ## ####"
                  required
                  className={styles.formControl}
                  error={formErrors.phone}
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

export default AddIncome;

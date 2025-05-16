import React from "react";
import { useField } from "informed";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ name, id, className = "", required, ...rest }) => {
  const validate = (val) => {
    if (required && !val) {
      return "Date is required";
    }
  };

  const { fieldState, fieldApi } = useField({ name, validate });
  const { error, touched, value } = fieldState;
  const { setValue, setTouched } = fieldApi;

  return (
    <div className="mb-3">
      <DatePicker
        id={id}
        selected={value ? new Date(value) : null}
        onChange={(date) =>
          setValue(date ? date.toISOString().split("T")[0] : "")
        }
        onBlur={() => setTouched(true)}
        placeholderText="Select a date"
        className={`form-control ${
          error && touched ? "is-invalid" : ""
        } ${className}`}
        dateFormat="yyyy-MM-dd"
        {...rest}
      />
      {error && touched && (
        <div className="invalid-feedback d-block">{error}</div>
      )}
    </div>
  );
};

export default CustomDatePicker;

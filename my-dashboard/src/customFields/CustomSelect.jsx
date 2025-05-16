import React from "react";
import { useField } from "informed";
import styles from "./CustomSelect.module.css"; // create this module

const CustomSelect = ({ label, ...props }) => {
  const { fieldState, fieldApi, render, ref } = useField(props);
  const { error, value, touched } = fieldState;

  return render(
    <div className={styles.selectWrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <select
        {...props}
        ref={ref}
        className={`${styles.select} ${
          error && touched ? styles.errorBorder : ""
        }`}
        value={value || ""}
        onChange={(e) => fieldApi.setValue(e.target.value)}
        onBlur={fieldApi.setTouched}
      >
        {props.children}
      </select>

      {error && touched && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default CustomSelect;

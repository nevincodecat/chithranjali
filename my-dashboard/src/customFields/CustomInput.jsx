import { useField } from "informed";
import styles from "./CustomInput.module.css";

const CustomInput = ({ label, ...props }) => {
  const { fieldState, fieldApi, render, ref } = useField(props);

  return render(
    <div className="">
      <label className={styles.label}>
        <span className={styles.labelText}>{label}</span>
      </label>

      <div
        className={`${styles.inputWrapper} ${
          fieldState.error ? styles.error : ""
        }`}
      >
        <input
          {...props}
          ref={ref}
          value={fieldState.value || ""}
          onChange={(e) => fieldApi.setValue(e.target.value)}
          onBlur={() => fieldApi.setTouched(true)}
          className={styles.input}
        />
        {fieldState.error && <span className={styles.icon}>⚠</span>}
      </div>

      {fieldState.error && (
        <div className={styles.errorText}>{fieldState.error}</div>
      )}
    </div>
  );
};

export default CustomInput;

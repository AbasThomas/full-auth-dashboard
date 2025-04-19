// InputField.jsx
import { Controller } from "react-hook-form";
import '../Components/Styles/InputField.css'; // Adjust the path as necessary
const InputField = ({ name, control, label, type = "text", error }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <Controller
      name={name}
      control={control}
      defaultValue="" // fallback if somehow missed in useForm
      render={({ field }) => (
        <input
          {...field}
          id={name}
          type={type}
          className="form-control"
        />
      )}
    />
    {error && <p className="error-text">{error}</p>}
  </div>
);

export default InputField;

const FormSelect = ({
  label,
  name,
  required,
  error,
  options,
  value,
  className,
  ...props
}) => {
  return (
    <>
      <div className={`form-group ${className}`}>
        <label className="form-label" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
          className="form-select"
          id={name}
          name={name}
          required={required}
          value={value}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </>
  );
};

export default FormSelect;
